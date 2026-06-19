 const express= require("express");

 const cors= require("cors");
 const app = express();
 require("./db");

 app.use(cors());
 app.use(express.json());

 app.use(express.static("public"));

 const  bookRoutes= require("./routes/books");

 app.use("/api/books",bookRoutes);

     // app.get("/",(req,res)=>{
        // res.send("library server running");
      //});
      


 app.get("/",(req,res)=>{
    res.send("server running");
 });
 app.listen(5000,()=>{
console.log("server running at port 5000");
 });