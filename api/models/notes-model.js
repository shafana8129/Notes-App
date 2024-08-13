import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: String,
    content: String
},{timestamps: true});

const note = mongoose.model('note', noteSchema);

export default note