// api/hugo.js
export default async function handler(req, res) {
  try {
    const { prompt } = JSON.parse(req.body || '{}'); // ←必ずパース
    const token = process.env.HUGGINGFACE_API_KEY; // 環境変数から取得

    if (!token) throw new Error("Hugging Face APIキーが未設定です");

    const response = await fetch(
      "https://api-inference.huggingface.co/models/elyza/ELYZA-japanese-Llama-2-7b-instruct",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ inputs: prompt })
      }
    );

    const data = await response.json();
    const text = Array.isArray(data) && data[0]?.generated_text
      ? data[0].generated_text
      : data?.generated_text || "AI応答を取得できませんでした";

    res.status(200).json({ result: text });

  } catch (err) {
    console.error("API crash:", err);
    res.status(500).json({ error: "サーバーエラーが発生しました" });
  }
}
