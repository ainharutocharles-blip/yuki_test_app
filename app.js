const { useState, useEffect } = React;
const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // Firestoreコレクション名
  const col = db.collection('tasks');

  // マウント時にリアルタイム購読
  useEffect(() => {
    const unsubscribe = col.orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const arr = [];
      snapshot.forEach(doc => {
        arr.push({ id: doc.id, ...doc.data() });
      });
      setTasks(arr);
      console.log("Firestore snapshot:", arr);
    }, err => {
      console.error("Firestore onSnapshot error:", err);
    });

    return () => unsubscribe();
  }, []);

  // タスク追加
  const addTask = async () => {
    if (!text.trim()) return;
    try {
      await col.add({
        text: text.trim(),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      setText('');
      alert("タスクを追加しました（Firestore）");
    } catch (e) {
      console.error("Add failed:", e);
      alert("追加に失敗しました。コンソールを確認してください。");
    }
  };

  // タスク削除
  const removeTask = async (id) => {
    try {
      await col.doc(id).delete();
    } catch(e) {
      console.error("Delete failed:", e);
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h2>タスク管理（Firestore接続テスト）</h2>
      <div>
        <input value={text} onChange={e => setText(e.target.value)} placeholder="タスクを入力" />
        <button onClick={addTask}>追加</button>
      </div>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.text} <button onClick={() => removeTask(t.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

root.render(<App />);

// === AI呼び出し関数 ===
// Hugging Face推論APIを使ってAI提案を取得
async function getAiSuggestion(prompt) {
  const token = "hf_あなたのトークンをここに貼る"; // ←さっき取得したトークン

  const res = await fetch("https://api-inference.huggingface.co/models/elyza/ELYZA-japanese-Llama-2-7b-instruct", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ inputs: prompt })
  });

  const data = await res.json();
  console.log("AI response:", data);
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text;
  } else if (data?.generated_text) {
    return data.generated_text;
  } else {
    return "AI応答を取得できませんでした。";
  }
}
