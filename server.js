import { createServer } from "http";
import fs from "fs/promises";
import path from "path";
import url from "url";

function responseHandler(res, data) {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.write(data);
  res.end();
}

const PORT = 8080;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer(async (req, res) => {
  try {
    if (req.method === "GET" && !req.url.endsWith(".css")) {
      let filePath;
      let data;
      switch (req.url) {
        case "/":
          filePath = path.join(__dirname, "views", "index.html");
          data = await fs.readFile(filePath);
          responseHandler(res, data);
          break;
        case "/about":
          filePath = path.join(__dirname, "views", "about.html");
          data = await fs.readFile(filePath);
          responseHandler(res, data);
          break;
        case "/contact-me":
          filePath = path.join(__dirname, "views", "contact-me.html");
          data = await fs.readFile(filePath);
          responseHandler(res, data);
          break;
        default:
          filePath = path.join(__dirname, "views", "404.html");
          data = await fs.readFile(filePath);
          responseHandler(res, data);
          res.statusCode = 404;
          break;
      }
    } else {
      throw new Error("Method Not Allowed");
    }
  } catch (error) {}
});

server.listen(PORT, () => {
  console.log(`Server up and running: localhost:${PORT}`);
});

const cssPath = path.join(__dirname, "styles", "style.css");

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
  }
});
