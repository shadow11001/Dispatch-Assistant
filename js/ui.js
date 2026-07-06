const UI = {
    formState: {},
    currentProfile: null,
    currentPhaseIndex: 0,
    completedPhases: [],

    init: function (appInstance) {
        if (appInstance) this.app = appInstance;
        this.cacheDOM();
        this.bindEvents();
    },

    switchMode: function(mode) {
        this.app.config.mode = mode;
        if(window.ConfigManager) window.ConfigManager.mode = mode;
        
        const titles = document.querySelectorAll('header h1');
        
        // Update UI Tabs
        const activeClasses = ['bg-theme-bg', 'text-theme-text', 'shadow-sm'];
        const inactiveClasses = ['text-theme-textmuted'];

        if (mode === 'DISPATCH') {
            titles.forEach(t => t.textContent = "Dispatch Assistant");
            
            if (this.tabDispatches) {
                this.tabDispatches.classList.add(...activeClasses);
                this.tabDispatches.classList.remove(...inactiveClasses);
            }
            if (this.tabAlarms) {
                this.tabAlarms.classList.remove(...activeClasses);
                this.tabAlarms.classList.add(...inactiveClasses);
            }
            
            if (this.alertInput) {
                this.alertInput.placeholder = "Paste Dispatch Information here...";
                document.querySelector('#panel-workflow h2').textContent = "1. Dispatch Workflow";
                document.querySelector('label[for="alert-input"]').textContent = "Paste Dispatch Detail";
            }
        } else {
            titles.forEach(t => t.textContent = "Alarm Alert Assistant");
            
            if (this.tabAlarms) {
                this.tabAlarms.classList.add(...activeClasses);
                this.tabAlarms.classList.remove(...inactiveClasses);
            }
            if (this.tabDispatches) {
                this.tabDispatches.classList.remove(...activeClasses);
                this.tabDispatches.classList.add(...inactiveClasses);
            }
            
            if (this.alertInput) {
                this.alertInput.placeholder = "e.g. US|54|C|100001|MODBUS|...";
                document.querySelector('#panel-workflow h2').textContent = "1. Guided Workflow";
                document.querySelector('label[for="alert-input"]').textContent = "Paste Alert ID";
            }
        }
        
        // Clear current state
        if (this.clearNoteBtn) this.clearNoteBtn.click();
    },

    cacheDOM: function () {
        this.adminModeBtn = document.getElementById('admin-mode-btn');
        this.trainingModeToggle = document.getElementById('training-mode-toggle');
        this.alertInput = document.getElementById('alert-input');
        this.parseBtn = document.getElementById('parse-alert-btn');
        this.parsedContainer = document.getElementById('parsed-data-container');
        this.dynamicQuestions = document.getElementById('dynamic-questions-container');
        this.sopContainer = document.getElementById('sop-container');
        
        this.crystalAttributesContainer = document.getElementById('crystal-attributes-container');
        this.crystalAttributesList = document.getElementById('crystal-attributes-list');
        this.generatedNote = document.getElementById('generated-note');
        this.copyNoteBtn = document.getElementById('copy-note-btn');
        this.clearNoteBtn = document.getElementById('clear-note-btn');
        
        this.tabAlarms = document.getElementById('tab-alarms');
        this.tabDispatches = document.getElementById('tab-dispatches');
    },

    bindEvents: function () {
        // Tab switching
        if (this.tabAlarms) {
            this.tabAlarms.addEventListener('click', () => this.switchMode('ALARM'));
        }
        if (this.tabDispatches) {
            this.tabDispatches.addEventListener('click', () => this.switchMode('DISPATCH'));
        }
        if (this.adminModeBtn) {
            this.adminModeBtn.addEventListener('click', () => {
                ConfigManager.openAdminModal();
            });
        }

        if (this.trainingModeToggle) {
            this.trainingModeToggle.addEventListener('change', () => {
                if(this.currentProfile) {
                    // Re-render form to show/hide training elements there too
                    if(this.currentProfile.investigationPhases) {
                        this.renderPhasedWorkflow();
                    } else {
                        this.evalDynamicVisibility();
                    }
                }
            });
        }

        if (this.parseBtn && this.alertInput) {
            this.parseBtn.addEventListener('click', () => {
                App.handleParseAlert(this.alertInput.value || '');
            });
            
            this.alertInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    App.handleParseAlert(this.alertInput.value || '');
                }
            });
        }
        
        if (this.copyNoteBtn && this.generatedNote) {
            this.copyNoteBtn.addEventListener('click', () => {
                 this.generatedNote.select();
                 document.execCommand('copy');
                 const oldText = this.copyNoteBtn.innerText;
                 this.copyNoteBtn.innerText = "Copied!";
                 setTimeout(() => { this.copyNoteBtn.innerText = oldText; }, 2000);
            });
        }
        
        if (this.clearNoteBtn) {
            this.clearNoteBtn.addEventListener('click', () => {
                 // Clear pending debounce timeout before clearing state
                 if (this._renderTimeout) {
                     clearTimeout(this._renderTimeout);
                     this._renderTimeout = null;
                 }
                 
                 if (this.alertInput) this.alertInput.value = '';
                 if (this.parsedContainer) this.parsedContainer.classList.add('hidden');
                 if (this.dynamicQuestions) this.dynamicQuestions.innerHTML = '';
                 if (this.sopContainer) this.sopContainer.innerHTML = '<p class="text-theme-textmuted italic">Please parse an alert or select an alarm type to view SOPs.</p>';
                 if (this.crystalAttributesContainer) this.crystalAttributesContainer.classList.add('hidden');
                 if (this.generatedNote) this.generatedNote.value = '';
                 this.formState = {};
                 this.currentProfile = null;
                 if (typeof TimerEngine !== 'undefined') { TimerEngine.reset(); }
                 if (typeof StorageProvider !== 'undefined') { StorageProvider.clearSession(); }
            });
        }
    },

    renderParsedData: function (parsedData) {
        this.parsedContainer.classList.remove('hidden');
        
        // Add EMS Context rendering
        let emsContext = '';
        if (parsedData.store_ems_primary) {
             const emsLabel = parsedData.store_ems_primary.includes(',') ? 'Target EMS Systems' : 'Target EMS';
             emsContext = `<li class="text-green-300 font-bold mt-2">${emsLabel}: ${parsedData.store_ems_primary}</li>`;
             
             if (parsedData.store_racks && Object.keys(parsedData.store_racks).length > 0) {
                 const racksHtml = Object.keys(parsedData.store_racks).map(rackName => {
                     const rackEMS = parsedData.store_racks[rackName].ems;
                     return `<li><span class="text-theme-text text-xs">- ${rackName}</span> <span class="text-theme-textmuted text-xs italic">(${rackEMS || 'Unknown'})</span></li>`;
                 }).join('');
                 
                 emsContext += `<li><ul class="ml-2">${racksHtml}</ul></li>`;
             } else {
                 emsContext += `<li class="text-xs text-theme-textmuted">Known Racks: Unknown</li>`;
             }
        }
        
        let remodelContext = '';
        if (parsedData.is_remodel) {
            remodelContext = `<div class="mt-2 p-2 border-2 border-orange-500 bg-orange-900 bg-opacity-20 text-orange-400 font-bold flex items-center gap-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
                </svg>
                STORE IN REMODEL
            </div>`;
        }

        this.parsedContainer.innerHTML = `
            ${remodelContext}
            <div class="mt-2"><strong>Extracted Data:</strong></div>
            <ul class="mt-1 list-disc pl-4 text-xs font-mono">
                <li>Site: ${parsedData.site_number || 'N/A'}</li>
                <li>Reported EMS Network: ${parsedData.ems || 'N/A'}</li>
                <li>Alarm Type: <span class="bg-theme-primary px-1 rounded text-theme-accentsec font-bold">${parsedData.alarm_type || 'Unknown'}</span></li>
                <li>Incident ID: ${parsedData.incident_id || 'N/A'}</li>
                ${emsContext}
            </ul>
        `;
    },

    buildForm: function (profile, parsedData) {
        if(typeof this._clearPendingDebounce === 'function') this._clearPendingDebounce();
        this.currentProfile = profile;
        this.currentPhaseIndex = 0;
        this.completedPhases = [];

        // Make sure parsed data defaults are captured or preserved if restoring
        if(this.formState.alert_id !== parsedData._original_alert) { // newly triggered vs restored
            this.formState = { alert_id: parsedData._original_alert };
            profile.fields.forEach(f => {
                let initialValue = f.default || "";
                // Hardcode logic for site_number legacy
                if (f.source === "parsed_site_number" && parsedData.site_number) {
                    initialValue = parsedData.site_number;
                }
                // Dynamic parsing mapping
                if (f.source && f.source.startsWith('parsed_')) {
                    const parsedKey = f.source.replace('parsed_', '');
                    if (parsedData[parsedKey] !== undefined && parsedData[parsedKey] !== "") {
                        initialValue = parsedData[parsedKey];
                    }
                }
                
                // Don't overwrite state if we are accumulating and already have it
                if (this.formState[f.id] === undefined || this.formState[f.id] === "") {
                    this.formState[f.id] = initialValue;
                }
            });
        }

        if (profile.investigationPhases) {
            this.renderPhasedWorkflow();
        } else {
            this.evalDynamicVisibility();
        }
        
        this._debouncedPhaseRender();
    },

    renderPhasedWorkflow: function() {
        if (!this.currentProfile || !this.currentProfile.investigationPhases) return;

        const activePhases = DecisionEngine.getActivePhases(this.currentProfile.investigationPhases, this.formState);
        const currentPhase = activePhases[this.currentPhaseIndex];

        if (!currentPhase) {
            // Workflow complete
            this.dynamicQuestions.innerHTML = '<div class="text-green-400 font-bold p-4 bg-theme-panel1 rounded">✅ Investigation Complete. Review generated note.</div>';
            
            // Add a Back button if possible
            if (this.currentPhaseIndex > 0) {
                const backBtn = document.createElement('button');
                backBtn.className = "mt-4 bg-gray-600 hover:bg-gray-500 text-white font-bold py-1 px-3 rounded text-sm";
                backBtn.innerText = "← Go Back";
                backBtn.onclick = () => {
                    this.currentPhaseIndex--;
                    this.renderPhasedWorkflow();
                };
                this.dynamicQuestions.appendChild(backBtn);
            }
            return;
        }

        this.dynamicQuestions.innerHTML = '';

        // Render Phase Indicator
        const indicator = document.createElement('div');
        indicator.className = "text-xs font-bold text-theme-textmuted mb-4 pb-2 border-b border-theme-borderdark tracking-wider flex justify-between";
        indicator.innerHTML = `<span>STAGE ${this.currentPhaseIndex + 1} OF ${activePhases.length}: <span class="text-theme-accentsec">${currentPhase.title.toUpperCase()}</span></span>`;
        this.dynamicQuestions.appendChild(indicator);

        if (currentPhase.description) {
            const desc = document.createElement('p');
            desc.className = "text-sm text-theme-textmuted mb-4 italic";
            desc.innerText = currentPhase.description;
            this.dynamicQuestions.appendChild(desc);
        }

        // Render Fields for Current Phase
        const fieldsInPhase = this.currentProfile.fields.filter(f => f.phase === currentPhase.id);
        
        fieldsInPhase.forEach(field => {
            if (field.visibleIf && !DecisionEngine.checkCondition(field.visibleIf, this.formState)) {
                return;
            }

            const fieldDiv = document.createElement('div');
            fieldDiv.className = "mb-3 rounded p-2 focus-within:bg-theme-input transition";
            
            const label = document.createElement('label');
            label.className = "block text-sm font-bold text-theme-text mb-1";
            label.innerText = field.label + (field.required ? " *" : "");
            fieldDiv.appendChild(label);

            const isTrainingMode = this.trainingModeToggle ? this.trainingModeToggle.checked : false;

            if (isTrainingMode && field.trainingExplanation) {
                const trainNote = document.createElement('div');
                trainNote.className = "mb-2 bg-yellow-900 bg-opacity-40 border-l-2 border-yellow-500 text-yellow-300 p-1 pl-2 text-xs italic";
                let linkHtml = field.trainingLink ? ` <a href="${field.trainingLink}" target="_blank" class="underline text-theme-accentsec font-bold ml-1 hover:text-theme-accentsec">Learn More</a>` : '';
                trainNote.innerHTML = `<strong>Why ask this?</strong> ${field.trainingExplanation}${linkHtml}`;
                fieldDiv.appendChild(trainNote);
            }

            let inputObj = null;
            let currentValue = this.formState[field.id] || "";

            if (field.type === 'timerStartButton') {
                const btn = document.createElement('button');
                btn.className = "mt-2 bg-theme-primary text-white font-bold py-2 px-4 rounded shadow hover:bg-theme-primaryhover w-full transition";
                btn.innerText = field.label || "Start Timer";
                
                // Expose timer options as fields
                if (field.options && field.options.length > 0) {
                    btn.setAttribute('data-target-timer', field.options[0]);
                }
                
                // When clicked, invoke the manual timer start method
                btn.onclick = (e) => {
                    e.preventDefault();
                    if (window.TimerEngine && typeof window.TimerEngine.manualStart === 'function') {
                        window.TimerEngine.manualStart();
                        btn.innerText = "Timer Running";
                        btn.classList.add('opacity-50', 'cursor-not-allowed');
                    }
                };
                inputObj = btn; // Set inputObj so it doesn't crash on appendChild later
            } else if (field.type === 'radio') {
                const radioGroup = document.createElement('div');
                radioGroup.className = "flex space-x-4";
                (Array.isArray(field.options) ? field.options : field.options.split(",")).forEach(rawOpt => {
                     // Dynamic math/variable interpolation inside options!
                     let opt = rawOpt;
                     if (opt.includes('{') && opt.includes('}')) {
                         opt = opt.replace(/\{([^}]+)\}/g, (match, expression) => {
                             let res = DecisionEngine.calculateRecommendation(expression, this.formState, App.config);
                             return res !== null && res !== undefined && !isNaN(res) ? res : match;
                         });
                     }

                     const labelEl = document.createElement('label');
                     labelEl.className = "inline-flex items-center";
                     const radioEl = document.createElement('input');
                     radioEl.type = "radio";
                     radioEl.name = field.id;
                     radioEl.value = opt;
                     if(currentValue === opt) radioEl.checked = true;
                     radioEl.className = "form-radio h-4 w-4 text-theme-accentsec bg-theme-input border-theme-border";
                     radioEl.addEventListener('change', (e) => {
                          this.formState[field.id] = e.target.value;
                          this._debouncedPhaseRender();
                     });
                     
                     const span = document.createElement('span');
                     span.className = "ml-2 text-sm text-theme-text";
                     span.innerText = opt;
                     
                     labelEl.appendChild(radioEl);
                     labelEl.appendChild(span);
                     radioGroup.appendChild(labelEl);
                });
                inputObj = radioGroup;
            } else if (field.type === 'select') {
                inputObj = document.createElement('select');
                inputObj.className = "block w-full border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                inputObj.id = `input-${field.id}`;
                
                const defaultOpt = document.createElement('option');
                defaultOpt.value = "";
                defaultOpt.innerText = "-- Select --";
                inputObj.appendChild(defaultOpt);

                (Array.isArray(field.options) ? field.options : (field.options ? field.options.split(',') : [])).forEach(opt => {
                     const optEl = document.createElement('option');
                     optEl.value = opt;
                     optEl.innerText = opt;
                     if(currentValue === opt) optEl.selected = true;
                     inputObj.appendChild(optEl);
                });

                inputObj.addEventListener('change', (e) => {
                     this.formState[field.id] = e.target.value;
                     this._debouncedPhaseRender();
                });
            } else if (field.type === 'textarea') {
                inputObj = document.createElement('textarea');
                inputObj.className = "block w-full border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                inputObj.id = `input-${field.id}`;
                inputObj.rows = 2;
                if(field.placeholder) inputObj.placeholder = field.placeholder;
                inputObj.value = currentValue;
                inputObj.addEventListener('input', (e) => {
                     this.formState[field.id] = e.target.value;
                     this._debouncedPhaseRender();
                });
            } else if (field.type === 'time') {
                inputObj = document.createElement('div');
                inputObj.className = "flex space-x-2";
                
                const hoursInput = document.createElement('input');
                hoursInput.type = "number";
                hoursInput.min = "0";
                hoursInput.placeholder = "Hrs";
                hoursInput.className = "w-20 border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                
                const minsInput = document.createElement('input');
                minsInput.type = "number";
                minsInput.min = "0";
                minsInput.max = "59";
                minsInput.placeholder = "Mins";
                minsInput.className = "w-20 border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                
                // Parse existing "X hours, Y minutes" back into inputs if available
                if (currentValue) {
                    const hMatch = currentValue.match(/(\d+)\s*hour/);
                    const mMatch = currentValue.match(/(\d+)\s*minute/);
                    if (hMatch && hoursInput) hoursInput.value = hMatch[1];
                    if (mMatch && minsInput) minsInput.value = mMatch[1];
                }

                const updateTime = () => {
                    const h = hoursInput ? parseInt(hoursInput.value || 0) : 0;
                    const m = minsInput ? parseInt(minsInput.value || 0) : 0;
                    let result = "";
                    if (h > 0) result += `${h} hour${h > 1 ? 's' : ''}`;
                    if (h > 0 && m > 0) result += ", ";
                    if (m > 0) result += `${m} minute${m > 1 ? 's' : ''}`;
                    if (h === 0 && m === 0) result = ""; // Clear if empty
                    
                    this.formState[field.id] = result;
                    this._debouncedPhaseRender();
                };

                if (hoursInput) hoursInput.addEventListener('input', updateTime);
                if (minsInput) minsInput.addEventListener('input', updateTime);

                const hLabel = document.createElement('span');
                hLabel.className = "self-center text-theme-textmuted text-sm";
                hLabel.innerText = "H";
                
                const mLabel = document.createElement('span');
                mLabel.className = "self-center text-theme-textmuted text-sm";
                mLabel.innerText = "M";

                inputObj.appendChild(hoursInput);
                inputObj.appendChild(hLabel);
                inputObj.appendChild(minsInput);
                inputObj.appendChild(mLabel);

            } else {
                inputObj = document.createElement('input');
                inputObj.type = "text";
                inputObj.className = "block w-full border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                inputObj.id = `input-${field.id}`;
                if(field.placeholder) inputObj.placeholder = field.placeholder;
                inputObj.value = currentValue;
                inputObj.addEventListener('input', (e) => {
                     this.formState[field.id] = e.target.value;
                     this._debouncedPhaseRender();
                });
            }

            fieldDiv.appendChild(inputObj);
            this.dynamicQuestions.appendChild(fieldDiv);
        });

        // Navigation Buttons
        const navContainer = document.createElement('div');
        navContainer.className = "mt-6 pt-4 border-t border-theme-borderdark flex justify-end space-x-3";

        if (this.currentPhaseIndex > 0) {
            const backBtn = document.createElement('button');
            backBtn.className = "bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded text-sm";
            backBtn.innerText = "Back";
            backBtn.onclick = () => {
                this.currentPhaseIndex--;
                this.renderPhasedWorkflow();
            };
            navContainer.appendChild(backBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.className = "bg-theme-primary hover:bg-theme-primaryhover text-white font-bold py-2 px-4 rounded shadow text-sm";
        nextBtn.innerText = this.currentPhaseIndex === activePhases.length - 1 ? "Finish" : "Next Step";
        nextBtn.onclick = () => {
            
            // --- NEW VALIDATION LOGIC ---
            let missingFields = [];
            
            const fieldsInPhase = this.currentProfile.fields.filter(f => f.phase === currentPhase.id);
            fieldsInPhase.forEach(field => {
                // Skip if conditionally hidden
                if (field.visibleIf && !DecisionEngine.checkCondition(field.visibleIf, this.formState)) {
                    return; 
                }
                
                // If the field is required but form state lacks a truthy value
                const currentValue = this.formState[field.id];
                if (field.required && (currentValue === undefined || currentValue === "")) {
                     missingFields.push(field.label);                     
                     const inputEl = document.getElementById(`input-${field.id}`);
                     if (inputEl) {
                         inputEl.classList.add('border-red-500', 'ring-1', 'ring-red-500');
                         inputEl.addEventListener('input', function removeErr() {
                             inputEl.classList.remove('border-red-500', 'ring-1', 'ring-red-500');
                             inputEl.removeEventListener('input', removeErr);
                         });
                     }
                }
            });

            if (missingFields.length > 0) {
                alert(`Please complete the following required fields before proceeding:\n- ${missingFields.join('\n- ')}`);
                return; // Block navigation
            }
            // --- END NEW VALIDATION LOGIC ---

            if (!this.completedPhases.includes(currentPhase.id)) {
                this.completedPhases.push(currentPhase.id);
            }
            this.currentPhaseIndex++;
            this.renderPhasedWorkflow();
            };
        navContainer.appendChild(nextBtn);
        this.dynamicQuestions.appendChild(navContainer);

        },

    evalDynamicVisibility: function() {
        if(!this.currentProfile) return;

        this.dynamicQuestions.innerHTML = '';
        
        this.currentProfile.fields.forEach(field => {
            // Check if field should be visible
            if (field.visibleIf && !DecisionEngine.checkCondition(field.visibleIf, this.formState)) {
                return; // skip rendering
            }

            const fieldDiv = document.createElement('div');
            fieldDiv.className = "mb-3 rounded p-2 focus-within:bg-theme-input transition";
            
            const label = document.createElement('label');
            label.className = "block text-sm font-bold text-theme-text mb-1";
            label.innerText = field.label + (field.required ? " *" : "");
            fieldDiv.appendChild(label);

            const isTrainingMode = this.trainingModeToggle ? this.trainingModeToggle.checked : false;

            if (isTrainingMode && field.trainingExplanation) {
                const trainNote = document.createElement('div');
                trainNote.className = "mb-2 bg-yellow-900 bg-opacity-40 border-l-2 border-yellow-500 text-yellow-300 p-1 pl-2 text-xs italic";
                let linkHtml = field.trainingLink ? ` <a href="${field.trainingLink}" target="_blank" class="underline text-theme-accentsec font-bold ml-1 hover:text-theme-accentsec">Learn More</a>` : '';
                trainNote.innerHTML = `<strong>Why ask this?</strong> ${field.trainingExplanation}${linkHtml}`;
                fieldDiv.appendChild(trainNote);
            }

            let inputObj = null;
            let currentValue = this.formState[field.id] || "";

            if (field.type === 'timerStartButton') {
                const btn = document.createElement('button');
                btn.className = "mt-2 bg-theme-primary text-white font-bold py-2 px-4 rounded shadow hover:bg-theme-primaryhover w-full transition";
                btn.innerText = field.label || "Start Timer";
                
                // Expose timer options as fields
                if (field.options && field.options.length > 0) {
                    btn.setAttribute('data-target-timer', field.options[0]);
                }
                
                // When clicked, invoke the manual timer start method
                btn.onclick = (e) => {
                    e.preventDefault();
                    if (window.TimerEngine && typeof window.TimerEngine.manualStart === 'function') {
                        window.TimerEngine.manualStart();
                        btn.innerText = "Timer Running";
                        btn.classList.add('opacity-50', 'cursor-not-allowed');
                    }
                };
                inputObj = btn; // Set inputObj so it doesn't crash on appendChild later
            } else if (field.type === 'radio') {
                const radioGroup = document.createElement('div');
                radioGroup.className = "flex space-x-4";
                (Array.isArray(field.options) ? field.options : field.options.split(",")).forEach(rawOpt => {
                     // Dynamic math/variable interpolation inside options!
                     let opt = rawOpt;
                     if (opt.includes('{') && opt.includes('}')) {
                         opt = opt.replace(/\{([^}]+)\}/g, (match, expression) => {
                             let res = DecisionEngine.calculateRecommendation(expression, this.formState, App.config);
                             return res !== null && res !== undefined && !isNaN(res) ? res : match;
                         });
                     }

                     const labelEl = document.createElement('label');
                     labelEl.className = "inline-flex items-center";
                     const radioEl = document.createElement('input');
                     radioEl.type = "radio";
                     radioEl.name = field.id;
                     radioEl.value = opt;
                     if(currentValue === opt) radioEl.checked = true;
                     radioEl.className = "form-radio h-4 w-4 text-theme-accentsec bg-theme-input border-theme-border";
                     radioEl.addEventListener('change', (e) => {
                          this.formState[field.id] = e.target.value;
                          this.evalDynamicVisibility(); // Re-render tree on change
                     });
                     
                     const span = document.createElement('span');
                     span.className = "ml-2 text-sm text-theme-text";
                     span.innerText = opt;
                     
                     labelEl.appendChild(radioEl);
                     labelEl.appendChild(span);
                     radioGroup.appendChild(labelEl);
                });
                inputObj = radioGroup;
            } else if (field.type === 'select') {
                inputObj = document.createElement('select');
                inputObj.className = "block w-full border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                inputObj.id = `input-${field.id}`;
                
                const defaultOpt = document.createElement('option');
                defaultOpt.value = "";
                defaultOpt.innerText = "-- Select --";
                inputObj.appendChild(defaultOpt);

                (field.options || []).forEach(opt => {
                     const optEl = document.createElement('option');
                     optEl.value = opt;
                     optEl.innerText = opt;
                     if(currentValue === opt) optEl.selected = true;
                     inputObj.appendChild(optEl);
                });

                inputObj.addEventListener('change', (e) => {
                     this.formState[field.id] = e.target.value;
                     this.evalDynamicVisibility();
                });
            } else if (field.type === 'textarea') {
                inputObj = document.createElement('textarea');
                inputObj.className = "block w-full border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                inputObj.id = `input-${field.id}`;
                inputObj.rows = 2;
                if(field.placeholder) inputObj.placeholder = field.placeholder;
                inputObj.value = currentValue;
                inputObj.addEventListener('input', (e) => {
                     this.formState[field.id] = e.target.value;
                     this._debouncedPhaseRender(); // Just update note for text changes, no full re-render needed
                });
            } else if (field.type === 'time') {
                inputObj = document.createElement('div');
                inputObj.className = "flex space-x-2";
                
                const hoursInput = document.createElement('input');
                hoursInput.type = "number";
                hoursInput.min = "0";
                hoursInput.placeholder = "Hrs";
                hoursInput.className = "w-20 border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                
                const minsInput = document.createElement('input');
                minsInput.type = "number";
                minsInput.min = "0";
                minsInput.max = "59";
                minsInput.placeholder = "Mins";
                minsInput.className = "w-20 border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                
                // Parse existing "X hours, Y minutes" back into inputs if available
                if (currentValue) {
                    const hMatch = currentValue.match(/(\d+)\s*hour/);
                    const mMatch = currentValue.match(/(\d+)\s*minute/);
                    if (hMatch && hoursInput) hoursInput.value = hMatch[1];
                    if (mMatch && minsInput) minsInput.value = mMatch[1];
                }

                const updateTime = () => {
                    const h = hoursInput ? parseInt(hoursInput.value || 0) : 0;
                    const m = minsInput ? parseInt(minsInput.value || 0) : 0;
                    let result = "";
                    if (h > 0) result += `${h} hour${h > 1 ? 's' : ''}`;
                    if (h > 0 && m > 0) result += ", ";
                    if (m > 0) result += `${m} minute${m > 1 ? 's' : ''}`;
                    if (h === 0 && m === 0) result = ""; // Clear if empty
                    
                    this.formState[field.id] = result;
                    this._debouncedPhaseRender();
                };

                if (hoursInput) hoursInput.addEventListener('input', updateTime);
                if (minsInput) minsInput.addEventListener('input', updateTime);

                const hLabel = document.createElement('span');
                hLabel.className = "self-center text-theme-textmuted text-sm";
                hLabel.innerText = "H";
                
                const mLabel = document.createElement('span');
                mLabel.className = "self-center text-theme-textmuted text-sm";
                mLabel.innerText = "M";

                inputObj.appendChild(hoursInput);
                inputObj.appendChild(hLabel);
                inputObj.appendChild(minsInput);
                inputObj.appendChild(mLabel);

            } else {
                inputObj = document.createElement('input');
                inputObj.type = "text";
                inputObj.className = "block w-full border border-theme-border bg-theme-input text-theme-text rounded shadow-sm p-2 text-sm focus:ring-theme-primary focus:border-theme-primary";
                inputObj.id = `input-${field.id}`;
                if(field.placeholder) inputObj.placeholder = field.placeholder;
                inputObj.value = currentValue;
                inputObj.addEventListener('input', (e) => {
                     this.formState[field.id] = e.target.value;
                     this._debouncedPhaseRender();
                });
            }

            fieldDiv.appendChild(inputObj);
            this.dynamicQuestions.appendChild(fieldDiv);
        });

        this._debouncedPhaseRender(); // Regenerate note so hidden fields show up as blank or [tags]
    },

    evalSOPVisibility: function() {
        if(!this.currentProfile) return;
        
        // Find all elements with data-show-if inside the SOP Container
        const conditionalBlocks = this.sopContainer.querySelectorAll('[data-show-if]');
        conditionalBlocks.forEach(block => {
            const condition = block.getAttribute('data-show-if');
            if(DecisionEngine.checkCondition(condition, this.formState)) {
                block.classList.remove('hidden');
            } else {
                block.classList.add('hidden');
            }
        });
    },

    renderKnowledge: function (profile) {
        if (!profile) return;

        // If profile uses the new structured SOP sections
        if (profile.sopSections) {
            const lastCompletedPhaseObj = this.currentPhaseIndex > 0 && profile.investigationPhases 
                ? profile.investigationPhases[this.currentPhaseIndex - 1] 
                : null;
            const lastCompletedPhaseId = lastCompletedPhaseObj ? lastCompletedPhaseObj.id : null;

            const currentPhaseObj = this.currentPhaseIndex >= 0 && profile.investigationPhases
                ? profile.investigationPhases[this.currentPhaseIndex]
                : null;
            const currentPhaseId = currentPhaseObj ? currentPhaseObj.id : null;

            const visibleSections = DecisionEngine.getVisibleSopSections(profile.sopSections, this.formState, lastCompletedPhaseId, currentPhaseId);
            
            let html = '';
            
            const isTrainingMode = this.trainingModeToggle ? this.trainingModeToggle.checked : false;

            visibleSections.forEach(section => {
                let contentText = section.content || '';
                // Dynamic math/variable interpolation inside SOP content!
                if (contentText.includes('{') && contentText.includes('}')) {
                    contentText = contentText.replace(/\{([^}]+)\}/g, (match, expression) => {
                        let res = DecisionEngine.calculateRecommendation(expression, this.formState, App.config);
                        return res !== null && res !== undefined && !isNaN(res) ? res : match;
                    });
                }
                
                html += `<div class="mb-4">${contentText}`;
                
                // Append training explanation if in training mode
                if (isTrainingMode && section.trainingExplanation) {
                    let sLinkHtml = section.trainingLink ? ` <a href="${section.trainingLink}" target="_blank" class="underline text-theme-accentsec font-bold ml-1 hover:text-theme-accentsec">Learn More</a>` : '';
                    html += `
                        <div class="mt-2 bg-yellow-900 border-l-4 border-yellow-500 text-yellow-200 p-2 text-xs rounded-r shadow-inner">
                            <strong>🎓 Training Note:</strong> ${section.trainingExplanation}${sLinkHtml}
                        </div>
                    `;
                }

                html += `</div>`;
            });

            // Evaluate recommendations if they exist
            if (profile.recommendations) {
                const recs = DecisionEngine.evaluateRecommendations(profile.recommendations, this.formState, App.config);
                recs.forEach(rec => {
                    if (rec.calculation !== null && rec.calculation !== undefined) {
                        html += `
                            <div class="bg-theme-primary border border-theme-primary rounded p-3 mb-2 shadow-lg animate-pulse">
                                <h4 class="font-bold text-theme-accentsec">💡 Calculation Recommendation</h4>
                                <span class="text-sm text-theme-accentsec">${rec.params.label || 'Value'}:</span>
                                <span class="bg-black text-white px-2 py-1 rounded font-mono text-lg ml-2 border border-theme-primary">${rec.calculation}</span>
                            </div>
                        `;
                    }
                });
            }

            this.sopContainer.innerHTML = html;
        } 
        // Fallback for profiles using the legacy monolithic html
        else if (profile.sopText) {
            this.sopContainer.innerHTML = profile.sopText;
            this.evalSOPVisibility();
        }
    },

    renderWorkOrderAttributes: function(profile) {
        this.crystalAttributesList.innerHTML = '';
        
        // Hide Crystal WorkOrder block entirely for Dispatch mode
        if (ConfigManager.mode === 'DISPATCH' || !profile.crystalAttributes || !profile.crystalAttributes.enabled) {
            this.crystalAttributesContainer.classList.add('hidden');
            return;
        }

        this.crystalAttributesContainer.classList.remove('hidden');
        
        const attrs = profile.crystalAttributes;
        
        // Dynamically override problemCode if an Asset Type dependent mapping exists and user manually selected a problem
        let displayProblemCode = attrs.problemCode;
        if(this.formState._problemCodeOverride) {
            displayProblemCode = this.formState._problemCodeOverride;
        }

        const keys = [
             {k: 'issueArea', l: 'Issue Area', v: attrs.issueArea},
             {k: 'problemType', l: 'Problem Type', v: attrs.problemType},
             {k: 'assetType', l: 'Asset Type', v: attrs.assetType},
             {k: 'problemCode', l: 'Problem Code', v: displayProblemCode},
             {k: 'priority', l: 'Priority', v: attrs.priority}
        ];

        keys.forEach(item => {
            const wrapper = document.createElement('div');
            wrapper.className = "flex flex-col mb-1";
            
            const label = document.createElement('span');
            label.className = "text-xs font-bold text-theme-textmuted uppercase";
            label.innerText = item.l;
            
            const val = document.createElement('span');
            val.className = "text-sm text-theme-text";
            val.innerText = item.v;

            // If this is the Crystal Problem Code mapping, give them a dropdown to select it manually if we have mappings for the Asset Type
            if (item.k === 'problemCode' && App.config.assetProblemMapping && App.config.assetProblemMapping[attrs.assetType]) {
                 const select = document.createElement('select');
                 select.className = "mt-1 w-full bg-theme-bg border border-theme-border p-1 rounded text-red-300 text-xs font-bold cursor-pointer hover:border-theme-primary";
                 
                 // Default config option
                 const defOpt = document.createElement('option');
                 defOpt.value = attrs.problemCode;
                 defOpt.innerText = `${attrs.problemCode} (Default)`;
                 select.appendChild(defOpt);

                 App.config.assetProblemMapping[attrs.assetType].forEach(pc => {
                     if(pc !== attrs.problemCode) {
                         const opt = document.createElement('option');
                         opt.value = pc;
                         opt.innerText = pc;
                         if(item.v === pc) opt.selected = true;
                         select.appendChild(opt);
                     }
                 });

                 select.addEventListener('change', (e) => {
                      this.formState._problemCodeOverride = e.target.value;
                      this.renderWorkOrderAttributes(profile); // re-render just this block
                 });

                 val.innerHTML = ''; // clear text
                 val.appendChild(select);
            }
            
            wrapper.appendChild(label);
            wrapper.appendChild(val);
            this.crystalAttributesList.appendChild(wrapper);
        });
    },

    
    _debouncedPhaseRender: function() {
        if (this._renderTimeout) {
            clearTimeout(this._renderTimeout);
        }
        this._renderTimeout = setTimeout(() => {
            try {
                // Verify UI state still exists before rendering
                if (!this.currentProfile || !this.dynamicQuestions) {
                    return;
                }

                // Save currently focused element ID and caret position so we can restore it smoothly
                const activeEl = document.activeElement;
                const focusedId = activeEl ? activeEl.id : null;
                const selStart = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') ? activeEl.selectionStart : null;
                const selEnd = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA') ? activeEl.selectionEnd : null;
                
                                // Update underlying structures first BEFORE re-evaluating DOM
                if(this.currentProfile) {
                    this.renderKnowledge(this.currentProfile);
                    this.triggerNoteRender();
                }

                // Re-render
                this.renderPhasedWorkflow(this.currentPhaseIndex);
                
                // Restore focus
                if (focusedId) {
                    const el = document.getElementById(focusedId);
                    if (el && el.offsetParent !== null) { // Check if element is still in DOM
                        el.focus();
                        // Restore precise cursor selection if it's a typing field
                        if ((el.tagName === 'INPUT' && el.type === 'text') || el.tagName === 'TEXTAREA') {
                            try {
                                if (selStart !== null && selEnd !== null) {
                                    el.setSelectionRange(selStart, selEnd);
                                }
                            } catch(e) {}
                        }
                    }
                }
            } finally {
                this._renderTimeout = null; // Clear reference after execution
            }
        }, 300);
    },

    _clearPendingDebounce: function() {
        if (this._renderTimeout) {
            clearTimeout(this._renderTimeout);
            this._renderTimeout = null;
        }
    },

    triggerNoteRender: function() {
        if (!this.currentProfile || !this.generatedNote) return;
        const config = App.config; // Pass master config to access reusable text
        if (!config) return;
        config.activeProfileFields = this.currentProfile.fields; // Pass current fields down so engine knows condition boundaries
        const note = TemplateEngine.generateNote(this.currentProfile.noteTemplate, this.formState, config);
        this.generatedNote.value = note;
    }
};