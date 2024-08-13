import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  const [notes, setNotes] = useState([]);

  const navigate = useNavigate();

  // Define the color palette
  const COLORS = [
    "#BCD8B7",
    "#E0D2C3",
    "#6BA292",
    "#B5BAD0",
    "#E0E0E2",
    "#81D2C7",
    "#EAD2AC",
    "#DF928E",
    "#D1DEDE",
    "#B2FFD6",
    "#B4D6D3",
    "#B8BAC8",
    "#F8DDA4",
  ];

  // Function to get a random color from the palette
  const getRandomColor = () =>
    COLORS[Math.floor(Math.random() * COLORS.length)];

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const res = await fetch("/api/get-all-notes");
        if (res.ok) {
          const data = await res.json();
          setNotes(data.allNotes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/delete-note/${id}`, { method: "DELETE" });
      if (res.ok) {
        const updatedNotes = notes.filter((n) => n._id !== id);
        setNotes(updatedNotes);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <Navbar />
      <section className="m-auto my-5 w-3/4 flex justify-center items-center flex-wrap gap-3">
        {notes.length > 0 ? (
          notes.map((note, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 border w-1/4 p-3 rounded-lg shadow-lg"
              style={{ backgroundColor: getRandomColor() }} // Apply random background color
            >
              <div
                onClick={() => navigate("/edit", { state: note._id })}
                className="grid gap-2 cursor-pointer"
              >
                <p className="truncate font-semibold text-xl w-full">
                  {note.title}
                </p>
                <p className="font-semibold w-full h-40 overflow-auto">
                  {note.content}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-gray-600">
                  {new Date(note.createdAt).toDateString()}
                </p>
                <span
                  onClick={() => handleDelete(note._id)}
                  className="hover:scale-110 transform cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </span>
              </div>
            </div>
          ))
        ) : (
          <h2>You have no notes!</h2>
        )}
      </section>
    </div>
  );
};

export default Home;
