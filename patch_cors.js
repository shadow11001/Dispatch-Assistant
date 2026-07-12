const fs = require('fs');
const file = 'TamperMonkey/DispatchAssistant/cors_proxy.user.js';
let content = fs.readFileSync(file, 'utf8');

const anchor = `
                    const woData = {
                        store: storeId || "",
                        trade: trade || "",
                        priority: priority || ""
                    };`;

const newCode = `
                    let rack = '';
                    let systems = '';
                    const desc = findKey(createWoData, 'Description');
                    if (desc && typeof desc === 'string') {
                        const parts = desc.split('|');
                        for (let p of parts) {
                            if (p.includes('Rack Associated:')) {
                                rack = p.split('Rack Associated:')[1].trim();
                            } else if (p.includes('Systems Affected:')) {
                                systems = p.split('Systems Affected:')[1].trim();
                            }
                        }
                    }

                    const woData = {
                        store: storeId || "",
                        trade: trade || "",
                        priority: priority || "",
                        rack: rack,
                        systems: systems
                    };`;

content = content.replace(anchor, newCode);
fs.writeFileSync(file, content);
