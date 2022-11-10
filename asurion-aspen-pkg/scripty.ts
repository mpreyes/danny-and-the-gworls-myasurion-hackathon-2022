import * as fs from "fs";
import path from "path";

var file = fs.readFile(
	path.join(__dirname, "./ASPEN.md"),
	"utf8",
	(error, data) => {
		console.log("wee", data);
		if (error) {
			console.log("error", error);
		}
	}
);

console.log("yet", file);
