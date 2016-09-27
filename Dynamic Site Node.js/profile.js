var EventEmitter = require("events").EventEmitter;
var https = require("https");
var http = require("http");
var util = require("util");

/**
 * An EventEmitter to get a Treehouse students profile.
 * @param username
 * @constructor
 */
function Profile(username) {

    EventEmitter.call(this);

    profileEmitter = this;

    //Connect to the API URL (https://teamtreehouse.com/username.json)
    var req = https.get("https://teamtreehouse.com/" + username + ".json", function(res) {
        var body = "";

        if (res.statusCode !== 200) {
            req.abort();
            //Status Code Error
            profileEmitter.emit("error", new Error("There was an error getting the profile for " + username + ". (" + res.statusMessage + ")"));
        }

        //Read the data
        res.on('data', function (chunk) {
            body += chunk;
            profileEmitter.emit("data", chunk);
        });

        res.on('end', function () {
            if(res.statusCode === 200) {
                try {
                    //Parse the data
                    var profile = JSON.parse(body);
                    profileEmitter.emit("end", profile);
                } catch (error) {
                    profileEmitter.emit("error", error);
                }
            }
        }).on("error", function(error){
            profileEmitter.emit("error", error);
        });
    });
}

util.inherits( Profile, EventEmitter );

module.exports = Profile;