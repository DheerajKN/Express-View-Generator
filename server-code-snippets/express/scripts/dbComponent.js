const {createFileWithContent} = require('./createFileAndAddContent')
const {exec} = require('shelljs')
const fs = require('fs');

module.exports.addDBComponent = (folderDirectory, tableName) => {
  exec('npm i mongoose', () => {
    let packageFile = `${folderDirectory}/server/src/index.js`
    if (fs.existsSync(packageFile)) {
        fs.readFile(packageFile, 'utf8', (err, oldContent) => {
            let newContent = oldContent.replace(/(.*)express\(\)/g, `const app = express();\nimport mongoose from 'mongoose'; \n//If db requires username and password\n//mongoose.connect('mongodb://username:password@host:port/${tableName}', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });\nmongoose.connect('mongodb://localhost/${tableName}',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });`);
            fs.writeFile(packageFile, newContent, (err) => {
                if (err) throw err;
            })
        })
      const userSchema = `import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    // validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^[A-Za-z0-9.+-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model("User", UserSchema);`

      createFileWithContent(folderDirectory + '/server/src/models/User.js', userSchema)
    }
  })
}