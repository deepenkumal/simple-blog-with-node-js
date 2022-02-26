const connectDB = require("../connection/connection");
const { updateOne } = require("../model/articleModel");
const Article = require("../model/articleModel");

exports.newArticle = async (req, res) => {
  // const con = await connectDB();
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    article = await article.save();
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.render("/article/new-article", { article: article });
  }
};

exports.findArticle = async (req, res) => {
  // const con = await connectDB();
  const articles = await Article.find().sort({ created_at: "desc" });
  res.render("index", { articles: articles });
};

exports.findOneArticle = async (req, res) => {
  let slug = req.params.slug;
  try {
    // const con = await connectDB();
    const article = await Article.findOne({ slug: slug });
    res.render("single-article", { article: article });
  } catch (err) {
    res.send("Not Found");
  }
};

exports.deleteOneArticle = async (req, res) => {
  let slug = req.params.slug;
  try {
    const article = await Article.deleteOne({ slug: slug });
    console.log(article);
    res.redirect("/");
  } catch (er) {
    console.log(er);
    res.render("/article/slug");
  }
};

exports.updateOneArticle = async (req, res) => {
  let slug = req.params.slug;
  if (req.method == "GET") {
    try {
      const article = await Article.findOne({ slug: slug });
      res.render("update-article", { article: article });
    } catch (er) {
      console.log(er);
      res.render("/article/slug");
    }
  } else {
    if (req.method == "POST") {
      try {
        const article = await Article.updateOne(
          { slug: slug },
          {
            $set: {
              title: req.body.title,
              description: req.body.description,
            },
          }
        );
        res.redirect('/');
      } catch (er) {
        console.log(er);
        res.render("/article/slug");
      }
    }
  }
};
