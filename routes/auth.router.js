const router = require("express").Router();
const User = require("../modals/User.modal");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User(req.body);

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    await User.findOne({
      username: req.body.username,
    }).then((user) => {
      if (user) {
        if (user.password !== req.body.password) {
          res.status(401).json("Wrong credentials!!");
        } else {
          const { password, ...others } = user._doc;
          res.status(200).json(others);
        }
      } else {
        res.status(401).json("wrong data");
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
