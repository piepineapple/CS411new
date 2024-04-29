const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;