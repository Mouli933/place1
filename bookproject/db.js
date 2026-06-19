const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/librarydb")
.then(()=>{
    console.log("MongoDb Connected");
})
.catch((error)=>{
    console.log(error);
});
