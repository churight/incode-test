import express from "express";
import cors from "cors";
import boardRoutes from "./routes/board.routes"

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/boards', boardRoutes);

export default app;
