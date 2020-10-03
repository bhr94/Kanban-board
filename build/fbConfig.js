const firebase = require("firebase")


var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export {
    provider, firebase
}
