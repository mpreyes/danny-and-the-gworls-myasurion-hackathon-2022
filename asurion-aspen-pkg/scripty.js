"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path_1 = require("path");
function findAspenFile(attempts) {
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
function syncReadFile(filename) {
    // const aspenFile = findAspenFile(1);
    // console.log("aspenFile", aspenFile);
    const result = fs.readFileSync((0, path_1.join)("../../../ASPEN.mdn", filename), "utf-8");
    console.log("__dirname", __dirname, "filename", filename);
    return result;
}
let fileData = syncReadFile("./ASPEN.md");
function parseFile(fileData) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
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
        teamName = (_a = dataSections
            .find((v) => v.includes("Information"))) === null || _a === void 0 ? void 0 : _a.split(" Information")[0].toUpperCase();
        missionStatement = (_b = dataSections
            .find((v) => v.includes("Mission Statement"))) === null || _b === void 0 ? void 0 : _b.split("Mission Statement")[1].toLowerCase().trim();
        importantDetails = dataSections.find((v) => v.includes("Important Details"));
        updates = (_d = (_c = dataSections
            .find((v) => v.includes("Updates"))) === null || _c === void 0 ? void 0 : _c.split("Updates").pop()) === null || _d === void 0 ? void 0 : _d.split("\n")[2];
        techLead = (_e = importantDetails === null || importantDetails === void 0 ? void 0 : importantDetails.split("Tech Lead:").pop()) === null || _e === void 0 ? void 0 : _e.split("\n")[0];
        designLead = (_f = importantDetails === null || importantDetails === void 0 ? void 0 : importantDetails.split("Design Lead:").pop()) === null || _f === void 0 ? void 0 : _f.split("\n")[0];
        productLead = (_g = importantDetails === null || importantDetails === void 0 ? void 0 : importantDetails.split("Product Lead:").pop()) === null || _g === void 0 ? void 0 : _g.split("\n")[0];
        repositoriesOwned = (_h = importantDetails === null || importantDetails === void 0 ? void 0 : importantDetails.split("Repositories Owned in the following format:").pop()) === null || _h === void 0 ? void 0 : _h.split("\n").filter((v) => v != "");
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
        };
    }
    else {
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
const { name, missionStatement, techLead, designLead, productLead, repositoriesOwned, updates, } = parseFile(fileData);
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
