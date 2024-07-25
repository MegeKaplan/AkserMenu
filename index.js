import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRouter from "./server/routes/auth.js";
import categoryRouter from "./server/routes/menu.js";

const config = dotenv.config();

const app = express();

const PORT = 3000 || process.env.PORT;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/menu", categoryRouter);

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
