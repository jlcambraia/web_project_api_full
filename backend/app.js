const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const usersRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const auth = require("./middleware/auth");

const NotFoundError = require("./errors/not-found-err");
const errorHandler = require("./errors/error-handler");

const { requestLogger, errorLogger } = require("./middleware/logger");

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/aroundb");

app.use(requestLogger);

app.post("/signin", login);
app.post("/signup", createUser);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardRouter);

app.use("*", (req, res, next) => {
  next(new NotFoundError("A solicitação não foi encontrada"));
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`O aplicativo está escutando na porta ${PORT}`);
});
