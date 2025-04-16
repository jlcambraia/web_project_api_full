const Card = require("../models/card");
const BadRequestError = require("../errors/bad-request-err");
const NotFoundError = require("../errors/not-found-err");
const ForbiddenError = require("../errors/forbidden-err");

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  if (!name || !link) {
    throw new BadRequestError("Dados inválidos fornecidos");
  }

  return Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(
          new BadRequestError("Dados inválidos fornecidos para criar cartão")
        );
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError("Cartão não encontrado");
    })
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(
          "Você não tem permissão para excluir este cartão"
        );
      }

      return Card.findByIdAndDelete(req.params.cardId).then((deletedCard) =>
        res.send({ data: deletedCard })
      );
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Cartão não encontrado");
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de cartão inválido"));
      }
      return next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      throw new NotFoundError("Cartão não encontrado");
    })
    .then((card) => {
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("ID de cartão inválido"));
      }
      return next(err);
    });
};
