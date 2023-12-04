import React from "react";
import Article from "./Article";
import browsersData from "../data/browsers.json";
import Nav from "./Nav";
import Footer from "./Footer";


function App({ }) {
    return (
        <article>
            <Nav/>
            <div>
                {browsersData.map((article, i) => (
                    <Article key={i} article={article} />
                ))}
            </div>
            <Footer/>
        </article>
    );
}

export default App;