const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express()
const port = process.env.PORT || 5000
require('dotenv').config()

//routes

app.use(express.json())


app.use(cors({
    origin: ["http://localhost:5173", "https://tyrell-deployment-oufx4jyk7-taha-iqbals-projects.vercel.app"],
    credentials: true
})) 


const bookRoutes = require("./src/books/book.route")
const orderRoutes = require("./src/orders/order.route")
const userRoutes = require("./src/users/user.route")
const adminRoutes = require("./src/stats/admin.stats")
const authorRoutes = require("./src/authors/author.route")
const realUserRoutes = require("./src/real-user/real-user.route")
const reviewRoutes = require("./src/reviews/review.route")
const quoteRoutes = require("./src/quotes/quote.route")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/auth", userRoutes)
app.use("/api/admin", adminRoutes)
app.use("/api/author", authorRoutes)
app.use("/api/real-users", realUserRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/quotes", quoteRoutes)


async function main(){
    await mongoose.connect(process.env.DB_URL)

    app.use('/', (req, res) => {
        res.send("Welcome horse-face!")
    
    })
}

main().then(() => console.log("Mongodb connected successfully")).catch((err) => console.log(err))



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})