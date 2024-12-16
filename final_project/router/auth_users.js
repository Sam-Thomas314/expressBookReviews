const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    let userwithsamename = users.filter((user) => {
        return user.username === username;
    });
    return userwithsamename.length > 0;
//write code to check is the username is valid
};

const authenticatedUser = (username,password)=>{
    let valid_users = users.filter((user) => {
        return (user.username === user.username && user.password === password) 
    });
    if(valid_users.length > 0) {
        return true;
    } else {
        return false;
    };
    
//returns boolean
//write code to check if username and password match the one we have in records.
};

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password) {
    return res.status(404).json({message: "Please ented a username and password"})
  } 

  if(authenticatedUser(username, password)) {
    let accessToken = jwt.sign({
        data: password
    }, 'access');
    //{expiresIn: 100 * 100}
    req.session.authorization = {
        accessToken, username
    };
        return res.status(200).json({message: "User successfully logged in"});

    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const isbn = req.params.isbn;
  let filtered_book = books[isbn];

  if(filtered_book) {
    let review = req.query.review;
    let reviewer = req.session.authorization['username']; //get the username from the session
    if(review) {
        filtered_book['reviews'][reviewer] = review;
        books[isbn] = filtered_book;
    }
    res.send(`The review of the book with isbn ${isbn} has been updated`);
  } else {
    res.send("Unable to find the ISBN")
  }
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    let reviewer = req.session.authorization['username'];
    let filtered_review = books[isbn]["reviews"];
    if (filtered_review[reviewer]){
        delete filtered_review[reviewer];
        res.send(`The review of the book ${isbn} that ${reviewer} wrote has been deleted`);
    } else {
        res.send( "Can't delete, as this reveiw was added by a different user")
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
