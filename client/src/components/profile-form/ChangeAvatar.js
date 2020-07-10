import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './style/ProfileForm.css';
import { firebase } from '../../firebase';
const ChangeAvatar = ({ user, updateAvatar }) => {
  const cssAvatar = {
    width: '150px',
  };
  const file = useRef(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileImageOnchange = (e) => {
    const fileImg = e.target.files[0];
    if (!fileImg) {
      return;
    }
    uploadFileToFirebase(fileImg);
    let reader = new FileReader();
    reader.readAsDataURL(fileImg);

    reader.onloadend = function (e) {
      setImagePreview(reader.result);
    }.bind(this);
  };
  const uploadFileToFirebase = (fileImg) => {
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(fileImg.name);
    fileRef.put(fileImg).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((url) => {
        updateAvatar({ ...user, avatar: url });
      });
    });
  };
  useEffect(() => {
    setImagePreview(user.avatar);
  }, []);
  return (
    <div className='profile-top p-2'>
      <div className='round-img my-1' onClick={() => file.current.click()}>
        <img
          style={cssAvatar}
          className='round-img'
          src={imagePreview}
          alt=''
        />
        <div className='overlay'>
          <div className='text'>change</div>
        </div>
      </div>

      <h3 className='lead'>{user.name}</h3>
      <input
        accept='image/*'
        type='file'
        onChange={(e) => fileImageOnchange(e)}
        name='file'
        id='file'
        hidden
        ref={file}
      />
    </div>
  );
};

ChangeAvatar.propTypes = {
  user: PropTypes.object.isRequired,
  updateAvatar: PropTypes.func.isRequired,
};

export default ChangeAvatar;
