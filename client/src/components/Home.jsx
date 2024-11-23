import axios from 'axios'
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'
import 'bootstrap/dist/css/bootstrap.min.css';


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
        <div className="container mt-4">
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container-fluid">
                    <button className="btn btn-primary me-2">
                        <Link to={'/post'} className="text-white text-decoration-none text-align">Add Post</Link>
                    </button>
                    <h1 className="navbar-brand">Music Maniac {user.username}</h1>
                    <button className="btn btn-danger">
                        <Link to={'/'} onClick={logout} className="text-white text-decoration-none">Logout</Link>
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <h2 className="mb-4">Maniac's Posts</h2>

            <div className="row">
                {songs.map((song) => (
                    <div key={song._id} className="col-md-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{song.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Artist: {song.artist}</h6>
                                <p className="card-text">Year Released: {song.yearReleased}</p>
                                <blockquote className="blockquote">
                                    <p className="mb-0">"{song.background}"</p>
                                </blockquote>
                                <p>
                                    <strong>Link:</strong> 
                                    <a href={song.link} target="_blank" rel="noopener noreferrer">{song.link}</a>
                                </p>

                                {/* Edit and Details Buttons */}
                                <div className="d-flex justify-content-between">
                                    <button className="btn btn-warning">
                                        <Link to={`/update/song/${song._id}`} className="text-white text-decoration-none">Edit Post</Link>
                                    </button>
                                    <button className="btn btn-info">
                                        <Link to={`/details/song/${song._id}`} className="text-white text-decoration-none">Details</Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
