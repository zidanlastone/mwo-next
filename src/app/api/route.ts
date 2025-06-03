// export default async function handler(req, res) {
//   const backendUrl = `${process.env.BACKEND_API_URL}${req.url}`;
  
//   const response = await fetch(backendUrl, {
//     method: req.method,
//     headers: req.headers,
//     body: req.method !== 'GET' ? JSON.stringify(req.body) : undefined,
//   });

//   const data = await response.json();
//   res.status(response.status).json(data);
// }