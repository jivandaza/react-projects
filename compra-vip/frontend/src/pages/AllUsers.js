import React, { useEffect, useState } from 'react';
import ChangeUserRole from './../components/ChangeUserRole';
import toastr from "toastr";
import moment from 'moment';
import 'moment/locale/es';
import { MdModeEdit } from 'react-icons/md';
import summaryApi from '../common/index.js';

const AllUsers = () => {

    const [allUsers, setAllUsers] = useState([]);
    const [showChangeUseRole, setShowChangeRole] = useState(false);
    const [updateUser, setUpdateUser] = useState({
        email: '',
        name: '',
        role: '',
        _id: ''
    });

    const fetchAllUsers = async () => {
        const dataRequest = await fetch(summaryApi.allUsers.url, {
            method: summaryApi.allUsers.method,
            credentials: 'include'
        });

        const { success, error, message, data } = await dataRequest.json();

        if ( success ) {
            setAllUsers(data);
        }

        if ( error ) {
            toastr.error(message);
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div className='bg-white pb-4'>
            <table className='w-full userTable'>
                <thead>
                    <tr>
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
                                            className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white'
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
                    }
                </tbody>
            </table>

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