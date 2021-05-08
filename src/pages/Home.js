import React from 'react';

function Home() {
  let user = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
  return (
    <div>
      <h1>Home</h1>
      <p>{user ? user.name : 'No user logged in' }</p>
    </div>
  );
}

export default Home;