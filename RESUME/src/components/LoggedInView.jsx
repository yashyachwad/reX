import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const LoggedInView = ({ setOpenAuthModel }) => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setOpenAuthModel(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center mb-4">
        <span className="text-white text-2xl font-bold">
          {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
        </span>
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Welcome back, {user?.name || 'User'}!
      </h3>
      <p className="text-gray-600 text-center mb-6">
        You are already logged in. If you want to create a new account, please logout first.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => {
            setOpenAuthModel(false);
            navigate('/dashboard');
          }}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
        >
          Go to Dashboard
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LoggedInView;
