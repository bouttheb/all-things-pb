export interface Book {
  title: string;
  url: string;
  gradient: string;
}

export const BOOKS: Book[] = [
  {
    title: "The Tofu\nJournal",
    url: "https://amzn.to/4r8R4sE",
    gradient: "linear-gradient(135deg,#1a2332,#2a3a55)",
  },
  {
    title: "Shepherd\nof Souls",
    url: "https://amzn.to/4aKEZ63",
    gradient: "linear-gradient(135deg,#2a1a1a,#503030)",
  },
];
