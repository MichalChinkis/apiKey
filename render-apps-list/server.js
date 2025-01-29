require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// מסלול שמחזיר את רשימת האפליקציות מה-Render API
app.get('/apps', async (req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: {
                'Authorization': `Bearer ${process.env.RENDER_API_KEY}`,
                'Accept': 'application/json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching apps:', error.message);
        res.status(500).json({ error: 'Failed to fetch apps' });
    }
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
import renderApi from '@api/render-api';

renderApi.auth('rnd_YHHFyuRvDSmYMYFlBhvkCHGjcB9O');
renderApi.listServices({includePreviews: 'true', limit: '20'})
  .then(({ data }) => console.log(data))
  .catch(err => console.error(err));