import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/Auth/AuthAction';
export const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'> Developers</Link>
      </li>
      <li>
        <Link to='/posts'> Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={() => dispatch(logout())} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'> Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code' /> DevConnector
        </Link>
      </h1>
      {!loading && (
        <React.Fragment>
          {isAuthenticated ? authLinks : guestLinks}
        </React.Fragment>
      )}
    </nav>
  );
};
