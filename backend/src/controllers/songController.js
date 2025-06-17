import Song from '../models/Song.js';
import Album from '../models/Album.js';
import { ApiError } from '../utils/ApiError.js';

// Create a new song and add to album
export const createSong = async (req, res, next) => {
  try {
    const { title, duration, fileUrl, albumId, artist } = req.body;

    // Check if album exists
    const album = await Album.findById(albumId);
    if (!album) {
      throw new ApiError(404, 'Album not found');
    }

    const song = new Song({ title, duration, fileUrl, album: albumId, artist });
    await song.save();

    // Add song to album's songs array
    album.songs.push(song._id);
    await album.save();

    res.status(201).json(song);
  } catch (error) {
    next(error);
  }
};

// Get all songs
export const getSongs = async (req, res, next) => {
  try {
    const songs = await Song.find().populate('album');
    res.json(songs);
  } catch (error) {
    next(error);
  }
};

// Get song by ID
export const getSongById = async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id).populate('album');
    if (!song) {
      throw new ApiError(404, 'Song not found');
    }
    res.json(song);
  } catch (error) {
    next(error);
  }
};

// Update song by ID
export const updateSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!song) {
      throw new ApiError(404, 'Song not found');
    }
    res.json(song);
  } catch (error) {
    next(error);
  }
};

// Delete song by ID
export const deleteSong = async (req, res, next) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id);
    if (!song) {
      throw new ApiError(404, 'Song not found');
    }
    // Remove song from album's songs array
    await Album.findByIdAndUpdate(song.album, { $pull: { songs: song._id } });
    res.json({ message: 'Song deleted' });
  } catch (error) {
    next(error);
  }
};
