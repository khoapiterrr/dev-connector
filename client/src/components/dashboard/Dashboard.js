import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { GetMyProfile, getProfiles } from '../../redux/profile/ProfileAction';
import DashboardAction from './DashboardAction';
import Experience from './Experience';
import Education from './Education';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
const Dashboard = ({
  currentProfile,
  auth: { user },
  GetMyProfile,
  getAllProfiles,
  deleteAccount,
  history,
  match,
}) => {
  useEffect(() => {
    console.log(history, 'history');
    console.log(match, 'match');
    GetMyProfile();
  }, [GetMyProfile]);

  return (
    <React.Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user' /> Welcome {user && user.name}
      </p>
      {currentProfile !== null ? (
        <React.Fragment>
          <DashboardAction />
          {currentProfile.experience &&
            currentProfile.experience.length > 0 && (
              <Experience experience={currentProfile.experience} />
            )}
          {currentProfile.education && currentProfile.education.length > 0 && (
            <Education education={currentProfile.education} />
          )}

          <div className='my-2'>
            <button
              className='btn btn-danger'
              onClick={() => console.log('delte user')}>
              <i className='fas fa-user-minus' /> Delete My Account
            </button>
          </div>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to='/update-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  GetMyProfile: PropTypes.func,
  currentProfile: PropTypes.object,
  auth: PropTypes.shape({
    user: PropTypes.object,
  }),
};

const mapStateToProps = (state) => ({
  currentProfile: state.profile.myProfile,
  auth: state.auth,
});
const mapDispatchToProps = {
  getCurrentProfile: GetMyProfile,
  getAllProfiles: getProfiles,
};

export default connect(mapStateToProps, { GetMyProfile })(Dashboard);
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
