import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Login as loginUser } from '../../redux/Auth/AuthService';
import { useDispatch, useSelector } from 'react-redux';
import { SetAlert } from '../../redux/Alert/AlertAction';
import { LoginSuccess } from '../../redux/Auth/AuthAction';
import swal from 'sweetalert';
import Alert from '../layouts/Alert';

const Login = (props) => {
  const [login, setLogin] = useState({});
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const handerInput = (e) =>
    setLogin({ ...login, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(login);
      swal({
        title: 'Good job!',
        text: 'Đăng nhập thành công!',
        icon: 'success',
      });
      dispatch(LoginSuccess(response));
    } catch (error) {
      if (error) {
        if (error.response.status === 400) {
          swal({
            title: 'Đăng nhập thất bại!',
            text: error.response.data.errors,
            icon: 'error',
          });
          return;
        }

        error.response.data.errors.forEach((error) =>
          dispatch(SetAlert(error.msg, 'danger')),
        );
      }
    }
  };
  //check đăng nhập
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <React.Fragment>
      <div>
        <Alert />
        <h1 className='large text-primary'>Sign In</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Sign into Your Account
        </p>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              onChange={(e) => handerInput(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={(e) => handerInput(e)}
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            defaultValue='Login'
          />
        </form>
        <p className='my-1'>
          Don't have an account? <Link to='register'>Sign Up</Link>
        </p>
      </div>
    </React.Fragment>
  );
};

Login.propTypes = {};

export default Login;
