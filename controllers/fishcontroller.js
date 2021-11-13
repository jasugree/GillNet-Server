const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router } = require("express");
const { Fish, User } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

/*GET ALL Fish Logged*/
router.get("/", validateSession, function (req, res) {
	User.findAll({
		include: { model: Fish },
	})
		.then((users) => {
			const fish = [];
			users.forEach((user) => {
				user.fishes.forEach((f) =>
					fish.push({
						...f.dataValues,
						user: {
							userName: user.userName,
							profileImage: user.profileImage,
							city: user.city,
							state: user.state,
						},
					})
				);
			});
			res.status(200).json(fish);
		})
		.catch((err) => res.status(500).json({ error: err }));
});

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
		userId: req.user.id,
	};
	Fish.create(fishPost)
		.then((fish) =>
			res.status(200).json({
				...fish.dataValues,
				user: {
					userName: req.user.userName,
					profileImage: req.user.profileImage,
					id: req.user.id,
				},
			})
		)
		.catch((err) => res.status(500).json({ error: err }));
});

/*UPDATE Fish*/
router.put("/update/:entryId", validateSession, function (req, res) {
	const fishPost = {
		species: req.body.species,
		weight: req.body.weight,
		length: req.body.length,
		catchAndRelease: req.body.catchAndRelease,
		caption: req.body.caption,
	};
	const query = {
		where: { id: req.params.entryId, userId: req.user.id },
		returning: true,
	};
	Fish.update(fishPost, {
		where: { id: req.params.entryId, userId: req.user.id },
		returning: true,
	})
		.then((response) => {
			console.log(response);
			res.status(200).json({
				...response[1][0].dataValues,
				user: {
					userName: req.user.userName,
					profileImage: req.user.profileImage,
					id: req.user.id,
				},
			});
		})
		.catch((err) => res.status(500).json({ error: err }));
});

/*DELETE Fish*/
router.delete("/delete/:entryId", validateSession, function (req, res) {
	const query = { where: { id: req.params.entryId, userId: req.user.id } };
	Fish.destroy(query)
		.then((fish) =>
			res.status(200).json({ message: "The Post has been DESTROYED!!!!" })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

/*GET ALL Fish with User*/
router.get("/", validateSession, function (req, res) {
	Fish.findAll({
		include: { model: User },
	})
		.then((fish) => res.status(200).json(fish))
		.catch((err) => res.status(500).json({ error: err }));
});

/*GET ALL Fish with User in City*/
router.get("/locationfeed", validateSession, function (req, res) {
	User.findAll({
		where: { city: req.user.city, state: req.user.state },
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

/*Users liking Fish Post*/
router.post("/like/:id", validateSession, function (req, res) {
	Fish.findOne({
		where: { id: req.params.id },
	})
		.then((fish) => {
			fish.like(req.user.id);

			Fish.update(
				{ likes: fish.likes },
				{ where: { id: req.params.id }, returning: true }
			).then((result) => {
				res.status(200).json({ fish: result[1][0] });
			});
		})
		.catch((err) => {
			res.status(500).json({ message: "This fish doesn't exists" });
		});
});

/*Admin ability to DELETE any Fish*/
router.delete("/admindelete/:id", validateSession, function (req, res) {
	let query;
	if (req.user.admin === true) {
		query = { where: { id: req.params.id } };
	} else {
		query = { where: { id: req.params.id, owner: req.user.id } };
	}
	Fish.destroy(query)
		.then((fish) => {
			if (fish !== 0) {
				res.status(200).json({ message: "The Post has been DESTROYED!!!!" });
			} else {
				res.status(200).json({ message: "No fish exists" });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
