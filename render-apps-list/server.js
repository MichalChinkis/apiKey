require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// API Key שמוגדר בקובץ .env
const API_KEY = process.env.RENDER_API_KEY;

if (!API_KEY) {
    console.error("🚨 Missing RENDER_API_KEY in .env file!");
    process.exit(1); // עוצר את התוכנית אם אין API Key
}

// מסלול שמחזיר את רשימת השירותים שלך ב-Render
app.get('/apps', async (req, res) => {
    try {
        const response = await axios.get('https://api.render.com/v1/services', {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Accept': 'application/json'
            }
        });

        res.json(response.data); // מחזיר JSON עם רשימת האפליקציות שלך
    } catch (error) {
        console.error('🚨 Error fetching apps:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to fetch apps' });
    }
});

// הפעלת השרת
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
