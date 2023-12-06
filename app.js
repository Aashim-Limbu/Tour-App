const fs = require("fs");
const express = require("express");
const app = express();
const tours = JSON.parse(fs.readFileSync("./tours.json"));
app.get("/api/v1/tours", (req, res) => {
	res.status(200).json({
		state: "success",
		length: tours.length,
		data: {
			tours,
		},
	});
});
app.listen(8001, () => {
	console.log("__Listening To Port 8001__");
});
