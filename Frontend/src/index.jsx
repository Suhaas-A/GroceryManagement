import { useState, useEffect } from 'react'
import axios from '../node_modules/axios/index'

function index() {
    const [users, setUsers] = useState([]);

    const fetchAPI = async () => {
        const response = await axios.get('http://127.0.0.1:5000/api/users');
        setUsers(response.data.users);
    };

    useEffect(() => {
        fetchAPI();
    }, [])

    return (
        <div>
            <p>
                {users.map((user, index) => (
                    <p key={index}>{user}</p>
                ))}
            </p>
        </div>
    )
}