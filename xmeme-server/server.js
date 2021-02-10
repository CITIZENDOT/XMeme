const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8081;
const SWAGGER_PORT = process.env.PORT || 8080;
const routes = require("./api.js");
const mongoose = require("mongoose");
require("dotenv").config();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger.json");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use("/", routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/xmeme", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);

const swaggerApp = express();
swaggerApp.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));
swaggerApp.listen(SWAGGER_PORT, "0.0.0.0", () =>
  console.log(`Swagger UI is listening at http://localhost:${SWAGGER_PORT}`)
);
