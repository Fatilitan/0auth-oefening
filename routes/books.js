import express from "express";
import getBooks from "../services/books/getBooks.js";
import createBook from "../services/books/createBooks.js";
import getBookById from "../services/books/getBookById.js";
import updateBookById from "../services/books/updateBookById.js";
import deleteBook from "../services/books/deleteBook.js";
import authMiddleware from "../middelware/advancedAuth.js";
import notFoundErrorHandler from "../middelware/notFoundErrorHandler.js";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const { genre, available } = req.query;
    const books = getBooks(genre, available);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while getting list of books!");
  }
});

router.post("/", authMiddleware, (req, res) => {
  try {
    const { title, author, isbn, pages, available, genre } = req.body;
    const newBook = createBook(title, author, isbn, pages, available, genre);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating new book!");
  }
});

router.get(
  "/:id",
  (req, res) => {
    const { id } = req.params;
    const book = getBookById(id);
    res.status(200).json(book);
  },
  notFoundErrorHandler
);

router.put(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { title, author, isbn, pages, available, genre } = req.body;
    const updatedBook = updateBookById(
      id,
      title,
      author,
      isbn,
      pages,
      available,
      genre
    );
    res.status(200).json(updatedBook);
  },
  notFoundErrorHandler
);

router.delete(
  "/:id",
  authMiddleware,
  (req, res) => {
    const { id } = req.params;
    const deletedBookId = deleteBook(id);

    res.status(200).json({
      message: `Book with id ${deletedBookId} was deleted!`,
    });
  },
  notFoundErrorHandler
);

export default router;
