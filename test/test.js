const jwt = require("jsonwebtoken");
const request = require("supertest");
const app = require("../app");

process.env.NODE_ENV = "test";

let token;
let postId;

const userData = {
  userId: "52866f71-7f05-4579-9c4f-c717537a3305",
};
token = jwt.sign(userData, process.env.SECRET_KEY);

afterAll((done) => {
  done();
});

describe("GET /api/posts", () => {
  it("should return 404 if no posts are found", async () => {
    const res = await request(app)
      .get("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1, limit: 10 });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("No posts found");
  });
});

describe("POST /api/posts", () => {
  it("should create a new post", async () => {
    const res = await request(app)
      .post("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Post",
        body: "This is a test post",
        tags: ["test"],
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("Post Created");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.title).toEqual("Test Post");
    expect(res.body.data.body).toEqual("This is a test post");
    expect(res.body.data.tags).toEqual(["test"]);
    expect(res.body.message).toEqual("Post Created");

    postId = res.body.data.id;
  });
});

describe("GET /api/posts", () => {
  it("should get all posts", async () => {
    const res = await request(app)
      .get("/api/posts")
      .set("Authorization", `Bearer ${token}`)
      .query({ page: 1, limit: 10 });

    expect(res.statusCode).toEqual(200);
    expect(res.body.page).toEqual(1);
    expect(res.body.limit).toEqual(10);
    expect(res.body.totalPosts).toBeGreaterThan(0);
    expect(res.body.posts).toBeInstanceOf(Array);
  });
});

describe("GET /api/posts/:id", () => {
  it("should get a post by ID", async () => {
    const res = await request(app)
      .get(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.id).toEqual(postId);
    expect(res.body.data.title).toEqual("Test Post");
    expect(res.body.data.body).toEqual("This is a test post");
    expect(res.body.data.tags).toEqual(["test"]);
    expect(res.body.data.createdAt).toBeDefined();
    expect(res.body.data.updatedAt).toBeDefined();
  });

  it("should return 404 if post is not found", async () => {
    const nonExistentPostId = "12345678-1234-1234-1234-123456789012";

    const res = await request(app)
      .get(`/api/posts/${nonExistentPostId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Post not found");
  });
});

describe("PUT /api/posts/:id", () => {
  it("should update a post", async () => {
    const res = await request(app)
      .put(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Test Post",
        body: "This is an updated test post",
        tags: ["updated"],
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual("Post Updated");
    expect(res.body.data).toHaveProperty("id");
    expect(res.body.data.title).toEqual("Updated Test Post");
    expect(res.body.data.body).toEqual("This is an updated test post");
    expect(res.body.data.tags).toEqual(["updated"]);
  });

  it("should return 404 if post not found", async () => {
    const nonExistentPostId = "12345678-1234-1234-1234-123456789012";
    const res = await request(app)
      .put(`/api/posts/${nonExistentPostId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Updated Test Post",
        body: "This is an updated test post",
        tags: ["updated"],
      });

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Post not found");
  });
});

describe("DELETE /api/posts/:id", () => {
  it("should delete a post", async () => {
    const res = await request(app)
      .delete(`/api/posts/${postId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual("Post Deleted Successfully");
  });

  it("should return 404 if post not found", async () => {
    const nonExistentPostId = "12345678-1234-1234-1234-123456789012";
    const res = await request(app)
      .delete(`/api/posts/${nonExistentPostId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(404);
    expect(res.body.error).toEqual("Post not found");
  });
});

describe("POST /api/auth/login", () => {
  it("should authenticate user and return a JWT token", async () => {
    const email = "user1@example.com";
    const password = "password1";

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: email, password: password });

    expect(res.statusCode).toEqual(200);

    expect(res.body).toHaveProperty("token");
  });

  it("should return 401 if user is not found", async () => {
    const email = "nonexisting@example.com";
    const password = "password";

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: email, password: password });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({ error: "User not found" });
  });

  it("should return 401 if password is invalid", async () => {
    const email = "user1@example.com";
    const password = "invalid_password";

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: email, password: password });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({ error: "Invalid password" });
  });
});
