import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import { getBooks, getUserBooks } from "../api/api";
import BooksTable from "../components/BooksTable";
import BookForm from "../components/BookForm";

function Feed() {
  let user = sessionStorage.getItem("user")
    ? JSON.parse(sessionStorage.getItem("user"))
    : null;
  const [booksData, setBooksData] = useState({ userBooks: [], books: [] });

  useEffect(() => {
    console.log("useEffect");
    getBooks().then((booksVal) => {
      const books = booksVal.data;
      getUserBooks().then((userBooksVal) => {
        const userBooks = userBooksVal.data;
        setBooksData({ books, userBooks });
      });
    });
  }, []);

  return (
    <div>
      <NavBar />
      <BookForm setBooksData={setBooksData} user={user} booksData={booksData} />
      <h3>Your Bookshelf</h3>
      <BooksTable booksData={booksData} user={user} />
    </div>
  );
}

export default Feed;
