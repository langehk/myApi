// Importerer package - express.
const express = require('express');
//Execute express i vores app.
const app = express();
const Post = require('./models/Post');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Middleware.
app.use(cors());
/*
Hver gang vi bruger en request, sørger vi for, at body-parser kører!
*/
app.use(bodyParser.json());
// Man kan nu lave routes.

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: '1.0.0',
      title: 'Customer API',
      description: 'Customer API Information',
      contact: {
        name: 'Amazing Developer',
      },
      servers: ['http://localhost:5000'],
    },
  },
  // ['.routes/*.js']
  apis: ['app.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
/**
 * @swagger
 * /posts:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Henter alle vores posts.
    res.json(posts);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /post:
 *    post:
 *      description: Create post
 *    parameters:
 *      - in: body
 *        name: post
 *        description: create post
 *        schema:
 *          type: object
 *        properties:
 *          title:
 *            type: string
 *          description:
 *            type: string
 *    responses:
 *      '201':
 *        description: Successfully created post
 */
app.post('/post', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });
  //Gemmer til vores DB.
  try {
    const savedPost = await post.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
});

/**
 * @swagger
 * /post/{id}:
 *    get:
 *     summary: Post by id
 *     description: Post by id
 *    parameters:
 *      - in: body
 *        name: post
 *        description: get a specific post
 *        schema:
 *          type: integer
 *          format: integer
 *        properties:
 *          id:
 *            type: integer
 *    responses:
 *      '201':
 *        description: Successfully created post
 */
app.get('/post/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    res.json(post);
  } catch (err) {
    res.json({ message: err });
  }
});

//Middleware.
//app.use('/posts', postsRoute);
//app.use('/users', usersRoute);

// Connect to DB.
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('connected to DB!');
});

//How to listen to the server.
// Angiv en port.
app.listen(3000);
