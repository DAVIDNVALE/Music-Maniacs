import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { userContext } from '../context/userContext'

const Post = (props) => {

    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [yearReleased, setyearReleased] = useState()
    const [background, setBackground] = useState('')
    const [link, setLink] = useState('')
    const [errors, setErrors] = useState({})



    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/songs', {
            title,
            artist,
            yearReleased,
            background,
            link
        })
            .then((res) => {
                navigate("/home")
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            })
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
            <button><Link to={'/home'} className="buttons">Home</Link></button>
            <h1 className="nav-header-name">Music Maniac {user.username}</h1>
            <button><Link to={'/'} className='buttons'>Logout</Link></button>
            </div>

            <div className='line'><h1></h1></div>

            <h1>New Maniac Post</h1>
            
            <div className="new-post-box">
            <form onSubmit={submitHandler}>
                <div>
                    <h2>Song Title</h2>
                </div>
                <div>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Song Title..." />
                {
                    errors.title?
                    <p className="required-text">{errors.title.message}</p>:
                    null
                }
                </div>
                <div>
                    <h2>Artist</h2>
                </div>
                <div>
                <input type="text" value={artist} onChange={(e) => setArtist(e.target.value)} placeholder="Artist Name..." />
                {
                    errors.artist?
                    <p className="required-text">{errors.artist.message}</p>:
                    null
                }
                </div>
                <div>
                    <h2>Year Released</h2>
                </div>
                <div>
                <input type="number" value={yearReleased} onChange={(e) => setyearReleased(e.target.value)} placeholder="Year Released..." />
                {
                    errors.yearReleased?
                    <p className="required-text">{errors.yearReleased.message}</p>:
                    null
                }
                </div>
                <div>
                    <h2>Background</h2>
                    <p>(what does this song mean to you?)</p>
                </div>
                <div>
                <textarea type="text" value={background} onChange={(e) => setBackground(e.target.value)} placeholder="Background..." />
                {
                    errors.background?
                    <p className="required-text">{errors.background.message}</p>:
                    null
                } 
                </div>
                    <h2>Link</h2>
                <div>
                <input type="url" value={link} onChange={(e) => setLink(e.target.value)} placeholder="Link..."/>
                {
                    errors.link?
                    <p className="required-text">{errors.link.message}</p>:
                    null
                } 
                </div>
                <button>Create Post</button>
            </form>
            </div>
        </div>

    )}

    export default Post;