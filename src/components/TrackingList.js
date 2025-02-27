import { useState, useEffect } from "react";

const TrackingList = () => {
  // Números de rastreamento atualizados conforme solicitado
  const [trackingNumbers] = useState([
    "CNPRT12007301234001656077",
    "DY256811141PT",
  ]);
  const [trackingData, setTrackingData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTrackingData();
  }, []);

  const fetchTrackingData = async () => {
    setLoading(true);
    try {
      const newTrackingData = {};
      for (const number of trackingNumbers) {
        const res = await fetch(`/api/track?trackingNumber=${number}`);
        const data = await res.json();
        newTrackingData[number] = data;
      }
      setTrackingData(newTrackingData);
    } catch (error) {
      console.error("Erro ao buscar rastreamento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>📦 Rastreamento de Encomendas</h2>
      {trackingNumbers.map((number) => (
        <div key={number} style={styles.trackingBox}>
          <h4>Encomenda: {number}</h4>
          <p>
            <strong>Status:</strong> {trackingData[number]?.status || "Aguardando atualização..."}
          </p>
          <p>
            <strong>Última atualização:</strong> {trackingData[number]?.lastUpdate || "Sem dados"}
          </p>
        </div>
      ))}
      <button onClick={fetchTrackingData} style={styles.button} disabled={loading}>
        {loading ? "Atualizando..." : "🔄 Atualizar Status"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  trackingBox: {
    border: "1px solid #ddd",
    padding: "10px",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default TrackingList;
