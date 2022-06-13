import React, { useState } from 'react';
import { VscLoading } from "react-icons/vsc";
import axios from 'axios';
import OutsideClickHandler from 'react-outside-click-handler';

export default function Login({ setNav, setLogin, setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [respoon, setRespoon] = useState('');

  const submitLogin = async e => {
    e.preventDefault();
    setRespoon("loading");
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
        if (response.status !== 200) return setRespoon(response.data);
        console.log(response)
        const token = response.headers['auth-token'];
        localStorage.setItem("Auth-Token", token);
        setLogin(false);
        setLoggedIn(true);
        setNav("profile");
      })
      .catch(function (error) {
        setRespoon(error.message);
      });
  }

  return (
    <OutsideClickHandler onOutsideClick={() => {
      setLogin(false);
    }}>
      <div className="absolute opacity-98 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-20 max-w-md pb-10 px-14 pt-6 mx-auto bg-slate-700 rounded-xl border border-blue-50 flex flex-col items-stretch text-center">
        <div>
          <div className="text-3xl font-medium text-teal-50">Login</div>
          <p className="text-slate-100 mb-6">Login to your account.</p>

          <form className="flex flex-col items-stretch gap-1 min-w-full">

            {/* EMAIL FIELD */}
            <label className="text-slate-50 text-left " htmlFor="email">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} className="mb-2 p-2 rounded-md text-black" type="email" name="email" />
            {respoon.includes("email") && <div className='text-xs text-left -mt-2 italic text-red-400 w-full'>{respoon}</div>}
            {respoon.includes("wrong") && <div className='text-xs text-left -mt-2 italic text-red-400 w-full'>{respoon}</div>}

            {/* PASSWORD FIELD */}
            <label className="text-slate-50 text-left" htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 mb-2 rounded-md text-black" type="text" name="password" />
            {respoon.includes("password") && <div className='text-xs text-left -mt-2 italic text-red-400 w-full'>{respoon}</div>}
            <div className='mt-2 flex items-center justify-end'>

              {/* BUTTON */}
              {respoon.includes("User") && <div className='text-md text-left -mt-2 text-red-400 w-full'>{respoon} 🧐</div>}
              <button className="hover:brightness-110 cursor-pointer transition-all border border-sky-300 rounded px-4 py-2 bg-sky-400" type="submit" onClick={submitLogin}>{respoon === "loading" && <VscLoading className='inline mr-2 animate-spin text-lg' />}Login</button>
            </div>
          </form>
        </div>

        <p className="hover:underline hover:opacity-80 cursor-pointer text-sm opacity-50 absolute bottom-0 left-0 p-3 text-teal-50">Forgot password?</p>
      </div>
    </OutsideClickHandler>

  )
}