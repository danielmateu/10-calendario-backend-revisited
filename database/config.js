const mongoose = require('mongoose');
require('dotenv').config();
// console.log(process.env.DB_CNN);

const dbConnection = async () => {
    try {
        await mongoose.connect('mongodb+srv://mern_user:H4pmlKrk5LfXkIXf@calendardb.ielvnye.mongodb.net/mern_calendar', {
            // useNewUrlParser: true, 
            // useUnifiedTopology: true,
            // useCreateIndex: true
        });
        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
}

module.exports = {
    dbConnection
}