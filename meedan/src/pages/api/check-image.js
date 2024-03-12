
import fetch from 'node-fetch';


export default async function handler(req, res) {
 
  if (req.method === 'GET') {
    try {
     
      const type = 'image';
      const query = req.query.query || '';
      const feedId = req.query.feed_id || '';

   
      const baseUrl = 'https://check-api.checkmedia.org/api/v2/feeds';
      const url = `${baseUrl}?${new URLSearchParams({
        'filter[type]': type,
        'filter[query]': query,
        'filter[feed_id]': feedId
      })}`;

     
      const headers = {
        'Accept': 'application/vnd.api+json',
        'X-Check-Token': '485a95148ad65fb84d9d6281f718953e',
      };

     
      const response = await fetch(url, {
        method: 'GET',
        headers: headers
      });

     
      if (!response.ok) {
    
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }

     
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
