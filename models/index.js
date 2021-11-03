const User = require("./user");
const Fish = require("./fish");
const Gear = require("./gear");

// create individual files for your models and import them here

// Setup Associations
User.hasMany(Fish); //Relating many fish catches to a single user
Fish.belongsTo(User); //Each catch belongs to a specific user

User.hasMany(Gear); //Relating many pieces of gear to a single user
Gear.belongsTo(User); //Each piece of gear belongs to a specific user

module.exports = {
	User,
	Fish,
	Gear,
};
