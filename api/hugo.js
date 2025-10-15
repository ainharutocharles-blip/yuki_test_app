// api/hugo.js
export default async function handler(req, res) {
  const prompt = req.body.prompt || "タスクを整理してほしい";
  
  // Hugging Face トークンはここに置く
  const token = "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"; // ←安全にサーバーに置く

  try {
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
    let text = "AI応答を取得できませんでした。";

    if (Array.isArray(data) && data[0]?.generated_text) text = data[0].generated_text;
    else if (data?.generated_text) text = data.generated_text;

    res.status(200).json({ result: text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "サーバーエラー" });
  }
}
