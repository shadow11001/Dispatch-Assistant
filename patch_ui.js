const fs = require('fs');
const file = 'js/ui.js';
let content = fs.readFileSync(file, 'utf8');

const uiAnchor = `
                            if (e.detail.woData.priority && (!this.formState['priority'] || this.formState['priority'].trim() === "")) {
                                this.formState['priority'] = e.detail.woData.priority;
                                stateUpdated = true;
                            }`;

const uiNew = uiAnchor + `
                            if (e.detail.woData.systems) {
                                this.formState['assets'] = e.detail.woData.systems;
                                stateUpdated = true;
                            }
                            if (e.detail.woData.rack) {
                                this.formState['rack'] = e.detail.woData.rack;
                                stateUpdated = true;
                            }`;

content = content.replace(uiAnchor, uiNew);
fs.writeFileSync(file, content);
