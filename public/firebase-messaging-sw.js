//pubic/firebase-messaging-sw.js
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js"
)
importScripts(
  "https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js"
)


const firebaseConfig = {
  apiKey: 'AIzaSyByO3Vy6DUeO5MU1iN16INN1COpdbyoa7w',
  authDomain: 'framit-8771a.firebaseapp.com',
  projectId: 'framit-8771a',
  storageBucket: 'framit-8771a.appspot.com',
  messagingSenderId: '378627404999',
  appId: '1:378627404999:web:315822db2080bc19493ae2',
  measurementId: 'G-92V0DP3DVN',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   const title = payload.notification.title + " (onBackgroundMessage)";
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "https://avatars.githubusercontent.com/sasha1107",
//   };

//   self.registration.showNotification(title, notificationOptions);
// });



self.addEventListener("push", async event => {
  if (event.data) {
    // const { data } = event.data.json();
    const data = event.data.json().data
    console.log(event.data.json());

    const options = {
      body: data.body,
      icon: data.icon ?? "/icon-256.png",
      image: data.image,
      data: {
        click_action: data.link, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})

//푸시 클릭시 이동 사이트
self.addEventListener("notificationclick", event => {
  console.log("test!");
  
  event.notification.close()
  try {
    console.log(event.notification.data)
    const openLink = event.notification.data.click_action
    self.clients.openWindow(openLink)
  } catch {
    self.clients.openWindow("https://devtimes.com")
  }
})