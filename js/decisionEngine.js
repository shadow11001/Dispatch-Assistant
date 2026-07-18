const DecisionEngine = {
    /**
     * Evaluates a Javascript-like string condition against the current form data.
     * Example: "transducer_status === 'True High Pressure'"
     */
    checkCondition: function(conditionStr, formData) {
        if (!conditionStr || typeof conditionStr !== 'string') return true;
        try {
            const safeData = new Proxy(formData || {}, {
                has(target, prop) { return true; },
                get(target, prop) { return target[prop] !== undefined ? target[prop] : ''; }
            });
            const func = new Function('data', `try { with(data) { return !!(${conditionStr}); } } catch(e) { return false; }`);
            return func(safeData);
        } catch (e) {
            return true; // Fail-safe
        }
    },

    /**
     * Computes a recommended value based on inputs and a formula string.
     */
    calculateRecommendation: function(formula, formData, config) {
        if (!formula) return null;
        try {
            const safeData = new Proxy(formData || {}, {
                has(target, prop) { return true; },
                get(target, prop) { return target[prop] !== undefined ? target[prop] : ''; }
            });
            const context = {
                data: safeData,
                thresholds: config && config.systemThresholds ? config.systemThresholds : {}
            };
            const safeContext = new Proxy(context, {
                has(target, prop) { return true; },
                get(target, prop) { return target[prop] !== undefined ? target[prop] : ''; }
            });
            const func = new Function('ctx', `try { with(ctx) { return ${formula}; } } catch(e) { return ''; }`);
            return func(safeContext);
        } catch (e) {
            return null;
        }
    },

    /**
     * Evaluates which investigation phases should be active based on current form state.
     */
    getActivePhases: function(phases, formData) {
        if (!phases || !Array.isArray(phases)) return [];
        return phases
            .filter(phase => {
                if (!phase.activateIf) return true; // Always active if no condition
                return this.checkCondition(phase.activateIf, formData);
            })
            .sort((a, b) => a.sequence - b.sequence);
    },

    /**
     * Determines which SOP sections should render.
     */
    getVisibleSopSections: function(sopSections, formData, lastCompletedPhase, currentPhaseId) {
        if (!sopSections || !Array.isArray(sopSections)) return [];
        return sopSections.filter(section => {
            // Always show required/intro sections
            if (section.alwaysShow) return true;
            
            let shouldShow = false;

            // Show ONLY on this specific phase, hide afterwards
            if (section.showOnlyOnPhase) {
                if (section.showOnlyOnPhase !== currentPhaseId) return false;
                shouldShow = true;
            }

            // Show if specific condition matches
            if (section.showIf) {
                if (!this.checkCondition(section.showIf, formData)) return false;
                shouldShow = true;
            }
            
            // Show if a certain workflow phase just completed
            if (section.showAfter) {
                if (section.showAfter !== lastCompletedPhase) return false;
                shouldShow = true;
            }
            
            // If neither showOnlyOnPhase, showIf, or showAfter was provided, but isn't always show, we return false.
            // If at least one was evaluated and passes the logical AND checks (didn't early return false), we return true.
            return shouldShow;
        });
    },

    /**
     * Evaluates current state to derive calculated recommendations for the agent.
     */
    evaluateRecommendations: function(recommendations, formData, config) {
        if (!recommendations || !Array.isArray(recommendations)) return [];
        return recommendations
            .filter(rec => this.checkCondition(rec.condition, formData))
            .map(rec => ({
                action: rec.action,
                params: rec.params,
                calculation: rec.params.formula 
                    ? this.calculateRecommendation(rec.params.formula, formData, config)
                    : null
            }));
    }
};