import Album from '../models/Album.js';
import Song from '../models/Song.js';
import { ApiError } from '../utils/ApiError.js';
import cloudinary from '../utils/cloudinary.js';

// Create a new album
export const createAlbum = async (req, res, next) => {
  try {
    const { title, description, releaseDate } = req.body;
    let coverImageUrl = '';

    if (req.files && req.files.coverImage) {
      const result = await cloudinary.uploader.upload(req.files.coverImage.tempFilePath, {
        folder: 'album_covers',
      });
      coverImageUrl = result.secure_url;
    }

    const album = new Album({ title, description, coverImageUrl, releaseDate });
    await album.save();
    res.status(201).json(album);
  } catch (error) {
    next(error);
  }
};

// Get all albums
export const getAlbums = async (req, res, next) => {
  try {
    const albums = await Album.find().populate('songs');
    res.json(albums);
  } catch (error) {
    next(error);
  }
};

// Get album by ID
export const getAlbumById = async (req, res, next) => {
  try {
    const album = await Album.findById(req.params.id).populate('songs');
    if (!album) {
      throw new ApiError(404, 'Album not found');
    }
    res.json(album);
  } catch (error) {
    next(error);
  }
};

// Update album by ID
export const updateAlbum = async (req, res, next) => {
  try {
    const album = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!album) {
      throw new ApiError(404, 'Album not found');
    }
    res.json(album);
  } catch (error) {
    next(error);
  }
};

// Delete album by ID
export const deleteAlbum = async (req, res, next) => {
  try {
    const album = await Album.findByIdAndDelete(req.params.id);
    if (!album) {
      throw new ApiError(404, 'Album not found');
    }
    // Optionally delete all songs in this album
    await Song.deleteMany({ album: req.params.id });
    res.json({ message: 'Album and associated songs deleted' });
  } catch (error) {
    next(error);
  }
};
