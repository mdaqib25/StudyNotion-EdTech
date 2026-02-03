import express from "express";
import cors from "cors";


const app = express();


//middleware   
// cors is a middleware that allows cross origin requests
// cross origin requests are requests from different origins
// how requests will come from different origins?
// requests will come from different origins if the request is not from the same origin as the server
// what is app.use()? 
// app.use() is a middleware that is used to add middleware to the application
// middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. 
// what is app.use(express.json())?
// app.use(express.json()) is a middleware that allows json data to be parsed
// express.json() is a middleware that allows json data to be parsed   
// "json data to be parsed" means that the data sent in the request body is in json format and express.json() middleware will parse it into a javascript object.
app.use(cors());
app.use(express.json());

// test route 
app.get("/", (req, res) => {
    res.json({ success: true, message: "API is running" });
});

export default app;



