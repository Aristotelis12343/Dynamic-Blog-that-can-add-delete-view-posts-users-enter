import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render("index.ejs",{blogs});
});

app.post("/submit",(req,res)=>{
    const body = req.body["text"];
    const title = body.substring(0,30);
    blogs.push({body,title});
    res.redirect("/");
});

app.get("/blog/:id",(req,res)=>{
    const id=req.params.id;
    const blog = blogs[id];
    if (blog){
        res.render("blog.ejs",{blog,id});
    }else{
        res.status(404).send("Blog not found");
    }
});

app.post("/edit",(req,res)=>{
    const id = req.body["id"];
    const blog = blogs[id];
    res.render("edit.ejs",{blog,id});
});

app.post("/update",(req,res)=>{
    const id = req.body["id"];
    const title = req.body["body"].substring(0,30);
    blogs[id] ={
        title: title,
        body : req.body["body"]
    };
    res.redirect("/");
});

app.post("/delete",(req,res)=>{
    const id = req.body["id"];
    blogs.splice(id,1);
    res.redirect("/");
});

app.listen(port,()=>{
    console.log(`The server is running on port${port}`);
});