import { createServer } from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";

const PORT = 8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    const filePath = path.join(__dirname, "views", "index.html");
    const data = await fs.readFile(filePath);

    res.setHeader("Content-Type", "text/html");
    res.write(data);
    res.end();
  } catch (error) {
    console.log("Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Server up and running: localhost:${PORT}`);
});

const cssPath = path.join(__dirname, "styles", "styles.css");

server.on("request", async (req, res) => {
  if (req.url.endsWith(".css")) {
    try {
      const cssData = await fs.readFile(cssPath);
      res.setHeader("Content-Type", "text/css");
      res.write(cssData);
      res.end();
    } catch (error) {
      console.log("Error loading CSS file");
    }
  } else {
    console.error("Invalid request");
  }
});
