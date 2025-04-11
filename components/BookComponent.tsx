type Book = {
    id: string;
    title: string;
    cover?: string;
    author: string;
};

type Props = {
    books: Book[];
};

export default function BookComponent({ books }: Props) {
    return (
        <div>
        <div className="container">
            <h1 className="site-title">Libros encontrados</h1>
            <div className="books-grid">
                {books.map((book) => (
                    <div key={book.id} className="book-card">
                        {book.cover ? (
                            <img
                                src={book.cover}
                                alt={`Portada de ${book.title}`}
                                className="book-cover"
                            />
                        ) : (
                            <div className="no-cover">Sin portada</div>
                        )}
                        <h2 className="book-title">{book.title}</h2>
                        <p className="book-author">{book.author}</p>
                        <a className="center" href={`/book/${book.id}`}>Ver más</a>
                    </div>
                ))}
            </div>
        </div>
        <a className="center" href={`/`}>volver al inicio</a>
        </div>    
    );
}