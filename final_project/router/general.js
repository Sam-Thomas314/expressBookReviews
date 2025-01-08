const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const LOCAL_BOOKS_API_URL = 'http://localhost:5000/local-books';  //sample url



public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

 
  if(username && password) {
    if(!isValid(username)) {
        users.push({"username": username, "password": password });
        return res.status(200).json({ message: "User successfully registered. Now you can login"});

    } else {
        return res.status(404).json({message: "User already Exists"});
    }
  }
  return res.status(404).json({message: "Unable to register user"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {

    new Promise((resolve, reject) => {
        resolve({"books" : books});
    })
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
    
    // Handle any errors that occurred during the Promise chain
    
    console.error(error);
    
    res.status(500).send('An error occurred');
    
    reject(error);
    
    });
    
    });

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const the_isbn = req.params.isbn;
  let books_by_isbn = [];
  new Promise((resolve, reject) => {
        resolve({"books" : books[the_isbn]});
    })
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
    
    // Handle any errors that occurred during the Promise chain
    
    console.error(error);
    
    res.status(500).send('An error occurred');
    
    reject(error);
    
    });
    
    });
  /*
  let isbns = Object.keys(books);

  if(the_isbn) {
    books_by_isbn.push({"isbn": the_isbn,
        "author": books[the_isbn]["author"],
        "title": books[the_isbn]["title"],
        "reviews": books[the_isbn]["reviews"],

        });
  } 
  res.send(JSON.stringify({books_by_isbn}, null, 4));

 });
*/
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
    const the_author = req.params.author;
  let books_by_author = [];
  let isbns = Object.keys(books)
  new Promise((resolve, reject) => {
    
    isbns.forEach((isbn) => {
      if(books[isbn]["author"] === the_author) {
        books_by_author.push({isbn: isbn, 
          title: books[isbn].title,
          author: books[isbn].title, 
          reviews: books[isbn].reviews
        });
      }
    });
    if(books_by_author.length > 0) {
        resolve(books_by_author);
    } else {
        reject("That author has not written any books")
    }
    })
    .then((result) => {
        res.status(200).send(JSON.stringify({books_by_author: result }, null, 4));

    })
    .catch((error) => {
        res.status(404).send({message: error});
    // Handle any errors that occurred during the Promise chain 
    });

/*
  let booksbyauthor = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["author"] === req.params.author) {
        booksbyauthor.push({"isbn": isbn, 
        "title": books[isbn]["title"],
        "author": books[isbn]["author"], 
        "reviews": books[isbn]["reviews"]})
    }
  });
  res.send(JSON.stringify({booksbyauthor}, null, 4))
  */
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const the_title = req.params.title;
    let books_by_title = [];
    let isbns = Object.keys(books)
    new Promise((resolve, reject) => {
      
      isbns.forEach((isbn) => {
        if(books[isbn].title === the_title) {
          books_by_title.push({isbn: isbn, 
            title: books[isbn].title,
            author: books[isbn].title, 
            reviews: books[isbn].reviews
          });
        }
      });
      if(books_by_title.length > 0) {
          resolve(books_by_title);
      } else {
          reject("There are no books with that title");
      }
      })
      .then((result) => {
          res.status(200).send(JSON.stringify({books_by_title: result }, null, 4));
  
      })
      .catch((error) => {
          res.status(404).send({message: error});
      // Handle any errors that occurred during the Promise chain 
      });

    /*
    const book_title = req.params.title;
    let booksbytitle = [];
    let isbns = Object.keys(books);

    isbns.forEach((isbn) => {
        if(books[isbn]["title"] === book_title) {
            booksbytitle.push({"title": book_title,
            "Author":books[isbn]["author"],
            "Review": books[isbn]["reviews"] })
        }
    });
    res.send(JSON.stringify({booksbytitle}, null, 4))
    */

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const reviews = req.params.reviews;
  const isbn = req.params.isbn;
  let the_review = [];

  let isbns = Object.keys(books);

  isbns.forEach((book) => {
    if(book[isbn] === isbn) {
        the_review.push(book[isbn]["review"])
    }
  });
  res.send({the_review}, null, 4);
});

module.exports.general = public_users;
