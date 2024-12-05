const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    if(users[username]) {
        return true;
    } else {
        return false
    }
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{
    let valid_users = users.filter((user) => {
        return user.username === username && user.password === password;
    });
    return valid_users.length > 0;

    
    
//returns boolean
//write code to check if username and password match the one we have in records.
}

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
    }, 'access', {expiresIn: 70 * 70});
    
    res.session.authorization = {
        accessToken, username
    };
    } else {
        return res.status(208).json({message: "Invalid Login. Check username and Password"});
    }
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
