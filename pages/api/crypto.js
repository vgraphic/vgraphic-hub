export default async function handler(req, res) {
  const coingeckoURL =
    "https://api.coingecko.com/api/v3/simple/price?ids=litecoin&vs_currencies=usd";

  try {
    const response = await fetch(coingeckoURL);
    const data = await response.json();

    res.status(200).json({ ltcPrice: data.litecoin.usd });
  } catch (error) {
    console.error("Error fetching LTC price:", error);
    res.status(500).json({ error: "Failed to fetch LTC price" });
  }
}