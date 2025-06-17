import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  coverImageUrl: {
    type: String,
    required: true,
  },
  releaseDate: {
    type: Date,
  },
  songs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Song',
  }],
}, { timestamps: true });

const Album = mongoose.model('Album', albumSchema);
export default Album;
