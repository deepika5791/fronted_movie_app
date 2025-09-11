import React, { useEffect, useState } from "react";
import "./Delete.css";
import axios from "axios";
const Delete = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      onDelete(id);
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button onClick={handleDelete} className="delete_Movie_btn">
        Delete
      </button>
    </>
  );
};

export default Delete;
