const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Router, query } = require("express");
const { Gear } = require("../models");
const validateSession = require("../middleware/validate-session");

const router = Router();

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

/*DELETE Create*/
router.delete("/delete/:id", validateSession, function (req, res) {
	const query = { where: { id: req.params.id, userId: req.user.id } };
	Gear.destroy(query)
		.then((gear) =>
			res.status(200).json({ message: "The Post has been DESTROYED!!!!" })
		)
		.catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
