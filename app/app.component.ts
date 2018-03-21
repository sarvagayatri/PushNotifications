import { Component } from "@angular/core";
import * as LocalNotifications from "nativescript-local-notifications";
var firebase = require("nativescript-plugin-firebase");

declare var com: any;
declare var google: any;
declare var FirebaseAuth: any;
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {

    ngOnInit() {
        this.initFirebase();
    }
    initFirebase(): Promise<any> {
        return firebase.init({
            onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
                if (data.loggedIn) {
                }
            },
            onMessageReceivedCallback: (message) => {
                console.log("this is initfirbase");
                console.log(`Message: onMessageReceivedCallback1 ${JSON.stringify(message)}`);
            },
        }).then((instance) => {
            var token = com.google.firebase.iid.FirebaseInstanceId.getInstance().getToken();
            token = token || '';
            console.log("firebase-token", token);
        });
    }
    send() {
        this.setNotification();

    }
    setNotification() {
        LocalNotifications.schedule([{
            id: 1,
            title: 'The title',
            body: 'Recurs every minute until cancelled',
            ticker: 'The ticker',
            badge: 1,
            groupedMessages:["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
            groupSummary:"Summary of the grouped messages above", //android only
            ongoing: true, // makes the notification ongoing (Android only)
            smallIcon: 'res://heart',
            largeIcon : 'res://background',
            interval: 'minute',
            sound: "customsound-ios.wav", // falls back to the default sound on Android
            at: new Date(new Date().getTime() + (10 * 1000)) // 10 seconds from now
          }]).then(
              function() {
                console.log("Notification scheduled");
              },
              function(error) {
                console.log("scheduling error: " + error);
              }
          )
        }

}
