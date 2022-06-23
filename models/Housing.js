import mongoose from "mongoose"

const HousingSchema = new mongoose.Schema({
    address: {
        type: [String],
        required: true,        
    },    
    monthly_rent: {
        type: Number,
        required: true,
    },
    square_feet: {
        type: Number,
        required: true,
    },    
    img: {
        type: [String],
        required: true,        
    },  
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    roomate: {
        type: Boolean,        
    },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,        
    },      
    pet_friendly: {
        type: Boolean,
    }, 
    views: {
        type: Number,
    },
    recommend: {
        type: Number,
    },
}, {timestamps: true}
)

export default mongoose.models.Housing || mongoose.model("Housing", HousingSchema);