const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    name: { type: String },
    user_id: { type: Number },
    image: { type: String },
    // file: { type: file },
});

let User = mongoose.model("User", userSchema);
module.exports = User;
