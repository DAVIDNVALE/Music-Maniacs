import React, { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../context/userContext'
import logo from '../assets/music-logo.jpeg'

const Login = (props) => {

    const {user, setUser} =useContext(userContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');




    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {email,password}, {withCredentials:true})
            .then((res) => {
                setUser(res.data);
                navigate("/home")
            })
            .catch((err) => {
                console.log(err);
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
                 <h1>Music Maniacs Login</h1>
                </div>
            </div>

            <form onSubmit={submitHandler} className="login-center" >
                <div className="login-email">
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button>Login</button>
                <Link to="/register">Don't have an account?</Link>
            </form>
        </div>
    )}


    export default Login;