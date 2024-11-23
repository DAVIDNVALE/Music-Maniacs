import React, { useContext, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userContext } from '../context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Post = () => {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [yearReleased, setYearReleased] = useState('');
    const [background, setBackground] = useState('');
    const [link, setLink] = useState('');
    const [errors, setErrors] = useState({});

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
                navigate("/home");
            })
            .catch((err) => {
                setErrors(err.response.data.errors);
            });
    };

    const { user, setUser } = useContext(userContext);

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div className='nav'>
                <button><Link to='/home' className="buttons">Home</Link></button>
                <h1 className="nav-header-name">Music Maniac {user.username}</h1>
                <button onClick={logout} className='buttons'>Logout</button>
            </div>

            <div className='line'><h1></h1></div>

            <h1 className="mb-4">Create a New Maniac Post</h1>

            <form onSubmit={submitHandler} className="bg-light p-4 rounded shadow-sm">
                {/* Song Title */}
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Song Title</label>
                    <input
                        type="text"
                        id="title"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter song title"
                    />
                    {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                </div>

                {/* Artist */}
                <div className="mb-3">
                    <label htmlFor="artist" className="form-label">Artist</label>
                    <input
                        type="text"
                        id="artist"
                        className={`form-control ${errors.artist ? 'is-invalid' : ''}`}
                        value={artist}
                        onChange={(e) => setArtist(e.target.value)}
                        placeholder="Enter artist name"
                    />
                    {errors.artist && <div className="invalid-feedback">{errors.artist.message}</div>}
                </div>

                {/* Year Released */}
                <div className="mb-3">
                    <label htmlFor="yearReleased" className="form-label">Year Released</label>
                    <input
                        type="number"
                        id="yearReleased"
                        className={`form-control ${errors.yearReleased ? 'is-invalid' : ''}`}
                        value={yearReleased}
                        onChange={(e) => setYearReleased(e.target.value)}
                        placeholder="Enter year released"
                    />
                    {errors.yearReleased && <div className="invalid-feedback">{errors.yearReleased.message}</div>}
                </div>

                {/* Background */}
                <div className="mb-3">
                    <label htmlFor="background" className="form-label">Background</label>
                    <textarea
                        id="background"
                        className={`form-control ${errors.background ? 'is-invalid' : ''}`}
                        value={background}
                        onChange={(e) => setBackground(e.target.value)}
                        placeholder="What does this song mean to you?"
                        rows="4"
                    />
                    {errors.background && <div className="invalid-feedback">{errors.background.message}</div>}
                </div>

                {/* Link */}
                <div className="mb-3">
                    <label htmlFor="link" className="form-label">Link</label>
                    <input
                        type="url"
                        id="link"
                        className={`form-control ${errors.link ? 'is-invalid' : ''}`}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter a link to the song"
                    />
                    {errors.link && <div className="invalid-feedback">{errors.link.message}</div>}
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-success">Create Post</button>
                </div>
            </form>
        </div>
    );
};

export default Post;

