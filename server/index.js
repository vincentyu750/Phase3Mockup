const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterModel = require('./models/Register');

const app = express();

// Use specific origin instead of "*"
app.use(cors({
  origin: "https://phase3-mockup-frontend.vercel.app",
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

mongoose.connect('mongodb+srv://vincent:123@employee.yvqm0ok.mongodb.net/test?retryWrites=true&w=majority');

app.get("/", (req, res) => {
  res.json("Successful");
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user in the database based on email and password
  RegisterModel.findOne({ email, password })
    .then(user => {
      if (user) {
        res.json({ success: true, message: 'Login successful', user });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    })
    .catch(err => res.json({ success: false, message: err.message }));
});

  RegisterModel.findOne({ email: email })
    .then(user => {
      if (user) {
        // Use 400 status for client errors
        res.status(400).json("Already have an account");
      } else {
        RegisterModel.create({ name: name, email: email, password: password })
          .then(result => res.status(201).json(result))
          .catch(err => res.status(500).json(err));
      }
    })
    .catch(err => res.status(500).json(err));
});

// Debug
app.use((req, res, next) => {
  console.log(`Incoming request to: ${req.url}`);
  next();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
