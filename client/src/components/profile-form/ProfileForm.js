import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-animated-css';
import { GetMyProfile, updateProfile } from '../../redux/profile/ProfileAction';
import { updateUser } from '../../redux/Auth/AuthAction';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Alert from '../layouts/Alert';
import ChangeAvatar from './ChangeAvatar';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubUserName: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
};

const ProfileForm = ({
  currentProfile: { myProfile, loading },
  GetMyProfile,
  updateProfile,
  updateUser,
}) => {
  const [formData, setFormData] = useState(initialState);
  const [infoUser, setinfoUser] = useState({});

  const updateAvatar = (info) => {
    setinfoUser(info);
  };
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  const [socialAnimation, setsocialAnimation] = useState(displaySocialInputs);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubUserName,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const changeDisplaySocial = () => {
    let tmp = !displaySocialInputs;
    toggleSocialInputs(tmp);
    setTimeout(() => setsocialAnimation(tmp), 500);
  };
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      updateProfile(formData);
      updateUser(infoUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!myProfile) GetMyProfile();
    if (!loading && myProfile) {
      const profileData = { ...initialState };
      for (const key in myProfile) {
        if (key in profileData) profileData[key] = myProfile[key];
      }
      for (const key in myProfile.social) {
        if (key in profileData) profileData[key] = myProfile.social[key];
      }
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      setFormData(profileData);
    }
  }, [GetMyProfile, myProfile, loading]);

  return (
    <React.Fragment>
      <div>
        <h1 className='large text-primary'>Update Your Profile</h1>
        <Alert />
        <p className='lead'>
          <i className='fas fa-user' /> Let's get some information to make your
          profile stand out
        </p>
        {myProfile ? (
          <ChangeAvatar
            updateAvatar={(e) => updateAvatar(e)}
            user={myProfile.userId}
          />
        ) : null}

        <small>* = required field</small>
        <form className='form' onSubmit={(e) => handleSubmit(e)}>
          <div className='form-group'>
            <select
              name='status'
              defaultValue={status}
              onChange={handleInputChange}>
              <option value={0}>* Select Professional Status</option>
              <option value='Developer'>Developer</option>
              <option value='Junior Developer'>Junior Developer</option>
              <option value='Senior Developer'>Senior Developer</option>
              <option value='Manager'>Manager</option>
              <option value='Student or Learning'>Student or Learning</option>
              <option value='Instructor'>Instructor or Teacher</option>
              <option value='Intern'>Intern</option>
              <option value='Other'>Other</option>
            </select>
            <small className='form-text'>
              Give us an idea of where you are at in your career
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Company'
              name='company'
              defaultValue={company}
              onChange={handleInputChange}
            />
            <small className='form-text'>
              Could be your own company or one you work for
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Website'
              name='website'
              defaultValue={website}
              onChange={handleInputChange}
            />
            <small className='form-text'>
              Could be your own or a company website
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Location'
              name='location'
              defaultValue={location}
              onChange={handleInputChange}
            />
            <small className='form-text'>
              City &amp; state suggested (eg. Boston, MA)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Skills'
              name='skills'
              defaultValue={skills}
              onChange={handleInputChange}
            />
            <small className='form-text'>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Github Username'
              name='githubUserName'
              defaultValue={githubUserName}
              onChange={handleInputChange}
            />
            <small className='form-text'>
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className='form-group'>
            <textarea
              placeholder='A short bio of yourself'
              name='bio'
              defaultValue={bio}
              onChange={handleInputChange}
            />
            <small className='form-text'>Tell us a little about yourself</small>
          </div>
          <div className='my-2'>
            <button
              onClick={() => changeDisplaySocial()}
              type='button'
              className='btn btn-light'>
              Add Social Network Links
            </button>
            <span>Optional</span>
          </div>

          {displaySocialInputs && (
            <Animated
              animationIn='bounceIn'
              animationOut='bounceOut'
              animationInDuration={800}
              animationOutDuration={800}
              isVisible={socialAnimation}>
              <React.Fragment>
                <div className='form-group social-input'>
                  <i className='fab fa-twitter fa-2x' />
                  <input
                    type='text'
                    placeholder='Twitter URL'
                    name='twitter'
                    defaultValue={twitter}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group social-input'>
                  <i className='fab fa-facebook fa-2x' />
                  <input
                    type='text'
                    placeholder='Facebook URL'
                    name='facebook'
                    defaultValue={facebook}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group social-input'>
                  <i className='fab fa-youtube fa-2x' />
                  <input
                    type='text'
                    placeholder='YouTube URL'
                    name='youtube'
                    defaultValue={youtube}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group social-input'>
                  <i className='fab fa-linkedin fa-2x' />
                  <input
                    type='text'
                    placeholder='Linkedin URL'
                    name='linkedin'
                    defaultValue={linkedin}
                    onChange={handleInputChange}
                  />
                </div>
                <div className='form-group social-input'>
                  <i className='fab fa-instagram fa-2x' />
                  <input
                    type='text'
                    placeholder='Instagram URL'
                    name='instagram'
                    defaultValue={instagram}
                    onChange={handleInputChange}
                  />
                </div>
              </React.Fragment>
            </Animated>
          )}

          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </div>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  currentProfile: state.profile,
});
ProfileForm.propTypes = {
  GetMyProfile: PropTypes.func,
  currentProfile: PropTypes.object,
  updateProfile: PropTypes.func,
  updateUser: PropTypes.func,
};

export default connect(mapStateToProps, {
  GetMyProfile,
  updateProfile,
  updateUser,
})(ProfileForm);
