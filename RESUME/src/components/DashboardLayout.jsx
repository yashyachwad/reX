import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const DashboardLayout = ({ activeMenu, children }) => {
  const { user, loading } = useContext(UserContext);
  const navigate = useNavigate();

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!user) {
    navigate('/'); // redirect to landing page or login
    return null;
  }

  return (
    <div>
      <Navbar activeMenu={activeMenu} />
      <div className="container mx-auto pt-4 pb-4 ">{children}</div>
    </div>
  );
};

export default DashboardLayout;
