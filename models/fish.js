const { DataTypes, Model } = require("sequelize");
const db = require("../db");

class Fish extends Model {
	like(userId) {
		if (this.likes.includes(userId)) {
			this.likes = this.likes.filter((id) => id != userId);
		} else {
			this.likes.push(userId);
		}
	}
}
Fish.init(
	{
		fishImage: {
			type: DataTypes.STRING(500),
			allowNull: false,
		},
		species: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		weight: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		length: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		catchAndRelease: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		caption: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		likes: {
			type: DataTypes.ARRAY(DataTypes.INTEGER),
			defaultValue: [],
			allowNull: false,
		},
	},
	{
		sequelize: db,
		modelName: "fish",
		hooks: {
			beforeCreate: async (fish, options) => {
				fish.like(fish.userId);
			},
		},
	}
);

// const Fish = db.define("fish", {
// 	fishImage: {
// 		type: DataTypes.STRING(500),
// 		allowNull: false,
// 	},
// 	species: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 	},
// 	weight: {
// 		type: DataTypes.INTEGER,
// 		allowNull: false,
// 	},
// 	length: {
// 		type: DataTypes.INTEGER,
// 		allowNull: false,
// 	},
// 	catchAndRelease: {
// 		type: DataTypes.BOOLEAN,
// 		allowNull: false,
// 	},
// 	caption: {
// 		type: DataTypes.STRING,
// 		allowNull: false,
// 	},
// 	likes: {
// 		type: DataTypes.ARRAY(DataTypes.INTEGER),
// 		defaultValue: [],
// 		allowNull: false,
// 	},
// });

module.exports = Fish;
