const mongoose = require("mongoose");

const errorHandler = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = "Dados inválidos fornecidos";
  }

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = "ID inválido";
  }

  if (err.name === "DocumentNotFoundError") {
    statusCode = 404;
    message = "Recurso não encontrado";
  }

  if (err.name === "ForbiddenError") {
    statusCode = 403;
    message = "Acesso proibido";
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? "Erro interno do servidor" : message,
  });
};

module.exports = errorHandler;
