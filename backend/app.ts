import express from "express";
import cors from "cors";
import boardRoutes from "./routes/board.routes"
import cardRoutes from "./routes/card.routes"

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/boards', boardRoutes);
app.use('/api/card', cardRoutes)

export default app;
