import fs from "fs";
import Papa from "papaparse";

const csvFile = fs.readFileSync("ads_data.csv", "utf8");

// Convert CSV to JSON
const jsonData = Papa.parse(csvFile, {
  header: true,   // Treat first row as headers
  skipEmptyLines: true
}).data;


console.log("JSON data:", jsonData)
