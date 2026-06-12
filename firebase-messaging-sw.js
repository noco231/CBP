// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBRtSfBYUd5PHRjwnmhb5Mrj67F7KOKr1M",
    authDomain: "noco-83ff7.firebaseapp.com",
    databaseURL: "https://noco-83ff7-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "noco-83ff7",
    storageBucket: "noco-83ff7.firebasestorage.app",
    messagingSenderId: "383521536951",
    appId: "1:383521536951:web:9c1a4b90a021db80d00632"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Фоновое уведомление:', payload);
    
    const notificationTitle = payload.notification?.title || '💬 Новое сообщение';
    const notificationOptions = {
        body: payload.notification?.body || 'У вас новое сообщение в чате',
        icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23ff5e00"%3E%3Cpath d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2z"%3E%3C/path%3E%3C/svg%3E',
        vibrate: [200, 100, 200]
    };
    
    self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(windowClients => {
            for (let client of windowClients) {
                if ('focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow('/');
            }
        })
    );
});