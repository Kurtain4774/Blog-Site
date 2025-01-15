const { MongoClient, ServerApiVersion, TopologyDescription } = require('mongodb');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const { ModuleFilenameHelpers } = require('webpack');
const User = require('./schemas/user-schema.js');

const databaseName = 'blog_site';
const collectionName = 'users';

dotenv.config();

const mongoURI = process.env.DB_STRING;

//create a new mongoDB client that can be used to make changes to my database
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

//function to connect to mongoDB
async function connectToMongoDB() {
    // Connect logic
    await mongoose.connect(mongoURI, {
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB:', err.message);
    });
}

async function getUser(username){
    const db = client.db(databaseName);
    const col = db.collection(collectionName);

    return await col.findOne({username: username});
}

async function createUser(username, password){
    const existingUser = await client.db(databaseName).collection(collectionName).findOne({username: username});

    if (existingUser != null) {
        console.log(existingUser);
        return { status: 'error1', message: 'User already exists' };
    }

    const newUser = new User({
        username: username,
        password: password
    });

    try {
        await newUser.save();
        return { status: 'success', message: 'User created successfully' };
    } catch (error) {
        return { status: 'error2', message: 'Error creating user', error: error.message };
    }
}

module.exports = {
    connectToMongoDB,
    getUser,
    createUser,
}