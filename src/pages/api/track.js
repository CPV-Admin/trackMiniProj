export default async function handler(req, res) {
    const { trackingNumber } = req.query;
  
    if (!trackingNumber) {
      return res.status(400).json({ error: "O número de rastreamento é obrigatório." });
    }
  
    try {
      const apiKey = process.env.TRACK_API_KEY; // Defina sua chave de API no .env.local ou nas variáveis de ambiente do Vercel
      const response = await fetch(`https://api.17track.net/track?number=${trackingNumber}&api_key=${apiKey}`);
      const data = await response.json();
  
      res.status(200).json(data);
    } catch (error) {
      console.error("Erro ao buscar rastreamento:", error);
      res.status(500).json({ error: "Erro ao buscar o rastreamento." });
    }
  }
  