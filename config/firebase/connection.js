var Firebase = require('firebase');
var secret  = "p2yk5vbSkJZ5nxlEkuMWR98mh8G6bds6z65hz95f";
var firebase_ob = {
    get_env: function() {
        return new Firebase("https://flickering-fire-4678.firebaseio.com/");
    }
};

module.exports = firebase_ob.get_env();