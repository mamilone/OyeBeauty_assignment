const express = require('express');
const multer = require('multer');
const Model = require('../model/model').model;
const countmodel = require('../model/model').countmodel;
const url = require('url');;

const upload = multer({limits : "50mb"});
const router = express.Router();




router.post('/add_movie',upload.single('moviee'),(req,res,next)=>{
    let file = req.file;

    countmodel.findOneAndUpdate(
        {id: "autoval"},
        {"$inc":{"seq":1}},
        {new:true},async (err,cd)=>{

            let seqID;

            if(cd==null){
                const newval = new countmodel({
                    id:"autoval",seq:1
                })
                newval.save();
                seqID=1;
            }
            else {
                seqID = cd.seq;
            }

            const data = new Model({
                _id: seqID,
                fieldname: file.fieldname,
                originalname: file.originalname,
                encoding: file.encoding,
                mimetype: file.mimetype,
                buffer: file.buffer,
                size: file.size
            })
            try {
                const dataToSave = await data.save();
                res.status(200).json({file:file.originalname, status:"uploaded"})
                
            }
            catch (error) {
                res.status(400).json({message: error.message})
            }
        }
    )
});

module.exports = router;