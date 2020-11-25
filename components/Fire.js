import firebase from "firebase";

class Fire {
  constructor() {
    try {
      this.init();
    } catch (err) {
    }
    //
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
      apiKey: "AIzaSyAyedMdZEJtaHBwVtifWZS0YOu9R_5p8dU",
      authDomain: "merge-7ea56.firebaseapp.com",
      databaseURL: "https://merge-7ea56.firebaseio.com",
      projectId: "merge-7ea56",
      storageBucket: "merge-7ea56.appspot.com",
      messagingSenderId: "590844170776",
      appId: "1:590844170776:web:dcd5e32e7640358c1a696d",
      measurementId: "G-404HFH8RGD",
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = (user) => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref(id) {
    return firebase.database().ref(`chats/${id}`)
  }

  getChats = (uid) => firebase.database().ref(`users/${uid}`).once()

  parse = (snapshot) => {
    const { timestamp: numberStamp, text, user, chatID } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {
      _id,
      timestamp,
      text,
      user,
      chatID
    };
    return message;
  };

  newGroupNumber = () => {
    firebase.database().ref("groupCount").transaction((groupCount) => {
      console.log(groupCount);
      groupCount = groupCount + 1;
      return groupCount;
    });
  }

  on = (callback, chatID) =>
    this.ref(chatID)
      .limitToLast(20)
      .on("child_added", (snapshot) => callback(this.parse(snapshot)));

  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  // send the message to the Backend
  send = (messages) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user, chatID } = messages[i];
      const message = {
        text,
        user,
        timestamp: this.timestamp,
        chatID
      };
      this.append(message, message.chatID);
    }
  };

  append = (message, id) => this.ref(id).push(message);

  // close the connection to the Backend
  off() {
    this.ref.off();
  }
}

Fire.shared = new Fire();
export default Fire;
