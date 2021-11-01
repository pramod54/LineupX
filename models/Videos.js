const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videosSchema = new Schema({
    title:{
        type :String,
    },
    description:{
        type:String,
    },
    publishingTime:{
        type:Date
    },
    thumbnail:{
        type:String
    },
    Time:{
        type:Date,
        default: Date.now()
    }
})
videosSchema.index({title:'text',description:'text'});
const Videos = mongoose.model('videos',videosSchema);
module.exports = Videos;