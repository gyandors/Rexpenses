/* eslint-disable react/prop-types */
import { useRef } from 'react';

import { useSelector } from 'react-redux';

import axios from 'axios';

export default function ProfileForm(props) {
  const nameRef = useRef();
  const photoRef = useRef();

  const jwtToken = useSelector((state) => state.authState.jwtToken);

  function handleFormSubmit(event) {
    event.preventDefault();

    axios
      .post(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ',
        {
          idToken: jwtToken,
          displayName: nameRef.current.value,
          photoUrl: photoRef.current.value,
        }
      )
      .then((response) => {
        props.onUpdateProfile(nameRef.current.value, photoRef.current.value);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <form
      className="w-full flex flex-col gap-4 p-2"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-2">
        <label
          className=" block text-sm font-semibold dark:text-white"
          htmlFor="name"
        >
          Full Name
        </label>
        <input
          className="border rounded border-indigo-700 p-1 mt-2 w-full"
          type="text"
          id="name"
          defaultValue={props.name}
          ref={nameRef}
        />
      </div>

      <div className="mb-2">
        <label
          className="block text-sm font-semibold dark:text-white"
          htmlFor="photo"
        >
          Profile Photo URL
        </label>
        <input
          className="border rounded border-indigo-700 p-1 mt-2 w-full"
          type="url"
          id="photo"
          defaultValue={props.photo}
          ref={photoRef}
        />
      </div>

      <div>
        <button
          className="px-2 py-1 border rounded bg-green-600 text-white hover:bg-green-500"
          type="submit"
        >
          Update
        </button>

        <button
          className="ml-2 px-2 py-1 border rounded bg-red-600 text-white hover:bg-red-500"
          type="cancel"
          onClick={() => {
            props.onCloseForm();
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
