const mongoose = require("mongoose");
const commentschema = mongoose.Schema({
    body: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
})
module.exports = mongoose.model("Comment", commentschema);