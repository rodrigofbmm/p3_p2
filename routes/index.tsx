import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import BookComponent from "../components/BookComponent.tsx";

type Book = {
  id: string;
  title: string;
  cover?: string;
  author: string;
};

type Data = {
  books: Book[];
};

type bookAPI = {
  docs: Array<{
    key: string;
    title: string;
    cover_i?: number;
    author_name?: string[];
  }>;
};

const featuredBooks = [
  "To Kill a Mockingbird",
  "1984",
  "The Great Gatsby",
  "Pride and Prejudice",
  "The Hobbit",
  "Moby-Dick",
  "Jane Eyre",
  "War and Peace",
  "The Catcher in the Rye",
  "Brave New World",
  "The Lord of the Rings",
  "Crime and Punishment",
  "The Alchemist",
  "The Picture of Dorian Gray",
  "Harry Potter and the Sorcerer's Stone",
];

export const handler: Handlers = {
  GET: async (_req: Request, ctx: FreshContext<unknown, Data>) => {
    const books: Book[] = [];

    for (const title of featuredBooks) {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`;
      const res = await fetch(url);
      const json: bookAPI = await res.json();
      const data = json.docs[0];

      if (data) {
        books.push({
          id: data.key.replace("/works/", ""),
          title: data.title,
          cover: data.cover_i
            ? `https://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg`
            : "No hay portada disponible",
          author: data.author_name?.[0] ?? "Autor desconocido",
        });
      }
    }

    return ctx.render({ books });
  },
};

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <a href="/search">Buscar un libro</a>
      <BookComponent books={props.data.books} />
    </div>
  );
};

export default Page;
