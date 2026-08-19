const express = require('express');
const auth = require('./routes/auth');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "*"
}));

app.use('/auth', auth);

app.get('/health', (req, res) => {
    res.json({ status: "OK" });
});

app.get('/', (req, res) => {
    res.json({ message: "Instagram Assignment Backend is running" });
});

// For local environment
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
}

module.exports = app;