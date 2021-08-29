export const addNotebook = (notebook) => {
  const notebooks = sessionStorage.getItem("notebooks")
    ? JSON.parse(sessionStorage.getItem("notebooks"))
    : [];
  notebooks.push(notebook);
  sessionStorage.setItem("notebooks", JSON.stringify(notebooks));
};
