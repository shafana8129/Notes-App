import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Create = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/add-note", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // setNotes([data.newNote, ...notes]);
        setTitle(""); // Clear input fields
        setContent("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center flex-col items-center">
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="w-3/4 flex justify-between items-start pt-10 gap-4 flex-col"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-1/3 p-3 border border-blue-300 rounded-md shadow-lg"
          type="text"
          placeholder="Enter title"
          required
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-1/3 p-3 border border-blue-300 rounded-md shadow-lg"
          type="text"
          placeholder="Enter Content"
          required
        />
        <button className="border px-3 rounded-md hover:bg-black hover:text-white py-1 ">
          Save
        </button>
      </form>
    </div>
  );
};

export default Create;
