export interface Article {
  id: string;
  articleId: string;
  title: string;
  content: string;
  link: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateArticle extends Omit<Article, 'id' | 'createdAt' | 'updatedAt' | 'articleId'> {}

export interface UpdateArticle {
  title?: string;
  content?: string;
  link?: string;
  author?: string;
}
