import { useState, useEffect } from 'react';
var axios = require('axios');

function Profile() {
  const [userData, setUserData] = useState(null);
  const [userTurds, setUserTurds] = useState(null);

  useEffect(() => {
    var config = {
      method: 'get',
      url: 'http://localhost:5000/api/user/profile',
      headers: {
        'Auth-Token': localStorage.getItem('Auth-Token'),
      },
    };
    axios(config)
      .then(function (response) {
        console.log(response.data)
        setUserData(response.data[0]);
        setUserTurds(response.data[1])
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className='m-8 text-6xl text-white'>Profile</div>
      {userData &&
      <div className='border border-white rounded-xl w-fit'>
      <div className='m-8 text-sm text-white' >Name: {userData.name}</div>
      <div className='m-8 text-sm text-white' >Email: {userData.email}</div>
      <div className='m-8 text-sm text-white' >Account since: {userData.createdAt}</div>
      </div>
      }
      {userTurds && <div className='m-8 text-sm text-white'>{userTurds[0]._id}</div>}

    </>
  );
}

export default Profile;