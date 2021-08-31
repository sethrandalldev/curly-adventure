import axios from "axios";

export const login = async (user) => {
  const result = await axios
    .post("http://localhost:4000/login", { ...user })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return result;
};

export async function register(user) {
  const result = await axios
    .post("http://localhost:4000/register", { ...user })
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.error(error);
    });
  return result;
}

export async function addNotebookToUser(data) {
  const result = await axios
    .post("http://localhost:4000/notebooks", { ...data })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.error(error);
    });
  return result;
}

export async function deleteNotebook(notebookId, userId) {
  const result = await axios
    .delete(`http://localhost:4000/notebooks/${notebookId}`, { userId })
    .then(function (response) {
      return response.notebookId;
    })
    .catch(function (error) {
      console.error(error);
    });
  return result;
}

export async function getNotebooksByUser(userId) {
  const result = await axios
    .get(`http://localhost:4000/notebooks/${userId}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.error(error);
    });
  return result;
}

export async function getPagesByNotebook(notebookId) {
  const result = await axios
    .get(`http://localhost:4000/pages/${notebookId}`)
    .then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.error(error);
    });
  return result;
}
