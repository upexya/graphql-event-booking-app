const express = require("express");
const body_parser = require("body-parser");

const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");

require("dotenv").config();
const port = process.env.PORT || 3000;

// connect to database
const connectDb = require("./src/config/db");
connectDb();

const app = express();

app.use(body_parser.json());

const schema = require("./schema");
app.use(
  "/graphql",
  createHandler({
    schema,
    graphiql: true,
  })
);

// error handling middleware
const {
  errorHandler,
  notFound,
} = require("./src/middlewares/error.middleware");
app.use(notFound);
app.use(errorHandler);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
