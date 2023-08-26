// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://monusingh928469:mWiV22lTJCs2HXFD@ac-xu9jsst-shard-00-00.j7aypsx.mongodb.net:27017,ac-xu9jsst-shard-00-01.j7aypsx.mongodb.net:27017,ac-xu9jsst-shard-00-02.j7aypsx.mongodb.net:27017/?ssl=true&replicaSet=atlas-x3v0e5-shard-0&authSource=admin&retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
