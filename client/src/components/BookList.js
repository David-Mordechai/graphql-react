import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from '../queries/queries';
import BookDetails from "./BookDetails";

function BookList() {
    const [selected, setSelected] = useState();

    const query = useQuery(getBooksQuery)
    if (query.loading)
        return (<div>Loading books...</div>)

    return (
        <div>
            <ul id="book-list">
                {query.data.books.map(b => <li key={b.id} onClick={(e) => { setSelected(b.id) }}>{b.name}</li>)}
            </ul>
            <div class="book-details">
                <BookDetails id={selected}></BookDetails>
            </div>

        </div>
    )
}

export default BookList;
