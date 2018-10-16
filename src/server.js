

let express = require('express');
let app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('./build'));

app.get('/*', (req, res) => {
  let home = __dirname.replace('src', 'build/');
  console.log('home', home);
  res.sendFile(home);
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});