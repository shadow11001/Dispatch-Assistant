const DecisionEngine = {
    /**
     * Evaluates a Javascript-like string condition against the current form data.
     * Example: "transducer_status === 'True High Pressure'"
     */
    checkCondition: function(conditionStr, formData) {
        if (!conditionStr || typeof conditionStr !== 'string') return true;
        try {
            // Evaluates using a scoped function. 
            // "with(data)" allows condition strings to reference formData keys directly as variables
            // To prevent ReferenceErrors when fields are empty, map the condition keys safely
            // Creating a safe proxy that returns undefined instead of throwing
            const safeData = new Proxy(formData, {
                has(target, prop) {
                    return true; // trick 'with' into thinking the property exists
                },
                get(target, prop) {
                    return target[prop] !== undefined ? target[prop] : ''; // return empty string if missing text
                }
            });
            const func = new Function('data', `with(data) { return !!(${conditionStr}); }`);
            return func(safeData);
        } catch (e) {
            console.warn("DecisionEngine eval error:", conditionStr, e);
            return true; // Fail-safe to avoid breaking the UI for malformed rules
        }
    },

    /**
     * Computes a recommended value based on inputs and a formula string.
     */
    calculateRecommendation: function(formula, formData, config) {
        if (!formula) return null;
        try {
            // Provide context for calculations (formData + systemThresholds)
            const context = {
                data: formData,
                thresholds: config && config.systemThresholds ? config.systemThresholds : {}
            };
            // e.g. "parseInt(data.alarm_threshold) + thresholds.suction_psi.targetVariance.above"
            const func = new Function('ctx', `with(ctx) { return ${formula}; }`);
            return func(context);
        } catch (e) {
            console.warn("DecisionEngine calculation error:", formula, e);
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
            
            // Show ONLY on this specific phase, hide afterwards
            if (section.showOnlyOnPhase) {
                return (section.showOnlyOnPhase === currentPhaseId);
            }

            // Show if specific condition matches
            if (section.showIf && this.checkCondition(section.showIf, formData)) return true;
            
            // Show if a certain workflow phase just completed
            if (section.showAfter && section.showAfter === lastCompletedPhase) return true;
            
            return false;
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