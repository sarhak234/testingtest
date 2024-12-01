const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Database connection
const User = require('./models/usermodel'); // User model
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const questionarray=require('./arrayfile/questions')

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.post('/loginuser', async (req, res) => {
  const { name, className, testCode } = req.body;

  console.log('Received credentials:', { name, className, testCode });

  try {
    // Create a new user in the database
    const newUser = new User({ name, class: className, testCode });
    await newUser.save(); // Save the new user

    // Generate a JWT token including the testCode
    const token = jwt.sign({ userid: newUser._id, testCode }, process.env.JWT_SECRET || 'ssecretkey'); // Use environment variable for secret

    // Set the token as a cookie
    res.cookie('auth_token', token, { httpOnly: true });

    // Include the token in the response
    res.json({ message: 'User created and login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message }); // Include error message in response
  }
});

app.post('/loginadmin', (req, res) => {
  
  const { adminname, adminemail, adminpassword } = req.body;

  if(adminname.toLowerCase() === 'sudhir pawar' && adminemail.toLowerCase() === 'sudhirpawar786786@gmail.com' && adminpassword === '123sp234'){
    return res.status(200).json({'message': 'Login successful'});
  }

  res.status(401).json({ message: 'Admin login failed' });
});

app.post('/adminpage', (req, res) => {
  const { testcode, parsedArray } = req.body;
  const responseData = {
    [testcode]: parsedArray
  };

  questionarray.push(responseData);
  console.log('Received data:', JSON.stringify(questionarray, null, 2));

  res.status(200).json({ message: 'Data received successfully', data: responseData });
});

app.get('/questions/:testcode', (req, res) => {
  const { testcode } = req.params;

  // Find the corresponding questions for the given testcode
  const foundQuestions = questionarray.find(item => item[testcode]);

  if (foundQuestions) {
    return res.status(200).json({ questions: foundQuestions[testcode] });
  } else {
    return res.status(404).json({ message: 'Test code not found' });
  }
});

app.listen(3000, () => {
  console.log('App is running on port 3000');
});