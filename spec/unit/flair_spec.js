const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Flair = require("../../src/db/models").Flair;

describe("Flair", () => {

  beforeEach((done)=> {

    this.topic;
    this.flair;
    sequelize.sync({force: true}).then((res)=>{

      Topic.create({
        title: "Implementing Flair",
        description: "It is hard"
      })
      .then((topic) => {
        this.topic = topic;

        Flair.create({
          name: "Rick",
          color: "red",
          topicId: this.topic.id
        })
        .then((flair)=> {
          this.flair = flair;
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
    it("should create a flair with name and color", (done)=>{
      Flair.create({
        name: "John",
        color: "blue",
        topicId: this.topic.id
      })
      .then((flair)=>{
        expect(flair.name).toBe("John");
        expect(flair.color).toBe("blue");
        done();
      });
    });

    it("should not create a flair with a missing name or color", (done)=>{
      Flair.create({
        name: "Jack"
      })
      .then((flair)=>{
        done();
      })
      .catch((err)=>{
        expect(err.message).toContain("Flair.color cannot be null");
        done();
      })
    });
  });

  describe("#setTopic()",() => {
    it("should associate a topic and a flair together", (done)=> {
      Topic.create({
        title: "Challenges of interstellar travel",
        description: "1. The Wi-Fi is terrible"
      })
      .then((newTopic)=> {
        expect(this.flair.topicId).toBe(this.topic.id);

        this.flair.setTopic(newTopic)
        .then((flair)=>{
          expect(flair.topicId).toBe(newTopic.id);
          done();
        });
      });
    });
  });

  describe("getTopic()", () => {
    it("should return the associated topic", (done)=>{
      this.flair.getTopic()
      .then((associatedTopic)=> {
        expect(associatedTopic.title).toBe("Implementing Flair");
        done();
      });
    });
  });
});
