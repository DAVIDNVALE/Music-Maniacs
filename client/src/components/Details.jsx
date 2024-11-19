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
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <div className="container-fluid">
                    <Link to="/home" className="btn btn-primary me-2">Home</Link>
                    <h1 className="navbar-brand">Music Maniac {user.username}</h1>
                    <button className="btn btn-danger">
                        <Link to="/" onClick={logout} className="text-white text-decoration-none">Logout</Link>
                    </button>
                </div>
            </nav>

            {/* Song Details */}
            <div className="card shadow-sm">
                <div className="card-body">
                    <h2 className="card-title text-center">{song.title}</h2>
                    <h4 className="card-subtitle mb-2 text-muted text-center">{song.artist}</h4>
                    <p className="card-text text-center"><strong>Year Released:</strong> {song.yearReleased}</p>
                    <p className="card-text text-center"><strong>Background:</strong> "{song.background}"</p>
                </div>
            </div>

            {/* Delete Button */}
            <div className="d-flex justify-content-center mt-4">
                <button className="btn btn-danger" onClick={() => deleteSong(song._id)}>Delete Post</button>
            </div>
        </div>
    );
};

export default Details;
