import path from "path";
import express from "express";
import axios from "axios";
import cron from "node-cron";
import fs from "fs";

if (!fs.existsSync("./api_access_files/json")) {
  fs.mkdirSync("./api_access_files/json", { recursive: true });
}

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname + "/public_files/")));

var wordpress_posts;

/*
    The purpose of this call is to periodically update behind the scenes, and let the JavaScript + HTML do the work
    Justification: The wordpress API can be slow.
*/

//  TODO: Store images in a database, and replace them as needed.

/*
    APPLICATION: This website serves as a proxy with minimal external load times, at the cost of being slightly
                 behind its API endpoints.
*/

async function server_backlog() {
  await axios
    .get("https://ericdee.blog/?rest_route=/wp/v2/posts&_embed")
    .then((response) => {
      fs.writeFileSync(
        "./api_access_files/json/wordpress_posts.json",
        JSON.stringify(response.data)
      );
      console.log("A WordPress JSON file has been written.");
    })
    .catch((error) => {
      console.log(error);
    });
  wordpress_posts = fs.readFileSync(
    "./api_access_files/json/wordpress_posts.json",
    "utf-8"
  );
}

server_backlog();

/**************************************************************************************************************************/

app.listen(port, () => {
  console.log(`This server is available on port ${port}.`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public_files/html/index.html"));
});

app.get("/wordpress_all_posts", (req, res) => {
  res.send(wordpress_posts);
  console.log(
    `A get request has been received/sent for wordpress posts from ${
      req.header("x-forwarded-for") || req.connection.remoteAddress
    }.`
  );
});

/* UNRELATED (School projects) */

app.get("/school-api/class-animal-data", (req, res) => {
  // Allowing endpoint access from external networks
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  // res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  let animalsJSON = fs.readFileSync(
    "./public_files/school/animals.json",
    "utf-8"
  );
  res.json(animalsJSON);
  console.log(
    `A get request has been received/sent for animal data from ${
      req.header("x-forwarded-for") || req.connection.remoteAddress
    }.`
  );
});

/*
  * * * * * *
  | | | | | |
  | | | | | day of week
  | | | | month
  | | | day of month
  | | hour
  | minute
  second ( optional )

  5 Asterisks will run a task once a minute.
*/
cron.schedule("* * * * *", function () {
  server_backlog();
});
