import fetch from 'node-fetch';


export default async function handler(req, res) {

  if (req.method === 'GET') {
    try {
     
      const baseUrl = 'https://check-api.checkmedia.org/api/v2/feeds';

      const response = await fetch(baseUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.api+json',
          'X-Check-Token': '485a95148ad65fb84d9d6281f718953e',
          'Content-Type': 'application/json',
        },
      });

      
      const data = await response.json();
      res.status(response.status).json(data);
    } catch (error) {
     
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
