import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import NotebookList from "../components/NotebookList";

function Home() {
  return (
    <div>
      <NavBar />
      <NotebookList />
    </div>
  );
}

export default Home;
