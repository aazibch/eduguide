const Article = (props) => {
    return (
        <article className='p-4'>
            <h2>{props.selectedArticle.title}</h2>
            <p>{props.selectedArticle.content}</p>
        </article>
    );
};

export default Article;
