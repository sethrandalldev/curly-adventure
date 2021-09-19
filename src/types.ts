export interface Notebook {
  _id: string;
  title: string;
  description: string;
  pages: Array<Page>;
  userId: string;
}

export interface Page {
  _id: string;
  title: string;
  body: string;
  notebookId: string;
}
