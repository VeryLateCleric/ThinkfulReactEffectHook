import React from "react";

function AlbumList({ albums, loading, user = {} }) {
  return (
    <div>
      <h2>{user.id ? `${user.id} Albums` : "User Albums"}</h2>
      {loading ? (
        <p>Loading albums...</p>
      ) : (
        <ul>
          {albums.map((album) => (
            <li key={album.id}>
              {album.id} - {album.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AlbumList;
