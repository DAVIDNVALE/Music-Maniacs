import axios from 'axios'
import React, {useEffect, useState, useContext} from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { userContext } from '../context/userContext'

const Details = (props) => {


    const {id} = useParams();
    const navigate = useNavigate()
    const [song, setSong] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8000/api/songs/${id}`)
        .then((res) => {
            setSong(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])


    const deleteSong = (id) => {
        axios.delete(`http://localhost:8000/api/songs/${id}`)
        .then(() => navigate("/home"))
        .catch((err) => console.log(err))
    }


    const {user, setUser} =useContext(userContext)
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, {withCredentials:true})  
            .then(() => {
                navigate("/")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div>
            <div className='nav'>
            <button><Link to={'/home'} className='buttons'>Home</Link></button>
            <h1 className='nav-header-name'>Music Maniac {user.username}</h1>
            <button><Link to={'/'} className='buttons'>Logout</Link></button>
            </div>

            <div className='line'><h1></h1></div>

            <h1 className='details-page-name'>Maniacs Deets</h1>

            <div className='details-post-box'>
                <h2>{song.title}</h2>
                <h2>{song.artist}</h2>
                <h2>{song.yearReleased}</h2>
                <h2>"{song.background}"</h2>
                <button onClick={() => deleteSong(song._id)}>Delete Post</button>
            </div>
        </div>

    )}

export default Details;``