import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import AlbumList from "./AlbumList";
import UserList from "./UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Awesome Album App"; // start with setting title per SI5

    // fetch from url given in SI1
    const fetchData = async () => {
      setLoading(true);
      try {
        const usersResponse = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        ); 
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      document.title = "React Album App"; //on reset set title back
    };
  }, []);

  // Albums from url given in SI2
  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      if (currentUser.id) {
        try {
          const albumsResponse = await axios.get(
            `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`
          );
          setAlbums(albumsResponse.data);
        } catch (error) {
          console.error("Error fetching albums:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setAlbums([]);
      }
    };

    fetchAlbums();

    return () => {
      setAlbums([]);
    };
  }, [currentUser]);

  // Load data from https://jsonplaceholder.typicode.com/albums?userId=${user.id}

  return (
    <div className="App">
      <div className="left column">
        <UserList users={users} setCurrentUser={setCurrentUser} loading={loading} />
      </div>
      <div className="right column">
      {currentUser.id ? (
        <AlbumList albums={albums} loading={loading} />
        ) : (
          loading ? <p>Loading...</p> : <p>Please click on a user name to the left</p>
        )}
      </div>
    </div>
  );
}

export default App;
