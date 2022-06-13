import React, { useState, useEffect } from 'react';
import { VscLoading } from "react-icons/vsc";
var axios = require('axios');

export default function Register({ setIsLoggedIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [respoon, setRespoon] = useState('');
  const [login, setLogin] = useState(true);

  useEffect(() => {
    setRespoon('');
  }, [login]);

  const submitLogin = async () => {
    const data = {
      email: email,
      password: password
    };
    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/user/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        const token = response.headers['auth-token'];
        setRespoon(response.data);
        localStorage.setItem("Auth-Token", token);
        setIsLoggedIn(true);
      })
      .catch(function (error) {
        console.log(error.toJSON().message);
      });
  }

  const submitRegister = async () => {
    const data = {
      name: name,
      email: email,
      password: password
    };
    var config = {
      method: 'post',
      url: 'http://localhost:5000/api/user/register',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        setRespoon(response.data)
      })
      .catch(function (error) {
        setRespoon(error.toJSON().message)
      });
  }

  const handleSubmit = e => {
    e.preventDefault();
    setRespoon("loading")
    if (login) return submitLogin(e);
    return submitRegister(e);
  }

  return (

    <div className="relative mt-20 max-w-md pb-10 px-14 pt-6 mx-auto bg-slate-700 rounded-xl border border-blue-50 shadow-md shadow-white flex flex-col items-stretch text-center">
      <div>
        <div className="text-3xl font-medium text-teal-50">{login && <span>Login</span>}{!login && <span >Register</span>}</div>
        <p className="text-slate-100 mb-6">{login && <span>Login to your account.</span>}{!login && <span>Create a new account.</span>}</p>

        <form className="flex flex-col items-stretch gap-1 min-w-full">
          {/* REGISTER NAME FIELD */}
          {!login && <><label className="text-slate-50 text-left" htmlFor="name">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 mb-2 rounded-md text-black" type="text" name="name" />
            {respoon.includes("name") && <div className='text-xs text-left -mt-2 italic text-red-400 w-full'>{respoon}</div>}</>}


          {/* EMAIL FIELD */}
          <label className="text-slate-50 text-left " htmlFor="email">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 p-2 rounded-md text-black" type="email" name="email" />
          {respoon.includes("email") && <div className='text-xs text-left -mt-2 italic text-red-400 w-full'>{respoon}</div>}

          {/* PASSWORD FIELD */}
          <label className="text-slate-50 text-left" htmlFor="password">Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-2 rounded-md text-black" type="text" name="password" />
          {respoon.includes("password") && <div className='text-xs text-left -mt-2 italic text-red-400 w-full'>{respoon}</div>}
          <div className='mt-2 flex items-center justify-end'>

            {/* BUTTON */}
            {respoon.includes("User") && <div className='text-md text-left -mt-2 text-red-400 w-full'>{respoon} 🧐</div>}
            <div onClick={() => setLogin((prev) => !prev)} className='hover:underline cursor-pointer pr-2 text-white font-extralight opacity-80 hover:opacity-90'>{login ? "Register?" : "Login?"}</div>
            <button className="hover:brightness-110 cursor-pointer transition-all border border-sky-300 rounded px-4 py-2 bg-sky-400" type="submit" onClick={handleSubmit}>{respoon === "loading" && <VscLoading className='inline mr-2 animate-spin text-lg' />}{login ? "Login" : "Register"}</button>
          </div>
        </form>
      </div>

      {login && <p className="hover:underline hover:opacity-80 cursor-pointer text-sm opacity-50 absolute bottom-0 left-0 p-3 text-teal-50">Forgot password?</p>}
    </div>

  )
}