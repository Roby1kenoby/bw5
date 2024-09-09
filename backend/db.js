import mongoose from "mongoose"
import 'dotenv/config'



const mongoDbConnection = async () => {
    
    const connectionString = process.env.MONGODB_URL
    try {
        await mongoose.connect(connectionString)
        console.log('connessione al db ok')
    } catch (error) {
        console.log(error)
    }
}

export default mongoDbConnection