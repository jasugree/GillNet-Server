// const CorsMiddleware = (req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "POST, PUT, GET, DELETE, OPTIONS");
//   return next();
// };

// module.exports = CorsMiddleware;

module.exports = function (req, res, next) {
	res.header("access-control-allow-origin", "*");
	res.header("access-control-allow-methods", "GET, POST, PUT, DELETE");
	res.header(
		"access-control-allow-headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);

	next();
};
