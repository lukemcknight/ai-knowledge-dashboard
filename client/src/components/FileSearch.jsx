import { useState, useEffect } from "react";
import { sendQuery } from '../api/file.js';
import SearchInput from "./SearchInput.jsx";

export default function FileSearch({ setAnswer, setLoading, setChats }) {
    const [query, setQuery] = useState(null);
    const [error, setError] = useState(null);

    const handleQuerySearch = (event) => {
        setQuery(event.target.value);
    };


    const uploadQuery = async (query) => {
        if (!query) {
            alert("No search")
            return;
        }
        try {
            setLoading(true)
            console.log("Sending query")
            const response = await sendQuery(query)
            console.log(response)

            if (!response.answer) {
                console.log("Error")
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            setAnswer(response.answer)
            console.log("Query Uploaded")
        } catch (error) {
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <SearchInput onSend={uploadQuery} setChats={setChats} />
        </div>
    )
}