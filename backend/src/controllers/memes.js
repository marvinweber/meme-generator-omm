import mongoose from 'mongoose';
import MemeSchema from '../models/meme.js'

export const getMemes = async (req, res) => {
    try {
        const meme = await MemeSchema.find();

        res.status(200).json(meme);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createMeme = async (req, res) => {
    const meme = req.body;
    const newMeme = new MemeSchema(meme);

    try {
        await newMeme.save();

        res.status(201).json(newMeme);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const updateMeme = async (req, res) => {
    // TODO
}

export const deleteMeme = async (req, res) => {
    // TODO
}

export const likeMeme = async (req, res) => {
    // TODO
}
