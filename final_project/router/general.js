const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
  //return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here

  const isbn = rea.params.isbn;

  let filtered_isbn = books.filter((book) => book.isbn === isbn);
  
  res.send(filtered_isbn);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;

  let filtered_author = books.filter((book) => book.author === author);

  res.send(filtered_author)
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {

    const title = req.params.title;

    let filtered_title = books.filter((book) => book.title === title);

  //Write your code here
    res.send(filtered_title)
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviews = req.params.reviews;
  const isbn = req.params.isbn;

  let
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
