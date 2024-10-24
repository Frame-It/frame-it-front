//pubic/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyByO3Vy6DUeO5MU1iN16INN1COpdbyoa7w",
    authDomain: "framit-8771a.firebaseapp.com",
    projectId: "framit-8771a",
    storageBucket: "framit-8771a.appspot.com",
    messagingSenderId: "378627404999",
    appId: "1:378627404999:web:315822db2080bc19493ae2",
    measurementId: "G-92V0DP3DVN"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const title = payload.notification.title + " (onBackgroundMessage)";
  const notificationOptions = {
    body: payload.notification.body,
    icon: "https://avatars.githubusercontent.com/sasha1107",
  };

  self.registration.showNotification(title, notificationOptions);
});