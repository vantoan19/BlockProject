const express = require("express");
const BlockRouter = require("./routers/block_router");
const swaggerUi = require("swagger-ui-express");
const YAML = require('yamljs')


const app = express();

const swaggerDocs = YAML.load('./swagger.yaml');
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use(express.json());
app.use(BlockRouter);

module.exports = app