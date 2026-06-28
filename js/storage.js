const StorageProvider = {
    saveSession: function(data) {
        try {
            localStorage.setItem('alarmAssistantSession', JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save session to localStorage', e);
        }
    },
    loadSession: function() {
        try {
            const data = localStorage.getItem('alarmAssistantSession');
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.warn('Failed to load session from localStorage', e);
            return {};
        }
    },
    saveConfig: function(config) {
        try {
            localStorage.setItem('alarmAssistantConfig', JSON.stringify(config));
        } catch (e) {
            console.warn('Failed to save config to localStorage', e);
        }
    },
    loadConfig: function() {
        try {
            const data = localStorage.getItem('alarmAssistantConfig');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Failed to load config from localStorage', e);
            return null;
        }
    }
};