const { DataTypes } = require("sequelize");
const db = require("../db");

const Gear = db.define("gear", {
	gearType: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	brand: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	price: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userRating: {
		type: DataTypes.INTEGER,
		allowNull: false,
	},
});

module.exports = Gear;
