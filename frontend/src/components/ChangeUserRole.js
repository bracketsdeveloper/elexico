import React, { useState } from 'react';
import ROLE from '../common/Role';
import { MdOutlineCancel } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
    name,
    userId,
    email,
    role,
    onClose,
    callFunc
}) => {
    const [userRole, setUserRole] = useState(role);

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value);
        console.log(e.target.value);
    };

    const updateUserRole = async () => {
        try {
            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: "include",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    role: userRole
                })
            });

            const responseData = await fetchResponse.json();

            if (responseData.success) {
                toast.success(responseData.message);
                onClose();
                callFunc()
            } else {
                toast.error(responseData.message || "Failed to update role");
            }

            console.log("Role Updated", responseData);
        } catch (error) {
            toast.error("An error occurred while updating the role");
            console.error("Failed to update role", error);
        }
    };

    return (
        <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-500 bg-opacity-30'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded'>
                <h1 className='font-medium text-lg flex justify-between'>
                    <p>Change User Role</p>
                    <button onClick={onClose}><MdOutlineCancel className='text-3xl' /></button>
                </h1>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <div className='flex items-center justify-between pr-10 my-4'>
                    <p>Role:</p>
                    <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                        {Object.values(ROLE).map(el => (
                            <option value={el} key={el}>{el}</option>
                        ))}
                    </select>
                </div>
                <button className='w-fit mx-auto block border m-3 p-3 rounded bg-green-500 hover:bg-green-700' onClick={updateUserRole}>
                    Change Role
                </button>
            </div>
        </div>
    );
};

export default ChangeUserRole;
