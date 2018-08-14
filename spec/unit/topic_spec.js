const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;

describe("Topic", () => {

  beforeEach((done)=> {
    this.topic;
    this.post;
    sequelize.sync({force: true}).then((res)=> {
      Topic.create({
        title: "Post Resources Assignment",
        description: "create a test file with test for create and getPosts methods",
        })
        .then((topic)=>{
          this.topic=topic;

          Post.create({
            title: "Not sure what I'm doing",
            body: "I'm just attempting random stuff",
            topicId: this.topic.id,
          })
          .then((post)=>{
            this.post = post;
            done();
          });
        })
        .catch((err)=>{
          console.log(err);
          done();
        });
      });
    });

  describe("#create()", () => {
    it("should create a new topic with a title and description", (done)=>{
      Topic.create({
        title: "Post Resources Assignment",
        description: "create a test file with test for create and getPosts methods",
      })
      .then((topic)=> {
        expect(topic.title).toBe("Post Resources Assignment");
        expect(topic.description).toBe("create a test file with test for create and getPosts methods");
        done();
      })
      .catch((err)=>{
        console.log(err);
        done();
      });
    })
  });

  describe("#getPosts()", () => {
    it("should get all the posts associated with chosen topic", (done)=>{
      this.topic.getPosts()
      .then((associatedPosts)=>{
        expect(associatedPosts[0].title).toBe("Not sure what I'm doing");
        done();
      });
    });
  });
})
