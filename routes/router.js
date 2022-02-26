const express = require("express");
const controller = require("../controller/controller");
const Article = require("../model/articleModel");

const router = express.Router();

router.get("/", controller.findArticle);

router.get("/article/new-article", (req, res) => {
  res.render("new-article", {
    title: "Blog :New article",
    article: new Article(),
  });
});

//single article
router.get("/article/:slug", controller.findOneArticle);
//create article
router.post("/article/new-article", controller.newArticle);
//delete article
router.get("/article/delete-article/:slug",controller.deleteOneArticle);
router.get("/article/update-article/:slug",controller.updateOneArticle);
router.post("/article/update-article/:slug",controller.updateOneArticle);

module.exports = router;
