const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true, // This field is mandatory
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;