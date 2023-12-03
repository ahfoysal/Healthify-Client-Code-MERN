export type IBook = {
  id: string;
  reference?: string;
  title: string;
  titleEnglish: string;
  description?: string;
  image: string;
  reviews?: [];
  author?: string;
  authorId?: string;
  edition?: string;
  genre: string[];
  related?: IBook[] | [];
  releaseDate?: Date;
  ratingsCount?: number;
  reviewersCount?: number;
};
