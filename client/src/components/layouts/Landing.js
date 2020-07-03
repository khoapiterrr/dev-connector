import React from 'react';
import { Link } from 'react-router-dom';
import Api from '../../networking/api';
export const Landing = () => {
  const res = async () => {
    try {
      const data = await Api.get('/profile/me');
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Developer Connector</h1>
            <p className='lead'>
              Create a developer profile/portfolio, share posts and get help
              from other developers
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-primary'>
                Sign Up
              </Link>
              <Link onClick={res} className='btn btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
