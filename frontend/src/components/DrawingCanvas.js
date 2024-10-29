import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw';
import axios from '../axiosConfig';  // Импортируйте настроенный axiosInstance

function DrawingCanvas() {
  const { taskId } = useParams();
  const canvasRef = useRef(null);
  const [color, setColor] = useState('#000000');
  const [brushRadius, setBrushRadius] = useState(5);
  const [isErasing, setIsErasing] = useState(false);

  const handleColorChange = (e) => {
    setColor(e.target.value);
    setIsErasing(false);
  };

  const handleBrushRadiusChange = (e) => {
    setBrushRadius(parseInt(e.target.value, 10));
  };

  const handleEraser = () => {
    setIsErasing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const canvas = canvasRef.current.canvasContainer.children[1];
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('image', blob);
      formData.append('task', taskId);

      axios.post('/drawings/', formData)
        .then(response => {
          console.log('Drawing submitted:', response.data);
        })
        .catch(error => {
          console.error('Error submitting drawing:', error);
        });
    });
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Draw something</h2>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <input type="color" value={color} onChange={handleColorChange} />
        <label style={{ marginLeft: '10px' }}>
          Brush Radius:
          <input
            type="number"
            value={brushRadius}
            onChange={handleBrushRadiusChange}
            style={{ marginLeft: '5px', width: '50px' }}
          />
        </label>
        <button onClick={handleEraser} style={{ marginLeft: '10px' }}>Eraser</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CanvasDraw
          ref={canvasRef}
          brushColor={isErasing ? '#FFFFFF' : color}
          brushRadius={brushRadius}
          canvasWidth={800}
          canvasHeight={600}
          hideGrid={true}
        />
      </div>
      <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Submit Drawing</button>
    </div>
  );
}

export default DrawingCanvas;
