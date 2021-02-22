const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const Blog = require('./models/blog');
const methodOverride = require('method-override');
const expressSanitizer = require('express-sanitizer');

mongoose.connect('mongodb://localhost/blog_demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(expressSanitizer());

app.get('/', (req, res) => {
  res.render('landing');
});
// Index
app.get('/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      console.log(err);
    } else {
      res.render('index', { blogs: blogs });
    }
  });
});

// New
app.get('/blogs/new', (req, res) => {
  res.render('new');
});

// Create
app.post('/blogs', (req, res) => {
  //   const sanitizedString = req.sanitize(req.body.blog);
  Blog.create(req.body.blog, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/blogs');
    }
  });
});

// Show
app.get('/blogs/:id', (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.render('show', { blog: blog });
    }
  });
});

// Edit
app.get('/blogs/:id/edit', (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) {
      console.log(err);
    } else {
      res.render('edit', { blog: blog });
    }
  });
});

// Update
app.put('/blogs/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, (err, update) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/blogs/' + req.params.id);
    }
  });
});

// Destroy
app.delete('/blogs/:id', (req, res) => {
  Blog.findByIdAndDelete(req.params.id, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
  res.redirect('/blogs');
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
