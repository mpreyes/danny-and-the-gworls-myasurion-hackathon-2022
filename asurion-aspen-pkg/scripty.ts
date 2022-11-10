import * as fs from "fs";
import * as path from "path";
import axios from "axios";

let fileData;
var file = fs.readFile(
  path.join(__dirname, "./ASPEN.md"),
  "utf8",
  (error, data) => {
    console.log("wee", data);
    fileData = data;
    if (error) {
      console.log("error", error);
    }
  }
);

console.log("yet", file);

axios
  .post(
    "http://127.0.0.1:8000/teams/",
    {
      name: "madelyn",
      url: fileData,
    },
    { headers: { "content-type": "application/json" } }
  )
  .then(function (response) {
    // console.log(response);
    console.log("res", response.data);
  })
  .catch(function (error) {
    console.log(error);
  });
