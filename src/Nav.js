function Nav({ nav, setNav, setLogin, loggedIn, setLoggedIn }) {
const handleLogout = () => {
    localStorage.removeItem("Auth-Token");
    setLoggedIn(false);
}

    return (
        <nav className="flex justify-between items-center w-100 h-12 bg-slate-100 px-5">
            <button onClick={() => setNav('dashboard')} className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">SURFTURD</button>
            <div>
                {!loggedIn && <> <button onClick={() => setLogin('login')}>Login</button> | <button onClick={() => setNav('register')}> Register </button></>}
                {loggedIn && <> <button className={nav === "profile" ? "text-blue-500 cursor-auto" : ""} onClick={() => setNav('profile')}>Profile</button> | <button onClick={handleLogout}> Logout </button></>}
            </div>

        </nav>
    );
}

export default Nav;