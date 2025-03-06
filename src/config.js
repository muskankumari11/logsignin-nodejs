const mongoose=require("mongoose");
const connect=mongoose.connect("mongodb+srv://musakn969:1222@cluster0.g46qa.mongodb.net/user1")

connect.then(()=>{
    console.log("database connected successfully");
})
.catch(()=>{
    console.log("database cannot be connected");
});

const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const collection=new mongoose.model("test",LoginSchema);

module.exports=collection;
