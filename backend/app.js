const express = require("express");
const body_parser = require("body-parser");
const cors = require("cors");

const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");

const auth = require("./src/middlewares/auth.middleware");

require("dotenv").config();
const port = process.env.PORT || 3000;
const frontend_url = process.env.FRONTEND_URL;

// connect to database
const connectDb = require("./src/config/db");
connectDb();

const app = express();

// Solve for CORS error
let cors_options = {
  origin: [frontend_url],
};
app.use(cors(cors_options));

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
    },
  })
);

app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
