import React, { useState, useEffect } from "react";



/** 
 * fetches a quote from a quote api and renders it.
 * */

const quotesAPI = 'https://type.fit/api/quotes';

function Quotes () {
    const [quote, setQuote] = useState({ text: '', author: ''});
    
    useEffect(() => {
        fetch(quotesAPI)
        .then((response) => response.json())
        .then((data) => {
            const randomQuote = data[(Math.floor(Math.random() * data.length))];
            setQuote({ text: randomQuote.text, author: randomQuote.author?.replace(/,?\s*type\.fit/g, '') })
        })
    },[])

    return (
        <div>{quote.text} --{quote.author}</div>
    )
}
export default Quotes;