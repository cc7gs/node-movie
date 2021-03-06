const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {Mixed,ObjectId} = Schema.Types
const movieSchema = new Schema({
    doubanId: {
        unique: true,
        type: String
    },
    category:[{
        type:ObjectId,
        ref:'Category'
    }],
    rate: Number,
    title: String,
    summary: String,
    video: String,
    poster: String,
    cover: String,

    videoKey: String,
    posterKey: String,
    coverKey: String,

    rawTitle: String,
    movieTypes: [String],
    pubdate: Mixed,
    year: Number,
    tags: [String],
    meta: {
        createdAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
})

//判断数据是否是新增,若是新增则跟新meta
movieSchema.pre('save', next => {
    if (this.isNew) {
        this.meta.createdAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
})
mongoose.model('Movie', movieSchema);