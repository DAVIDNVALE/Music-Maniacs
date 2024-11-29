import axios from 'axios';
import React, { useEffect, useState, useContext } from "react";
import { Navigate, useNavigate, useParams, Link } from "react-router-dom";
import { userContext } from '../context/userContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details = (props) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [song, setSong] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/songs/${id}`)
            .then((res) => {
                setSong(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const deleteSong = (id) => {
        axios.delete(`http://localhost:8000/api/songs/${id}`)
            .then(() => navigate("/home"))
            .catch((err) => console.log(err));
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
        <div className="container mt-5">
            
            <nav className="navbar">
                <div className="navbar-content">
                    <button className="add-post-button">
                        <Link to={'/home'} className="link">Home</Link>
                    </button>
                    <h1 className="navbar-title">Music Maniac {user.username}</h1>
                    <button className="logout-button" onClick={logout}>
                        Logout
                    </button>
                </div>
            </nav>

            
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">{song.title}</h2>
                    <h4 className="card-subtitle mb-2 text-muted text-center">{song.artist}</h4>
                    <p className="card-text text-center"><strong>Year Released:</strong> {song.yearReleased}</p>
                    <p className="card-text text-center"><strong>Background:</strong> "{song.background}"</p>
                </div>
            </div>

            
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-danger" onClick={() => deleteSong(song._id)}>Delete Post</button>
            </div>
        </div>
    );
};

export default Details;
