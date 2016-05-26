import Firebase from 'firebase';
import config from '../config';


export function getRootRef() {
  return Firebase.database().ref(config.firebaseRoot);
}

