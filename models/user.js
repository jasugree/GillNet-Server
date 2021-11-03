const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const User = db.define("user", {
	profileImage: DataTypes.STRING(500),
	userName: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	firstName: DataTypes.STRING,
	lastName: DataTypes.STRING,
	email: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	passwordhash: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: DataTypes.STRING,
	age: DataTypes.INTEGER,
	city: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	state: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	admin: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true,
	},
});

module.exports = User;
