const ConfigManager = {

    _renderTimerBreakpoints: function(profile) {
        if (!profile.timerConfig || !profile.timerConfig.breakpoints || profile.timerConfig.breakpoints.length === 0) {
            return '<div class="text-xs text-theme-textmuted italic text-center py-2">No breakpoints defined.</div>';
        }
        
        const colors = [
            {val: "timer-glow-yellow", label: "[Widget] Glow Yellow"},
            {val: "timer-glow-orange", label: "[Widget] Glow Orange"},
            {val: "timer-glow-red", label: "[Widget] Glow Red"},
            {val: "timer-glow-purple", label: "[Widget] Glow Purple"},
            {val: "timer-glow-blue", label: "[Widget] Glow Blue"},
            {val: "timer-glow-green", label: "[Widget] Glow Green"},
            {val: "bg-red-900 border-red-500", label: "[Widget] Solid Red Background"},
            {val: "edge-glow-yellow", label: "[Full Browser] Edge Glow Yellow"},
            {val: "edge-glow-orange", label: "[Full Browser] Edge Glow Orange"},
            {val: "edge-glow-red", label: "[Full Browser] Edge Glow Red"},
            {val: "edge-glow-purple", label: "[Full Browser] Edge Glow Purple"},
            {val: "edge-glow-blue", label: "[Full Browser] Edge Glow Blue"},
            {val: "edge-glow-green", label: "[Full Browser] Edge Glow Green"}
        ];

        return profile.timerConfig.breakpoints.map((bp, i) => {
            let colorOpts = colors.map(c => `<option value="${c.val}" ${bp.colorClass === c.val ? 'selected' : ''}>${c.label}</option>`).join('');
            
            return `
            <div class="bg-theme-bg border border-theme-borderdark p-2 rounded relative">
                <button class="absolute top-1 right-1 text-red-500 hover:text-red-400 text-xs" onclick="ConfigManager._rmTimerBreakpoint(${i})">X</button>
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label class="text-[10px] text-theme-textmuted">Start (Min)</label>
                        <input type="number" class="w-full bg-theme-panel1 border-theme-borderdark p-1 rounded text-xs" value="${bp.minuteStart}" onchange="ConfigManager._upTcb(${i}, 'minuteStart', parseInt(this.value))">
                    </div>
                    <div>
                        <label class="text-[10px] text-theme-textmuted">End (Min)</label>
                        <input type="number" class="w-full bg-theme-panel1 border-theme-borderdark p-1 rounded text-xs" value="${bp.minuteEnd}" onchange="ConfigManager._upTcb(${i}, 'minuteEnd', parseInt(this.value))">
                    </div>
                </div>
                <div class="mb-2">
                    <label class="text-[10px] text-theme-textmuted">Color</label>
                    <select class="w-full bg-theme-panel1 border-theme-borderdark p-1 rounded text-xs" onchange="ConfigManager._upTcb(${i}, 'colorClass', this.value)">
                        <option value="">None</option>
                        ${colorOpts}
                    </select>
                </div>
                <div>
                    <label class="text-[10px] text-theme-textmuted">Tooltip Text</label>
                    <input type="text" class="w-full bg-theme-panel1 border-theme-borderdark p-1 rounded text-xs" value="${bp.tooltip || ''}" placeholder="Show this message..." onchange="ConfigManager._upTcb(${i}, 'tooltip', this.value)">
                </div>
            </div>
            `;
        }).join('');
    },
    
    _upP_TC: function(key, val) {
        let profile = this.activeConfig.profiles[this.editingProfileId];
        if (!profile.timerConfig) profile.timerConfig = {};
        profile.timerConfig[key] = val;
        this.editProfile(this.editingProfileId);
    },
    
    _upTcb: function(index, key, val) {
        let profile = this.activeConfig.profiles[this.editingProfileId];
        profile.timerConfig.breakpoints[index][key] = val;
    },
    
    _addTimerBreakpoint: function() {
        let profile = this.activeConfig.profiles[this.editingProfileId];
        if (!profile.timerConfig) profile.timerConfig = { enabled: true, breakpoints: [] };
        if (!profile.timerConfig.breakpoints) profile.timerConfig.breakpoints = [];
        profile.timerConfig.breakpoints.push({ minuteStart: 0, minuteEnd: 5, colorClass: "", tooltip: "" });
        this.editProfile(this.editingProfileId);
    },
    
    _rmTimerBreakpoint: function(index) {
        let profile = this.activeConfig.profiles[this.editingProfileId];
        profile.timerConfig.breakpoints.splice(index, 1);
        this.editProfile(this.editingProfileId);
    },


    _renderCrystalHooks: function() {
        if (!this.editingProfileId) return "";
        let profile = this.activeConfig.profiles[this.editingProfileId];
        if (!profile && this.editingProfileId === "GENERIC") profile = this.activeConfig.profiles.DISPATCH;
        if (!profile) return "";
        if (!profile.crystalAttributes) {
            profile.crystalAttributes = { issueArea: "", problemType: "", assetType: "", problemCode: "", priority: "" };
        }
        
        let mapping = this.activeConfig.assetProblemMapping || {};
        let assetTypes = Object.keys(mapping);
        let assetOptions = assetTypes.map(at => `<option value="${at}" ${profile.crystalAttributes.assetType === at ? 'selected' : ''}>${at}</option>`).join('');
        
        let problemCodes = mapping[profile.crystalAttributes.assetType] || [];
        let problemCodeOptions = problemCodes.map(pc => `<option value="${pc}" ${profile.crystalAttributes.problemCode === pc ? 'selected' : ''}>${pc}</option>`).join('');
        
        const issueAreas = ["Home Office Only"];
        let issueAreaOptions = issueAreas.map(ia => `<option value="${ia}" ${profile.crystalAttributes.issueArea === ia ? 'selected' : ''}>${ia}</option>`).join('');
        
        const problemTypes = ["Refrigeration - HO Use Only"];
        let problemTypeOptions = problemTypes.map(pt => `<option value="${pt}" ${profile.crystalAttributes.problemType === pt ? 'selected' : ''}>${pt}</option>`).join('');
        
        const priorities = [
            "PE-Emergency-Onsite w/I 2 hours",
            "PE-Emergency-Onsite w/I 4 hours",
            "P1-Onsite w/I 24 hours",
            "P2-Onsite w/I 48 hours",
            "P3-Onsite w/I 3 days",
            "P5-Onsite w/I 5 days",
            "P7-Onsite w/I 7 days",
            "P21-Onsite w/I 21 days",
            "Scheduled Service"
        ];
        let priorityOptions = priorities.map(p => `<option value="${p}" ${profile.crystalAttributes.priority === p ? 'selected' : ''}>${p}</option>`).join('');
        
        return `
            <div><label class="block mb-1 text-xs text-theme-textmuted">Issue Area</label>
                 <select class="w-full bg-theme-bg border border-theme-border p-2 rounded" onchange="ConfigManager._upCA('issueArea', this.value)">
                    <option value="">-- Select --</option>
                    ${issueAreaOptions}
                 </select>
            </div>
            <div><label class="block mb-1 text-xs text-theme-textmuted">Problem Type</label>
                 <select class="w-full bg-theme-bg border border-theme-border p-2 rounded" onchange="ConfigManager._upCA('problemType', this.value)">
                    <option value="">-- Select --</option>
                    ${problemTypeOptions}
                 </select>
            </div>
            <div><label class="block mb-1 text-xs text-theme-textmuted">Asset Type</label>
                 <select class="w-full bg-theme-bg border border-theme-border p-2 rounded" onchange="ConfigManager._upAssetType(this.value)">
                    <option value="">-- Select --</option>
                    ${assetOptions}
                 </select>
            </div>
            <div><label class="block mb-1 text-xs text-theme-textmuted">Problem Code</label>
                 <select class="w-full bg-theme-bg border border-theme-border p-2 rounded" onchange="ConfigManager._upCA('problemCode', this.value)" id="admin-problem-code-select">
                    <option value="">-- Select --</option>
                    ${problemCodeOptions}
                 </select>
            </div>
            <div class="col-span-2"><label class="block mb-1 text-xs text-theme-textmuted">Priority</label>
                 <select class="w-full bg-theme-bg border border-theme-border p-2 rounded" onchange="ConfigManager._upCA('priority', this.value)">
                    <option value="">-- Select --</option>
                    ${priorityOptions}
                 </select>
            </div>
        `;
    },
    
    
    _upAssetType: function(val) {
        this._upCA('assetType', val);
        this._upCA('problemCode', '');
        // Instead of calling a non-existent renderAdminView(), we reload the exact profile edit view.
        this.editProfile(this.editingProfileId);
    },



    activeConfig: null,
    editingProfileId: null,

    getConfig: function() {
        if (this.activeConfig) return this.activeConfig;

        // Try local storage first
        const savedConfig = StorageProvider.loadConfig();
        if (savedConfig) {
            this.activeConfig = savedConfig;
            return savedConfig;
        }
        // Fallback to default bundled JS config
        if (window.DispatchAssistantConfig) {
            this.activeConfig = JSON.parse(JSON.stringify(window.DispatchAssistantConfig)); // Deep copy
            return this.activeConfig;
        }
        
        console.error("Critical: Master configuration is missing.");
        return null; 
    },
    
    exportConfig: function() {
        const config = this.getConfig();
        
        // Version History Tracking
        const newAuthor = prompt("Enter Author Name:", config.author || "System Admin");
        if (newAuthor === null) return; // Cancelled
        
        const changeDesc = prompt("Enter a brief description of these changes:");
        if (changeDesc === null) return;
        
        // Prompt for version
        const currentVersion = config.version || "1.0.0";
        const newVersion = prompt("Enter new version number:", currentVersion);
        if (newVersion === null) return;

        config.author = newAuthor;
        config.version = newVersion;
        config.lastUpdated = new Date().toISOString().split('T')[0];
        config.changeDescription = changeDesc;
        
        // Save history log
        if (!config.history) config.history = [];
        config.history.unshift({ // Add to beginning
            version: newVersion,
            date: config.lastUpdated,
            author: newAuthor,
            description: changeDesc
        });

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `dispatch_config_v${newVersion}.json`);
        document.body.appendChild(downloadAnchorNode); 
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    },

    importConfig: function(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const imported = JSON.parse(e.target.result);
                // Basic validation
                if (!imported.profiles || !imported.parserRules) {
                    throw new Error("Invalid configuration schema");
                }
                this.activeConfig = imported;
                StorageProvider.saveConfig(this.activeConfig);
                alert("Configuration imported successfully!");
                this.renderAdminProfiles();
                // Optionally reload main app
                App.config = this.activeConfig;
            } catch (err) {
                alert("Failed to import configuration: " + err.message);
            }
        };
        reader.readAsText(file);
    },

    saveConfigToStorage: function() {
        // Save whatever is in this.activeConfig to local storage
        if(this.activeConfig) {
            this.activeConfig.lastUpdated = new Date().toISOString().split('T')[0];
            StorageProvider.saveConfig(this.activeConfig);
            App.config = this.activeConfig; // Update running app instance
            alert("Configuration saved locally.");
        }
    },

    // --- Admin Modal UI Logic ---
    openAdminModal: function() {
        this.getConfig(); // Ensure loaded
        document.getElementById('admin-modal').classList.remove('hidden');
        this.renderAdminProfiles();
        this.bindAdminEvents();
    },

    closeAdminModal: function() {
        document.getElementById('admin-modal').classList.add('hidden');
    },

    bindAdminEvents: function() {
        // Prevent multiple bindings
        if(this._eventsBound) return;
        this._eventsBound = true;

        document.getElementById('admin-close-btn').addEventListener('click', () => this.closeAdminModal());
        document.getElementById('admin-export-btn').addEventListener('click', () => this.exportConfig());
        document.getElementById('admin-save-btn').addEventListener('click', () => this.saveConfigToStorage());
        
        const fileInput = document.getElementById('admin-import-file');
        document.getElementById('admin-import-btn').addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => {
            if(e.target.files.length > 0) {
                this.importConfig(e.target.files[0]);
            }
        });

        const dispatchBtn = document.getElementById('admin-add-dispatch-btn');
        if(dispatchBtn) {
            dispatchBtn.addEventListener('click', () => this.createNewProfile('DISPATCH'));
        }
        
        // Navigation binds
        document.getElementById('nav-global-settings').addEventListener('click', () => this.editTopLevelField('global', 'Global App Settings'));
        document.getElementById('nav-reusable-text').addEventListener('click', () => this.editTopLevelField('reusableText', 'Reusable Texts'));
        document.getElementById('nav-parser-rules').addEventListener('click', () => this.editTopLevelField('parserRules', 'Alert Parser Rules'));
        document.getElementById('nav-help-guide').addEventListener('click', () => this.editTopLevelField('HELP', 'Expression & Variable Guide'));
        document.getElementById('nav-master-json').addEventListener('click', () => this.editTopLevelField('MASTER', 'Entire Configuration JSON (Master)'));
    },

    renderAdminProfiles: function() {
        const dispatchesList = document.getElementById('admin-dispatches-list');
        if(dispatchesList) dispatchesList.innerHTML = '';
        
        const highlightSelected = (items, selectedLi) => {
            Array.from(document.querySelectorAll('#admin-modal li')).forEach(nav => {
                 nav.classList.remove('bg-theme-input', 'border-l-4', 'border-theme-primary');
            });
            if(selectedLi) selectedLi.classList.add('bg-theme-input', 'border-l-4', 'border-theme-primary');
        };

        if(this.activeConfig && this.activeConfig.profiles) {
            Object.keys(this.activeConfig.profiles).forEach(key => {
                const profile = this.activeConfig.profiles[key];
                const li = document.createElement('li');
                li.className = "cursor-pointer p-2 rounded hover:bg-theme-input text-theme-text mt-1 text-sm transition";
                li.innerText = `${profile.id || key} - ${profile.name}`;
                li.addEventListener('click', (e) => {
                     this.editProfile(key);
                     if (typeof dispatchesList !== 'undefined') {
                          highlightSelected(dispatchesList, e.currentTarget);
                     }
                });
                if (typeof dispatchesList !== 'undefined') {
                     dispatchesList.appendChild(li);
                }
            });
        }
    },

    
    editTopLevelField: function(fieldKey, prettyName) {
        this.editingProfileId = null;
        const editorArea = document.getElementById('admin-editor-area');
        let targetData = fieldKey === 'MASTER' ? this.activeConfig : this.activeConfig[fieldKey] || {};
        
        if (fieldKey === 'HELP') {
            document.getElementById('admin-editor-area').innerHTML = `
            <div class="h-full overflow-y-auto pr-2 pb-10 max-w-4xl mx-auto space-y-6">
                
                <!-- Main Header -->
                <div class="bg-theme-panel1 p-6 rounded-lg border border-theme-borderdark shadow-md">
                    <h2 class="text-2xl font-black text-green-400 mb-2">Alarm Alert Assistant - Complete Admin & Configuration Guide</h2>
                    <p class="text-theme-text text-sm">Welcome to the <strong>Alarm Alert Assistant</strong>. This guide explains how to use <strong>Admin Mode</strong> to build, modify, and customize Alarm Profiles natively. This covers creating a profile, understanding its features, and using the built-in Expression Builder to make your forms and SOPs dynamic.</p>
                </div>

                <!-- 1. Entering Admin Mode -->
                <div class="bg-theme-bg border border-theme-borderdark rounded-lg p-5">
                    <h3 class="text-lg font-black text-yellow-400 mb-4 border-b border-yellow-900 pb-2">1. Entering Admin Mode & Creating a Profile</h3>
                    <ul class="list-disc pl-5 space-y-2 text-sm text-theme-text">
                        <li><strong>To access Admin Mode:</strong> Click the blue <code class="bg-theme-primary text-theme-accentsec px-1 rounded">Admin Mode</code> button in the top-right corner of the main screen.</li>
                        <li><strong>To create a new Profile:</strong> Look at the left sidebar under "Alarm Profiles" and click the <code class="bg-theme-panel1 px-1 rounded font-mono">+</code> button.</li>
                        <li>You will be prompted for an <strong>Alarm Code (ID)</strong> (e.g., <code class="text-pink-300 font-mono">RPL</code> or <code class="text-pink-300 font-mono">SCL</code>). This ID <em>must</em> match the parsed Alarm Type exactly so the system knows which profile to load when an alert is pasted.</li>
                    </ul>
                </div>

                <!-- 2. Profile Config -->
                <div class="bg-theme-bg border border-theme-borderdark rounded-lg p-5">
                    <h3 class="text-lg font-black text-theme-accentsec mb-4 border-b border-theme-primary pb-2">2. Profile Configuration Breakdown</h3>
                    <p class="text-sm text-theme-text mb-4">Each Profile dictates exactly how the UI behaves when that specific Alarm is parsed.</p>
                    
                    <div class="space-y-4 text-sm text-theme-text">
                        <div>
                            <h4 class="font-bold text-theme-text">Identity</h4>
                            <ul class="list-disc pl-5 mt-1 space-y-1 text-xs text-theme-textmuted">
                                <li><strong class="text-theme-text">Alarm Code (ID):</strong> The exact tag parsed from the raw alert string (e.g., <code class="text-pink-300 font-mono">GSP</code>).</li>
                                <li><strong class="text-theme-text">Profile Name:</strong> The human-readable name of the alarm (e.g., General Suction Pressure).</li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text">Investigation Phases</h4>
                            <p class="text-xs">Phases break down your workflow into chronological steps (e.g., Phase 1: Diagnosis, Phase 2: Action).</p>
                            <ul class="list-disc pl-5 mt-1 space-y-1 text-xs text-theme-textmuted">
                                <li><strong class="text-theme-text">ID & Title:</strong> Internal reference name and UI Display Name.</li>
                                <li><strong class="text-theme-text">Sequence:</strong> The numbered order of the phase (1, 2, 3).</li>
                                <li><strong class="text-theme-text">Activate If:</strong> A Javascript condition that determines when this phase unlocks (e.g., <code class="text-pink-300 font-mono">store_contact !== ""</code>).</li>
                            </ul>
                        </div>
                        
                        <div>
                            <h4 class="font-bold text-theme-text">Generated Form Fields</h4>
                            <p class="text-xs">This block generates the actual interactive questions the agent must answer.</p>
                            <ul class="list-disc pl-5 mt-1 space-y-1 text-xs text-theme-textmuted">
                                <li><strong class="text-theme-text">ID (Ref):</strong> The variable name for the field (e.g., <code class="text-pink-300 font-mono">action_taken</code>). Do not use spaces.</li>
                                <li><strong class="text-theme-text">Label (UI):</strong> The question shown to the user.</li>
<li><strong class="text-theme-text">Required:</strong> Checking "Required" halts phase advancement safely until input.</li>
<li><strong class="text-theme-text">Training Excl. & Links:</strong> Write training insights and paste specific URL paths into the Training Link (URL) field to automatically generate clickable hyperlinks during Training Mode.</li>
                                <li><strong class="text-theme-text">Type:</strong> Text Input, Text Area, Radio Group, Select (Dropdown), or Time.</li>
                                <li><strong class="text-theme-text">Source Default:</strong> Matches native Parser extracts (like <code class="text-pink-300 font-mono">parsed_high_case</code>) to auto-fill forms.</li>
                                <li><strong class="text-theme-text">Visible If:</strong> Javascript condition to pop up the field conditionally. Leave blank to always show.</li>
                                <li><strong class="text-theme-text">Phase Assignment:</strong> The ID of the Phase this question belongs to.</li>
                                <li><strong class="text-theme-text">Options:</strong> Comma-separated choices for Radio/Select.</li>
                            </ul>
                            
                            <div class="mt-3 bg-gray-100 dark:bg-gray-800 p-3 rounded border border-theme-border flex flex-col gap-1 items-start shadow-sm">
                                <h5 class="font-bold mb-1 text-theme-primary text-sm flex">Parsed Context Variables (parsed_*)</h5>
                                <p class="mb-2 text-xs text-theme-textmuted">You can utilize variables parsed directly from the incoming alert using the parser engine or dispatch schema. Whenever you select a data source prefixed with <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">parsed_</code>, it binds automatically to the metadata extraction dictionary.</p>
                                
                                <strong class="text-theme-text text-sm">Common Examples:</strong>
                                <ul class="list-disc pl-5 mb-2 text-theme-text font-mono text-[11px] max-w-full overflow-x-auto space-y-1">
                                    <li><strong class="text-theme-primary">parsed_site_number</strong> : Matches the Store/Site Number directly.</li>
                                    <li><strong class="text-theme-primary">parsed_ems</strong> : Main network/EMS platform isolated (e.g. BacnetNetwork).</li>
                                    <li><strong class="text-theme-primary">parsed_alarm_type</strong> : Extracted Alert Code / Alert Description.</li>
                                    <li><strong class="text-theme-primary">parsed_incident_id</strong> : Usually reserved for ticketing / SNOW.</li>
                                    <li><strong class="text-theme-primary">parsed_store_ems_primary</strong> : The verified main platform from standard JSON mappings.</li>
                                    <li><strong class="text-theme-primary">parsed__original_alert</strong> : Safe copy of the literal user pasting.</li>
                                </ul>
                                <p class="text-[11px] italic text-gray-400 mt-1">If the parser maps any new chunk using its rule array or regex extracts, you simply prepend <code>parsed_</code> to the key name to access it inside your Form layout.</p>
                            </div>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text">SOP Structure (Knowledge View)</h4>
                            <p class="text-xs">SOP sections display your Wiki guides to the agent.</p>
                            <ul class="list-disc pl-5 mt-1 space-y-1 text-xs text-theme-textmuted">
                                <li><strong class="text-theme-text">Title & HTML Content:</strong> Header and body (supports HTML and Tailwind).</li>
                                <li><strong class="text-theme-text">Always Show:</strong> Check to force the SOP block to remain visible.</li>
                                <li><strong class="text-theme-text">Show If:</strong> Evaluates against form data dynamically.</li>
                                <li><strong class="text-theme-text">Show ONLY On Phase ID:</strong> Hook SOPs explicitly to an exact phase state. This securely drops documentation immediately after the user leaves that phase to greatly reduce clutter.</li>
<li><strong class="text-theme-text">SOP Training Links:</strong> Just like Form Fields, you can provide dedicated Training URLs that map directly alongside the SOP explanations when Training Mode is enabled.</li>
                            </ul>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text">Note Template</h4>
                            <p class="text-xs">The architectural blueprint for the final copy/paste Work Order note. Place field IDs in curly braces <code class="text-pink-300 bg-theme-panel1 px-1 rounded font-mono">{action_taken}</code> to inject answers dynamically. You can also inject Reusable Text block variables (e.g., <code class="text-pink-300 bg-theme-panel1 px-1 rounded font-mono">{monitor_advisement}</code>).</p>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text">Crystal WorkOrder Hooks</h4>
                            <p class="text-xs">Preset the Admin UI dropdowns so when an agent hits your specific Alarm Profile, the dropdowns automatically snap to the correct Crystal WorkOrder paths.</p>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text">Timer Configuration</h4>
                            <p class="text-xs">Sets up the SLA timer engine for emergency workflows.</p>
                             <ul class="list-disc pl-5 mt-1 space-y-1 text-xs text-theme-textmuted">
                                <li><strong class="text-theme-text">Enabled & Widget Location:</strong> Turn on and set position (Floating, Header Next-to-Title, Header-Center).</li>
                                <li><strong class="text-theme-text">Breakpoints:</strong> Add intervals and apply visual Colors (Widget Glows vs Full Browser Edge Glows).</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- 3. Expression Builder -->
                <div class="bg-theme-bg border border-theme-borderdark rounded-lg p-5">
                    <h3 class="text-lg font-black text-purple-400 mb-4 border-b border-purple-900 pb-2">3. Expression Builder Guide (Visible If / Activate If)</h3>
                    
                    <!-- DYNAMIC INTERPOLATION GUIDE -->
                    <div class="mb-5">
                        <h4 class="font-bold text-theme-text mb-2 font-mono">Dynamic Template Interpolation (Math & Variables)</h4>
                        <p class="text-sm text-theme-textmuted mb-2">You can directly embed live mathematical calculations and variable parsing structurally inside <strong>Radio/Select Options</strong> or <strong>SOP Content</strong>!</p>
                        <p class="text-sm text-theme-textmuted mb-2">Simply wrap your mathematical logic or script in curly braces <code class="bg-theme-panel1 text-pink-400 px-1 rounded">{}</code>. It will evaluate live against the user's keystrokes.</p>
                        
                        <p class="text-sm text-theme-text font-bold mb-1">Available Global Pointers:</p>
                        <ul class="list-disc pl-5 text-sm text-theme-textmuted mb-3">
                           <li><code class="bg-theme-panel1 text-pink-400 px-1 rounded">data</code>: Contains local parameters natively. (e.g. data.suct_psi_setpoint)</li>
                           <li><code class="bg-theme-panel1 text-pink-400 px-1 rounded">thresholds</code>: Pulls parameters globally out of SystemThresholds. (e.g. thresholds.suction_psi.targetVariance.above)</li>
                        </ul>

                        <div class="bg-theme-bg p-3 rounded border border-theme-borderdark font-mono text-xs mb-2">
                           <span class="text-green-400">// Example (Inside an SOP Block):</span><br>
                           <span class="text-theme-accentsec">&lt;p&gt;You should force it to exactly: {parseFloat(data.suct_psi) + thresholds.suction_psi.targetVariance.above} PSI.&lt;/p&gt;</span>
                        </div>
                        <div class="bg-theme-bg p-3 rounded border border-theme-borderdark font-mono text-xs">
                           <span class="text-green-400">// Example (Inside a Radio Button Option):</span><br>
                           <span class="text-theme-text">If your Radio option is literally named: <code class="text-theme-accentsec">"{parseFloat(data.suct_psi) + 15}"</code></span><br>
                           <span class="text-theme-text">The engine will instantly re-render it as "37" when suct_psi reads 22.</span>
                        </div>
                    </div>
                    <p class="text-sm text-theme-text mb-4 border-b border-theme-borderdark pb-4">The conditional logic inputs use an embedded Javascript evaluation engine to securely read answers. To reference a field's value, simply type the exact <code class="bg-theme-panel1 px-1 rounded text-pink-300 font-mono">ID</code> of the field you are reading.</p>
                    
                    <div class="space-y-4">
                        <div>
                            <h4 class="font-bold text-theme-text text-sm mb-1">Strict Equality (<code class="text-pink-300 font-mono">===</code>) & Empty Checks (<code class="text-pink-300 font-mono">!== ""</code>)</h4>
                            <p class="text-xs text-theme-textmuted mb-2">Always use triple equals or triple not-equals.</p>
                            <pre class="bg-theme-bg p-3 rounded font-mono text-xs text-green-300"><span class="text-theme-textmuted block mb-1">// Show ONLY when rack is explicitly blank (not answered)</span>rack_status === ""<br><span class="text-theme-textmuted block mt-2 mb-1">// Show AS SOON AS the user types literally anything</span>rack_status !== ""<br><span class="text-theme-textmuted block mt-2 mb-1">// Show only if they picked exactly "Operational"</span>comp_status === "Operational"</pre>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text text-sm mb-1">Advanced String Evaluations</h4>
                            <p class="text-xs text-theme-textmuted mb-2">To trigger a rule if a user types a specific keyword anywhere in a sentence.</p>
                            <pre class="bg-theme-bg p-3 rounded font-mono text-xs text-green-300"><span class="text-theme-textmuted block mb-1">// Triggers if the user types "leak" anywhere in the answer</span>custom_notes.includes("leak")<br><span class="text-theme-textmuted block mt-2 mb-1">// Convert to lower-case first to be perfectly safe (ignores Case-Sensitivity)</span>custom_notes.toLowerCase().includes("leak")<br><span class="text-theme-textmuted block mt-2 mb-1">// Triggers if the store number starts with "US-"</span>store_number.startsWith("US-")</pre>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text text-sm mb-1">Numeric Evaluations (<code class="text-pink-300 font-mono">Number()</code>)</h4>
                            <p class="text-xs text-theme-textmuted mb-2">If you want to evaluate numbers, convert the string to a number first using Number().</p>
                            <pre class="bg-theme-bg p-3 rounded font-mono text-xs text-green-300"><span class="text-theme-textmuted block mb-1">// Triggers if greater than 50</span>Number(case_temps) > 50<br><span class="text-theme-textmuted block mt-2 mb-1">// Triggers if less than or equal to -10</span>Number(case_temps) <= -10</pre>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text text-sm mb-1">Combining Multiple Conditions (<code class="text-pink-300 font-mono">&&</code> / <code class="text-pink-300 font-mono">||</code>)</h4>
                            <pre class="bg-theme-bg p-3 rounded font-mono text-xs text-green-300"><span class="text-theme-textmuted block mb-1">// AND Operator: Both conditions must be TRUE</span>comp_status === "Failed" && case_temps === "Rising"<br><span class="text-theme-textmuted block mt-2 mb-1">// OR Operator: At least one condition must be TRUE</span>rack_status === "Down" || caller_status === "Panic"<br><span class="text-theme-textmuted block mt-2 mb-1">// Grouped Combinations (using Parentheses)</span>case_temps === "Rising" && (comp_status === "Failed" || comp_status === "Tripped")</pre>
                        </div>

                        <div>
                            <h4 class="font-bold text-theme-text text-sm mb-1">Advanced: Evaluating Current Phase</h4>
                            <p class="text-xs text-theme-textmuted mb-2">If you are setting conditions on an <strong>SOP Section</strong>, do NOT try to hack the "Show If" box to track phases. Use the <strong>Show After Phase ID</strong> input box in the SOP Editor. Type the exact Phase ID (e.g., <code class="text-pink-300 font-mono">phase-1</code>). The SOP will automatically wait to render until the user clicks into that phase!</p>
                            <pre class="bg-theme-bg p-3 rounded font-mono text-xs text-green-300"><span class="text-theme-textmuted block mb-1">// Fallback Form Workaround: Show this SOP ONLY when they answer Phase 1's last question</span>phase_1_final_question !== ""</pre>
                        </div>
                    </div>
                </div>

            </div>
`;
            return;
        }

        if (fieldKey === 'MASTER') {
            editorArea.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-purple-400">Editing: ${prettyName}</h3>
                </div>
                <p class="text-theme-textmuted text-sm mb-2">Advanced raw JSON editor.</p>
                <textarea id="admin-json-editor" class="flex-1 w-full bg-theme-bg text-green-400 font-mono text-sm p-4 border border-theme-borderdark rounded focus:outline-none focus:border-theme-primary" spellcheck="false"></textarea>
            `;
            const textarea = document.getElementById('admin-json-editor');
            textarea.value = JSON.stringify(targetData, null, 4);
            textarea.addEventListener('blur', (e) => {
                try {
                    this.activeConfig = JSON.parse(e.target.value);
                    this.renderAdminProfiles();
                    e.target.classList.remove('border-red-500');
                    e.target.classList.add('border-green-500');
                } catch(err) {
                    e.target.classList.add('border-red-500');
                }
            });
            return;
        }

        // Global Settings Form
        if (fieldKey === 'global') {
            ConfigManager._upRemodels = (val) => {
                const stores = val.split(',').map(s => s.trim()).filter(Boolean);
                this.activeConfig.remodels = stores;
            };

            editorArea.innerHTML = `
                <h3 class="text-xl font-bold text-theme-accentsec mb-4">Editing: ${prettyName}</h3>
                <div class="space-y-3 max-w-lg text-theme-text text-sm bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md">
                    <div><label class="block mb-1 font-bold">App Version</label><input class="w-full bg-theme-bg border border-theme-border p-2 rounded focus:border-theme-primary" onchange="ConfigManager.activeConfig.version = this.value" value="${this.activeConfig.version || ''}"></div>
                    
                    <div>
                        <label class="block mb-1 font-bold mt-2">App Theme</label>
                        <p class="text-xs text-white mb-1">Select the color branding pattern for the application.</p>
                        <select class="w-full bg-theme-input border border-theme-borderdark p-2 rounded focus:border-theme-primary" onchange="ConfigManager.activeConfig.theme = this.value; document.body.className = this.value + ' bg-theme-bg h-screen flex flex-col font-sans text-theme-text';">
                            <option value="theme-walmart" ${this.activeConfig.theme === 'theme-walmart' ? 'selected' : ''}>Walmart (Dark)</option>
                            <option value="theme-walmart-light" ${this.activeConfig.theme === 'theme-walmart-light' ? 'selected' : ''}>Walmart (Light)</option>
                            <option value="theme-classic" ${this.activeConfig.theme === 'theme-classic' || (!this.activeConfig.theme && this.activeConfig.theme !== 'theme-walmart-light') ? 'selected' : ''}>Classic (Dark)</option>
                        </select>
                    </div>
<div><label class="block mb-1 font-bold mt-2">Author</label><input class="w-full bg-theme-bg border border-theme-border p-2 rounded focus:border-theme-primary" onchange="ConfigManager.activeConfig.author = this.value" value="${this.activeConfig.author || ''}"></div>
                    <div>
                        <label class="block mb-1 font-bold mt-2">Stores in Remodel (Comma Separated)</label>
                        <p class="text-xs text-theme-textmuted mb-1">List store numbers currently under remodel to highlight them automatically in the ribbon.</p>
                        <textarea class="w-full bg-theme-bg border border-theme-border p-2 rounded focus:border-theme-primary min-h-[100px]" onchange="ConfigManager._upRemodels(this.value)">${(this.activeConfig.remodels || []).join(', ')}</textarea>
                    </div>
                </div>
            `;
        } else if (fieldKey === 'reusableText') {
            ConfigManager._addRT = () => { this.activeConfig.reusableText['new_key_' + Date.now()] = 'New text'; this.editTopLevelField('reusableText', prettyName); };
            ConfigManager._remRT = (k) => { delete this.activeConfig.reusableText[k]; this.editTopLevelField('reusableText', prettyName); };
            ConfigManager._upRT = (oldK, newK, val) => { if(oldK !== newK) delete this.activeConfig.reusableText[oldK]; this.activeConfig.reusableText[newK] = val; };

            let rows = Object.keys(targetData).map(k => `
                <div class="flex space-x-2 mb-2 items-start bg-theme-panel1 p-3 rounded border border-theme-borderdark shadow-sm">
                    <div class="w-1/3">
                        <label class="text-xs text-theme-textmuted font-bold mb-1 block">Key ({reusable_KEY})</label>
                        <input class="w-full bg-theme-bg border border-theme-border p-2 rounded text-sm text-theme-text" value="${k}" onchange="ConfigManager._upRT('${k}', this.value, this.parentElement.nextElementSibling.querySelector('textarea').value)">
                    </div>
                    <div class="w-2/3">
                        <label class="text-xs text-theme-textmuted font-bold mb-1 block">Output Text</label>
                        <textarea class="w-full bg-theme-bg border border-theme-border p-2 rounded text-sm text-theme-text h-16" onchange="ConfigManager._upRT('${k}', this.parentElement.previousElementSibling.querySelector('input').value, this.value)">${targetData[k]}</textarea>
                    </div>
                    <button class="text-red-500 bg-theme-bg border border-theme-border hover:text-red-400 px-3 py-5 rounded font-bold mt-5" onclick="ConfigManager._remRT('${k}')">X</button>
                </div>
            `).join('');
            editorArea.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-theme-accentsec">Editing: ${prettyName}</h3>
                    <button class="bg-green-700 hover:bg-green-600 transition px-3 py-1 rounded text-sm text-white font-bold shadow" onclick="ConfigManager._addRT()">+ Add Text Block</button>
                </div>
                <div>${rows}</div>
            `;
        } else if (fieldKey === 'parserRules') {
            ConfigManager._upPS = (v) => { this.activeConfig.parserRules.schema = v.split(',').map(s=>s.trim()); };
            ConfigManager._upDS = (v) => { this.activeConfig.parserRules.dispatchSchema = v.split(',').map(s=>s.trim()); };

            editorArea.innerHTML = `
                <h3 class="text-xl font-bold text-theme-accentsec mb-4">Editing: ${prettyName}</h3>
                <div class="space-y-4 max-w-xl text-theme-text text-sm bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md mb-4">
                    <h4 class="font-bold text-lg mb-2">Alarm Native Parsing</h4>
                    <div>
                        <label class="block mb-1 font-bold">Delimiter Token</label>
                        <input class="w-full bg-theme-bg border border-theme-border p-2 rounded font-mono focus:border-theme-primary mb-3" onchange="ConfigManager.activeConfig.parserRules.delimiter = this.value" value="${targetData.delimiter || '|'}">
                    </div>
                    <div>
                        <label class="block mb-1 font-bold">Schema Keys (Comma Separated)</label>
                        <p class="text-xs text-theme-textmuted mb-2">Defines the order of properties extracted from the split string.</p>
                        <textarea class="w-full bg-theme-bg border border-theme-border p-2 rounded h-32 font-mono leading-relaxed" onchange="ConfigManager._upPS(this.value)">${(targetData.schema || []).join(',\n')}</textarea>
                    </div>
                </div>

                <div class="space-y-4 max-w-xl text-theme-text text-sm bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md">
                    <h4 class="font-bold text-lg mb-2">Dispatch Native Parsing</h4>
                    <div>
                        <label class="block mb-1 font-bold">Schema Keys (Comma Separated)</label>
                        <p class="text-xs text-theme-textmuted mb-2">Since Dispatches are parsed sequentially via standard colon and space parsing, you can define keys here to be formally tracked as <code>parsed_</code> variables.</p>
                        <textarea class="w-full bg-theme-bg border border-theme-border p-2 rounded h-32 font-mono leading-relaxed" onchange="ConfigManager._upDS(this.value)">${(targetData.dispatchSchema || []).join(',\n')}</textarea>
                    </div>
                </div>
            `;
        }
    },

    
    editProfile: function(profileId) {
        this.editingProfileId = profileId;
        const profile = profileId === 'GENERIC' ? this.activeConfig.profiles.DISPATCH : this.activeConfig.profiles[profileId];
        const editorArea = document.getElementById('admin-editor-area');
        
        ConfigManager._upP = (k, v) => {
            if(k === 'id' && v !== profileId && profileId !== 'GENERIC') {
                this.activeConfig.profiles[v] = profile;
                delete this.activeConfig.profiles[profileId];
                profile.id = v;
                this.editingProfileId = v;
                this.renderAdminProfiles();
                this.editProfile(v);
            } else {
                profile[k] = v;
            }
        };

        ConfigManager._upCA = (k, v) => { profile.crystalAttributes[k] = v; };

        // Fields Management
        ConfigManager._addField = () => { profile.fields.push({id: "new_field", label: "New Label", type: "text"}); this.editProfile(this.editingProfileId); };
        ConfigManager._rmField = (idx) => { profile.fields.splice(idx, 1); this.editProfile(this.editingProfileId); };
        ConfigManager._upField = (idx, k, v) => { profile.fields[idx][k] = v; };
        ConfigManager._moveField = (idx, dir) => {
            if (idx + dir < 0 || idx + dir >= profile.fields.length) return;
            const temp = profile.fields[idx];
            profile.fields[idx] = profile.fields[idx + dir];
            profile.fields[idx + dir] = temp;
            this.editProfile(this.editingProfileId);
        };
                  // Phase Management
          ConfigManager._addPha = () => { if(!profile.investigationPhases) profile.investigationPhases = []; profile.investigationPhases.push({id: "new-phase", title: "New Phase", sequence: profile.investigationPhases.length + 1}); this.editProfile(this.editingProfileId); };
          ConfigManager._rmPha = (idx) => { profile.investigationPhases.splice(idx, 1); this.editProfile(this.editingProfileId); };
          ConfigManager._upPha = (idx, k, v) => { profile.investigationPhases[idx][k] = v; };
          ConfigManager._movePha = (idx, dir) => {
              if (idx + dir < 0 || idx + dir >= profile.investigationPhases.length) return;
              const temp = profile.investigationPhases[idx];
              profile.investigationPhases[idx] = profile.investigationPhases[idx + dir];
              profile.investigationPhases[idx + dir] = temp;
              this.editProfile(this.editingProfileId);
          };

          // SOP Sections Management
          ConfigManager._addSOP = () => { if(!profile.sopSections) profile.sopSections = []; profile.sopSections.push({id: "new-sop", title: "New SOP Section", content: "<p>Instructions</p>"}); this.editProfile(this.editingProfileId); };
          ConfigManager._rmSOP = (idx) => { profile.sopSections.splice(idx, 1); if(profile.sopSections.length === 0) delete profile.sopSections; this.editProfile(this.editingProfileId); };
          ConfigManager._upSOP = (idx, k, v) => { profile.sopSections[idx][k] = v; };
          ConfigManager._moveSOP = (idx, dir) => {
              if (idx + dir < 0 || idx + dir >= profile.sopSections.length) return;
              const temp = profile.sopSections[idx];
              profile.sopSections[idx] = profile.sopSections[idx + dir];
              profile.sopSections[idx + dir] = temp;
              this.editProfile(this.editingProfileId);
          };

          let sopHtml = '';
          if(profile.sopSections) {
              sopHtml = profile.sopSections.map((s, i) => `
                  <div class="bg-theme-bg border border-theme-borderdark p-2 rounded mb-2 text-sm">
                      <div class="flex justify-between items-center mb-1">
                          <input value="${s.id}" onchange="ConfigManager._upSOP(${i}, 'id', this.value)" class="bg-theme-panel1 border-theme-border p-1 rounded font-bold w-1/3 text-theme-accentsec">
                          <div class="flex items-center space-x-2">
                              <input type="checkbox" ${s.alwaysShow ? 'checked' : ''} onchange="ConfigManager._upSOP(${i}, 'alwaysShow', this.checked)">
                              <label class="text-[10px] text-theme-textmuted font-bold uppercase tracking-wider">Always Show</label>
                          </div>
                          <button class="text-theme-textmuted hover:text-white mr-2" onclick="ConfigManager._moveSOP(${i}, -1)" title="Move Up">↑</button>
                          <button class="text-theme-textmuted hover:text-white mr-2" onclick="ConfigManager._moveSOP(${i}, 1)" title="Move Down">↓</button>
                          <button class="text-red-500 hover:text-red-400" onclick="ConfigManager._rmSOP(${i})">X</button>
                      </div>
                      <input value="${s.title}" placeholder="SOP Title" onchange="ConfigManager._upSOP(${i}, 'title', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded mb-1">
                      <div class="grid grid-cols-2 gap-2 mb-1">
                          <input value="${s.showIf || ''}" placeholder="Show If (e.g. condition === 'X')" onchange="ConfigManager._upSOP(${i}, 'showIf', this.value)" title="Form Condition" class="w-full bg-theme-panel1 border-theme-border p-1 rounded font-mono text-xs text-yellow-300">
                          <input value="${s.showOnlyOnPhase || ''}" placeholder="Show Only On Phase ID (e.g. phase-1-diagnosis)" onchange="ConfigManager._upSOP(${i}, 'showOnlyOnPhase', this.value)" title="Phase Hook" class="w-full bg-theme-panel1 border-theme-border p-1 rounded font-mono text-xs text-green-300">
                      </div>
                      <textarea placeholder="HTML Content" onchange="ConfigManager._upSOP(${i}, 'content', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded h-20 text-xs font-mono">${s.content}</textarea>
                      <textarea placeholder="Training Explanation" onchange="ConfigManager._upSOP(${i}, 'trainingExplanation', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded h-10 mt-1 text-xs text-yellow-200" title="Training Note">${s.trainingExplanation || ''}</textarea>
                      <input type="url" placeholder="Training Link (URL)" onchange="ConfigManager._upSOP(${i}, 'trainingLink', this.value)" value="${s.trainingLink || ''}" class="w-full bg-theme-panel1 border-theme-border p-1 rounded mt-1 text-xs text-theme-text" title="Training Link">
                  </div>
              `).join('');
          }

          let phaseHtml = '';
          if(profile.investigationPhases) {
              phaseHtml = profile.investigationPhases.map((p, i) => `
                  <div class="bg-theme-bg border border-theme-borderdark p-2 rounded mb-2 text-sm">
                      <div class="flex justify-between items-center mb-1">
                          <input value="${p.id}" onchange="ConfigManager._upPha(${i}, 'id', this.value)" class="bg-theme-panel1 border-theme-border p-1 rounded font-bold w-1/3 text-theme-accentsec">
                          <button class="text-theme-textmuted hover:text-white mr-2" onclick="ConfigManager._movePha(${i}, -1)" title="Move Up">↑</button>
                          <button class="text-theme-textmuted hover:text-white mr-2" onclick="ConfigManager._movePha(${i}, 1)" title="Move Down">↓</button>
                          <button class="text-red-500 hover:text-red-400" onclick="ConfigManager._rmPha(${i})">X</button>
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                           <input value="${p.title}" placeholder="Title" onchange="ConfigManager._upPha(${i}, 'title', this.value)" class="bg-theme-panel1 border-theme-border p-1 rounded">
                           <input value="${p.sequence}" type="number" placeholder="Sequence" onchange="ConfigManager._upPha(${i}, 'sequence', this.value)" class="bg-theme-panel1 border-theme-border p-1 rounded">
                      </div>
                      <input value="${p.activateIf || ''}" placeholder="Activate If (e.g. condition === 'X')" onchange="ConfigManager._upPha(${i}, 'activateIf', this.value)" class="w-full mt-1 bg-theme-panel1 border-theme-border p-1 rounded font-mono text-xs text-yellow-300">
                      <input value="${p.description || ''}" placeholder="Description" onchange="ConfigManager._upPha(${i}, 'description', this.value)" class="w-full mt-1 bg-theme-panel1 border-theme-border p-1 rounded text-xs">
                  </div>
              `).join('');
          }
        let fieldsHtml = profile.fields.map((f, i) => `
            <div class="bg-theme-bg border border-theme-borderdark p-3 rounded mb-3 flex items-start space-x-3 shadow-inner">
                <span class="text-xs font-bold text-theme-textmuted pt-2">${i+1}.</span>
                <div class="flex-1 grid grid-cols-2 gap-2">
                    <div><label class="text-xs text-theme-textmuted font-bold block mb-1">ID (Ref)</label><input value="${f.id}" onchange="ConfigManager._upField(${i}, 'id', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text"></div>
                    <div><label class="text-xs text-theme-textmuted font-bold block mb-1">Label (UI)</label><input value="${f.label}" onchange="ConfigManager._upField(${i}, 'label', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text"></div>
                    <div>
                        <label class="text-xs text-theme-textmuted font-bold block mb-1">Type</label>
                        <select onchange="ConfigManager._upField(${i}, 'type', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text">
                            <option value="text" ${f.type === 'text'?'selected':''}>Text Input (Single Line)</option>
                            <option value="textarea" ${f.type === 'textarea'?'selected':''}>Text Area (Multi-line)</option>
                            <option value="radio" ${f.type === 'radio'?'selected':''}>Radio Group</option>
                            <option value="select" ${f.type === 'select'?'selected':''}>Combobox / Select</option>
                            <option value="time" ${f.type === 'time'?'selected':''}>Time (Hrs/Mins)</option>
                            <option value="timerStartButton" ${f.type === 'timerStartButton'?'selected':''}>Button - Timer Start (Dispatch Only)</option>
                        </select>
                    </div>
                    <div><label class="text-xs text-theme-textmuted font-bold block mb-1">Source Default</label><input value="${f.source || f.default || ''}" placeholder="e.g. parsed_site_number" onchange="ConfigManager._upField(${i}, 'source', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text"></div>
                     <div class="col-span-2 flex items-center mb-1">
                         <input type="checkbox" ${f.required ? 'checked' : ''} onchange="ConfigManager._upField(${i}, 'required', this.checked)" class="mr-2 h-4 w-4 rounded text-theme-accentsec bg-theme-panel1 border-theme-border focus:ring-theme-primary">
                         <label class="text-xs text-theme-textmuted font-bold block">Required</label>
                     </div>
                     <div class="col-span-2">
                         <label class="text-xs text-theme-textmuted font-bold block mb-1">Visible If (Condition)</label>
                         <input value="${f.visibleIf || ''}" placeholder="e.g. condition === 'True High Pressure'" onchange="ConfigManager._upField(${i}, 'visibleIf', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text font-mono text-theme-accentsec">
                     </div>
                     <div class="col-span-2">
                         <label class="text-xs text-theme-textmuted font-bold block mb-1">Phase Assignment</label>
                         <input value="${f.phase || ''}" placeholder="e.g. phase-1-diagnosis" onchange="ConfigManager._upField(${i}, 'phase', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text">
                     </div>
                     <div class="col-span-2">
                         <label class="text-xs text-theme-textmuted font-bold block mb-1">Training Explanation (Shown in Training Mode)</label>
                         <textarea onchange="ConfigManager._upField(${i}, 'trainingExplanation', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text h-10">${f.trainingExplanation || ''}</textarea>
                     </div>
                     <div class="col-span-2">
                         <label class="text-xs text-theme-textmuted font-bold block mb-1">Training Link (URL)</label>
                         <input type="url" value="${f.trainingLink || ''}" placeholder="https://..." onchange="ConfigManager._upField(${i}, 'trainingLink', this.value)" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text">
                     </div>
                     ${f.type === 'radio' || f.type === 'select' || f.type === 'timerStartButton' ? `
                         <div class="col-span-2">
                            <label class="text-xs text-theme-textmuted font-bold block mb-1">Options (Comma separated)</label>
                            <input value="${Array.isArray(f.options) ? f.options.join(', ') : (f.options || '')}" onchange="ConfigManager._upField(${i}, 'options', this.value.split(',').map(s=>s.trim()))" class="w-full bg-theme-panel1 border-theme-border p-1 rounded text-sm text-theme-text">
                         </div>
                     ` : ''}
                </div>
                <div class="flex flex-col ml-2">
                    <button class="text-theme-textmuted hover:text-white bg-theme-panel1 border border-theme-border px-3 py-1 rounded font-bold mb-1" onclick="ConfigManager._moveField(${i}, -1)" title="Move Up">↑</button>
                    <button class="text-theme-textmuted hover:text-white bg-theme-panel1 border border-theme-border px-3 py-1 rounded font-bold mb-1" onclick="ConfigManager._moveField(${i}, 1)" title="Move Down">↓</button>
                    <button class="text-red-500 border border-theme-border hover:text-red-400 px-3 py-2 rounded font-bold mt-auto" onclick="ConfigManager._rmField(${i})">X</button>
                </div>
            </div>
        `).join('');

        editorArea.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold text-white">Editing Profile: ${profile.name || profile.id}</h3>
                 <button id="admin-delete-profile-btn" class="bg-red-900 hover:bg-red-800 text-red-100 px-3 py-1 rounded text-xs font-bold transition border border-red-700 ${profileId === 'GENERIC' ? 'hidden' : ''}">Delete Profile</button>
            </div>
            
            <div class="flex space-x-6 h-full overflow-y-auto pr-2 pb-10">
                <!-- Data & Settings Col -->
                <div class="w-1/2 space-y-4">
                    <div class="bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md">
                        <h4 class="font-bold text-theme-text border-b border-theme-borderdark pb-1 mb-3">Identity</h4>
                        <div class="mb-3"><label class="block mb-1 text-xs text-theme-textmuted">Dispatch Code (ID)</label><input class="w-full bg-theme-bg border border-theme-border p-2 rounded focus:border-theme-primary text-sm" ${profileId==='GENERIC'?'disabled':''} value="${profile.id}" onchange="ConfigManager._upP('id', this.value)"></div>
                        <div class="mb-3"><label class="block mb-1 text-xs text-theme-textmuted">Profile Name</label><input class="w-full bg-theme-bg border border-theme-border p-2 rounded focus:border-theme-primary text-sm" value="${profile.name}" onchange="ConfigManager._upP('name', this.value)"></div>
                    </div>

                    <div class="bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md h-96 flex flex-col">
                        <div class="flex justify-between items-center border-b border-theme-borderdark pb-2 mb-3">
                            <h4 class="font-bold text-theme-text">SOP Structure</h4>
                            <div>
                                <button class="bg-theme-primary hover:bg-theme-primary py-1 px-3 rounded text-xs text-white shadow font-bold" onclick="ConfigManager._addSOP()">+ Add SOP Section</button>
                            </div>
                        </div>
                        ${profile.sopSections ? `
                            <div class="flex-1 overflow-y-auto pr-1">
                                ${sopHtml}
                            </div>
                        ` : `
                            <div class="mb-3"><label class="block mb-1 text-xs text-theme-textmuted">Legacy Knowledge Block (HTML)</label><textarea class="w-full bg-theme-bg border border-theme-border p-2 font-mono rounded h-32 focus:border-theme-primary text-xs" onchange="ConfigManager._upP('sopText', this.value)">${profile.sopText || ''}</textarea></div>
                            <button class="bg-indigo-700 hover:bg-indigo-600 mt-2 py-2 px-3 rounded text-xs text-white shadow font-bold text-center w-full" onclick="ConfigManager._addSOP()">Convert to Modular SOP Sections</button>
                        `}
                    </div>

                    <div class="bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md">
                        <h4 class="font-bold text-theme-text border-b border-theme-borderdark pb-1 mb-3">Note Template</h4>
                        <div class="mb-3"><label class="block mb-1 text-xs text-theme-textmuted">Note Schema (Injects {fields} & {reusable_text})</label><textarea class="w-full bg-theme-bg border border-theme-border p-2 font-mono rounded h-24 focus:border-theme-primary text-xs" onchange="ConfigManager._upP('noteTemplate', this.value)">${profile.noteTemplate}</textarea></div>
                    </div>

${ConfigManager.mode === 'DISPATCH' ? '' : `
                    <div class="bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md">
                        <h4 class="font-bold text-theme-text border-b border-theme-borderdark pb-1 mb-3">Crystal WorkOrder Default Hooks</h4>
                        <div class="grid grid-cols-2 gap-3 text-sm">
${ConfigManager._renderCrystalHooks()}
                        </div>
                    </div>
`}

                    <!-- Timer Widget Settings -->
                    <div class="bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md">
                        <div class="flex justify-between items-center border-b border-theme-borderdark pb-1 mb-3">
                            <h4 class="font-bold text-theme-text">Timer Configuration</h4>
                            <div class="flex items-center space-x-2">
                                <input type="checkbox" id="admin-timer-enabled" ${profile.timerConfig && profile.timerConfig.enabled ? 'checked' : ''} onchange="ConfigManager._upP_TC('enabled', this.checked)">
                                <label class="text-xs text-theme-text font-bold">Enabled</label>
                            </div>
                        </div>
                        <div class="space-y-3 text-sm ${!(profile.timerConfig && profile.timerConfig.enabled) ? 'opacity-50 pointer-events-none' : ''}">
                            
                            <div>
                                <label class="block text-xs text-theme-textmuted mb-1">Widget Location</label>
                                <select class="w-full bg-theme-bg border border-theme-border p-2 rounded text-theme-text" onchange="ConfigManager._upP_TC('location', this.value)">
                                    <option value="floating" ${!profile.timerConfig || profile.timerConfig.location === 'floating' || profile.timerConfig.location === undefined ? 'selected' : ''}>Floating (Draggable)</option>
                                    <option value="header" ${profile.timerConfig && profile.timerConfig.location === 'header' ? 'selected' : ''}>Header (Next to title)</option>
                                    <option value="header-center" ${profile.timerConfig && profile.timerConfig.location === 'header-center' ? 'selected' : ''}>Header (Center)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs text-theme-textmuted mb-1">Widget Label</label>
                                <input type="text" class="w-full bg-theme-bg border border-theme-border p-2 rounded text-theme-text" value="${profile.timerConfig ? profile.timerConfig.defaultLabel : 'SLA Time'}" onchange="ConfigManager._upP_TC('defaultLabel', this.value)">
                            </div>
                            
                            <div>
                                <div class="flex justify-between items-center mb-1">
                                    <label class="block text-xs text-theme-textmuted">Breakpoints</label>
                                    <button class="text-[10px] bg-theme-primary hover:bg-theme-primary px-2 py-0.5 rounded text-white" onclick="ConfigManager._addTimerBreakpoint()">+ Add Breakpoint</button>
                                </div>
                                <div class="space-y-2 max-h-40 overflow-y-auto pr-1">
                                    ${ConfigManager._renderTimerBreakpoints(profile)}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                
                    <!-- Forms Col -->
                  <div class="w-1/2 flex flex-col space-y-4">
                      <!-- Phases -->
                      <div class="bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md max-h-80 flex flex-col">
                           <div class="flex justify-between items-center border-b border-theme-borderdark pb-2 mb-2">
                              <h4 class="font-bold text-theme-text">Investigation Phases</h4>
                              <button class="bg-theme-primary hover:bg-theme-primary py-1 px-3 rounded text-xs text-white shadow font-bold" onclick="ConfigManager._addPha()">+ Add Phase</button>
                          </div>
                          <div class="flex-1 overflow-y-auto pr-1">
                              ${phaseHtml}
                          </div>
                      </div>

                      <div class="bg-theme-panel1 p-4 border border-theme-borderdark rounded shadow-md flex-1 flex flex-col">
                          <div class="flex justify-between items-center border-b border-theme-borderdark pb-2 mb-3">
                              <h4 class="font-bold text-theme-text">Generated Form Fields</h4>
                              <button class="bg-green-700 hover:bg-green-600 py-1 px-3 rounded text-xs text-white shadow font-bold" onclick="ConfigManager._addField()">+ Add Field</button>
                          </div>
                          <div class="flex-1 overflow-y-auto pr-1 h-96">
                            ${fieldsHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;

        if(profileId !== 'GENERIC') {
             document.getElementById('admin-delete-profile-btn')?.addEventListener('click', () => this.deleteCurrentProfile());
        }
    },

    createNewProfile: function(type = 'DISPATCH') {
        const id = prompt(`Enter new ${type === 'DISPATCH' ? 'Dispatch' : 'Dispatch'} Profile ID (e.g., ${type === 'DISPATCH' ? 'NEW_DISPATCH' : 'GSP'}):`);
        if(id && !this.activeConfig.profiles[id]) {
            this.activeConfig.profiles[id] = {
                id: id,
                type: type,
                name: "New Profile",
                sopText: "<p>New SOP instructions here.</p>",
                crystalAttributes: {
                    issueArea: "Home Office Only",
                    problemType: "Refrigeration - HO Use Only",
                    assetType: "TBD",
                    problemCode: "TBD",
                    priority: "TBD"
                },
                fields: [
                    { id: "store", label: "Store Number", type: "text", source: "parsed_site_number" }
                ],
                noteTemplate: "Review {store}..."
            };
            this.renderAdminProfiles();
            this.editProfile(id);
        } else if (id) {
            alert("A profile with that ID already exists.");
        }
    },

    deleteCurrentProfile: function() {
        if(this.editingProfileId && this.editingProfileId !== 'GENERIC') {
            if(confirm(`Are you sure you want to delete profile ${this.editingProfileId}?`)) {
                delete this.activeConfig.profiles[this.editingProfileId];
                this.editingProfileId = null;
                this.renderAdminProfiles();
                document.getElementById('admin-editor-area').innerHTML = '<p class="text-theme-textmuted italic">Select an option from the sidebar to edit.</p>';
            }
        }
    }
};
