import { Category } from "./category.model";

export interface Prompt {
  id: number;
  title: string;
  content: string;
  score: number;
  createdAt: string;
  category: Category;
  author: Author;
  userVote: 'up' | 'down' | null;
}

type Author = {
  id: number;
  username: string;
}
