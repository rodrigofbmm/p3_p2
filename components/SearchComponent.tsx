import BookComponent from "./BookComponent.tsx";

export default function SearchComponent({ books }: Props) {
    return (
          <div>
            <form className="center" method="get">
              <input
                className="search-input"
                type="text"
                name="title"
                placeholder="Buscar título..."
              />
              <button className="search-button" type="submit">Buscar</button>
            </form>
      
            {books.length > 0 ? (
              <BookComponent books={books} />
            ) : (
              <p>No se encuentran libros con ese título.</p>
            )}
          </div>
    );
}