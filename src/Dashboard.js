import { useState, useEffect } from 'react';

function Dashboard() {
    const [turds, setTurds] = useState([]);
    useEffect(() => {
        var axios = require('axios');

        var config = {
            method: 'get',
            url: 'http://localhost:5000/api/dashboard/',
            headers: {},
        };

        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                setTurds(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);
    return (
        <div className="flex items-center column flex-col space-y-8 mt-10">
            {turds.map((turd, i) => {
                return <div key={i}>
                    <div className='font-bold text-white text-xl'>{turd.title}</div>
                    <div className='font-thin text-lg text-white'>{turd.body}</div>
                    <div className='text-blue-300 hover:underline cursor-pointer'>{turd.userName}</div>
                </div>
            })}
        </div>
    );
}

export default Dashboard;