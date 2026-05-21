const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req,res) => {
  return res.status(300).json({message: "Yet to be implemented"});
});

public_users.get("/", function (req, res) {
  return new Promise((resolve, reject) => {
    resolve(books);
  }).then((allBooks) => {
    return res.status(200).json(allBooks);
  }).catch((err) => {
    return res.status(500).json({message: "Error retrieving books"});
  });
});

public_users.get("/isbn/:isbn", function (req, res) {
  return new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
    if (book) { resolve(book); } else { reject("Book not found"); }
  }).then((book) => {
    return res.status(200).json(book);
  }).catch((err) => {
    return res.status(404).json({message: err});
  });
});

public_users.get("/author/:author", function (req, res) {
  return new Promise((resolve, reject) => {
    const author = req.params.author;
    const matchingBooks = Object.keys(books).filter(key => books[key].author === author).map(key => books[key]);
    if (matchingBooks.length > 0) { resolve(matchingBooks); } else { reject("No books found for this author"); }
  }).then((matchingBooks) => {
    return res.status(200).json(matchingBooks);
  }).catch((err) => {
    return res.status(404).json({message: err});
  });
});

public_users.get("/title/:title", function (req, res) {
  return new Promise((resolve, reject) => {
    const title = req.params.title;
    const matchingBooks = Object.keys(books).filter(key => books[key].title === title).map(key => books[key]);
    if (matchingBooks.length > 0) { resolve(matchingBooks); } else { reject("No books found for this title"); }
  }).then((matchingBooks) => {
    return res.status(200).json(matchingBooks);
  }).catch((err) => {
    return res.status(404).json({message: err});
  });
});

public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({message: "Book not found"});
  }
});

module.exports.general = public_users;
