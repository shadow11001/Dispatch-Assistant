const App = {
    config: null,

    init: function() {
        console.log("Initializing Alarm Alert Assistant...");
        
        // 1. Load Configuration
        // DEV MODE: Force reload from file instead of cache if developing append ?clearCache=true
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('clearCache') === 'true') {
            localStorage.removeItem('alarmAssistantConfig');
            console.log("Cleared local config cache for dev.");
        }
        
        this.config = ConfigManager.getConfig();
        if (!this.config) {
            alert("Application Error: Could not load configuration rules.");
            return;
        }

        // 2. Initialize UI binding
        // Load explicit theme
        const activeTheme = this.config.theme || 'theme-walmart';
        document.body.className = activeTheme + ' bg-theme-bg h-screen flex flex-col font-sans text-theme-text';
        
        UI.init();
        
        // Try restoring session
        this.restoreSession();
    },

    handleParseAlert: function(rawAlertString) {
        if (!rawAlertString) return;

        // Pass config to parser so it knows the expected schema format and delimiter
        const parsedData = Parser.parseAlertString(rawAlertString, this.config);
        
        UI.renderParsedData(parsedData);
        
        // Determine Profile
        let profileId = parsedData.alarm_type || "UNKNOWN";
        let profile = this.config.profiles[profileId];
        
        // If unknown, use generic profile as a template and create a new one
        if (!profile) {
            console.warn(`Unknown alarm type ${profileId}, generating new profile from generic.`);
            
            // Deep copy the generic profile to create a starting point
            profile = JSON.parse(JSON.stringify(this.config.genericProfile));
            profile.id = profileId;
            profile.name = "Auto-Generated: " + profileId;
            
            // Add it to our active config profiles
            this.config.profiles[profileId] = profile;
            
            // Save the newly added profile to localStorage immediately so it gets exported
            StorageProvider.saveConfig(this.config);
            
            // Optional: Show UI alert that a new profile was created
            if (window.UI) {
                const toast = document.createElement('div');
                toast.className = 'fixed top-4 right-4 bg-yellow-600 text-white px-4 py-2 rounded shadow-lg z-50';
                toast.innerText = `New Alarm Type Detected: ${profileId}. A template profile has been auto-generated.`;
                document.body.appendChild(toast);
                setTimeout(() => toast.remove(), 5000);
            }
        }

        // Update UI Panels
        try {
            UI.renderKnowledge(profile);
            UI.renderWorkOrderAttributes(profile);
            UI.buildForm(profile, parsedData);
        } catch (err) {
            console.error("UI Render crashed:", err);
        }
        
        
        
        
        console.log("Checking Timer Engine hook block.");
        if (typeof TimerEngine !== 'undefined') {
            console.log("TimerEngine exists. Resetting...");
            TimerEngine.reset();
            console.log("Profile timer config:", profile ? profile.timerConfig : null);
            if (profile && profile.timerConfig && profile.timerConfig.enabled) {
                console.log("Starting Timer Engine...");
                TimerEngine.init(profile);
                TimerEngine.start();
            } else {
                console.log("Timer is disabled or missing on this profile.");
            }
        } else {
            console.error("TimerEngine is undefined entirely.");
        }
        
        this.saveCurrentSession(rawAlertString);
    },


    saveCurrentSession: function(rawAlertString) {
        // Implement save debouncing/throttling in production, fast save for now
        StorageProvider.saveSession({
            currentRawAlert: rawAlertString
        });
    },

    restoreSession: function() {
        const session = StorageProvider.loadSession();
        if (session && session.currentRawAlert) {
            UI.alertInput.value = session.currentRawAlert;
            // Optionally auto-parse on load if user had an active session:
            this.handleParseAlert(session.currentRawAlert);
        }
    }
};

// Bootstrap application once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});// I'll make the app automatically bump/clear local config if the default code version is higher. Wait, the simplest way is to clear it for the user right now since this is dev phase.
