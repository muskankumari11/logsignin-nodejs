const express = require("express");
const path = require("path"); // Corrected the typo from 'pasth' to 'path'
const bcrypt = require("bcrypt");
const collection=require("./config");

const app = express();

//convert data into json format
app.use(express.json());

app.use(express.urlencoded({extended:false}));

// Use EJS as the view engine
app.set('view engine', 'ejs');

//static file
app.use(express.static("public"));

// Serve static files from a directory like 'public' (Optional, if you have static assets like CSS or images)
// app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup",async (req,res)=>{

    const data={
        name:req.body.username,
        password:req.body.password
    }

    //check if user already exists
    const existingUser=await collection.findOne({name:data.name});
    if(existingUser){
        res.send("User already exists. Please choose a different username.");
    }
    else{
        //hash the password using bcrypt
        const saltRounds=10;
        const hashheadPassword=await bcrypt.hash(data.password, saltRounds);

        data.password=hashheadPassword;
        const userdata=await collection.insertMany(data);
        console.log(userdata);
    }
});

//login user
app.post("/login", async(req,res)=>{
try{
    const check=await collection.findOne({name:req.body.username});
    if(!check){
        res.send("user name cannot found");
    }
    //compare the hash password from the database with plain text
    const isPasswordMatch=await bcrypt.compare(req.body.password, check.password);
    if(isPasswordMatch){
        res.render("home");
    }else{
        req.send("wrong password");
    }
}catch{
    res.send("wrong Details");
}
})

const port = 5000;
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
}); 
