const {connect} = require("mongoose");


module.exports.connectDB = async () => {
    try {
        let con = await connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
            //useCreateIndex: true
        })
        console.log(`MongoDB Connected to : ${con.connection.host}@${con.connection.name}`);
    }
    catch(error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}