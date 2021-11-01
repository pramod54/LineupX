const express = require('express');
const router =  express.Router();
const axios = require('axios');
const Videos = require('../models/Videos');
const URL = `https://www.googleapis.com/youtube/v3/search?key=${process.env.key}&type=video&part=snippet&maxResults=10&q=cricket`
// @route    GET youtube/view
// @desc     TEST ROUTE
// @access   Public
router.get('/view',async(req,res)=>{
    try {
        const response = await axios.get(URL);
        console.log(response);
        for(var i in response.data.items){
            var item = response.data.items[i];
            console.log(`Title is ${item.id.videoId} ${item.snippet.title} `);
        }
        res.status(200).json({
            data : response.data
        })
    } catch (error) {
        console.log(error.message);
        res.status(401);
    }
    
})
// @route    GET youtube/trendings
// @desc     GET Latest trending video sorted acc to publishing time
// @access   Public
router.get('/trendings',async(req,res)=>{
    try {
        const pageNumber=Number(req.query.pageNumber) || 1;
        const pageSize = Number(req.query.pageSize) || 20;
        const data = await Videos.find().sort({'publishingTime' : -1}).limit(pageSize).skip(pageSize*(pageNumber-1));
        res.status(200).json({data : data});
    } catch (error) {
        console.log(error.message);
        res.status(401);
    }
})
// @route    GET youtube/search
// @desc     GET search resulted acc to query
// @access   Public
router.get('/search',async(req,res)=>{
    try {
        const s = req.query.text.toString();
        console.log(s);
        const data = await Videos.find({
            $text: { $search: s }
        })
        res.status(200).json({
            data : data
        })
    } catch (error) {
        res.status(401).json({data : error.message});
        console.log(error.message);
    }
})
// @route    GET youtube/videos
// @desc     GET all the videos stored in DB
// @access   Public
router.get('/videos',async(req,res)=>{
    try {
        let para = req.query.para;
        const data = await Videos.find().sort({'publishingTime' : para});
        res.status(200).json({data : data});
    } catch (error) {
        console.log(error.message);
        res.status(401);
    }
})
module.exports = router;