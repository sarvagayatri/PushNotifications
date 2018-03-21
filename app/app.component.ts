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
        this.initFirebase().then(() => {

        }, (error) => {
            console.log('error occured', error);
        });
    }
    register() {
        alert('registered');
        // firebase.addOnPushTokenReceivedCallback(
        //     (token) => {
        //         console.log("Current push token addonpushtokenreceived: " + token);
        //         // ..
        //     }
        // );

    }
    initFirebase(): Promise<any> {
        return firebase.init({
            onAuthStateChanged: function (data) { // optional but useful to immediately re-logon the user when he re-visits your app
                if (data.loggedIn) {
                }
            },
            // onMessageReceivedCallback: (message) => {
            //     console.log("this is initfirbase");
            //     if (message) {
            //         console.log(`Mssage: onMessageReceivedCallback1 ${message.body}`);

            //     }
            //     console.log('message', message);
            // },
        }).then((instance) => {
            firebase.getCurrentPushToken().then((token: string) => {
                // may be null if not known yet
                console.log("Current push token: " + token);
            });
            firebase.addOnMessageReceivedCallback(
                (message) => {
                    console.log("this is initfirbase");
                    if (message && message.title) {
                        console.log(`Mssage: onMessageReceivedCallback1 ${message.data}`);
                        //this.sendNotification({title: message.title, body : message.data.body});
                    }
                }
            );
        });
    }
    send() {
        this.sendNotification({ title: "testing notification", body: "description goes here" });

    }
    sendNotification(message) {
        LocalNotifications.schedule([{
            id: 1,
            title: message.title || '',
            body: message.body || '',//Recurs every minute until cancelled',
            //ticker: 'The ticker',
            badge: 1,
            //groupedMessages: ["The first", "Second", "Keep going", "one more..", "OK Stop"], //android only
            //groupSummary: "Summary of the grouped messages above", //android only
            //ongoing: true, // makes the notification ongoing (Android only)
            smallIcon: 'res://heart',
            largeIcon: 'res://background',
            //interval: 'minute',
            //sound: "customsound-ios.wav", // falls back to the default sound on Android
            at: new Date(new Date().getTime() + (1 * 1000)) // 10 seconds from now
        }]).then(
            function () {
                console.log("Notification scheduled");
            },
            function (error) {
                console.log("scheduling error: " + error);
            }
            )
    }

}
