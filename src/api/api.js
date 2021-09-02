import axios from "axios";

export const login = async (user) => {
  const result = await axios
    .post("http://localhost:4000/login", { ...user })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
};

export async function register(user) {
  const result = await axios
    .post("http://localhost:4000/register", user)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

export async function addNotebookToUser(data) {
  const result = await axios
    .post("http://localhost:4000/notebooks", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

export async function deleteNotebook(notebookId, userId) {
  const result = await axios
    .delete(`http://localhost:4000/notebooks/${notebookId}`, { userId })
    .then((response) => {
      return response.notebookId;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

export async function getNotebooksByUser(userId) {
  const result = await axios
    .get(`http://localhost:4000/notebooks/${userId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

export async function getPagesByNotebook(notebookId) {
  const result = await axios
    .get(`http://localhost:4000/pages/${notebookId}`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
}

export const patchPage = async (page) => {
  const result = await axios
    .put(`http://localhost:4000/pages`, page)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
};

export const patchNotebook = async (notebook) => {
  const result = await axios
    .patch(`http://localhost:4000/notebooks/${notebook._id}`, notebook)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
};

export const addPageToNotebook = async (id, title) => {
  const result = await axios
    .post(`http://localhost:4000/pages/${id}`, { title })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
  return result;
};
