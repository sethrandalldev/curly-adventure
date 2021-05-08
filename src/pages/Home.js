import React from 'react';
import NavBar from '../components/NavBar';

function Home() {
  let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
  console.log(user);
  return (
    <div>
      <NavBar />
      <h1>Home</h1>
      <p>{user ? user.name : 'No user logged in' }</p>
    </div>
  );
}

export default Home;