const CorsMiddleware = (req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With ,allow-access"
	);
	res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE, OPTIONS");
	res.header(
		"access-control-allow-headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	return next();
};

module.exports = CorsMiddleware;

// -----------------------------------

// module.exports = function (req, res, next) {
// 	res.header("access-control-allow-origin", "*");
// 	res.header("access-control-allow-methods", "GET, POST, PUT, DELETE");
// 	res.header(
// 		"access-control-allow-headers",
// 		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
// 	);

// 	next();
// };
// HELLO
