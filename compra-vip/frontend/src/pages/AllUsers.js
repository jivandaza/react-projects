import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { MdModeEdit } from 'react-icons/md';
import ChangeUserRole from './../components/ChangeUserRole';
import summaryApi from '../common/index.js';
import toastr from 'toastr';
import moment from 'moment';
import 'moment/locale/es';

const AllUsers = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [showChangeUseRole, setShowChangeRole] = useState(false);
    const [updateUser, setUpdateUser] = useState({
        email: '',
        name: '',
        role: '',
        _id: ''
    });

    const navigation = useNavigate();
    const dispatch = useDispatch();

    const fetchAllUsers = async () => {
        setIsLoading(true);

        const response = await fetch(summaryApi.allUsers.url, {
            method: summaryApi.allUsers.method,
            credentials: 'include'
        });

        const { data, message, success, error } = await response.json();

        if ( success )
            setAllUsers(data);

        if ( error ) {
            toastr.info(message);
            dispatch(setUserDetails(null));
            navigation('/');
        }

        setIsLoading(false);
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr className='bg-red-600 text-white'>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Correo Electrónico</th>
                        <th>Rol</th>
                        <th>Fecha de Creación</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !isLoading && (
                            allUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{index+1}</td>
                                        <td>{item?.name}</td>
                                        <td>{item?.email}</td>
                                        <td>{item?.role}</td>
                                        <td>{moment(item?.createdAt).format('LL')}</td>
                                        <td className='py-1'>
                                            <button
                                                className='
'
                                                onClick={() => {
                                                    setUpdateUser(item);
                                                    setShowChangeRole(true);
                                                }}
                                            >
                                                <MdModeEdit />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )
                    }
                </tbody>
            </table>

            {
                isLoading && (
                    <p className='text-center py-2 font-medium'>Cargando...</p>
                )
            }

            {
                showChangeUseRole && (
                    <ChangeUserRole
                        onClose={() => setShowChangeRole(false)}
                        name={updateUser.name}
                        email={updateUser.email}
                        role={updateUser.role}
                        userId={updateUser._id}
                        callFunc={fetchAllUsers}
                    />
                )
            }
        </div>
    )
};

export default AllUsers;