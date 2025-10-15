const { useState, useEffect } = React;
const root = ReactDOM.createRoot(document.getElementById('root'));

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // ここではローカルストレージを利用、後でFirestoreに置き換え可能
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(stored);
  }, []);

  const addTask = () => {
    if (!input) return;
    const newTasks = [...tasks, { text: input, id: Date.now() }];
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setInput('');
    if ('Notification' in window) {
      Notification.requestPermission().then(p => {
        if (p === 'granted') new Notification('タスク追加: ' + input);
      });
    }
  };

  const removeTask = (id) => {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  };

  // Hugging Face AI提案（例：fetchで呼び出す想定）
  const suggestTasks = async () => {
    // ここにHugging Faceモデル呼び出しを追加可能
    alert("AI提案: タスクを整理しました！（サンプル）");
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>タスク管理アプリ</h1>
      <input 
        value={input} 
        onChange={e => setInput(e.target.value)} 
        placeholder="タスクを入力" 
      />
      <button onClick={addTask}>追加</button>
      <button onClick={suggestTasks}>AI整理</button>
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
