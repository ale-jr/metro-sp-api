import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { getStatus } from "./getLinesStatus.js";
const app = express();
app.use(cors());
app.set("trust proxy", 1);
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 60,
});
app.use(limiter);

app.get("/", (req, resp) => {

  getStatus()
    .then(status => {
      resp.json(status)
    })
    .catch((error) => {
      console.log(error);
      resp
        .status(500)
        .json({ message: "Error contacting subway API", code: "ESUBWAYAPI" });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`subway api listening at ${PORT}`);
});
