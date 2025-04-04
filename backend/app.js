const express = require("express");
const body_parser = require("body-parser");

const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");

const auth = require("./src/middlewares/auth.middleware");

require("dotenv").config();
const port = process.env.PORT || 3000;

// connect to database
const connectDb = require("./src/config/db");
connectDb();

const app = express();

app.use(body_parser.json());
app.use(auth);

const schema = require("./schema");
app.use(
  "/graphql",
  createHandler({
    schema,
    graphiql: true,
    context: async (req, res) => {
      return { req, res };
    }
  }),
);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
