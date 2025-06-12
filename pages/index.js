import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  const [ltcPrice, setLtcPrice] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [discordUrl, setDiscordUrl] = useState("discord://");
  const [isMobile, setIsMobile] = useState(false);

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
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobile(isMobileDevice);
    setDiscordUrl(isMobileDevice ? "https://discord.com/app" : "discord://");
  }, []);

  const links = [
    { name: "Binance", url: "https://www.binance.com", logo: "/logos/binance.png" },
    { name: "SmartSchool", url: "https://deprinsdiest.smartschool.be/", logo: "/logos/smartschool.webp" },
    { name: "YouTube", url: "https://www.youtube.com", logo: "/logos/youtube.png" },
    { name: "ChatGPT", url: "https://chat.openai.com", logo: "/logos/chatgpt.webp" },
  ];

  return (
    <div style={styles.container}>
      <Head>
        <title>vgraphic hub – Quick Access & LTC Tracker</title>
        <meta name="description" content="Quick links to your favorite apps, live LTC price updates, and mobile app launcher." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="vgraphic hub" />
        <meta property="og:description" content="Quick access dashboard with LTC price and favorite apps." />
        <meta property="og:image" content="/logos/share-preview.png" />
        <meta property="og:url" content="https://vgraphic.vercel.app" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="vgraphic hub" />
        <meta name="twitter:description" content="Quick links and real-time Litecoin price." />
        <meta name="twitter:image" content="/logos/share-preview.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 style={styles.title}>vgraphic hub</h1>

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
                <Image
                  src={link.logo}
                  alt=""
                  width={24}
                  height={24}
                  style={{ marginRight: "0.5rem", borderRadius: "4px" }}
                />
                <span style={styles.linkText}>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div style={styles.linksCard}>
        <h2 style={styles.subtitle}>🖥️ Apps</h2>
        <div style={styles.appButtons}>
          <a href="spotify://" style={styles.appButton}>
            <Image
              src="/logos/spotify.png"
              alt=""
              width={24}
              height={24}
              style={{ marginRight: "0.5rem", borderRadius: "4px" }}
            />
            <span style={styles.linkText}>Open Spotify</span>
          </a>
          <a href={discordUrl} style={styles.appButton}>
            <Image
              src="/logos/discord.png"
              alt=""
              width={24}
              height={24}
              style={{ marginRight: "0.5rem", borderRadius: "4px" }}
            />
            <span style={styles.linkText}>Open Discord</span>
          </a>
          {isMobile && (
            <a href="tiktok://" style={styles.appButton}>
              <Image
                src="/logos/tiktok.webp"
                alt=""
                width={24}
                height={24}
                style={{ marginRight: "0.5rem", borderRadius: "4px" }}
              />
              <span style={styles.linkText}>Open TikTok</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    backgroundImage: "url('/backgrounds/pattern.webp')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
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
    background: "rgba(30, 30, 30, 0.85)",
    borderRadius: "12px",
    padding: "1.5rem 2rem",
    boxShadow: "0 0 12px rgba(0,0,0,0.6)",
    minWidth: "300px",
    textAlign: "center",
    marginBottom: "2rem",
  },
  linksCard: {
    background: "rgba(30, 30, 30, 0.85)",
    borderRadius: "12px",
    padding: "1.5rem 2rem",
    boxShadow: "0 0 12px rgba(0,0,0,0.6)",
    minWidth: "300px",
    textAlign: "center",
    marginTop: "2rem",
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
  linkText: {
    fontSize: "1rem",
  },
  appButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginTop: "1rem",
    flexWrap: "wrap",
  },
  appButton: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#333",
    padding: "0.6rem 1rem",
    borderRadius: "8px",
    textDecoration: "none",
    color: "#fff",
    transition: "background 0.2s",
  },
};
