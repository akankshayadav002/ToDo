const express = require("express");
const mongoose = require("mongoose");
const todoRoute=require('./routes/todo')


const app = express();

// conenction to mongodb
mongoose.connect("mongodb+srv://admin:admin@cluster0.zah7ucd.mongodb.net/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((con)=>{
  console.log(`MongoDB connected : ${con.connection.host}`)
}

  ).catch(error =>{
    console.log(error)
  })
    


// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.set("view engine", "ejs");



// routes
app.use("/api",todoRoute)
// app.use(require("./routes/todo"))


// server configurations....
app.listen(3000, () => console.log("Server started listening on port: 3000"));