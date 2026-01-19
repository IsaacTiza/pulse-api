import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a product name'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please provide a product description']
    },
    price: {
        type: Number,
        required: [true, 'Please provide a product price'],
        min: [0, 'Price cannot be negative']
    },
    tier: {
        type: String,
        enum: {
            values: ['free', 'pro'],
            message: 'Tier must be either "free" or "pro"'
        },
        default: 'free'
    },
    features: [String],
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Product', productSchema)