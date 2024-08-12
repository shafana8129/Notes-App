import express from "express";
import { note } from "../models/notes-model.js";

const app = express();

app.get('/get-all-notes', async (req, res) => {
    // To get all notes
    const allNotes = await note.find().sort({createdAt: -1});
    res.json({ allNotes });
});

app.post('/add-note', async (req, res) => {
    // To create new note
    const { title, content } = req.body;
    if (!title || !content) {
        res.json({ message: 'Reqired title and body' });
    } else {
        const newNote = new note({
            title,
            content
        });
        await newNote.save();
        res.json({ newNote });
    }
});

app.patch('/edit-note/:noteId', async (req, res) => {
    // To edit a note
    try {
        const noteId = req.params.noteId;
        const { title, content } = req.body;
        if (!noteId || !title || !content) {
            res.json({ message: 'All feilds required'});
        } else {
            const updatedNote = await note.findByIdAndUpdate(noteId, { $set: { title, content } }, { new: true });
            res.json({ message: "Note updated successfully", updatedNote });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error on edit note', error: error.message });
    }
});

app.delete('/delete-note/:noteId', async (req, res) => {
    // To delete a note
    try {
        const noteId = req.params.noteId;
        if (!noteId) {
            res.json({ message: "NoteId not found!" });
        } else {
            await note.findByIdAndDelete(noteId);
            res.json({ message: "Note deleted successfully" });
        }
    } catch (error) {
        res.json({ message: 'Error on delete note', error: error.message });
    }
});

export default app;




