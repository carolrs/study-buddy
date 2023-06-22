const request = require('supertest');
const app = require('../../app');
const Post = require('../../models/post');
const User = require('../../models/user');
const mongoose = require("mongoose");
const Group = require('../../models/group');

require("../mongodb_helper");

const JWT = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

describe('PostsController', () => {
  
  let token;
  beforeAll( async () => {
    const user = new User({email: "test@test.com", username: "test", password: "12345678"});
    await user.save();

    token = JWT.sign({
      user_id: user.id,
      iat: Math.floor(Date.now() / 1000) - (5 * 60),
      exp: Math.floor(Date.now() / 1000) + (10 * 60)
    }, secret);
  });

  beforeEach( async () => {
    await Post.deleteMany({});
    await Group.deleteMany({});
  })

  afterAll( async () => {
    await Group.deleteMany({});
    await User.deleteMany({});
    await Post.deleteMany({});
  })

  it('should fetch all posts in a group', async () => {
    const post1 = new Post({message: "post1", group: mongoose.Types.ObjectId("5e9f5b9a9f9e4b1d9c0c9b1a")})
    const post2 = new Post({message: "post2", group: mongoose.Types.ObjectId("5e9f5b9a9f9e4b1d9c0c9b1a")})
    await post1.save();
    await post2.save();

    const res = await request(app)
      .get('/posts?group=5e9f5b9a9f9e4b1d9c0c9b1a')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.posts[0].message).toEqual(post1.message);
    expect(res.body.posts[1].message).toEqual(post2.message);
    expect(res.body.posts[0].group).toEqual("5e9f5b9a9f9e4b1d9c0c9b1a");
    expect(res.body.posts[1].group).toEqual("5e9f5b9a9f9e4b1d9c0c9b1a");

  });

  it('should create a new post', async () => {
    const mockPost = {
      message: 'post1', 
      group: "5e9f5b9a9f9e4b1d9c0c9b1a"
    };

    const res = await request(app)
      .post('/posts')
      .send(mockPost)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('OK');
  });
});
