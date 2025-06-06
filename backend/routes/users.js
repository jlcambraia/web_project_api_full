const router = require("express").Router();

const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

const { validateAvatar } = require("../middleware/validators");

router.get("/", getUsers);

router.get("/me", getCurrentUser);

router.get("/:userId", getUser);

router.patch("/me", updateUser);

router.patch("/me/avatar", validateAvatar, updateAvatar);

module.exports = router;
