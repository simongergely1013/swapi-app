const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors({
  origin: ["https://swapi-app-client-eight.vercel.app"],
  methods: ["GET"],
  credentials: true
}));

app.use(express.json());

const SWAPI_BASE_URL = 'https://swapi.dev/api';

// Route to get data of all the characters
app.get("/characters", async (req, res) => {
try {
    const {data} = await axios(`${SWAPI_BASE_URL}/people`);
    res.json(data);
} catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
})

// Route to get data for a single character
app.get('/characters/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const {data} = await axios.get(`${SWAPI_BASE_URL}/people/${id}`);
      res.json(data);
    } catch (error) {
      console.error('Error fetching character details:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));