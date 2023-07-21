const express = require('express')
const app = express()
const cors = require('cors')
const { default: mongoose } = require('mongoose')
const router = express.Router()
const auth = require('./src/routes/auth.route')
const bodyParser = require('body-parser')
const { errorHandler, notFound } = require('./src/middleware/middleware')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
require('dotenv').config()

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
//  const accountSid = process.env.SID;
//   const authToken = process.env.AUTH_TOKEN;
//   const client = require("twilio")(accountSid, authToken);
//   client.messages
//     .create({ body: "Kesho hakutakua na kipindi: by almasi", from: "+14067702134", to: "+255629386504" })
//       .then(message => console.log(message.sid));

// middleware
app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())



app.use(auth)


// errorHandler
app.use(errorHandler)
app.use(notFound)

 mongoose.connect(process.env.DATABASE, options)

 mongoose.connection.on('open', () => {
     console.log('Connected to the Mongodb')
     app.listen(process.env.PORT, () => console.log(`Server is running at port ${process.env.PORT}`))
 })
