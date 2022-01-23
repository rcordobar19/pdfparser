const fs = require("fs");
const pdf = require("pdf-parse");

let directory = "./pdf/";

filenames = fs.readdirSync(directory, { encoding: "utf8" });
filenames = filenames.filter(filename => filename.split(".")[1] == "pdf");

console.log("\nReading:");
console.log(filenames);

filenames.forEach(file => {
	let dataBuffer = fs.readFileSync(directory + file);

	pdf(dataBuffer).then(function (data) {
		var email = data.text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);

		// exclutions
		var arr = [];
		arr = email.filter(e => e !== "email@example.com");

		const emails = [...new Set(arr)];

		fs.appendFileSync("emails.txt", emails, "UTF-8", { flags: "a+" });
	});
});
