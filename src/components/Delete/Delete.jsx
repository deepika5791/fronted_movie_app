import React from "react";
import "./Delete.css";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const Delete = ({ id, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      onDelete(id);

      window.dispatchEvent(new CustomEvent("movieDeleted", { detail: { id } }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleDelete} className="delete_Movie_btn">
      <MdDelete />
      Delete
    </button>
  );
};

export default Delete;
