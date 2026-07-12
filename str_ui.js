const fs = require('fs');
const file = 'js/ui.js';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
"this.formState['trade'] = e.detail.woData.trade || '';",
"this.formState['trade'] = e.detail.woData.trade || '';\\n            this.formState['assets'] = e.detail.woData.systems || '';\\n            this.formState['rack'] = e.detail.woData.rack || '';"
);

fs.writeFileSync(file, content);
