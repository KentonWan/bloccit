const Topic = require("./models").Topic;
const Post = require("./models").Post;

module.exports = {
  getAllTopics(callback){
    return Topic.all()

    .then((topics) => {
      callback(null, topics);
    })

    .catch((err)=> {
      callback(err);
    })
  },

  getTopic(id, callback){
    return Topic.findById(id, {
      include: [{
        model: Post,
        as: "posts"
      }]
    })
    .then((topic)=>{
      callback(null, topic);
    })
    .catch((err)=>{
      callback(err);
    })
  },
  // setTopic not implemented in checkpoint, but it tells us to use it. Cannot figure out how to implement it properly. Would like help.
  /*setTopic(id, callback){
    return Topic.findById(id)
    .then((topic)=>{
      .then((post)=> {
        callback(null, post);
      })
      .catch((err)=>{
        callback(err);
      })
    });
  },*/

  addTopic(newTopic,callback){
    return Topic.create({
      title: newTopic.title,
      description: newTopic.description
    })
    .then((topic)=> {
      callback(null, topic);
    })
    .catch((err)=> {
      callback(err);
    })
  },

  deleteTopic(id, callback){
    return Topic.destroy({
      where: {id}
    })
    .then((topic)=>{
      callback(null, topic);
    })
    .catch((err)=>{
      callback(err);
    })
  },

  updateTopic(id, updatedTopic, callback){
    return Topic.findById(id)
    .then((topic)=>{
      if(!topic){
        return callback("Topic not found");
      }

      topic.update(updatedTopic, {
        fields: Object.keys(updatedTopic)
      })
      .then(()=>{
        callback(null, topic);
      })
      .catch((err)=>{
        callback(err);
      });
    });
  }
}
