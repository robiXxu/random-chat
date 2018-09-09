import * as firebase from 'firebase';
import { IUser } from '../types';

const config = {
  apiKey: process.env.REACT_APP_RCHAT_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_RCHAT_FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_RCHAT_FIREBASE_DATABASEURL,
  messagingSenderId: process.env.REACT_APP_RCHAT_FIREBASE_MESSAGINGSENDERID,
  projectId: process.env.REACT_APP_RCHAT_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_APP_RCHAT_FIREBASE_STORAGEBUCKET
};

const Firebase = firebase.initializeApp(config);
const Database = Firebase.database();
const Rooms = Database.ref('rooms');
const Users = Database.ref('users');

const newRoom = {
  data: [],
  users: {}
};

// TODO: cleanup
const enterRoom = ( roomID: string, user: IUser ) => new Promise((resolve, reject) => {
  const roomRef = Database.ref(`room/${roomID}`);
  roomRef
    .once('value')
    .then((roomSnapshop) => {
      if( roomSnapshop.exists() ){
        Database.ref(`room/${roomID}/users/${user.nickname}`).set({
          test:''
        },() => {
          console.log(`User ${user.nickname} has been added to Room ${roomID}`);
          onDisconnect(roomID, user);
          getRoomInfo( roomID ).then(resolve)
        });
      } else {
        roomRef.set(newRoom, () => {
          console.log(`Room ${roomID} has been created`);
          Database.ref(`room/${roomID}/users/${user.nickname}`).set({
            test: ''
          },() => {
            console.log(`User ${user.nickname} has been added to Room ${roomID}`);
            onDisconnect(roomID, user);
            getRoomInfo( roomID ).then(resolve)
          });
        })
      }
    });
});

const onDisconnect = ( roomID: string, user: IUser ) => {
  Database.ref(`room/${roomID}/users/${user.nickname}`).onDisconnect().remove();
};

const getRoomInfo = ( roomID: string ) => new Promise((resolve, reject) => {
  Database.ref(`room/${roomID}`)
    .once('value')
    .then(roomSnapshot => {
      resolve({
        data: roomSnapshot.child('data').val(),
        users: roomSnapshot.child('users').val()
      });
    });
});

export { 
  Firebase,
  Database,
  Rooms,
  Users,
  enterRoom,
  onDisconnect
};