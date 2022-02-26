const mongoose = require("mongoose");
const slugify = require("slugify");

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
    require: true,
  },
});

articleSchema.pre("validate", function(next) {  //function(next) in this arrow function isnot working
    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
  next();
});

module.exports = mongoose.model("articles", articleSchema); //(collection,schema)
