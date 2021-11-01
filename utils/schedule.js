const { isValidObjectId } = require('mongoose');
const cron = require('node-cron');
const Videos = require('../models/Videos');
const axios = require('axios');
const URL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.key}&type=video&part=snippet&maxResults=10&q=cricket`
async function jobs(){
    cron.schedule("*/10 * * * * *",async function(){
        try {
        const response = await axios.get(URL);
        for(let i=0;i<response.data.items.length;i++){
            let ans = response.data.items[i];
            let video = new Videos();
            video.title = ans.snippet.title;
            video.description = ans.snippet.description;
            video.publishingTime = ans.snippet.publishedAt;
            video.thumbnail = ans.snippet.thumbnails.default.url;
            await video.save();
        }
        } catch (error) {
            res.status(401);
            console.log(error.message);
        }
        
    })
}

module.exports = jobs;