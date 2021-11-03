const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router, query } = require("express");
const { Gear, User } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

/*GET ALL Gear by User Logged in*/
router.get("/mine", validateSession, function (req, res) {
	Gear.findAll({
		where: { userId: req.user.id },
		include: { model: User },
	})
		.then((post) => res.status(200).json(post))
		.catch((err) => res.status(500).json({ error: err }));
});

/*CREATE GEAR*/
router.post("/create", validateSession, function (req, res) {
	const gearPost = {
		gearType: req.body.gearType,
		title: req.body.title,
		brand: req.body.brand,
		price: req.body.price,
		userRating: req.body.userRating,
		userId: req.user.id,
	};
	Gear.create(gearPost)
		.then((gear) => res.status(200).json(gear))
		.catch((err) => res.status(500).json({ error: err }));
});

/*UPDATE GEAR*/
router.put("/update/:entryId", validateSession, function (req, res) {
	const query = { where: { id: req.params.entryId, userId: req.user.id } };
	Gear.update(req.body, query)
		.then((gear) =>
			res.status(200).json({ message: "The Post has been updated." })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

/*DELETE Own Gear*/
router.delete("/delete/:entryId", validateSession, function (req, res) {
	const query = { where: { id: req.params.entryId, userId: req.user.id } };
	Gear.destroy(query)
		.then((gear) =>
			res.status(200).json({ message: "The Post has been DESTROYED!!!!" })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

/*Admin ability to DELETE any Gear*/
router.delete("/admindelete/:id", validateSession, function (req, res) {
	let query;
	if (req.user.admin === true) {
		query = { where: { id: req.params.id } };
	} else {
		query = { where: { id: req.params.id, owner: req.user.id } };
	}
	Gear.destroy(query)
		.then((gear) => {
			if (gear !== 0) {
				res.status(200).json({ message: "This Gear has been DESTROYED!!!!" });
			} else {
				res.status(200).json({ message: "No Gear exists" });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
