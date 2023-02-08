import express from "express";

import routes from "./routes";
import config from "./config";

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(routes);

const port = config.port || 5000;
app.listen(port, () => console.log(`Server Listening on port: ${port}`));
