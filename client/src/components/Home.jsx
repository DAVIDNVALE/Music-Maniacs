import axios from 'axios';
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../context/userContext';

const Home = () => {
    const [songs, setSongs] = useState([]);
    const { user, setUser } = useContext(userContext);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/songs')
            .then((res) => {
                setSongs(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then(() => {
                navigate("/");
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="home-container">
            <nav className="navbar">
                <div className="navbar-content">
                    <button className="add-post-button">
                        <Link to={'/post'} className="link">Add Post</Link>
                    </button>
                    <h1 className="navbar-title">Music Maniac {user.username}</h1>
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </nav>

            <h2 className="posts-heading">Maniac's Posts</h2>

            <div className="songs-container">
                {songs.map((song) => (
                    <div key={song._id} className="song-card">
                        <div className="card-body">
                            <h6 className="username-post-heading">
                                <span>{user.username}'s</span> Post
                            </h6>
                            <h5 className="song-title">{song.title}</h5>
                            <h6 className="song-artist">Artist: {song.artist}</h6>
                            <p className="song-year">Year Released: {song.yearReleased}</p>
                            <blockquote className="song-background">
                                <p>"{song.background}"</p>
                            </blockquote>
                            <p className="song-link">
                                <strong>Link:</strong> 
                                <a href={song.link} target="_blank" rel="noopener noreferrer">{song.link}</a>
                            </p>

                            <div className="action-buttons">
                                <button className="edit-button">
                                    <Link to={`/update/song/${song._id}`} className="link">Edit Post</Link>
                                </button>
                                <button className="details-button">
                                    <Link to={`/details/song/${song._id}`} className="link">Details</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;

