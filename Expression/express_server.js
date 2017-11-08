var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080; // default port 8080
app.set("view engine", "ejs")

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// make delete dynamic
 function generateRandomString() {
 return Math.random().toString(36).substr(2, 6)

}

var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com",

};
// defining (registering) a HTTP GET request (since server doesn't request) on /
// Along with a callback func that will handle the request
app.get("/", (req, res) => {
  res.end("Hello!");
});



app.post("/urls/:id/delete", (req,res) => {
let id = req.params.id;
delete urlDatabase[id];  // need to access w/ in object or else won't work!
res.redirect("/urls");
});

app.post("/urls/:id", (req,res) => {
  let id = req.params.id;
   urlDatabase[id] = req.body.longURL;
  res.redirect(urlDatabase[id]);
})

app.post("/urls", (req, res) => {
  console.log(generateRandomString(), req.body.longURL);  // debug statement to see POST parameters
   // don't modify from inside object can change from outside
 // console.log(urlDatabase);
  res.send("Ok");         // Respond with 'Ok' (we will replace this)
});

app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => { // if you put new below id it thinks new is the id
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {  // not a response it's used to get the response (tool to make)
  let templateVars = { shortURL: req.params.id,
                        urlDatabase: urlDatabase };
       let id = req.params.id;  // accesses short url
    //   res.redirect(urlDatabase[id]); // responds with a redirection with the value associated with id which is URL
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
   let longURL = urlDatabase[req.params.shortURL]; // req.params.shortURL but access form w/ in object so urlDatabase[req.params.shortURL]
   res.redirect(longURL);
});



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.end("<html><body>Hello <b>World</b></body></html>\n");
});

