// scripts/prepare-images.js - Updated version
import { exec } from "child_process";
import fs from "fs";
import path from "path";

// Copy problematic images directly to output folder structure
const prepareImages = () => {
  try {
    console.log("Starting image preparation...");

    // Make sure .output directory exists
    if (!fs.existsSync(".output")) {
      console.log("Creating .output directory...");
      fs.mkdirSync(".output", { recursive: true });
    }

    if (!fs.existsSync(".output/public")) {
      console.log("Creating .output/public directory...");
      fs.mkdirSync(".output/public", { recursive: true });
    }

    const problematicPaths = [
      "public/img/blog/2024/day5",
      "public/img/blog/2024/install-guide",
    ];

    // Create output directories and copy files
    problematicPaths.forEach((dirPath) => {
      console.log(`Processing directory: ${dirPath}`);

      if (!fs.existsSync(dirPath)) {
        console.log(
          `Warning: Source directory ${dirPath} does not exist, skipping.`,
        );
        return;
      }

      const outputPath = path.join(
        ".output/public",
        dirPath.replace("public/", ""),
      );

      console.log(`Creating output directory: ${outputPath}`);
      fs.mkdirSync(outputPath, { recursive: true });

      // Copy files directly
      const files = fs.readdirSync(dirPath);
      console.log(`Found ${files.length} files to copy`);

      files.forEach((file) => {
        const sourcePath = path.join(dirPath, file);
        const destPath = path.join(outputPath, file);
        console.log(`Copying: ${sourcePath} -> ${destPath}`);
        fs.copyFileSync(sourcePath, destPath);
      });
    });

    console.log("Image preparation completed successfully!");
  } catch (error) {
    console.error("Error during image preparation:", error);
    process.exit(1); // Exit with error code to signal failure
  }
};

prepareImages();
