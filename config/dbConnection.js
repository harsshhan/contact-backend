const moongose = require('mongoose');

const connectDb = async () => {
    try{
        const connect = await moongose.connect(process.env.CONNECTION_STRING)
        console.log('Database Connected: ',connect.connection.host,connect.connection.name)
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDb;