const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { Fish, User } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

/*CREATE FISH*/
router.post("/create", validateSession, function (req, res) {
	console.log(req.user.id);
	const fishPost = {
		fishImage: req.body.fishImage,
		species: req.body.species,
		weight: req.body.weight,
		length: req.body.length,
		catchAndRelease: req.body.catchAndRelease,
		caption: req.body.caption,
		likes: req.body.likes,
		userId: req.user.id,
	};
	Fish.create(fishPost)
		.then((fish) => res.status(200).json(fish))
		.catch((err) => res.status(500).json({ error: err }));
});

// /*UPDATE Fish*/
// router.put("/update/:id", validateSession, function (req, res) {
// 	const fishPost = {
// 		species: req.body.species,
// 		weight: req.body.weight,
// 		length: req.body.length,
// 		catchAndRelease: req.body.catchAndRelease,
// 		caption: req.body.caption,
// 	};
// 	const query = { where: { id: req.params.entryId, owner: req.user.id } };
// 	Post.update(fishPost, query)
// 		.then((fishes) =>
// 			res.status(200).json({ message: "The Post has been updated." })
// 		)
// 		.catch((err) => res.status(500).json({ error: err }));
// });

/*GET ALL Fish with User*/
router.get("/", validateSession, function (req, res) {
	Fish.findAll({
		include: { model: User },
	})
		.then((fish) => res.status(200).json(fish))
		.catch((err) => res.status(500).json({ error: err }));
});

/*GET ALL Fish with User in City*/
router.get("/:city/:state", validateSession, function (req, res) {
	User.findAll({
		where: { city: req.params.city, state: req.params.state },
		include: { model: Fish },
	})
		.then((users) => {
			const fish = [];
			users.forEach((user) => {
				user.fishes.forEach((f) =>
					fish.push({
						...f.dataValues,
						user: { userName: user.userName, profileImage: user.profileImage },
					})
				);
			});
			res.status(200).json(fish);
		})
		.catch((err) => res.status(500).json({ error: err }));
});

/*GET ALL Fish by User Logged in*/
router.get("/mine", validateSession, function (req, res) {
	Fish.findAll({
		where: { userId: req.user.id },
		include: { model: User },
	})
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
