import React, { useEffect, useState } from "react";
import { json, useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState([]);
  const [content, setContent] = useState("");
  const { state } = useLocation();

  const navigate = useNavigate();

  const fetchOneNote = async () => {
    try {
      const res = await fetch("/api/get-note/" + state);
      const data = await res.json();
      setTitle(data.oneNote.title);
      setContent(data.oneNote.content);
    } catch (error) {}
  };

  useEffect(() => {
    fetchOneNote();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("api/edit-note/" + state, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PATCH",
        body: JSON.stringify({
          title: title,
          content: content,
        }),
      });
      navigate("/");
    } catch (error) {
      console.error(error);
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
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          className="w-1/2 resize overflow-hidden p-3 border border-blue-300 rounded-md shadow-lg"
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

export default Edit;
