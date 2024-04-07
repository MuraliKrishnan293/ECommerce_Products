const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;
const { Middleware } = require("./verify");

app.use(express.json());
app.use(cors());
app.listen(PORT, () => {
  console.log("App connected to PORT 5000");
});
app.use("/app", require("./routes/formPost"));
app.use("/app", require("./routes/User"));
app.use("/app", Middleware, require("./routes/fetchData"));
app.use("/app", Middleware, require("./routes/getUserData"));
app.use("/app", Middleware, require("./routes/cart"));
// app.use('/app',require('./fetchData'));
app.use("/app", Middleware, require("./routes/formRoutes"));
app.use("/app", Middleware, require("./routes/adminCrud"));

try {
  mongoDBURL =
    "mongodb+srv://MuraliKrishnan412:MuraliKrishnan412@cluster0.d0ek1az.mongodb.net/ECNApp?retryWrites=true&w=majority";
  mongoose.connect(mongoDBURL).then(() => {
    console.log("Successfully connected to Database");
  });
} catch (e) {
  console.log(e);
}
