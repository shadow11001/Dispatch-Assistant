const StorageProvider = {
    saveSession: function(data) {
        try {
            localStorage.setItem('dispatchAssistantSession', JSON.stringify(data));
        } catch (e) {
            console.warn('Failed to save session to localStorage', e);
        }
    },
    loadSession: function() {
        try {
            const data = localStorage.getItem('dispatchAssistantSession');
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.warn('Failed to load session from localStorage', e);
            return {};
        }
    },
    clearSession: function() {
        try {
            localStorage.removeItem('dispatchAssistantSession');
        } catch (e) {
            console.warn('Failed to clear session from localStorage', e);
        }
    },
    saveConfig: function(config) {
        try {
            localStorage.setItem('dispatchAssistantConfig', JSON.stringify(config));
        } catch (e) {
            console.warn('Failed to save config to localStorage', e);
        }
    },
    loadConfig: function() {
        try {
            const data = localStorage.getItem('dispatchAssistantConfig');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.warn('Failed to load config from localStorage', e);
            return null;
        }
    }
};