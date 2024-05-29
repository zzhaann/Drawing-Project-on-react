import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RoomList() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/rooms/')
      .then(response => {
        setRooms(response.data);
      })
      .catch(error => {
        console.error('Error fetching rooms:', error);
      });
  }, []);

  return (
    <div>
      <h2>Room List</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            <Link to={`/rooms/${room.id}`}>{room.code}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RoomList;
