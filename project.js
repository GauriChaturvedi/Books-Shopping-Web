var express=require('express');
var app=express();
app.use(express.static("Bookshop"));
app.use(express.static("Bookshop/css"));
app.use(express.static("Bookshop/js"));
app.use(express.static("Bookshop/images"));
app.use(express.static("Bookshop/icomoon"));
var bd=require('body-parser');
var ed=bd.urlencoded({extended:false});
app.set('view engine','ejs');
var my=require('mysql');
var con=my.createConnection(
{
host:'127.0.0.1',
user:'root',
password:'',
database:'project'
});
con.connect(function(err)
{
if(err)
throw err;
console.log("connected to mysql");
});

app.get("/",function(req,res)
{
res.sendFile("./Bookshop/index.html",{root:__dirname});
});
app.get("/index",function(req,res)
{
res.sendFile("./Bookshop/index.html",{root:__dirname});
});
app.get("/reg",function(req,res)
{
res.sendFile("./Bookshop/reg.html",{root:__dirname});
});

app.get("/log",function(req,res)
{
res.sendFile("./Bookshop/log.html",{root:__dirname});
});

app.get("/contact",function(req,res)
{
res.sendFile("./Bookshop/contact.html",{root:__dirname});
});

app.get("/about",function(req,res)
{
res.sendFile("./Bookshop/about.html",{root:__dirname});
});
app.get("/faq",function(req,res)
{
res.sendFile("./Bookshop/faq.html",{root:__dirname});
});
app.get("/admin",function(req,res)
{
res.sendFile("./Bookshop/admin.html",{root:__dirname});
});


app.post("/Register",ed,function(req,res)
{
var n=req.body.N;
var e=req.body.E;
var p=req.body.P;
var q="insert into users values('"+n+"','"+e+"','"+p+"')";
con.query(q,function(err,result)
{
if(err)
throw err;
res.send("You are Successfully Registred");
});
});

app.post("/contactprocess",ed,function(req,res)
{
var n=req.body.N;
var e=req.body.E;
var p=req.body.S;
var m=req.body.M;
var q="insert into contact values('"+n+"','"+e+"','"+p+"','"+m+"')";
con.query(q,function(err,result)
{
if(err)
throw err;
res.send("Your enquiry sent Successfully");
});
});

app.post("/loginprocess",ed,function(req,res)
{
var e=req.body.E;
var p=req.body.P;
var q="select * from users where email='"+e+"'";
con.query(q,function(err,result)
{
if(err)
throw err;
var L=result.length;
if(L>0)
{
if(result[0].pwd==p)
res.send("Valid User");
else
res.send("Password is Incorrect");
}
else
res.send("Email is Incorrect");

});
});

app.post("/aprocess",ed,function(req,res)
{
var e=req.body.E;
var p=req.body.P;
var q="select * from admin where email='"+e+"'";
con.query(q,function(err,result)
{
if(err)
throw err;
var L=result.length;
if(L>0)
{
if(result[0].password==p)
res.render("adminhome",{aname:result[0].name});

else
res.send("Admin Password is Incorrect");
}
else
res.send("Admin Email is Incorrect");

});
});
app.get("/vuser",function(req,res)
{
var q="Select * from users ";
con.query(q,function(err,result)
{
if(err)
throw err;
res.render("vuser",{data:result});
});
});

app.get("/venq",function(req,res)
{
var q="Select * from contact ";
con.query(q,function(err,result)
{
if(err)
throw err;
res.render("venq",{data:result});
});
});

app.get("/deluser",function(req,res)
{
var a =req.query.em;

var q="delete from users where email='"+a+"'";
con.query(q,function(err,result)
{
if(err)
throw err;
res.redirect("vuser");
});
});

app.get("/delenq",function(req,res)
{
var a =req.query.em;

var q="delete from contact where email='"+a+"'";
con.query(q,function(err,result)
{
if(err)
throw err;
res.redirect("venq");
});
});

app.get("/addprod",function(req,res)
{
res.render("addprod");
});

app.listen(3000);

