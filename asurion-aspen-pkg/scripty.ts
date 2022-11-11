import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { join } from "path";
function findAspenFile(attempts?: number): any {
	attempts = attempts || 1;
	if (attempts > 5) {
		throw new Error("Can't resolve main ASPEN.mdn file");
	}
	var mainPath = attempts === 1 ? "./" : Array(attempts).join("../");
	// const c = require("./ASPEN.md");
	// console.log("ma", c);
	// console.log("require", require(mainPath + "ASPEN.md"));
	// try {
	// 	return require(mainPath + "ASPEN.md");
	// } catch (e) {
	// 	return findAspenFile(attempts + 1);
	// }
}

function syncReadFile(filename: string) {
	// const aspenFile = findAspenFile(1);
	// console.log("aspenFile", aspenFile);

	const result = fs.readFileSync(join("../../../ASPEN.mdn", filename), "utf-8");

	console.log("__dirname", __dirname, "filename", filename);

	return result;
}

let fileData = syncReadFile("./ASPEN.md");

type TeamData = {
	name: string;
	fileData: string; // this contains the original file data that was parsed on first uploaded
	createdAt: string;
	updatedAt: string;
	missionStatement: string;
	techLead?: string;
	designLead?: string;
	productLead?: string;
	repositoriesOwned?: string[];
	updates?: string;
};

function parseFile(fileData: string): TeamData {
	let teamName;
	let missionStatement;
	let importantDetails;
	let techLead;
	let designLead;
	let productLead;
	let repositoriesOwned;

	let updates;

	if (fileData) {
		const dataSections = fileData.split("##");

		teamName = dataSections
			.find((v) => v.includes("Information"))
			?.split(" Information")[0]
			.toUpperCase();
		missionStatement = dataSections
			.find((v) => v.includes("Mission Statement"))
			?.split("Mission Statement")[1]
			.toLowerCase()
			.trim();
		importantDetails = dataSections.find((v) =>
			v.includes("Important Details")
		);
		updates = dataSections
			.find((v) => v.includes("Updates"))
			?.split("Updates")
			.pop()
			?.split("\n")[2];

		techLead = importantDetails?.split("Tech Lead:").pop()?.split("\n")[0];
		designLead = importantDetails?.split("Design Lead:").pop()?.split("\n")[0];
		productLead = importantDetails
			?.split("Product Lead:")
			.pop()
			?.split("\n")[0];

		repositoriesOwned = importantDetails
			?.split("Repositories Owned in the following format:")
			.pop()
			?.split("\n")
			.filter((v) => v != "");

		return {
			name: teamName,
			fileData,
			createdAt: new Date().toString(),
			updatedAt: new Date().toString(),
			missionStatement: missionStatement,
			techLead,
			designLead,
			productLead,
			repositoriesOwned,
			updates,
		} as TeamData;
	} else {
		console.log("problems reading the file");
		return {
			name: "",
			fileData: "",
			createdAt: "",
			updatedAt: "",
			missionStatement: "",
		};
	}
}

const {
	name,
	missionStatement,
	techLead,
	designLead,
	productLead,
	repositoriesOwned,
	updates,
} = parseFile(fileData);

// console.log("goone", {
// 	name,
// 	mission_statement: missionStatement,
// 	tech_lead: techLead,
// 	design_lead: designLead,
// 	product_lead: productLead,
// 	repositories_owned: JSON.stringify(repositoriesOwned),
// 	updates,
// });

// axios
// 	.post(
// 		"http://127.0.0.1:8000/teams/",
// 		{
// 			name,
// 			mission_statement: missionStatement,
// 			tech_lead: techLead,
// 			design_lead: designLead,
// 			product_lead: productLead,
// 			repositories_owned: JSON.stringify(repositoriesOwned),
// 			updates,
// 		},
// 		{ headers: { "Content-Type": "application/json" } }
// 	)
// 	.then(function (response) {
// 		console.log("res", response.data);
// 	})
// 	.catch(function (error) {
// 		console.log("error", error);
// 	});
