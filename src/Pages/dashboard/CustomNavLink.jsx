import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const CustomNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    activeClassName="text-primary font-bold bg-gray-300"
    className="flex items-center space-x-2 p-2 rounded hover:bg-gray-200"
  >
    {children}
  </NavLink>
);

export default CustomNavLink;
