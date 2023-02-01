const express = require('express');
const app = express();
const port = 8000;


app.listen(port, function(err)
{
    if(err){
       //using interpolation in below line 
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
    
});