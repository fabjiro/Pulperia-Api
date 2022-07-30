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

// register routes api
app.use("/api/categorie", routes.api.categorie);
app.use("/api/product", routes.api.product);
app.use("/api/state", routes.api.states);
app.use("/api/user", routes.api.users);

// register routes auth
app.use("/auth/login", routes.auth.login);

module.exports = app;
