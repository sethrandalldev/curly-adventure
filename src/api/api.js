import axios from 'axios';

export async function login(user) {
  const result = await axios.post('http://localhost:4000/login', { ...user })
    .then(function (response) {
      console.log(response);
      sessionStorage.setItem('user', JSON.stringify(response.data));
      console.log(true);
      return true;
    })
    .catch(function (error) {
      console.log(false);
      console.log(error);
      return false;
    });
  return result;
}

export async function register(user) {
  const result = await axios.post('http://localhost:4000/register', { ...user })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error)
    })
    .then(function () {
      console.log('register request complete');
    })
  return result;
}

export async function createBook(book) {
  const result = await axios.post('http://localhost:4000/books', { ...book })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error)
    })
  return result;
}

export async function getBooks() {
  const result = await axios.get('http://localhost:4000/books')
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error)
    })
  return result;
}

export async function getUserBooks() {
  const result = await axios.get('http://localhost:4000/userBooks')
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error)
    })
  return result;
}