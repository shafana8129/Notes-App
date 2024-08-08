import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: String,
    body: String
});

const note = mongoose.model('note', noteSchema);

export {note};