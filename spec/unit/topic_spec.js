const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const User = require("../../src/db/models").User;

describe("Topic", () => {

  beforeEach((done)=> {
    this.topic;
    this.post;
    this.User

    sequelize.sync({force: true}).then((res)=> {

      User.create({
        email:"starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user)=> {
        this.user = user;
      
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks",
            userId: this.user.id
          }]
          }, {
            include: {
              model: Post,
              as: "posts"
            }
          })
          .then((topic)=>{
            this.topic=topic;
            this.post= topic.posts[0];
            done();
          });
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
        expect(associatedPosts[0].title).toBe("My first visit to Proxima Centauri b");
        done();
      });
    });
  });
})
