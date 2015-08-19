// Generic required assets
require('./main.less');

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        var btn = document.querySelector('.js-reset');

        if (id === 'deviceready') {
            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');
            btn.setAttribute('style', 'display: inline-block');
            btn.addEventListener('click', this.notify);
            this.notify();
        }
    },

    notify: function () {
        // navigator.vibrate(1000);
        // navigator.notification.alert('The device is ready for use', function () {}, 'READY!');
    }
};


// Bootstrap
window.isCordova = !!window.cordova;

if (window.isCordova) {
    app.initialize();
} else {
    console.info('Running in browser mode');
    app.onDeviceReady();
}
