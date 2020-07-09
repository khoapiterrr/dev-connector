import React, { useState } from 'react';
import Alert from '../layouts/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { SetAlert } from '../../redux/Alert/AlertAction';
import { RegisterSuccess } from '../../redux/Auth/AuthAction';
import { Register as registerUser } from '../../redux/Auth/AuthService';
import swal from 'sweetalert';
import { Link, Redirect } from 'react-router-dom';
const Register = (props) => {
  const [formData, setformData] = useState({});
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { name, email, password, password2 } = formData;
  const handerInput = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(SetAlert('Mật khẩu không trùng khớp', 'danger'));
    }
    const newUser = { name, email, password };
    try {
      const response = await registerUser(newUser);
      swal({
        title: 'Good job!',
        text: 'Đăng kí thành công!',
        icon: 'success',
      });
      localStorage.setItem('token', response.token);
      dispatch(RegisterSuccess(response));
    } catch (error) {
      if (error) {
        if (error.response.status === 400) {
          swal({
            title: 'Lỗi!',
            text: 'Địa chỉ email đã tồn tại trong hệ thống!',
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
        <h1 className='large text-primary'>Sign Up</h1>
        <p className='lead'>
          <i className='fas fa-user' /> Create Your Account
        </p>
        <form className='form' onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Name'
              onChange={(e) => handerInput(e)}
              name='name'
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              onChange={(e) => handerInput(e)}
            />
            <small className='form-text'>
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              minLength={6}
              onChange={(e) => handerInput(e)}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Confirm Password'
              name='password2'
              onChange={(e) => handerInput(e)}
            />
          </div>
          <input
            type='submit'
            className='btn btn-primary'
            defaultValue='Register'
          />
        </form>
        <p className='my-1'>
          Already have an account? <Link to='/login'>Sign In</Link>
        </p>
      </div>
    </React.Fragment>
  );
};

Register.propTypes = {};

export default Register;
