// import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
// import UserArea from "./UserArea";
import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import Nav from "./Nav";
import Profile from "./Profile";
import axios from "axios";

function App() {
    const [nav, setNav] = useState('dashboard');
    const [login, setLogin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('Auth-Token');
        if (!token) return
        var config = {
            method: 'get',
            url: 'http://localhost:5000/api/user/isloggedin',
            headers: {
                'Auth-Token': token,
            },
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setLoggedIn(true);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);


    useEffect(() => {
        if (!loggedIn) setNav("dashboard");
    }, [loggedIn]);

    return (
        <div className="relative">
            <Nav nav={nav} setNav={setNav} setLogin={setLogin} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
            {nav === "dashboard" && <Dashboard />}
            {login && <Login setLogin={setLogin} setNav={setNav} setLoggedIn={setLoggedIn} />}
            {nav === "register" && <Register />}
            {nav === "profile" && <Profile />}
        </div>
    );
}

export default App;