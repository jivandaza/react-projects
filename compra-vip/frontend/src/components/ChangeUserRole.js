import React, { useContext, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserDetails } from "../store/userSlice";
import ROLE from './../common/role';
import summaryApi from "../common";
import toastr from "toastr";
import Context from "../context";

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc
}) => {

    const [userRole, setUserRole] = useState(role);

    const user = useSelector(state => state?.user?.user);
    const { fetchUserDetails } = useContext(Context);
    const navigation = useNavigate();
    const dispatch = useDispatch();

    const handleSelectRole = (e) => {
        setUserRole(e.target.value);
    }

    const fetchUpdateUserRole = async (e) => {
        e.preventDefault();

        const dataResponse = await fetch(summaryApi.updateUser.url, {
            method: summaryApi.updateUser.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId : userId,
                name,
                email,
                role: userRole
            })
        });

        const { message, success, error } = await dataResponse.json();

        if ( success ) {
            if (role === userRole) {
                onClose();
            } else {
                toastr.info(message);
                onClose();
                callFunc();
                setTimeout(() => {
                    if ( user?._id === userId && userRole === ROLE.GENERAL ) {
                        fetchUserDetails();
                        navigation('/');
                    }
                }, 3000);
            }
        }

        if ( error ) {
            toastr.info(message);
            dispatch(setUserDetails(null));
            setTimeout(() => navigation('/'), 3000);
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center'>
            <div className='mx-auto bg-white rounded shadow-md p-4 w-full max-w-sm'>
                <div className='relative flex items-center mb-4'>
                    <h1 className='w-full text-lg font-medium text-center'>Actualizar Rol</h1>
                    <button className='absolute right-0 p-0.5 text-red-600 text-lg rounded-full hover:bg-red-600 hover:text-white' onClick={onClose}>
                        <IoMdClose />
                    </button>
                </div>

                <p className='mb-1'>Nombre: {name}</p>
                <p className='mb-4'>Correo Electrónico: {email}</p>

                <div className='flex flex-col mb-6'>
                    <p className='mb-1'>Rol:</p>
                    <select
                        className='py-2 cursor-pointer border outline-none'
                        value={String(userRole)}
                        onChange={handleSelectRole}
                    >
                        {
                            Object.values(ROLE).map((item) => {
                                return (
                                    <option
                                        value={item}
                                        key={item}
                                        className='p-2 cursor-pointer hover:bg-slate-200'
                                    >{item}</option>
                                )
                            })
                        }
                    </select>
                </div>

                <button
                    className='w-fit block mx-auto py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'
                    onClick={fetchUpdateUserRole}
                >Guardar</button>
            </div>
        </div>
    )
};

export default ChangeUserRole;