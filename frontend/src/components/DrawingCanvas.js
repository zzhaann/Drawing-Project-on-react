import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';

function DrawingCanvas() {
  const { taskId } = useParams();
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(4);

  const handleSubmit = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current.canvasContainer.children[1];
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('image', blob);
      formData.append('task', taskId);

      axios.post('http://localhost:8000/api/drawings/', formData)
        .then(response => {
          console.log('Drawing submitted:', response.data);
        })
        .catch(error => {
          console.error('Error submitting drawing:', error);
        });
    });
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleEraser = () => {
    setColor('#ffffff'); //Oshirgish
  };

  return (
    <div style={{ textAlign: 'center', backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h2>Draw something</h2>
      <div style={{ display: 'inline-block' }}>
        <CanvasDraw
          ref={canvasRef}
          brushColor={color}
          brushRadius={brushRadius}
          lazyRadius={0}
          canvasWidth={600}
          canvasHeight={550}
          hideGrid={true} // Hide the grid
        />
      </div>
      <div style={{ marginTop: '20px' }}>
        <label>
          Select color:
          <input type="color" value={color} onChange={handleColorChange} />
        </label>
        <button onClick={handleEraser}>Eraser</button>
        <label>
          Brush size:
          <input
            type="range"
            min="1"
            max="50"
            value={brushRadius}
            onChange={(e) => setBrushRadius(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleSubmit}>Submit Drawing</button>
      </div>
    </div>
  );
}

export default DrawingCanvas;
