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


// self.addEventListener("push", async event => {
//   if (event.data) {
//     // const { data } = event.data.json();
//     const data = event.data.json().data
//     console.log(event.data.json());

//     const options = {
//       body: data.body,
//       icon: data.icon ?? "/icon-256.png",
//       image: data.image,
//       data: {
//         click_action: data.link, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
//       },
//     }
//     event.waitUntil(self.registration.showNotification(data.title, options))
//   }
// })

// //푸시 클릭시 이동 사이트
// self.addEventListener("notificationclick", event => {
//   console.log("test!");
  
//   event.notification.close()
//   try {
//     console.log(event.notification.data)
//     const openLink = event.notification.data.click_action
//     self.clients.openWindow(openLink)
//   } catch {
//     self.clients.openWindow("https://devtimes.com")
//   }
// })

// 이 부분 바꾸기
const httpHeader = "http://localhost:3000"; 

self.addEventListener('push', async function (event) {
  if (event.data) {
    // 알림 메세지일 경우엔 event.data.json().notification;
    const data = await event.data.json().data;

    const { content, id, isHost, projectStatus, time, title, eventType } = data;

    let newLink=`${httpHeader}`;

    if(eventType === "SIGN_UP"){
      newLink = `${httpHeader}`;
    } else{
      newLink = `${httpHeader}/project-management/${returnEmptyIfNull(id)}?status=${returnEmptyIfNull(projectStatus)}&isHost=${returnEmptyIfNull(isHost)}`;
    }

    const options = {
      title: title,
      body: content,
      icon: data.image,
      image: data.image,
      data: {
        click_action: newLink, // 이 필드는 밑의 클릭 이벤트 처리에 사용됨
      },
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.log('This push event has no data.');
  }
});

// 클릭 이벤트 처리
self.addEventListener('notificationclick', function (event) {
  event.preventDefault();
  event.notification.close();

  // 이동할 url
  // 아래의 event.notification.data는 위의 푸시 이벤트를 한 번 거쳐서 전달 받은 options.data에 해당한다.
  // api에 직접 전달한 데이터와 혼동 주의
  const urlToOpen = event.notification.data.click_action;

  // 클라이언트에 해당 사이트가 열려있는지 체크
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then(function (windowClients) {
      let matchingClient = null;

      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        if (windowClient.url.includes(urlToOpen)) {
          matchingClient = windowClient;
          break;
        }
      }

      // 열려있다면 focus, 아니면 새로 open
      if (matchingClient) {
        return matchingClient.focus();
      } else {
        return clients.openWindow(urlToOpen);
      }
    });

  event.waitUntil(promiseChain);
});

function returnEmptyIfNull(value) {
  return value === null || value === "null" ? "" : value;
}
