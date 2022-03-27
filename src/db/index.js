const mongoose = require('mongoose');

const connect = async (url) => {
    // Mongoose and Server start up
    try {
        mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }); 
    } catch (error) {
        console.log(`Database connection failed \n ${error}`);
    }
    console.log('Database connection is successful');
}

exports.connect = connect;