const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersRoutes = require("./routes/users.route");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", usersRoutes);

app.get("/", (req, res) => {
    res.send("Ph-ACC-Node-Mongo-Assignment1-API");
});

app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));

process.on("unhandledRejection", (error) => {
    console.log(error?.name, error?.message);
    app.close(() => {
        process.exit(1);
    });
});
