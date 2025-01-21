import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { FaEdit } from "react-icons/fa";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUser = () => {
    const [allUsers, setAllUsers] = useState([]);
    const [updateUserRole, setUpdateUserRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        address: "",
        role: "",
        _id: "",
    });

    const fetchAllUsers = async () => {
        try {
            const fetchData = await fetch(SummaryApi.allUser.url, {
                method: SummaryApi.allUser.method,
                credentials: 'include'
            });
            const dataResponse = await fetchData.json();
            if (dataResponse.success) {
                setAllUsers(dataResponse.data);
            }
            if (dataResponse.error) {
                toast.error(dataResponse.message);
            }
            console.log("allUsers", dataResponse);
        } catch (error) {
            toast.error("Failed to fetch users.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    return (
        <div>
            <table className='w-full user-table'>
                <thead>
                    <tr className='bg-black'>
                        <th>SL no.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Role</th>
                        <th>Created Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allUsers.map((el, index) => {
                            // Format the address if it's an object
                            const formattedAddress = typeof el?.address === 'object' 
                                ? `${el.address.street}, ${el.address.city}, ${el.address.state}, ${el.address.postalCode}, ${el.address.country}` 
                                : el?.address;

                            return (
                                <tr key={el._id}> {/* Unique key for each row */}
                                    <td>{index + 1}</td>
                                    <td>{el?.name}</td>
                                    <td>{el?.email}</td>
                                    <td>{formattedAddress}</td>
                                    <td>{el?.role}</td>
                                    <td>{moment(el?.createdAt).format('ll')}</td>
                                    <td className='flex-col'>
                                        <button onClick={() => {
                                            setUpdateUserDetails(el);
                                            setUpdateUserRole(true);
                                        }}>
                                            Edit <FaEdit />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
            {
                updateUserRole && (
                    <ChangeUserRole
                        onClose={() => setUpdateUserRole(false)}
                        name={updateUserDetails.name}
                        email={updateUserDetails.email}
                        role={updateUserDetails.role}
                        userId={updateUserDetails._id}
                        callFunc={fetchAllUsers}
                    />
                )
            }
        </div>
    );
}

export default AllUser;
