import app from "./app";
import { connectDB } from "./config/database";

const PORT = Number(process.env.PORT) || 4000;

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});
