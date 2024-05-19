import { useState } from 'react';

import ProfileForm from './ProfileForm';

export default function Profile() {
  const [updateProfile, setUpdateProfile] = useState(false);

  function handleCloseForm() {
    setUpdateProfile(false);
  }

  return (
    <>
      <header>
        <div>
          <h1>Welcome to Expense Tracker</h1>
          <div>
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
        </div>
      </header>
      {updateProfile && <ProfileForm onCloseForm={handleCloseForm} />}
    </>
  );
}
