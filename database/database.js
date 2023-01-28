const mongoose = require('mongoose')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const uri = process.env.MONGO_URI

mongoose.set('strictQuery', false)

const connectDB = async () => {

    mongoose.connect(uri, options)
        .then(() => console.log("Conectado a la DB"))
        .catch(e => console.log('Error DB ' + e))

}

module.exports = { connectDB }