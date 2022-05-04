const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//config dotenv
dotenv.config({path: './config/config.env'});

//load models
const Bootcamp = require('./models/Bootcamp');

mongoose.connect(process.env.MONGO_URI);

//read json files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

//import json files into DB
const importToDB = async ()=>{
    try {
        await Bootcamp.create(bootcamps);
        console.log("Data imported ...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

//delete from DB
const deleteDataDB = async ()=>{
    try {
        await Bootcamp.deleteMany();
        console.log("Data deleted ...");
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i'){
    importToDB();
}else if(process.argv[2] === '-d'){
    deleteDataDB();
}

