import * as fs from "fs";
import * as path from "path";
import axios from "axios";
import { join } from "path";

function findAspenFile(attempts?: number): string {
	attempts = attempts || 1;
	if (attempts > 5) {
		throw new Error("Can't resolve main ASPEN.mdn file");
	}
	var mainPath = attempts === 1 ? "./" : Array(attempts).join("../");
	console.log("ma", mainPath + "ASPEN.md");
	console.log("require", require(mainPath + "ASPEN.md"));
	try {
		return require(mainPath + "ASPEN.md");
	} catch (e) {
		return findAspenFile(attempts + 1);
	}
}

function syncReadFile(filename: string) {
	// const aspenFile = findAspenFile(1);
	// console.log("aspenFile", require.main.require("./ASPEN.md"));

	const result = fs.readFileSync(join(__dirname, filename), "utf-8");
	const attempt = fs.readFileSync(join(__dirname, filename), "utf-8");

	console.log("__dirname", __dirname, "filename", filename);

	console.log("attempt to read file outside", attempt);

	return result;
}

let fileData = syncReadFile("./ASPEN.md");

type teamData = {
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

function parseFile(fileData: string) {
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
		console.log("dataSections", dataSections);

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

		console.log("yeet", repositoriesOwned);
	}

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
	} as teamData;
}

const teamData = parseFile(fileData);
console.log("teamDataOBject", teamData);

console.log("team data", teamData);
// axios
// 	.post(
// 		"http://127.0.0.1:8000/teams/",
// 		{
// 			name: "madelyn",
// 			url: fileData,
// 		},
// 		{ headers: { "Content-Type": "application/json" } }
// 	)
// 	.then(function (response) {
// 		// console.log(response);
// 		console.log("res", response.data);
// 	})
// 	.catch(function (error) {
// 		console.log("error", error);
// 	});
