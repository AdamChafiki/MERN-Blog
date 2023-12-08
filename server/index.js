require("dotenv").config();
const express = require("express");
const connectDb = require("./config/connectDb");
const xss = require("xss-clean");
const { errorHandler, notFound } = require("./middlewares/error");
const cors = require("cors");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

// Connect to mongoDb
connectDb();

// Init App
const app = express();

// Middlewares
app.use(express.json());

//  to read after !!!!

// Prevent Xss(cross site scripting) Attacks
app.use(xss());

// Rate limiting
app.use(
  rateLimiting({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 200,
  })
);
 
// Security headers (helmet)
app.use(helmet());

// prevent http param pollution
app.use(hpp()); // <- THIS IS THE NEW LINE


// Cors policy
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/posts", require("./routes/postRoute"));
app.use("/api/comments", require("./routes/commentRoute"));
app.use("/api/category", require("./routes/categoryRoute"));
app.use("/api/password", require("./routes/passwordRoute"));

//  Error handler middlware
app.use(notFound);
app.use(errorHandler);

// Runing Server
app.listen(process.env.PORT, () => {
  console.log("The server is running in port : ", process.env.PORT);
});
