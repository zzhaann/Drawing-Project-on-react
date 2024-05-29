import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RoomDetail() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/rooms/${id}/`)
      .then(response => {
        setRoom(response.data);
      })
      .catch(error => {
        console.error('Error fetching room:', error);
      });
  }, [id]);

  if (!room) return <div>Loading...</div>;

  return (
    <div>
      <h2>Room Code: {room.code}</h2>
      <p>Created At: {room.created_at}</p>
    </div>
  );
}

export default RoomDetail;
