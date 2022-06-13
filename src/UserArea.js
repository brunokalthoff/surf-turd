import React, { useState, useEffect } from 'react';
import Profile from "./Profile";
import NewTurd from "./NewTurd";

function UserArea() {
    const [show, setShow] = useState('profile');
    useEffect(() => {
        
    }, []);
    return (
        <>
            {show === "profile" && <Profile setShow={setShow} />}
            {show === "newturd" && <NewTurd setShow={setShow} />}
        </>
    );
}

export default UserArea;