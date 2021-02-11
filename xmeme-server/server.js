const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 8081;
const SWAGGER_PORT = 8080;
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

if (process.env.NODE_ENV !== "testing") {
  app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);

if (process.env.NODE_ENV === "testing") {
  const swaggerApp = express();
  swaggerApp.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  swaggerApp.listen(SWAGGER_PORT, () =>
    console.log(`Swagger UI is listening at http://localhost:${SWAGGER_PORT}`)
  );
}
