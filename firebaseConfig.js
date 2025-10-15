// Firebase SDK 読み込み
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Firebase設定
const firebaseConfig = {
  apiKey: "AIzaSyC2F41Xbf5Yp3R0I2YamT37UlfrcYivUtU",
  authDomain: "yuki-test-app.firebaseapp.com",
  projectId: "yuki-test-app",
  storageBucket: "yuki-test-app.firebasestorage.app",
  messagingSenderId: "351350635629",
  appId: "1:351350635629:web:1ebaf0048dcbe7f0bbd364"
};

// 初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 他のファイルで使えるようにエクスポート
export { db };
