import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const LIST_MOVIES_API = "https://api.themoviedb.org/3/trending/movie/day?api_key=3e784a05eb8674291bc3b92297db3bce";
  useEffect(() => {
    const fetchAllMovies = async () => {
      try {
        const response = await axios.get(LIST_MOVIES_API);
        setMovies(response.data.results);
      } catch (error) {
        console.error(`Error fetching movies: ${error}`);
      }
    };
    fetchAllMovies();
  }, []);

  const handleViewMore = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <div className="app">
<nav className="navbar">
        <div className="inner">
          <div className="navbaritem">
            <ul className="list">
              <li><a className="active" href="#movie">MovieDb</a></li>
              <li><a href="#app">App</a></li>
              <li><a href="#trending">Trending</a></li>
            </ul>
          </div>
          <div className="navright">
            <input type="search" placeholder="Movie Search" style={{ alignSelf: "flex-end" }} />
            <button className="right" style={{ alignSelf: "flex-end" }}>Search</button>
          </div>
        </div>
      </nav>
      <div className="mother">
        {movies && movies.length > 0 ? movies.map((item) => (
          <div className="cont" key={item.id}>
            <div className='card' style={{ width: "18rem" }}>
              <img src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt="card" className='imgcard' />
              <button className='bo' onClick={() => handleViewMore(item)}>View more</button>
            </div>
          </div>
        )) : <h2 style={{ textAlign: "center" }}>Loading...</h2>}
      </div>

      {selectedMovie && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedMovie.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Overview: {selectedMovie.overview}</p>
            <p>Release Date: {selectedMovie.release_date}</p>
          </Modal.Body>
          <Modal.Footer>
            <button onClick={() => setShowModal(false)}>Close</button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default App;