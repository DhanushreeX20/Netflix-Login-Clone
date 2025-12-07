const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const USER = {
  email: "test@netflix.com",
  password: "123456",
};

app.get("/login", function (req, res) {
  const { email, password } = req.query;
  if (email === USER.email && password === USER.password) {
     console.log("Login Successful ");
    console.log("Email:", email);
    console.log("Password:", password);
      res.send( true,"Login successful" ) 
  }
  else{
    console.log("Login failed , Wrong Data !");
    console.log("Email:", email);
    console.log("Password:", password);
  res.send( false,"Invalid credentials" )

  }
});

app.listen(5000, function () {
  console.log("Server started...");
});
