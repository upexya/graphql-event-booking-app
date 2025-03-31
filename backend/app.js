const express = require("express");
const body_parser = require("body-parser");

require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();
app.use(body_parser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
