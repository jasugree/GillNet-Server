const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { User } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

router.post("/create", function (req, res) {
	User.create({
		userName: req.body.userName,
		email: req.body.email,
		passwordhash: bcrypt.hashSync(req.body.passwordhash, 13),
		city: req.body.city,
		state: req.body.state,
		admin: req.body.admin,
	})
		.then(function createSuccess(user) {
			let token = jwt.sign(
				{ id: user.id, username: user.username },
				process.env.JWT_SECRET,
				{
					expiresIn: 60 * 60 * 24,
				}
			);
			res.json({
				user: user,
				message: "User Successfully Created",
				sessionToken: token,
			});
		})
		.catch(function (err) {
			res.status(500).json({ error: err });
		});
});

router.post("/login", function (req, res) {
	User.findOne({
		where: {
			userName: req.body.userName,
		},
	})
		.then(function loginSuccess(user) {
			if (user) {
				bcrypt.compare(
					req.body.passwordhash,
					user.passwordhash,
					function (err, matches) {
						if (matches) {
							let token = jwt.sign(
								{ id: user.id, username: user.username },
								process.env.JWT_SECRET,
								{
									expiresIn: 60 * 60 * 24,
								}
							);
							res.status(200).json({
								user: user,
								message: "User Successfully Logged in!",
								sessionToken: token,
							});
						} else {
							res.status(502).send({ error: "Login Failed" });
						}
					}
				);
			} else {
				res.status(500).json({ error: "User does not exist" });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
