import { useState } from 'react'
import { api } from '../App';
import { useNavigate } from "react-router-dom";

export default function Login({ setToken, username, setUsername, setCart, users }) {
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${api}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            });

            const result = await response.json();
            setToken(result.token)

            localStorage.setItem('currentuser', JSON.stringify(username))

            // if username changes, change the cart to the logged in user
            // also set cart when you add items to the cart
            const localCart = localStorage.getItem(username) ? JSON.parse(localStorage.getItem(username)) : []
            setCart(localCart)

            alert(`Welcome, ${username}!`)

            navigate('/')

        } catch (error) {

            const confirmedUsername = users.find(user => user.username === username)
            const confirmedPassword = users.find(user => user.password === password)

            if (!confirmedUsername || !confirmedPassword) alert('Wrong username and/or password.')
            if (username.length === 0 || password.length === 0) alert('Username or password cannot be empty.')

            console.error(error)
        }
    }

    return (
        <>
            <h1>Log in</h1>
            <br />
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <label className='login'>
                        Username: <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
                    </label>
                    <br />
                    <label className='login'>
                        Password: <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    </label>
                    <br /> <br />
                    <button id='lbutton'>Submit</button>
                </form>
            </div>
        </>
    )
}

// test user
// username: jimmie_k
// password: klein*#%*

// test user 2
// username: donero
// password: ewedon

// test user 3
// username: david_r
// password: 3478*#54