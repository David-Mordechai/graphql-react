import { useQuery } from "@apollo/client";
import { getBookQuery } from '../queries/queries';

function BookDetails(_id) {

    const { loading, error, data } = useQuery(
        getBookQuery, {
        variables: {
            id: _id.id
        },
    });

    if (loading) return null;
    if (error) return `Error! ${error}`;


    const displayBookDetails = () => {
        const { book } = data;
        if (book) {
            return (
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author:</p>
                    <ul className="other-books">
                        {
                            book.author.books.map(item => {
                                return <li key={item.id}>{item.name}</li>
                            })
                        }
                    </ul>
                </div>
            )
        }
        return (<div>No book selected...</div>)
    }

    return (displayBookDetails());
}

export default BookDetails;
