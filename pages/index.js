import { useEffect, useState } from "react";

export default function Home() {
  const [ltcPrice, setLtcPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // Fetch LTC price from your API route
  const fetchPrice = async () => {
    try {
      const res = await fetch("/api/crypto");
      const data = await res.json();
      setLtcPrice(data.ltcPrice);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch LTC price:", error);
      setLtcPrice(null);
    }
  };

  useEffect(() => {
    fetchPrice();
    const interval = setInterval(fetchPrice, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Your quick links with logos
  const links = [
    { name: "Binance", url: "https://www.binance.com", logo: "/logos/binance.png" },
    { name: "HF", url: "https://hackforums.net/", logo: "/logos/hf.png" },
    { name: "SmartSchool", url: "https://deprinsdiest.smartschool.be/", logo: "/logos/smartschool.png" },
    { name: "YouTube", url: "https://www.youtube.com", logo: "/logos/youtube.png" },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🧠 VGraphic Hub</h1>

      <div style={styles.card}>
        {ltcPrice === null ? (
          <p style={styles.text}>Loading LTC price...</p>
        ) : (
          <>
            <p style={styles.text}>
              <strong>LTC Price:</strong> ${parseFloat(ltcPrice).toFixed(2)}
            </p>
            <p style={styles.timestamp}>
              Last updated: {lastUpdated?.toLocaleTimeString()}
            </p>
          </>
        )}
      </div>

      <div style={styles.linksCard}>
        <h2 style={styles.subtitle}>🔗 Quick Links</h2>
        <ul style={styles.linkList}>
          {links.map((link) => (
            <li key={link.name} style={styles.linkItem}>
              <a href={link.url} target="_blank" rel="noopener noreferrer" style={styles.linkRow}>
                <img src={link.logo} alt={link.name} style={styles.logo} />
                <span style={styles.linkText}>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#121212",
    color: "#ffffff",
    fontFamily: "monospace",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "2rem",
  },
  card: {
    background: "#1e1e1e",
    borderRadius: "12px",
    padding: "1.5rem 2rem",
    boxShadow: "0 0 12px rgba(0,0,0,0.6)",
    minWidth: "300px",
    textAlign: "center",
    marginBottom: "2rem",
  },
  linksCard: {
    background: "#1e1e1e",
    borderRadius: "12px",
    padding: "1.5rem 2rem",
    boxShadow: "0 0 12px rgba(0,0,0,0.6)",
    minWidth: "300px",
    textAlign: "center",
  },
  subtitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.2rem",
  },
  timestamp: {
    fontSize: "0.9rem",
    marginTop: "1rem",
    color: "#999",
  },
  linkList: {
    listStyleType: "none",
    padding: 0,
    marginTop: "1rem",
  },
  linkItem: {
    margin: "0.5rem 0",
  },
  linkRow: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "#4fc3f7",
    padding: "0.5rem",
    borderRadius: "8px",
    transition: "background 0.2s ease",
  },
  logo: {
    width: "24px",
    height: "24px",
    marginRight: "0.5rem",
    borderRadius: "4px",
  },
  linkText: {
    fontSize: "1rem",
  },
};
