import axios from 'axios'
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'

const Home = (props) => {


    const [songs, setSongs] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/songs')
        .then((res) => {
            setSongs(res.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])


    const {user, setUser} =useContext(userContext)
    const navigate = useNavigate()
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
            <button><Link to={'/post'} className='buttons'>Add Post</Link></button>
            <h1 className='nav-header-name'>Music Maniac {user.username}</h1>
            <button onClick={logout}>Logout</button>
            </div>

            <div className='line'><h1></h1></div>

            <h1 className='page-name'>Maniacs Post</h1>



            {
                songs.map((song) => (
                    <div key={song._id} className='home-post-box'>
                        <div>
                        <p className='home-user-font'>{user.username}'s Post</p>
                        </div>
                        <p className='home-font text-success' >Song Title: {song.title}</p>
                        <p className='home-font'>Artist: {song.artist}</p>
                        <p className='home-font'>Year Released: {song.yearReleased}</p>
                        <div className='home-post-box-br'>
                        <p className='home-font'>"{song.background}"</p>
                        </div>
                        <div>
                        <Link to={song.link}>{song.link}</Link>
                        </div>
                        <button className='home-bt'><Link to={`/update/song/${song._id}`} className='buttons'>Edit Post</Link></button>
                        <button className='home-bt'><Link to={`/details/song/${song._id}`} className='buttons'>Details</Link></button>
                    </div>
                ))
            }

        </div>

    )}

    export default Home;