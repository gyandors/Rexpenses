/* eslint-disable react/prop-types */
import { useRef, useContext } from 'react';

import axios from 'axios';

import AuthContext from '../../context/AuthContext';

export default function ProfileForm(props) {
  const nameRef = useRef();
  const photoRef = useRef();

  const authCtx = useContext(AuthContext);

  function handleFormSubmit(event) {
    event.preventDefault();

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ',
        {
          idToken: authCtx.token,
          displayName: nameRef.current.value,
          photoUrl: photoRef.current.value,
        }
      )
      .then((response) => {
        console.log(response);
        props.onCloseForm();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Update Profile</h1>

      <label htmlFor="name">Full Name:</label>
      <input type="text" id="name" ref={nameRef} />

      <label htmlFor="photo">Profile Photo URL:</label>
      <input type="url" id="photo" ref={photoRef} />

      <button type="submit">Update</button>
      <button type="cancel" onClick={() => props.onCloseForm()}>
        Cancel
      </button>
    </form>
  );
}
