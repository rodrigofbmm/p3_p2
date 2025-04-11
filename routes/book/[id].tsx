import { Handlers, PageProps, FreshContext } from "$fresh/server.ts";
import BookID from "../../components/BookID.tsx";

type Data = {
  id: string;
  title: string;
  year?: string;
  pages?: number;
  description?: string;
  cover?: string;
  authorName?: string;
  authorId?: string;
};

export const handler: Handlers<Data> = {
    GET: async (req: Request, ctx: FreshContext<unknown, Data>) => {
        const { id } = ctx.params;
      
          const resultado = await fetch(`https://openlibrary.org/works/${id}.json`);
                
          const data = await resultado.json();
      
          const title = data.title;
          const description = typeof data.description === "string"
            ? data.description
            : "no hay";
          const year = data.first_publish_date;
          const pages = data.number_of_pages;
          const cover = data.covers?.[0]
            ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-L.jpg`
            : undefined;
      
          const authorKey = data.authors?.[0]?.author?.key;
          const authorId = authorKey?.replace("/authors/", "");      
          
          const authorRes = await fetch(`https://openlibrary.org/authors/${authorId}.json`);
          const authorData = await authorRes.json();
          const authorName = authorData.name;
            
      
          return ctx.render({
            id,
            title,
            description,
            year,
            pages,
            cover,
            authorId,
            authorName,
          });
      
        
      }
      
};

export default function BookPage({ data }: PageProps<Book>) {
    const { id,title,description,year,pages,cover,authorId,authorName,} = data;

    return (
      <div class="container">
        <BookID book={data} />
      </div>
    );
  }

