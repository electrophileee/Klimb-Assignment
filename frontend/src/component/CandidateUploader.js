import React, { useState } from 'react';
import './CandidateUploader.css';

const CandidateUploader = () => {
  const [message, setMessage] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const response = await fetch('http://localhost:4000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showMessage('success', result.message);
      } else {
        showMessage('error', result.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error.message);
      showMessage('error', 'An error occurred while uploading the file.');
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  return (
    <>
    <h1 className=' text-center font-[6rem] text-[2rem] mt-[10rem] '>Add candidate records from Excel to  Database</h1>

    <div className="flex flex-col items-center justify-center h-screen mt-[-15rem]">
      <form
        className="flex flex-col items-center"
        onSubmit={handleUpload}
        encType="multipart/form-data"
      >
        <label className="mb-2">Choose Excel file:</label>
        <input
          type="file"
          name="excelFile"
          accept=".xlsx"
          className="mb-4 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Upload
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-2 rounded ${message.type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {message.text}
        </div>
      )}
    </div>
    </>
  );
};

export default CandidateUploader;
