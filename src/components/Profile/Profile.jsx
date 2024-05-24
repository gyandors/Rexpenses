import { useState } from 'react';

import ProfileForm from './ProfileForm';

export default function Profile() {
  const [updateProfile, setUpdateProfile] = useState(false);

  return (
    <>
      <section>
        <div className="flex justify-between items-center bg-zinc-500 text-white p-4">
          <h1>Welcome</h1>

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
        </div>
      </section>
      <div className="mt-2">
        {updateProfile && (
          <ProfileForm onCloseForm={() => setUpdateProfile(false)} />
        )}
      </div>
    </>
  );
}
