import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

function AddBook() {

    const [name, setName] = useState({name: ''});
    const [genre, setGenre] = useState({genre: ''});
    const [authorId, setAuthorId] = useState({authorId: ''});

    function DisplayAuthors() {
        const query = useQuery(getAuthorsQuery)
        if (query.loading)
            return (<option>Loading authors...</option>)

        return query.data.authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        console.log(name, genre, authorId);
        addBook();
    }

    const [addBook] = useMutation(addBookMutation, {
        variables:{
            name,
            genre,
            authorId
        },
        refetchQueries: [{query: getBooksQuery}]
    });

    return (
        <form id="add-book" onSubmit={HandleSubmit}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    {DisplayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    )
}

export default AddBook;