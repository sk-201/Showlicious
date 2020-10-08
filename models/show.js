const mongoose = require("mongoose");
const showschema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    comment: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }

    ],
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        username: String
    }
});
module.exports = mongoose.model("Show", showschema);