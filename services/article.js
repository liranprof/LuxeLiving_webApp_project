const Article = require('../models/article');

const createArticle = async (title,published) => {
    const article = new Article({
        title
    });

    if (published)
        article.published = published;

    return await article.save(); // insertOne()
};

const getArticleById = async (id) => {
    return  await Article.findById(id);
};

const getArticleByTitle = async (title) => {
    return await Article.find({ title });
};

const getArticles = async () => {
    try {
        console.log("getArticles function called");
        const articles = await Article.find({});
        console.log("Articles retrieved:", articles);
        return articles;
    } catch (error) {
        console.error("Error retrieving articles:", error);
        throw error;
    }
};

// const getArticles = async () => {
//     return  await Article.find({});
// };

const updateArticle = async (id, title) => {
    const article = await getArticleById(id);
    if (!article)
        return null;

    article.title = title;
    await article.save();
    return article;
};

const deleteArticle = async (id) => {
    const article = await getArticleById(id);
    if (!article)
        return null;

    await article.remove();
    return article;
};

module.exports = {
    createArticle,
    getArticleById,
    getArticles,
    updateArticle,
    deleteArticle,
    getArticleByTitle
}