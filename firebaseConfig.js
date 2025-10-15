// firebaseConfig.js (non-module, global firebase)
const firebaseConfig = {
  apiKey: "AIzaSyC2F41Xbf5Yp3R0I2YamT37UlfrcYivUtU",
  authDomain: "yuki-test-app.firebaseapp.com",
  projectId: "yuki-test-app",
  storageBucket: "yuki-test-app.appspot.com",
  messagingSenderId: "351350635629",
  appId: "1:351350635629:web:1ebaf0048dcbe7f0bbd364"
};

// Initialize Firebase (compat)
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 確認用ログ（ブラウザコンソールに出る）
console.log("Firebase initialized, projectId:", firebaseConfig.projectId);
