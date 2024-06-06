import notifRoute from "./router/notif.js";
import mongoose from "mongoose"
import cors from "cors"
import bodyParser from "body-parser";
import express from "express";


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/home", notifRoute)

app.listen(3002, function () {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.send('Project running!')
})


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8080
app.use("/", (req,res) => res.send('this is working'))
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`server running on port: ${PORT}`)))
    .catch((error) => console.log(error));