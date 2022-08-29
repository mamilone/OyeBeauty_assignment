const express = require('express');
const { model } = require('mongoose');
const  Model  = require('../model/model').model;
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

let router = express.Router();

router.get('/get-all',async (req,res)=>{
    try{
        const cursor = await Model.find();
        var data = new Array();
        cursor.forEach(function(result,next) {
            if(result == null) {
                return;
            }
            else 
                data.push(result);
        })
        res.json(data);
        
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
});

router.get('/get-single?:id',async (req,res)=>{
    try {
        let oneid = req.query.id;
        let data = await Model.findById(oneid);
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/get-paginated?',async(req,res)=>{
    let page = req.query.page;
    let limit = req.query.size;
    let offset = (page-1)*limit;
    Model.paginate(null,{offset , limit})
    .then((data)=>{
        res.json(data)
    })
})

module.exports = router;