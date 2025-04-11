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
  
type Props = {
    book: Data;
};
  
export default function BookID({ book }: Props) {
    return (
      <div class="container">
        <h1 class="title">{book.title}</h1>
        <p class="description">{book.description}</p>
        {book.cover && <img class="cover" src={book.cover} alt={`Portada de ${book.title}`} />}
        <p><strong>Año de publicación:</strong> {book.year || "Desconocido"}</p>
        <p><strong>Páginas:</strong> {book.pages || "Desconocido"}</p>
        <p><strong>Autor:</strong> <a href={`/author/${book.authorId}`}>{book.authorName}</a></p>
      </div>
    );
}
  