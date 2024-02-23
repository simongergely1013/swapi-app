const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", async (req, res) => {
try {
    const {data} = await axios("https://swapi.dev/api/people");
    res.send("Hello");
    console.log(data);
} catch (error) {
    console.error('Error fetching characters:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));