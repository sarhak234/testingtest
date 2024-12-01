const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/yourDatabaseName', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

const userSchema = new mongoose.Schema({
  name: String,
  class: String,
  testCode: String,
  isadmin: Boolean
});


const User = mongoose.model('User', userSchema);

module.exports = User;