import dotenv from "dotenv"
import connectDB from "./db/index.js"
import app from "./app.js"

dotenv.config()

connectDB()
    //we connect mongodb async way so promise will be return so .then and .catch will use to listen port
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`server running at PORT ${process.env.PORT}`);
        })
    })

    .catch((err) => {
        console.log("Mongodb connection failed");
    })
