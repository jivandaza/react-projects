import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import ROLE from './../common/role';
import summaryApi from "../common";
import toastr from "toastr";

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc
}) => {

    const [userRole, setUserRole] = useState(role);

    const handleSelectRole = (e) => {
        setUserRole(e.target.value);
    }

    const fetchUpdateUserRole = async (e) => {
        e.preventDefault();

        const dataRequest = await fetch(summaryApi.updateUser.url, {
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

        const { message, error, success } = await dataRequest.json();

        if ( error ) {
            toastr.error(message);
        }

        if ( success ) {
            toastr.success(message);
            setTimeout(() => {
                onClose();
                callFunc();
            }, 3000);
        }
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoMdClose />
                </button>

                <h1 className='pb-4 text-lg font-medium text-center'>Actualizar Rol</h1>
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