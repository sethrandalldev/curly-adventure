import axios from "axios";
import { addNotebook } from "../storage";

export async function login(user) {
  const result = await axios
    .post("http://localhost:4000/login", { ...user })
    .then(function (response) {
      console.log(response);
      sessionStorage.setItem("user", JSON.stringify(response.data));
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
  const result = await axios
    .post("http://localhost:4000/register", { ...user })
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    })
    .then(function () {
      console.log("register request complete");
    });
  return result;
}

export async function addNotebookToUser(data) {
  const result = await axios
    .post("http://localhost:4000/notebook", { ...data })
    .then(function (response) {
      addNotebook(response.data);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  return result;
}

export async function getNotebooksByUser(userId) {
  const result = await axios
    .get(`http://localhost:4000/notebooks/${userId}`)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  return result;
}

export async function getPagesByNotebook(notebookId) {
  const result = await axios
    .get(`http://localhost:4000/pages/${notebookId}`)
    .then(function (response) {
      console.log(response);
      return response;
    })
    .catch(function (error) {
      console.log(error);
    });
  return result;
}
