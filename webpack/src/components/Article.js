import React from "react";
import Section from "./Section";

function Article(  {article} ) {
    return (
        <section>
            <Section {...article}/>
        </section>
    );
}

export default Article;