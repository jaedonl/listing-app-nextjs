const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    firstname: { 
        type: String, 
        required: true 
    },
    lastname: { 
        type: String, 
        required: true 
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    posts: {
        jobs: {
            type: Array,
        },
        housings: {
            type: Array,
        },
        forsales: {
            type: Array,
        },
        communities: {
            type: Array,
        },
        qnas: {
            type: Array,
        }
    }
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
