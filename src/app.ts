import express from "express";
import notFoundHandler from "./app/middlewares/notFoundHandeler.js";
import globalErrorHandler from "./app/middlewares/globalErrorHandeler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./app/routes/index.js";
  
const app = express();

app.use(cookieParser());

//Middlewares
app.use(express.json({limit : "10mb"}));
app.use(express.urlencoded({extended:true, limit:"10mb"}));

app.use(cors({  
    origin: [],  
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
  }),
); 

app.get("/test", (req, res) => {
  res.send("Working");
});


//Middleware for calling the routes
app.use("/", router);

//Catch-all route for handling 404 errors
app.use(notFoundHandler); 

// Global error handling middleware
app.use(globalErrorHandler);

export default app;


