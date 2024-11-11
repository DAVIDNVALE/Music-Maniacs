import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../context/userContext'
import logo from '../assets/music-logo.jpeg'

const Register = (props) => {

    const {user, setUser} =useContext(userContext)
    const navigate = useNavigate()
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    
    
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', {username, email, password, confirmPassword}, {withCredentials:true})
        .then((res) => {
            setUser(res.data);
            navigate("/home")
        })
        .catch((err) => {
            alert(err.response.data.message);
        })
    }
    
    return (
        <div>

            <div className="login-nav"> 
                <div className="login-nav-logo">
                    <img className='logo' src={logo} alt="Light Bulb Logo" />
                </div>
                <div className="login-nav-title">
                     <h1>Music Maniacs</h1>
                </div>
            </div>

            <form onSubmit={submitHandler} className="register-center">
                <h1>Register</h1>
                <div>
                    <label>Username</label>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button>Register</button>
                <Link to="/">Already have an account?</Link>
            </form>
        </div>
    )}

    export default Register;