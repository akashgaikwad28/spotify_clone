import mongoose from 'mongoose';

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number, // duration in seconds
  },
  fileUrl: {
    type: String,
    required: true,
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
  },
  artist: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

const Song = mongoose.model('Song', songSchema);
export default Song;
