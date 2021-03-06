const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
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
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
