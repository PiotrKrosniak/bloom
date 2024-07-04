import React, { useState, useEffect } from 'react';
import { API, AUTH_TOKEN, SERVER_URL } from "../constants";
import { format } from 'date-fns';

const UserListPage = () => {
    const [userList, setUserList] = useState(null);
    const [stripePayments, setStripePayments] = useState(null);

    useEffect(() => {
        fetchData(`${API}/users?filters[role][$eq]=1`, setUserList);
        fetchData(`${SERVER_URL}/strapi-stripe/getProduct/0/5/name/asc`, setStripePayments);
    }, []);

    const fetchData = async (url, setter) => {
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": 'Bearer ' + AUTH_TOKEN
                }
            });
            const data = await response.json();
            if (data?.error) {
                const errorMessage = !data.error.details.errors ? data.error.message : data.error.details?.errors[0]?.message;
                console.error(errorMessage);
            } else {
                setter(data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex flex-col text-left w-full mb-12">
                        {userList && userList.length > 0 ? (
                            <div className="overflow-x-auto flex justify-center">
                                <table className="table-auto w-[1000px] border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100 border-b border-gray-300">
                                            <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
                                            <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Username</th>
                                            <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Email</th>
                                            <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Joining Date</th>
                                            <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Subscription</th>
                                            <th className="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Payment Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {userList.map((user, index) => {
                                            const subscription = stripePayments?.res.find(payment => payment.stripePayment.some(p => p.customerEmail === user.email));
                                            const matchedPayment = subscription?.stripePayment.find(p => p.customerEmail === user.email);
                                            const paymentCreatedAt = matchedPayment ? new Date(matchedPayment.createdAt) : null;

                                            return (
                                                <tr key={user.id} className="border-b hover:bg-gray-100">
                                                    <td className="px-4 py-2 text-sm text-gray-900">{index + 1}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">{user.email}</td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        {format(new Date(user.createdAt), 'dd-MM-yyyy HH:mm')}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        {subscription ? subscription.title : '-'}
                                                    </td>
                                                    <td className="px-4 py-2 text-sm text-gray-900">
                                                        {paymentCreatedAt ? format(paymentCreatedAt, 'dd-MM-yyyy HH:mm') : '-'}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-base text-gray-700">Loading...</p>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserListPage;
