const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(`${process.env.MONGO_URL}/task_mgmt_DB`)

module.export = {connection}