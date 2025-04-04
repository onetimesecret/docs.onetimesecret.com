// Create a file: scripts/generate-routes.js
import fs from "fs";
import path from "path";

// Get all content files
const contentDir = path.resolve("./content/posts");
const files = fs.readdirSync(contentDir);

// Generate routes list
export const routes = files.map((file) => `/posts/${file.replace(".md", "")}`);
console.log("Routes:");
console.log(JSON.stringify(routes, null, 2));

// Write to a file that can be imported
// fs.writeFileSync("./routes.json", JSON.stringify(routes));
