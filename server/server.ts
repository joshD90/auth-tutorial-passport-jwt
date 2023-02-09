import express from "express";

import routes from "./routes";
import config from "./config";
import { configurePassport } from "./middlewares/passport-strategies.mw";
// //typescript feature to know!
// //side effect import - this just imports the code directly but dont use it here
// import "./middlewares/passport-strategies.mw";

const app = express();

configurePassport(app);
app.use(express.static("public"));
app.use(express.json());
app.use(routes);

const port = config.port || 5000;
app.listen(port, () => console.log(`Server Listening on port: ${port}`));
