/* eslint-disable react/prop-types */
import { useRef, useContext, useEffect, useCallback, useState } from 'react';

import axios from 'axios';

import AuthContext from '../../context/AuthContext';

export default function ProfileForm(props) {
  const nameRef = useRef();
  const photoRef = useRef();

  const authCtx = useContext(AuthContext);

  const [editing, setEditing] = useState(false);

  const [emailVerified, setEmailVerified] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ',
        {
          method: 'POST',
          body: JSON.stringify({ idToken: authCtx.idToken }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setEmailVerified(data.users[0].emailVerified);

        if (data.users[0].displayName) {
          nameRef.current.value = data.users[0].displayName;
        } else {
          nameRef.current.value = '';
        }
        if (data.users[0].photoUrl) {
          photoRef.current.value = data.users[0].photoUrl;
        } else {
          photoRef.current.value = '';
        }
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      alert(error.message);
    }
  }, [authCtx.idToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleFormSubmit(event) {
    event.preventDefault();

    setEditing(true);

    if (editing) {
      axios
        .post(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ',
          {
            idToken: authCtx.idToken,
            displayName: nameRef.current.value,
            photoUrl: photoRef.current.value,
          }
        )
        .then((response) => {
          console.log(response);
          setEditing(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <>
      {!emailVerified && (
        <button
          className="border text-white   rounded bg-cyan-900 hover:bg-cyan-700 px-[5px] py-[2px]"
          onClick={() => {
            axios.post(
              'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ',
              {
                requestType: 'VERIFY_EMAIL',
                idToken: authCtx.idToken,
              }
            );
          }}
        >
          Verify email
        </button>
      )}
      <form
        className=" flex flex-col gap-4 max-w-96 m-auto mt-4 p-2 border-2"
        onSubmit={handleFormSubmit}
      >
        <h1 className=" text-xl font-bold">Update Profile</h1>

        <div className=" mb-2">
          <label className=" block text-sm font-semibold" htmlFor="name">
            Full Name:
          </label>
          <input
            className="border rounded border-indigo-700 p-[3px] mt-1 w-full"
            type="text"
            id="name"
            ref={nameRef}
            disabled={!editing}
          />
        </div>

        <div className=" mb-2">
          <label className=" block text-sm font-semibold" htmlFor="photo">
            Profile Photo URL:
          </label>
          <input
            className="border rounded border-indigo-700 p-[3px] mt-1 w-full"
            type="url"
            id="photo"
            ref={photoRef}
            disabled={!editing}
          />
        </div>

        <div>
          <button className="border px-[5px] py-[2px]" type="submit">
            {!editing ? 'Edit' : 'Update'}
          </button>

          {editing && (
            <button
              className=" ml-[5px] border px-[5px] py-[2px]"
              type="cancel"
              onClick={() => {
                setEditing(false);
                props.onCloseForm();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </>
  );
}
