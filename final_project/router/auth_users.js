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
        if(users[user].username === username && users[username].password === password) {
            valid_users.push({"username": username,
            "password": password})
        } 
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

  if(username && password) {
    let accessToken = jwt.sign({
        data: password
    }, 'access', {expiresIn: 70 * 70});
    
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
  const review = req.params.review;
  const username = req.params.username;

  let filtered_books = books.filter((book) => book.isbn === isbn);

  if(filtered_books.length >0) {
    let one_book = filtered_books[0];

    if(review) {
        one_book.review = review;
    }
    
  }

  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
