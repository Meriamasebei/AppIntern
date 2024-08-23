const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieSession = require('cookie-session');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth');

mongoose.Promise = global.Promise;

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
    cookieSession({
        name: "session",
        keys: ["your-session-secret"], // Use environment variable in production
        httpOnly: true
    })
);

const mongoURI = "mongodb://127.0.0.1:27017/bancdb";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB:', err));

app.use('/api/auth', authRoutes);


router.get('/connect-workflow', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:9090/COMPTE');
        res.send(`Workflow response: ${response.data}`);
    } catch (error) {
        console.error('Error connecting to workflow:', error);
        res.status(500).send('Failed to connect to workflow');
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
