import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../dashboard/Dashboard';
import AddEducation from '../profile-form/AddEducation';
import AddExperience from '../profile-form/AddExperience';
import ProfileForm from '../profile-form/ProfileForm';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
export const Routes = () => {
  return (
    <div className='container'>
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/add-experience' component={AddExperience} />
      <PrivateRoute exact path='/add-education' component={AddEducation} />
      <PrivateRoute exact path='/update-profile' component={ProfileForm} />
      <PrivateRoute exact path='/profiles' component={Profiles} />
      <PrivateRoute exact path='/profile/:id' component={Profile} />
    </div>
  );
};
