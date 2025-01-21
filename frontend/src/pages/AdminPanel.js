import React, { useEffect } from 'react';
import { LuUserCircle } from "react-icons/lu";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ROLE from '../common/Role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.role !== ROLE.ADMIN) {
            navigate("/");
        }
    }, [user, navigate]);

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            {/* Sidebar */}
            <aside className='bg-slate-200 h-72 w-full max-w-[320px] customShadow p-4 sticky top-0 '>
                {/* Profile Icon */}
                <div className='flex flex-col items-center text-center mb-4'>
                    <LuUserCircle className='text-8xl mb-2' />
                    <p className='capitalize text-lg font-semibold'>
                        {user?.name}
                    </p>
                </div>

                {/* Navigation Links */}
                <nav className='flex flex-col items-center space-y-2'>
                    <Link className='px-4 py-2 w-full text-center bg-white shadow-md rounded-lg hover:bg-slate-100' to={"all-users"}>
                        All Users
                    </Link>
                    <Link className='px-4 py-2 w-full text-center bg-white shadow-md rounded-lg hover:bg-slate-100' to={"all-products"}>
                        All Products
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className='w-full h-full p-4'>
                <Outlet />
            </main>
        </div>
    );
};

export default AdminPanel;
