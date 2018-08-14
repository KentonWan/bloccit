const Post = require("./models").Post;

module.exports={

  getPosts(id, callback){
    return Post.findById(id)
    .then((posts)=>{
      callback(null,posts)
    })
    .catch((err)=>{
      callback(err);
    })
  },

}
