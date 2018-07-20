

let express = require('express');
let app = express();

const PORT = process.env.PORT || 8080;

app.use(express.static('./build'));

app.use((req, res) => {
  res.status(404).send('Sorry, that route does not exist.');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});