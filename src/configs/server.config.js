const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("../routes");

require("dotenv").config();

const app = express();

// helpers
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configs
app.set("port", process.env.PORT || 3030);

// register routes
app.use("/api/categorie", routes.categorie);
app.use("/api/product", routes.product);
app.use("/api/state", routes.states);

module.exports = app;
