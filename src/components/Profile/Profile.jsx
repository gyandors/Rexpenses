import { useState, useContext } from 'react';
import axios from 'axios';

import ProfileForm from './ProfileForm';
import AuthContext from '../../context/AuthContext';

export default function Profile() {
  const [updateProfile, setUpdateProfile] = useState(false);

  const authCtx = useContext(AuthContext);

  return (
    <>
      <header>
        <div className="flex justify-between items-center bg-zinc-500 text-white p-4">
          <h1>Welcome {authCtx.displayName}</h1>

          <div className=" w-1/4 text-sm border rounded-3xl px-6 text-center">
            <i>
              {!updateProfile
                ? 'Your profile is incomplete.'
                : 'Your profile is 60% completed. A complete profile has higher chances of landing a job.'}
            </i>{' '}
            {!updateProfile && (
              <button type="button" onClick={() => setUpdateProfile(true)}>
                Complete now
              </button>
            )}
          </div>
          <button onClick={() => authCtx.logout()}>Logout</button>
        </div>
      </header>
      <main className="mt-2">
        <button
          className="border px-[5px] py-[2px]"
          onClick={() => {
            console.log('click');
            axios
              .post(
                'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBg6MckZid33tefjT5QYDu_ZX5ly5OE3LQ',
                {
                  requestType: 'VERIFY_EMAIL',
                  idToken: authCtx.idToken,
                }
              )
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }}
        >
          Verify email
        </button>
        {updateProfile && (
          <ProfileForm onCloseForm={() => setUpdateProfile(false)} />
        )}
      </main>
    </>
  );
}
