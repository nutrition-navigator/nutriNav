import firebase from 'firebase';


 var firebaseConfig = {
   apiKey: "AIzaSyCdy_v8Of--vsc5yPhbKDECOOHl3nlHIfo",
   authDomain: "nutrinav-97224.firebaseapp.com",
   databaseURL: "https://nutrinav-97224.firebaseio.com",
   projectId: "nutrinav-97224",
   storageBucket: "nutrinav-97224.appspot.com",
   messagingSenderId: "37824965367",
   appId: "1:37824965367:web:9c87ff57c94915ec9c01f2"
 };

 firebase.initializeApp(firebaseConfig);

 export default firebase;