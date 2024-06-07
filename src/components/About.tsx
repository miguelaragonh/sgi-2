import React, { useState } from 'react';

function ImageToBase64() {
  const [base64, setBase64] = useState('');
  const [error, setError] = useState('');

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.onerror = () => {
        setError('Error reading file');
      };
      reader.readAsDataURL(file);
      console.log(base64);
    } else {
      setError('No file selected');
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {error && <p>{error}</p>}
      {base64 && (
        <div>
          <p>Base64:</p>
          <textarea value={base64} readOnly rows="10" cols="50" />
          <p>Decoded Image:</p>
          <img src={base64} alt="Decoded" />
        </div>
      )}
    </div>
  );
}

export default ImageToBase64;
