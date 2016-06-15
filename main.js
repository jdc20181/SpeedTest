var SpeedTest = (function SpeedTest() {
    var _privateVars = {
        "imageAddr": "imagetester.jpg",
        "downloadSize": 95000; //bytes
    };

    // Return the constructor
    return function MyLibConstructor() {
        var _this = this; // Cache the `this` keyword

        _this.init = function() {
            if (window.addEventListener) {
                window.addEventListener('load', _this.InitiateSpeedDetection, false);
            } else if (window.attachEvent) {
                window.attachEvent('onload', _this.InitiateSpeedDetection);
            }
        }
        _this.someMethod = function() {
            // Access a private variable
            return _privateVars.someVar;
        };

        _this.getProgressMessage = function(msg) {
            var actualHTML = (typeof msg == "string") ? msg : msg.join("<br />");
            return actualHTML;
        };

        _this.InitiateSpeedDetection = function() {
            _this.getProgressMessage("Loading the image, please wait...");
            window.setTimeout(_this.MeasureConnectionSpeed, 1);
        }

        _this.MeasureConnectionSpeed = function() {
            var startTime, endTime;
            var download = new Image();
            download.onload = function() {
                endTime = (new Date()).getTime();
                showResults();
            }

            download.onerror = function(err, msg) {
                ShowProgressMessage("Invalid image, or error downloading");
            }

            startTime = (new Date()).getTime();
            var cacheBuster = "?nnn=" + startTime;
            download.src = imageAddr + cacheBuster;

            function showResults() {
                var duration = (endTime - startTime) / 1000;
                var bitsLoaded = downloadSize * 8;
                var speedBps = (bitsLoaded / duration).toFixed(2);
                var speedKbps = (speedBps / 1024).toFixed(2);
                var speedMbps = (speedKbps / 1024).toFixed(2);
                ShowProgressMessage([
                    "Your connection speed is:",
                    speedBps + " bps",
                    speedKbps + " kbps",
                    speedMbps + " Mbps"
                ]);
            }
        }
    };
}());
