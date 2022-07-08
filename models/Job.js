import mongoose from "mongoose"

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 60,
    },
    company: {
        type: String,
        required: true,
    },    
    desc: {
        type: String,
        required: true,        
    },
    location: {
        type: String,
        required: true,        
    },
    pay: {
        type: String,
        required: true,
    },
    job_type: {
        type: String,
        required: true,
    },
    commute_type: {
        type: String,
        required: true,
    },
    sponsorship: {
        type: Boolean,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    img: {
        type: String,        
    },
    tags: {
        type: [String],
    },
    views: {
        type: Number,
    },
    website: {
        type: String,        
    },    
    author: {
        type: String,        
    }
}, {timestamps: true}
)

export default mongoose.models.Job || mongoose.model("Job", JobSchema);