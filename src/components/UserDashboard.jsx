import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser, getUserRole } from "../userActionHelper";

const UserDashboard = ({ authenticated, setCurrentRole }) => {
  useEffect(() => {
    if (authenticated) {
      const user = getUser();
      getUserRole(user?.id).then(roleId => {
        console.log('User role ID:', roleId);
        setCurrentRole(roleId);
      });
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Welcome to the dashboard!</h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Checkout HomePage for the subscription.</p>
          </div>
          <div className="flex lg:w-2/3 w-full sm:flex-row  mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
            <a className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              href="/">Home</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
