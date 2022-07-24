const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res)
{
  res.sendFile(__dirname + "/signup.html");
})
app.post("/",function(req,res){
  const firstName= req.body.firstName;
  const lastName= req.body.lastName;
  const email= req.body.email;
  console.log(firstName+", "+lastName+", "+email);
  console.log(res.statusCode);

// new JS object called "data"
//memeber key value pair to save the members
//we'll have only one obj in the array cuz we will only add one member at a time
//cannot change the names
   const data =
  {

    members:[
    {
        email_address: email,
        status:"subscribed",
        merge_fields:
        {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url ="https://us2.api.mailchimp.com/3.0/lists/5489c9b95e1";

  const options=
  {
    method:"POST",
    auth:"sonali1205:74c7d6be6c56b3d2f8a8082733430afa-us2"
  }
//creating request
//function(response)-- going to give us a response from the mail chimp server

const request = https.request(url,options,function(response)
{
  if(response.statusCode==200)
  {
    res.sendFile(__dirname+"/success.html");
  }
  else{
      res.sendFile(__dirname+"/failure.html");
  }
response.on("data",function(data)
{
  console.log(JSON.parse(data));
})
})

request.write(jsonData);
request.end();

 });
 app.post("/failure",function(req,res)
{
  res.redirect("/");
})
app.listen("3000",function()
{
  console.log("Server has started on port 3000");
});
