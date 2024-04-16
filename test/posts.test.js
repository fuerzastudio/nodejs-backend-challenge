const request = require("supertest");
const app = require("../src/app");

describe("Posts", () => {
  test("GET /blogs should return a list of posts", async () => {
    const response = await request(app).get("/blogs");
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toBe(0);
  });

  test("POST /blogs should create a new post", async () => {
    const res = await request(app)
      .post("/blogs")
      .send({
        title: "Post title",
        body: "Lorem ipsum dolor sit amet.",
        tags: ["tag"],
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("data");
  });

  test("GET /blogs/:id should return a post", async () => {
    const created = await request(app)
      .post("/blogs")
      .send({
        title: "Post title",
        body: "Lorem ipsum dolor sit amet.",
        tags: ["tag"],
      });

    const res = await request(app).get(`/blogs/${created.body.data.id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("post");
    expect(res.body.post.id).toEqual(created.body.data.id);
  });

  test("PUT /blogs/:id should update a post", async () => {
    const created = await request(app)
      .post("/blogs")
      .send({
        title: "Post title",
        body: "Lorem ipsum dolor sit amet.",
        tags: ["tag"],
      });

    const updated = await request(app)
      .put(`/blogs/${created.body.data.id}`)
      .send({
        title: "Post updated",
        body: "Lorem ipsum dolor sit amet.",
        tags: ["tag"],
      });

    expect(updated.statusCode).toEqual(200);
    expect(updated.body).toHaveProperty("data");
    expect(updated.body.data.title).toEqual("Post updated");
    expect(updated.body.data.id).toEqual(created.body.data.id);
  });

  test("DELETE /blogs/:id should delete a post", async () => {
    const res = await request(app)
      .post("/blogs")
      .send({
        title: "Post title",
        body: "Lorem ipsum dolor sit amet.",
        tags: ["tag"],
      });

    const deleted = await request(app)
      .delete(`/blogs/${res.body.data.id}`)

    expect(deleted.statusCode).toEqual(200);
  });

  it("should return 404 when post not found", async () => {
    const res = await request(app).get(`/blogs/9999`);

    expect(res.statusCode).toEqual(404);
  });
});
