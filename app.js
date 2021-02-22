const express = require('express');
const app = express();
const PORT = process.env.PORT || 300;

app.set('view engine', 'ejs');
app.use();

app.get('/', (req, res) => {
  res.send('hanga banga');
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
