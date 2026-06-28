const ConfigManager = {

    _renderTimerBreakpoints: function(profile) {
        if (!profile.timerConfig || !profile.timerConfig.breakpoints || profile.timerConfig.breakpoints.length === 0) {
            return '<div class="text-xs text-gray-500 italic text-center py-2">No breakpoints defined.</div>';
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
            <div class="bg-gray-900 border border-gray-700 p-2 rounded relative">
                <button class="absolute top-1 right-1 text-red-500 hover:text-red-400 text-xs" onclick="ConfigManager._rmTimerBreakpoint(${i})">X</button>
                <div class="grid grid-cols-2 gap-2 mb-2">
                    <div>
                        <label class="text-[10px] text-gray-500">Start (Min)</label>
                        <input type="number" class="w-full bg-gray-800 border-gray-700 p-1 rounded text-xs" value="${bp.minuteStart}" onchange="ConfigManager._upTcb(${i}, 'minuteStart', parseInt(this.value))">
                    </div>
                    <div>
                        <label class="text-[10px] text-gray-500">End (Min)</label>
                        <input type="number" class="w-full bg-gray-800 border-gray-700 p-1 rounded text-xs" value="${bp.minuteEnd}" onchange="ConfigManager._upTcb(${i}, 'minuteEnd', parseInt(this.value))">
                    </div>
                </div>
                <div class="mb-2">
                    <label class="text-[10px] text-gray-500">Color</label>
                    <select class="w-full bg-gray-800 border-gray-700 p-1 rounded text-xs" onchange="ConfigManager._upTcb(${i}, 'colorClass', this.value)">
                        <option value="">None</option>
                        ${colorOpts}
                    </select>
                </div>
                <div>
                    <label class="text-[10px] text-gray-500">Tooltip Text</label>
                    <input type="text" class="w-full bg-gray-800 border-gray-700 p-1 rounded text-xs" value="${bp.tooltip || ''}" placeholder="Show this message..." onchange="ConfigManager._upTcb(${i}, 'tooltip', this.value)">
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
        if (!profile && this.editingProfileId === "GENERIC") profile = this.activeConfig.genericProfile;
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
            <div><label class="block mb-1 text-xs text-gray-400">Issue Area</label>
                 <select class="w-full bg-gray-900 border border-gray-600 p-2 rounded" onchange="ConfigManager._upCA('issueArea', this.value)">
                    <option value="">-- Select --</option>
                    ${issueAreaOptions}
                 </select>
            </div>
            <div><label class="block mb-1 text-xs text-gray-400">Problem Type</label>
                 <select class="w-full bg-gray-900 border border-gray-600 p-2 rounded" onchange="ConfigManager._upCA('problemType', this.value)">
                    <option value="">-- Select --</option>
                    ${problemTypeOptions}
                 </select>
            </div>
            <div><label class="block mb-1 text-xs text-gray-400">Asset Type</label>
                 <select class="w-full bg-gray-900 border border-gray-600 p-2 rounded" onchange="ConfigManager._upAssetType(this.value)">
                    <option value="">-- Select --</option>
                    ${assetOptions}
                 </select>
            </div>
            <div><label class="block mb-1 text-xs text-gray-400">Problem Code</label>
                 <select class="w-full bg-gray-900 border border-gray-600 p-2 rounded" onchange="ConfigManager._upCA('problemCode', this.value)" id="admin-problem-code-select">
                    <option value="">-- Select --</option>
                    ${problemCodeOptions}
                 </select>
            </div>
            <div class="col-span-2"><label class="block mb-1 text-xs text-gray-400">Priority</label>
                 <select class="w-full bg-gray-900 border border-gray-600 p-2 rounded" onchange="ConfigManager._upCA('priority', this.value)">
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
        if (window.AlarmAssistantConfig) {
            this.activeConfig = JSON.parse(JSON.stringify(window.AlarmAssistantConfig)); // Deep copy
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
        downloadAnchorNode.setAttribute("download", `alarm_config_v${newVersion}.json`);
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

        document.getElementById('admin-add-profile-btn').addEventListener('click', () => this.createNewProfile());
        
        // Navigation binds
        document.getElementById('nav-global-settings').addEventListener('click', () => this.editTopLevelField('global', 'Global App Settings'));
        document.getElementById('nav-reusable-text').addEventListener('click', () => this.editTopLevelField('reusableText', 'Reusable Texts'));
        document.getElementById('nav-parser-rules').addEventListener('click', () => this.editTopLevelField('parserRules', 'Alert Parser Rules'));
        document.getElementById('nav-master-json').addEventListener('click', () => this.editTopLevelField('MASTER', 'Entire Configuration JSON (Master)'));
    },

    renderAdminProfiles: function() {
        const list = document.getElementById('admin-profiles-list');
        list.innerHTML = '';
        
        const highlightSelected = (items, selectedLi) => {
            Array.from(document.querySelectorAll('#admin-modal li')).forEach(nav => {
                 nav.classList.remove('bg-gray-700', 'border-l-4', 'border-blue-500');
            });
            if(selectedLi) selectedLi.classList.add('bg-gray-700', 'border-l-4', 'border-blue-500');
        };

        // Add Generic profile at top
        const genericLi = document.createElement('li');
        genericLi.className = "cursor-pointer p-2 rounded hover:bg-gray-700 text-gray-200 text-sm transition";
        genericLi.innerText = "Generic Fallback";
        genericLi.addEventListener('click', (e) => {
             this.editProfile('GENERIC');
             highlightSelected(list, e.currentTarget);
        });
        list.appendChild(genericLi);

        // Add dynamically configured profiles
        if(this.activeConfig.profiles) {
            Object.keys(this.activeConfig.profiles).forEach(key => {
                const profile = this.activeConfig.profiles[key];
                const li = document.createElement('li');
                li.className = "cursor-pointer p-2 rounded hover:bg-gray-700 text-gray-200 mt-1 text-sm transition";
                li.innerText = `${profile.id} - ${profile.name}`;
                li.addEventListener('click', (e) => {
                     this.editProfile(key);
                     highlightSelected(list, e.currentTarget);
                });
                list.appendChild(li);
            });
        }
    },

    editTopLevelField: function(fieldKey, prettyName) {
        this.editingProfileId = null;
        const editorArea = document.getElementById('admin-editor-area');
        let targetData = fieldKey === 'MASTER' ? this.activeConfig : this.activeConfig[fieldKey] || {};
        
        if (fieldKey === 'MASTER') {
            editorArea.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-purple-400">Editing: ${prettyName}</h3>
                </div>
                <p class="text-gray-400 text-sm mb-2">Advanced raw JSON editor.</p>
                <textarea id="admin-json-editor" class="flex-1 w-full bg-gray-950 text-green-400 font-mono text-sm p-4 border border-gray-700 rounded focus:outline-none focus:border-blue-500" spellcheck="false"></textarea>
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
            editorArea.innerHTML = `
                <h3 class="text-xl font-bold text-blue-400 mb-4">Editing: ${prettyName}</h3>
                <div class="space-y-3 max-w-lg text-gray-300 text-sm bg-gray-800 p-4 border border-gray-700 rounded shadow-md">
                    <div><label class="block mb-1 font-bold">App Version</label><input class="w-full bg-gray-900 border border-gray-600 p-2 rounded focus:border-blue-500" onchange="ConfigManager.activeConfig.version = this.value" value="${this.activeConfig.version || ''}"></div>
                    <div><label class="block mb-1 font-bold mt-2">Author</label><input class="w-full bg-gray-900 border border-gray-600 p-2 rounded focus:border-blue-500" onchange="ConfigManager.activeConfig.author = this.value" value="${this.activeConfig.author || ''}"></div>
                </div>
            `;
        } else if (fieldKey === 'reusableText') {
            ConfigManager._addRT = () => { this.activeConfig.reusableText['new_key_' + Date.now()] = 'New text'; this.editTopLevelField('reusableText', prettyName); };
            ConfigManager._remRT = (k) => { delete this.activeConfig.reusableText[k]; this.editTopLevelField('reusableText', prettyName); };
            ConfigManager._upRT = (oldK, newK, val) => { if(oldK !== newK) delete this.activeConfig.reusableText[oldK]; this.activeConfig.reusableText[newK] = val; };

            let rows = Object.keys(targetData).map(k => `
                <div class="flex space-x-2 mb-2 items-start bg-gray-800 p-3 rounded border border-gray-700 shadow-sm">
                    <div class="w-1/3">
                        <label class="text-xs text-gray-400 font-bold mb-1 block">Key ({reusable_KEY})</label>
                        <input class="w-full bg-gray-900 border border-gray-600 p-2 rounded text-sm text-gray-200" value="${k}" onchange="ConfigManager._upRT('${k}', this.value, this.parentElement.nextElementSibling.querySelector('textarea').value)">
                    </div>
                    <div class="w-2/3">
                        <label class="text-xs text-gray-400 font-bold mb-1 block">Output Text</label>
                        <textarea class="w-full bg-gray-900 border border-gray-600 p-2 rounded text-sm text-gray-200 h-16" onchange="ConfigManager._upRT('${k}', this.parentElement.previousElementSibling.querySelector('input').value, this.value)">${targetData[k]}</textarea>
                    </div>
                    <button class="text-red-500 bg-gray-900 border border-gray-600 hover:text-red-400 px-3 py-5 rounded font-bold mt-5" onclick="ConfigManager._remRT('${k}')">X</button>
                </div>
            `).join('');
            editorArea.innerHTML = `
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-xl font-bold text-blue-400">Editing: ${prettyName}</h3>
                    <button class="bg-green-700 hover:bg-green-600 transition px-3 py-1 rounded text-sm text-white font-bold shadow" onclick="ConfigManager._addRT()">+ Add Text Block</button>
                </div>
                <div>${rows}</div>
            `;
        } else if (fieldKey === 'parserRules') {
            ConfigManager._upPS = (v) => { this.activeConfig.parserRules.schema = v.split(',').map(s=>s.trim()); };
            editorArea.innerHTML = `
                <h3 class="text-xl font-bold text-blue-400 mb-4">Editing: ${prettyName}</h3>
                <div class="space-y-4 max-w-xl text-gray-300 text-sm bg-gray-800 p-4 border border-gray-700 rounded shadow-md">
                    <div>
                        <label class="block mb-1 font-bold">Delimiter Token</label>
                        <input class="w-full bg-gray-900 border border-gray-600 p-2 rounded font-mono focus:border-blue-500" onchange="ConfigManager.activeConfig.parserRules.delimiter = this.value" value="${targetData.delimiter || '|'}">
                    </div>
                    <div>
                        <label class="block mb-1 font-bold">Schema Keys (Comma Separated)</label>
                        <p class="text-xs text-gray-500 mb-2">Defines the order of properties extracted from the split string.</p>
                        <textarea class="w-full bg-gray-900 border border-gray-600 p-2 rounded h-32 font-mono leading-relaxed" onchange="ConfigManager._upPS(this.value)">${(targetData.schema || []).join(',\n')}</textarea>
                    </div>
                </div>
            `;
        }
    },

    
    editProfile: function(profileId) {
        this.editingProfileId = profileId;
        const profile = profileId === 'GENERIC' ? this.activeConfig.genericProfile : this.activeConfig.profiles[profileId];
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
                  // Phase Management
          ConfigManager._addPha = () => { if(!profile.investigationPhases) profile.investigationPhases = []; profile.investigationPhases.push({id: "new-phase", title: "New Phase", sequence: profile.investigationPhases.length + 1}); this.editProfile(this.editingProfileId); };
          ConfigManager._rmPha = (idx) => { profile.investigationPhases.splice(idx, 1); this.editProfile(this.editingProfileId); };
          ConfigManager._upPha = (idx, k, v) => { profile.investigationPhases[idx][k] = v; };

          // SOP Sections Management
          ConfigManager._addSOP = () => { if(!profile.sopSections) profile.sopSections = []; profile.sopSections.push({id: "new-sop", title: "New SOP Section", content: "<p>Instructions</p>"}); this.editProfile(this.editingProfileId); };
          ConfigManager._rmSOP = (idx) => { profile.sopSections.splice(idx, 1); if(profile.sopSections.length === 0) delete profile.sopSections; this.editProfile(this.editingProfileId); };
          ConfigManager._upSOP = (idx, k, v) => { profile.sopSections[idx][k] = v; };

          let sopHtml = '';
          if(profile.sopSections) {
              sopHtml = profile.sopSections.map((s, i) => `
                  <div class="bg-gray-900 border border-gray-700 p-2 rounded mb-2 text-sm">
                      <div class="flex justify-between items-center mb-1">
                          <input value="${s.id}" onchange="ConfigManager._upSOP(${i}, 'id', this.value)" class="bg-gray-800 border-gray-600 p-1 rounded font-bold w-1/3 text-blue-300">
                          <div class="flex items-center space-x-2">
                              <input type="checkbox" ${s.alwaysShow ? 'checked' : ''} onchange="ConfigManager._upSOP(${i}, 'alwaysShow', this.checked)">
                              <label class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Always Show</label>
                          </div>
                          <button class="text-red-500 hover:text-red-400" onclick="ConfigManager._rmSOP(${i})">X</button>
                      </div>
                      <input value="${s.title}" placeholder="SOP Title" onchange="ConfigManager._upSOP(${i}, 'title', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded mb-1">
                      <div class="grid grid-cols-2 gap-2 mb-1">
                          <input value="${s.showIf || ''}" placeholder="Show If (e.g. condition === 'X')" onchange="ConfigManager._upSOP(${i}, 'showIf', this.value)" title="Form Condition" class="w-full bg-gray-800 border-gray-600 p-1 rounded font-mono text-xs text-yellow-300">
                          <input value="${s.showAfter || ''}" placeholder="Show After Phase ID (e.g. phase-1-diagnosis)" onchange="ConfigManager._upSOP(${i}, 'showAfter', this.value)" title="Phase Hook" class="w-full bg-gray-800 border-gray-600 p-1 rounded font-mono text-xs text-green-300">
                      </div>
                      <textarea placeholder="HTML Content" onchange="ConfigManager._upSOP(${i}, 'content', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded h-20 text-xs font-mono">${s.content}</textarea>
                      <textarea placeholder="Training Explanation" onchange="ConfigManager._upSOP(${i}, 'trainingExplanation', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded h-10 mt-1 text-xs text-yellow-200" title="Training Note">${s.trainingExplanation || ''}</textarea>
                  </div>
              `).join('');
          }

          let phaseHtml = '';
          if(profile.investigationPhases) {
              phaseHtml = profile.investigationPhases.map((p, i) => `
                  <div class="bg-gray-900 border border-gray-700 p-2 rounded mb-2 text-sm">
                      <div class="flex justify-between items-center mb-1">
                          <input value="${p.id}" onchange="ConfigManager._upPha(${i}, 'id', this.value)" class="bg-gray-800 border-gray-600 p-1 rounded font-bold w-1/3 text-blue-300">
                          <button class="text-red-500 hover:text-red-400" onclick="ConfigManager._rmPha(${i})">X</button>
                      </div>
                      <div class="grid grid-cols-2 gap-2">
                           <input value="${p.title}" placeholder="Title" onchange="ConfigManager._upPha(${i}, 'title', this.value)" class="bg-gray-800 border-gray-600 p-1 rounded">
                           <input value="${p.sequence}" type="number" placeholder="Sequence" onchange="ConfigManager._upPha(${i}, 'sequence', this.value)" class="bg-gray-800 border-gray-600 p-1 rounded">
                      </div>
                      <input value="${p.activateIf || ''}" placeholder="Activate If (e.g. condition === 'X')" onchange="ConfigManager._upPha(${i}, 'activateIf', this.value)" class="w-full mt-1 bg-gray-800 border-gray-600 p-1 rounded font-mono text-xs text-yellow-300">
                      <input value="${p.description || ''}" placeholder="Description" onchange="ConfigManager._upPha(${i}, 'description', this.value)" class="w-full mt-1 bg-gray-800 border-gray-600 p-1 rounded text-xs">
                  </div>
              `).join('');
          }
        let fieldsHtml = profile.fields.map((f, i) => `
            <div class="bg-gray-900 border border-gray-700 p-3 rounded mb-3 flex items-start space-x-3 shadow-inner">
                <span class="text-xs font-bold text-gray-500 pt-2">${i+1}.</span>
                <div class="flex-1 grid grid-cols-2 gap-2">
                    <div><label class="text-xs text-gray-400 font-bold block mb-1">ID (Ref)</label><input value="${f.id}" onchange="ConfigManager._upField(${i}, 'id', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm text-gray-200"></div>
                    <div><label class="text-xs text-gray-400 font-bold block mb-1">Label (UI)</label><input value="${f.label}" onchange="ConfigManager._upField(${i}, 'label', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm text-gray-200"></div>
                    <div>
                        <label class="text-xs text-gray-400 font-bold block mb-1">Type</label>
                        <select onchange="ConfigManager._upField(${i}, 'type', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm text-gray-200">
                            <option value="text" ${f.type === 'text'?'selected':''}>Text Input (Single Line)</option>
                            <option value="textarea" ${f.type === 'textarea'?'selected':''}>Text Area (Multi-line)</option>
                            <option value="radio" ${f.type === 'radio'?'selected':''}>Radio Group</option>
                            <option value="select" ${f.type === 'select'?'selected':''}>Combobox / Select</option>
                            <option value="time" ${f.type === 'time'?'selected':''}>Time (Hrs/Mins)</option>
                        </select>
                    </div>
                    <div><label class="text-xs text-gray-400 font-bold block mb-1">Source Default</label><input value="${f.source || f.default || ''}" placeholder="e.g. parsed_site_number" onchange="ConfigManager._upField(${i}, 'source', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm text-gray-200"></div>
                     <div class="col-span-2">
                         <label class="text-xs text-gray-400 font-bold block mb-1">Visible If (Condition)</label>
                         <input value="${f.visibleIf || ''}" placeholder="e.g. condition === 'True High Pressure'" onchange="ConfigManager._upField(${i}, 'visibleIf', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm text-gray-200 font-mono text-blue-300">
                     </div>
                     <div class="col-span-2">
                         <label class="text-xs text-gray-400 font-bold block mb-1">Phase Assignment</label>
                         <input value="${f.phase || ''}" placeholder="e.g. phase-1-diagnosis" onchange="ConfigManager._upField(${i}, 'phase', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm text-gray-200">
                     </div>
                     <div class="col-span-2">
                         <label class="text-xs text-gray-400 font-bold block mb-1">Training Explanation (Shown in Training Mode)</label>
                         <textarea onchange="ConfigManager._upField(${i}, 'trainingExplanation', this.value)" class="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm text-gray-200 h-10">${f.trainingExplanation || ''}</textarea>
                     </div>
                     ${f.type === 'radio' || f.type === 'select' ? `
                         <div class="col-span-2">
                            <label class="text-xs text-gray-400 font-bold block mb-1">Options (Comma separated)</label>
                            <input value="${(f.options||[]).join(', ')}" onchange="ConfigManager._upField(${i}, 'options', this.value.split(',').map(s=>s.trim()))" class="w-full bg-gray-800 border-gray-600 p-1 rounded text-sm text-gray-200">
                         </div>
                     ` : ''}
                </div>
                <button class="text-red-500 border border-gray-600 hover:text-red-400 px-3 py-2 rounded font-bold" onclick="ConfigManager._rmField(${i})">X</button>
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
                    <div class="bg-gray-800 p-4 border border-gray-700 rounded shadow-md">
                        <h4 class="font-bold text-gray-300 border-b border-gray-700 pb-1 mb-3">Identity</h4>
                        <div class="mb-3"><label class="block mb-1 text-xs text-gray-400">Alarm Code (ID)</label><input class="w-full bg-gray-900 border border-gray-600 p-2 rounded focus:border-blue-500 text-sm" ${profileId==='GENERIC'?'disabled':''} value="${profile.id}" onchange="ConfigManager._upP('id', this.value)"></div>
                        <div class="mb-3"><label class="block mb-1 text-xs text-gray-400">Profile Name</label><input class="w-full bg-gray-900 border border-gray-600 p-2 rounded focus:border-blue-500 text-sm" value="${profile.name}" onchange="ConfigManager._upP('name', this.value)"></div>
                    </div>

                    <div class="bg-gray-800 p-4 border border-gray-700 rounded shadow-md h-96 flex flex-col">
                        <div class="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
                            <h4 class="font-bold text-gray-300">SOP Structure</h4>
                            <div>
                                <button class="bg-blue-700 hover:bg-blue-600 py-1 px-3 rounded text-xs text-white shadow font-bold" onclick="ConfigManager._addSOP()">+ Add SOP Section</button>
                            </div>
                        </div>
                        ${profile.sopSections ? `
                            <div class="flex-1 overflow-y-auto pr-1">
                                ${sopHtml}
                            </div>
                        ` : `
                            <div class="mb-3"><label class="block mb-1 text-xs text-gray-400">Legacy Knowledge Block (HTML)</label><textarea class="w-full bg-gray-900 border border-gray-600 p-2 font-mono rounded h-32 focus:border-blue-500 text-xs" onchange="ConfigManager._upP('sopText', this.value)">${profile.sopText || ''}</textarea></div>
                            <button class="bg-indigo-700 hover:bg-indigo-600 mt-2 py-2 px-3 rounded text-xs text-white shadow font-bold text-center w-full" onclick="ConfigManager._addSOP()">Convert to Modular SOP Sections</button>
                        `}
                    </div>

                    <div class="bg-gray-800 p-4 border border-gray-700 rounded shadow-md">
                        <h4 class="font-bold text-gray-300 border-b border-gray-700 pb-1 mb-3">Note Template</h4>
                        <div class="mb-3"><label class="block mb-1 text-xs text-gray-400">Note Schema (Injects {fields} & {reusable_text})</label><textarea class="w-full bg-gray-900 border border-gray-600 p-2 font-mono rounded h-24 focus:border-blue-500 text-xs" onchange="ConfigManager._upP('noteTemplate', this.value)">${profile.noteTemplate}</textarea></div>
                    </div>

                    <div class="bg-gray-800 p-4 border border-gray-700 rounded shadow-md">
                        <h4 class="font-bold text-gray-300 border-b border-gray-700 pb-1 mb-3">Crystal WorkOrder Default Hooks</h4>
                        <div class="grid grid-cols-2 gap-3 text-sm">
${ConfigManager._renderCrystalHooks()}
                        </div>
                    </div>

                    <!-- Timer Widget Settings -->
                    <div class="bg-gray-800 p-4 border border-gray-700 rounded shadow-md">
                        <div class="flex justify-between items-center border-b border-gray-700 pb-1 mb-3">
                            <h4 class="font-bold text-gray-300">Timer Configuration</h4>
                            <div class="flex items-center space-x-2">
                                <input type="checkbox" id="admin-timer-enabled" ${profile.timerConfig && profile.timerConfig.enabled ? 'checked' : ''} onchange="ConfigManager._upP_TC('enabled', this.checked)">
                                <label class="text-xs text-gray-300 font-bold">Enabled</label>
                            </div>
                        </div>
                        <div class="space-y-3 text-sm ${!(profile.timerConfig && profile.timerConfig.enabled) ? 'opacity-50 pointer-events-none' : ''}">
                            
                            <div>
                                <label class="block text-xs text-gray-400 mb-1">Widget Location</label>
                                <select class="w-full bg-gray-900 border border-gray-600 p-2 rounded text-gray-200" onchange="ConfigManager._upP_TC('location', this.value)">
                                    <option value="floating" ${!profile.timerConfig || profile.timerConfig.location === 'floating' || profile.timerConfig.location === undefined ? 'selected' : ''}>Floating (Draggable)</option>
                                    <option value="header" ${profile.timerConfig && profile.timerConfig.location === 'header' ? 'selected' : ''}>Header (Next to title)</option>
                                    <option value="header-center" ${profile.timerConfig && profile.timerConfig.location === 'header-center' ? 'selected' : ''}>Header (Center)</option>
                                </select>
                            </div>

                            <div>
                                <label class="block text-xs text-gray-400 mb-1">Widget Label</label>
                                <input type="text" class="w-full bg-gray-900 border border-gray-600 p-2 rounded text-gray-200" value="${profile.timerConfig ? profile.timerConfig.defaultLabel : 'SLA Time'}" onchange="ConfigManager._upP_TC('defaultLabel', this.value)">
                            </div>
                            
                            <div>
                                <div class="flex justify-between items-center mb-1">
                                    <label class="block text-xs text-gray-400">Breakpoints</label>
                                    <button class="text-[10px] bg-blue-700 hover:bg-blue-600 px-2 py-0.5 rounded text-white" onclick="ConfigManager._addTimerBreakpoint()">+ Add Breakpoint</button>
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
                      <div class="bg-gray-800 p-4 border border-gray-700 rounded shadow-md max-h-80 flex flex-col">
                           <div class="flex justify-between items-center border-b border-gray-700 pb-2 mb-2">
                              <h4 class="font-bold text-gray-300">Investigation Phases</h4>
                              <button class="bg-blue-700 hover:bg-blue-600 py-1 px-3 rounded text-xs text-white shadow font-bold" onclick="ConfigManager._addPha()">+ Add Phase</button>
                          </div>
                          <div class="flex-1 overflow-y-auto pr-1">
                              ${phaseHtml}
                          </div>
                      </div>

                      <div class="bg-gray-800 p-4 border border-gray-700 rounded shadow-md flex-1 flex flex-col">
                          <div class="flex justify-between items-center border-b border-gray-700 pb-2 mb-3">
                              <h4 class="font-bold text-gray-300">Generated Form Fields</h4>
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

    createNewProfile: function() {
        const id = prompt("Enter new Profile / Alarm Type ID (e.g., GSP):");
        if(id && !this.activeConfig.profiles[id]) {
            this.activeConfig.profiles[id] = {
                id: id,
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
                document.getElementById('admin-editor-area').innerHTML = '<p class="text-gray-500 italic">Select an option from the sidebar to edit.</p>';
            }
        }
    }
};