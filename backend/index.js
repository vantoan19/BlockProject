const app = require('./App')

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log("Backend server is up on port", port);
});
