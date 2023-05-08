const mongoose = require('mongoose');

const db = mongoose.connect('mongodb+srv://chitwan:Chitwan123@cluster0.1mg6bhi.mongodb.net/?retryWrites=true&w=majority')
.then(() =>{
    console.log('Successfully connected to the database');
})
.catch((err) =>{
   console.log('Error in connecting to Mongo-Db ' , err);
})

module.exports = db ;