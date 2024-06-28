import React from 'react';
import { getUser } from '../userActionHelper';
const UserDashboard = () => {
    const user = getUser();
    return (
        <div className="container mx-auto p-4">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto">
                    <div className="flex flex-col text-center w-full mb-12">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Thank You for the purchase!</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Your order has been placed successfully, the reciept will be send to you email address {user ? user?.email : ""}</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserDashboard;
