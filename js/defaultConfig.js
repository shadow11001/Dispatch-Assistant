window.DispatchAssistantConfig = {
    "version": "1.1.0",
    "lastUpdated": "2026-07-06",
    "author": "Andrew Toothman",
    "changeDescription": "Imported profiles, added Dispatch profile and Dispatch parsing.",
    "history": [
        {
            "version": "1.1.0",
            "date": "2026-07-06",
            "author": "Andrew Toothman",
            "description": "Imported profiles, added Dispatch profile and Dispatch parsing."
        }
    ],
    "reusableText": {
        "monitor_advisement": "Please monitor product and follow refrigeration failure guidelines as found on The Wire.",
        "no_answer": "No answer after required call attempts.",
        "not_required": "Call not required for this alert type.",
        "voicemail_left": "Left voicemail following escalation process.",
        "technician_dispatch": "We have created an emergency response work order and a technician will be onsite ASAP."
    },
    "profiles": {
        "DISPATCH": {
            "name": "Dispatches Workflow",
            "investigationPhases": [
                {
                    "id": "phase-1-init",
                    "title": "Phase 1: First Review & EMR Note",
                    "sequence": 1,
                    "description": "Accept task, check duplicate/power outage, add EMR note."
                },
                {
                    "id": "phase-2-store",
                    "title": "Phase 2: Store Call",
                    "sequence": 2,
                    "activateIf": "true",
                    "description": "Call store, advise of emergency and product guidelines."
                },
                {
                    "id": "phase-3-tech1",
                    "title": "Phase 3: Tech Call 1",
                    "sequence": 3,
                    "activateIf": "store_answ !== ''",
                    "description": "Call the assigned technician."
                },
                {
                    "id": "phase-4-wait5",
                    "title": "Phase 4: 5-Min Wait",
                    "sequence": 4,
                    "activateIf": "tech1_answ === 'No Answer / Voicemail Left'",
                    "description": "Wait 5 mins before Call 2."
                },
                {
                    "id": "phase-5-wait15",
                    "title": "Phase 5: 15-Min Wait",
                    "sequence": 5,
                    "activateIf": "tech1_answ === 'Agreed to Accept' || tech2_answ === 'Agreed to Accept'",
                    "description": "Wait 15 mins for SC accept."
                },
                {
                    "id": "phase-6-tech2",
                    "title": "Phase 6: Tech Call 2",
                    "sequence": 6,
                    "activateIf": "tech1_answ === 'No Answer / Voicemail Left'",
                    "description": "Call the tech a second time."
                },
                {
                    "id": "phase-7-fs",
                    "title": "Phase 7: FS Manager",
                    "sequence": 7,
                    "activateIf": "tech1_answ === 'Declined' || tech1_answ === 'Cannot Meet SLA' || tech1_answ === 'Cannot Support Work' || tech1_answ === 'No clear answer' || tech2_answ === 'Declined' || tech2_answ === 'Cannot Meet SLA' || tech2_answ === 'Cannot Support Work' || tech2_answ === 'No Answer / Voicemail Left'",
                    "description": "Call FS Manager for coverage help."
                },
                {
                    "id": "phase-8-rm",
                    "title": "Phase 8: Regional Manager",
                    "sequence": 8,
                    "activateIf": "fs_action === 'No Answer / Voicemail Left' || fs_action === 'Nothing changes after 15 minutes'",
                    "description": "Call Regional Manager for coverage help."
                },
                {
                    "id": "phase-9-vendor",
                    "title": "Phase 9: Vendor Assignment",
                    "sequence": 9,
                    "activateIf": "rm_action === 'No Answer / Voicemail Left' || rm_action === 'Nothing changes after 15 minutes' || fs_action === 'Assign a vendor' || rm_action === 'Assign a vendor'",
                    "description": "Assign vendor and wait 30 mins."
                }
            ],
            "fields": [
                {
                    "id": "dispatch_ref",
                    "label": "Reference Number",
                    "type": "text",
                    "source": "parsed_reference_number",
                    "phase": "phase-1-init",
                    "required": true
                },
                {
                    "id": "store_number",
                    "label": "Store Number",
                    "type": "text",
                    "source": "parsed_site_number",
                    "phase": "phase-1-init",
                    "required": true
                },
                {
                    "id": "trade",
                    "label": "Trade",
                    "type": "text",
                    "phase": "phase-1-init",
                    "required": true
                },
                {
                    "id": "priority",
                    "label": "Priority",
                    "type": "text",
                    "phase": "phase-1-init",
                    "required": true
                },
                {
                    "id": "assets",
                    "label": "Affected Assets",
                    "type": "text",
                    "source": "parsed_rack_associated",
                    "phase": "phase-1-init"
                },
                {
                    "id": "emr_result",
                    "label": "Initial Review Result",
                    "type": "text",
                    "phase": "phase-1-init",
                    "required": true
                },
                {
                    "id": "store_mgr_name",
                    "label": "Manager Contacted (Title and Name)",
                    "type": "text",
                    "source": "parsed_contact",
                    "phase": "phase-2-store"
                },
                {
                    "id": "store_answ",
                    "label": "Store Call Result",
                    "type": "radio",
                    "options": "Answered,No Answer,Voicemail Left",
                    "phase": "phase-2-store",
                    "required": true
                },
                {
                    "id": "tech_name",
                    "label": "Tech Name",
                    "type": "text",
                    "phase": "phase-3-tech1"
                },
                {
                    "id": "tech1_answ",
                    "label": "Tech Call 1 Result",
                    "type": "select",
                    "options": "Agreed to Accept,No Answer / Voicemail Left,Declined,Cannot Meet SLA,Cannot Support Work,Asks for new assignment,No clear answer",
                    "phase": "phase-3-tech1"
                },
                {
                    "id": "tech2_answ",
                    "label": "Tech Call 2 Result",
                    "type": "select",
                    "options": "Agreed to Accept,No Answer / Voicemail Left,Declined,Cannot Meet SLA,Cannot Support Work,Asks for new assignment",
                    "phase": "phase-6-tech2",
                    "visibleIf": "tech1_answ === 'No Answer / Voicemail Left'"
                },
                {
                    "id": "tech_decline_reason",
                    "label": "Decline/SLA Reason",
                    "type": "text",
                    "phase": "phase-7-fs",
                    "visibleIf": "tech1_answ === 'Declined' || tech1_answ === 'Cannot Meet SLA' || tech1_answ === 'Cannot Support Work' || tech2_answ === 'Declined' || tech2_answ === 'Cannot Meet SLA' || tech2_answ === 'Cannot Support Work'"
                },
                {
                    "id": "fs_name",
                    "label": "FS Manager Name",
                    "type": "text",
                    "phase": "phase-7-fs",
                    "visibleIf": "tech1_answ === 'Declined' || tech1_answ === 'Cannot Meet SLA' || tech1_answ === 'Cannot Support Work' || tech1_answ === 'No clear answer' || tech2_answ === 'Declined' || tech2_answ === 'Cannot Meet SLA' || tech2_answ === 'Cannot Support Work' || tech2_answ === 'No Answer / Voicemail Left'"
                },
                {
                    "id": "fs_action",
                    "label": "FS Manager Response",
                    "type": "select",
                    "options": "Priority Lowered,Assigns new tech,Assign a vendor,Said they will assign,Assign named tech,Current tech will accept,Other Approved Result,No Answer / Voicemail Left,Nothing changes after 15 minutes",
                    "phase": "phase-7-fs",
                    "visibleIf": "tech1_answ === 'Declined' || tech1_answ === 'Cannot Meet SLA' || tech1_answ === 'Cannot Support Work' || tech1_answ === 'No clear answer' || tech2_answ === 'Declined' || tech2_answ === 'Cannot Meet SLA' || tech2_answ === 'Cannot Support Work' || tech2_answ === 'No Answer / Voicemail Left'"
                },
                {
                    "id": "rm_name",
                    "label": "Regional Manager Name",
                    "type": "text",
                    "phase": "phase-8-rm",
                    "visibleIf": "fs_action === 'No Answer / Voicemail Left' || fs_action === 'Nothing changes after 15 minutes'"
                },
                {
                    "id": "rm_action",
                    "label": "RM Response",
                    "type": "select",
                    "options": "Assigns a tech,Will handle assignment,Assign a vendor,Lowers priority,Other Approved Result,No Answer / Voicemail Left,Nothing changes after 15 minutes",
                    "phase": "phase-8-rm",
                    "visibleIf": "fs_action === 'No Answer / Voicemail Left' || fs_action === 'Nothing changes after 15 minutes'"
                },
                {
                    "id": "vendor_name",
                    "label": "Vendor Name",
                    "type": "text",
                    "phase": "phase-9-vendor",
                    "visibleIf": "rm_action === 'No Answer / Voicemail Left' || rm_action === 'Nothing changes after 15 minutes' || fs_action === 'Assign a vendor' || rm_action === 'Assign a vendor'"
                },
                {
                    "id": "vendor_rank",
                    "label": "Vendor Rank",
                    "type": "text",
                    "phase": "phase-9-vendor",
                    "visibleIf": "vendor_name !== ''"
                }
            ],
            "noteTemplate": "",
            "sopSections": [
                {
                    "id": "intro",
                    "title": "Dispatch Assistant Initial Review",
                    "alwaysShow": true,
                    "content": "\n<div class=\"space-y-4 max-w-full text-sm\">\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded shadow-sm\">\n        <h4 class=\"font-bold text-gray-300 mb-3 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">\n            General Dispatch Rules\n        </h4>\n        <ul class=\"space-y-2 text-gray-300 pl-2\">\n            <li class=\"flex items-start\">\n                <span class=\"text-blue-500 mr-2 mt-0.5\">•</span>\n                <span><strong class=\"text-gray-200\">Start with Store Contact:</strong> All dispatches require immediate store contact. Make sure your parser extracted the MOD's information.</span>\n            </li>\n            <li class=\"flex items-start\">\n                <span class=\"text-blue-500 mr-2 mt-0.5\">•</span>\n                <span><strong class=\"text-gray-200\">Duplicate Check:</strong> Check ServiceChannel for duplicate Work Orders and update notes prior to escalation.</span>\n            </li>\n            <li class=\"flex items-start\">\n                <span class=\"text-red-500 mr-2 mt-0.5\">•</span>\n                <span><strong class=\"text-gray-200\">Wait Times:</strong> Strict SLA timers exist between Tech and Vendor wait loops. Rely on the timer engine at the top of the interface.</span>\n            </li>\n        </ul>\n    </div>\n</div>"
                },
                {
                    "id": "step-1-init",
                    "title": "Step 1 - First Review & EMR Note",
                    "showOnlyOnPhase": "phase-1-init",
                    "content": "\n<div class=\"mb-2\">\n  <p>Create an EMR note in Service Channel indicating the dispatch process is beginning.</p>\n\n  <div class=\"mt-2 mb-1 flex items-center justify-between\">\n    <h4 class=\"font-bold text-blue-400\">EMR Note Template</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\" onclick=\"navigator.clipboard.writeText('Checked store for power outage or duplicate work order. Result: {emr_result}. Working task reference: {dispatch_ref}.')\">Copy</button>\n  </div>\n\n  <pre class=\"overflow-x-auto rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Checked store for power outage or duplicate work order. Result: {emr_result}. Working task reference: {dispatch_ref}.</code></pre>\n</div>"
                },
                {
                    "id": "step-2-store",
                    "title": "Step 2 - Contact the Store Manager",
                    "showOnlyOnPhase": "phase-2-store",
                    "content": "\n<h3 class=\"mb-2 text-lg font-bold\">Contact the Store Manager</h3>\n\n<p>Call the Store Manager listed on the work order. Follow the appropriate script based on whether the call is answered.</p>\n\n<div class=\"space-y-3\">\n  <!-- Answered -->\n  <details class=\"rounded-lg border border-green-700 bg-green-900/20\">\n    <summary class=\"cursor-pointer px-4 py-3 font-bold text-green-400\">📞 Store Manager Answers</summary>\n\n    <div class=\"px-4 pb-4\">\n      <p class=\"mb-2\">Read the following script:</p>\n\n      <pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Hello, my name is [Your Name], calling from Upstream Facility Services regarding emergency {trade} Work Order {dispatch_ref} for your store.\n\nThe work order has escalated due to additional alarms. We are working to get a technician onsite as soon as possible.\n\nDo you have any questions for me at this time?</code></pre>\n\n      <div class=\"mt-4\">\n        <strong>If the Store Manager has questions:</strong>\n        <p>Answer them to the best of your ability.</p>\n      </div>\n\n      <div class=\"mt-3\">\n        <strong>If the Store Manager has no questions:</strong>\n\n        <pre class=\"mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Thank you so much for your time today. Please monitor product and follow failure guidelines found on OneWalmart/The WIRE. Have a great day.</code></pre>\n      </div>\n    </div>\n  </details>\n\n  <!-- Voicemail -->\n  <details class=\"rounded-lg border border-yellow-700 bg-yellow-900/20\">\n    <summary class=\"cursor-pointer px-4 py-3 font-bold text-yellow-400\">📬 Store Manager Does Not Answer (Voicemail)</summary>\n\n    <div class=\"px-4 pb-4\">\n      <p class=\"mb-2\">Leave the following voicemail:</p>\n\n      <pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Hello, this is [Your Name] calling regarding emergency {trade} Work Order {dispatch_ref} for Store {store_number}.\n\nThe work order has escalated due to additional alarms.\n\nPlease monitor product in the affected assets and follow Food Safety Guidelines as found on OneWalmart/The WIRE.\n\nThis message is being documented in the work order.</code></pre>\n    </div>\n  </details>\n</div>\n\n<!-- Voicemail Warning -->\n<div class=\"rounded border-l-4 border-red-500 bg-red-900/20 p-3 mt-4\">\n  <h4 class=\"font-bold text-red-400\">Required After Leaving a Voicemail</h4>\n\n  <ul class=\"mt-2 ml-5 list-disc space-y-1\">\n    <li>Create a new Work Order note.</li>\n    <li>Check <strong>Action Required</strong>.</li>\n    <li>Check <strong>Send a Copy to Myself</strong>.</li>\n    <li>Email the following recipients:</li>\n  </ul>\n\n  <pre class=\"mt-3 rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>store-mgr.s{store_number}@stores.us.wal-mart.com;\nauto-care-center-manager.s{store_number}@stores.us.wal-mart.com</code></pre>\n</div>\n\n<!-- Voicemail WorkOrder Template -->\n<div class=\"mt-4 mb-2 flex items-center justify-between\">\n    <h4 class=\"font-bold text-blue-400\">Store Contact Note Template</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\"\n        onclick=\"navigator.clipboard.writeText('Reference#: {dispatch_ref} | Called {store_mgr_name} about emergency {trade} Work Order {dispatch_ref}. Result: {store_answ}. The store was told about the work order and the correct safety, store, or product steps.')\">\n        Copy\n    </button>\n</div>\n\n<pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Reference#: {dispatch_ref} | Called {store_mgr_name} about emergency {trade} Work Order {dispatch_ref}. Result: {store_answ}. The store was told about the work order and the correct safety, store, or product steps.</code></pre>"
                },
                {
                    "id": "step-3-tech1",
                    "title": "Step 3 - Contact the Assigned Technician - Attempt 1",
                    "showOnlyOnPhase": "phase-3-tech1",
                    "content": "\n<div class=\"rounded border-l-4 border-blue-500 bg-blue-900/20 p-3\">\n  <h3 class=\"mb-2 font-bold text-blue-400\">Step 3 - Contact the Assigned Technician</h3>\n\n  <p>Call the assigned technician or vendor regarding the emergency refrigeration work order.</p>\n\n  <ul class=\"mt-2 ml-5 list-disc space-y-1\">\n    <li>Explain the emergency.</li>\n    <li>Verify they can meet the required SLA.</li>\n    <li>Answer any questions.</li>\n    <li>Determine the outcome of the call.</li>\n  </ul>\n</div>\n\n<h3 class=\"font-bold text-green-400 mt-4 mb-2\">\nTechnician Call Script\n</h3>\n\n<pre class=\"bg-gray-900 border border-gray-700 rounded-lg p-3 whitespace-pre-wrap break-words\"><code>Hello, this is [Your Name] from Upstream Facility Services calling regarding emergency {trade} Work Order {dispatch_ref} for Store {store_number}.\n\nThis work order has escalated due to additional alarms.\n\nThe affected assets listed in ServiceChannel are:\n\n{assets}\n\nThis is a {priority} alarm.\n\nAre you able to complete this work order within the required SLA?</code></pre>\n\n<div class=\"space-y-3 mt-4\">\n  <!-- Can Accept -->\n  <details class=\"rounded-lg border border-green-700 bg-green-900/20\">\n    <summary class=\"cursor-pointer px-4 py-3 font-bold text-green-400\">✅ Technician Can Accept</summary>\n\n    <div class=\"px-4 pb-4\">\n      <p>Ask if the technician has any questions.</p>\n\n      <pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 mt-2 whitespace-pre-wrap break-words\"><code>Are there any questions I may assist you with?\n\nThank you for your time today.\n\nWe will be waiting the next 15 minutes for the work order to be formally accepted in ServiceChannel.\n\nWe have notified the Store Manager of the alarm and advised them to monitor product and follow refrigeration failure guidelines found on OneWalmart/The WIRE.</code></pre>\n    </div>\n  </details>\n\n  <!-- Decline -->\n  <details class=\"rounded-lg border border-red-700 bg-red-900/20\">\n    <summary class=\"cursor-pointer px-4 py-3 font-bold text-red-400\">❌ Technician Cannot Accept</summary>\n    <div class=\"px-4 pb-4\">\n        <p>If the technician outright declines or cannot make the SLA:</p>\n         <pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 mt-2 whitespace-pre-wrap break-words\"><code>Attempt #1 | Called assigned technician {tech_name} regarding emergency {trade} WO {dispatch_ref}. Response: Declined. Moving to reach out to FS Manager.</code></pre>\n    </div>\n  </details>\n  \n  <!-- Voicemail -->\n  <details class=\"rounded-lg border border-yellow-700 bg-yellow-900/20\">\n    <summary class=\"cursor-pointer px-4 py-3 font-bold text-yellow-400\">📬 Technician Voicemail</summary>\n\n    <div class=\"px-4 pb-4\">\n      <p class=\"mb-2\">Leave the following voicemail.</p>\n\n      <pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Hello, this is [Your Name] from Upstream Facility Services calling regarding emergency {trade} Work Order {dispatch_ref} for Store {store_number}.\n\nThis work order has escalated due to additional alarms.\n\nThe affected assets listed in ServiceChannel are:\n\n{assets}\n\nWe will attempt to call back in the next 5 minutes for a second attempt.</code></pre>\n    </div>\n  </details>\n</div>\n\n<!-- Universal Note Templating block -->\n<div class=\"mt-4 mb-2 flex items-center justify-between\">\n    <h4 class=\"font-bold text-blue-400\">Oracle & ServiceChannel Note</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\"\n        onclick=\"navigator.clipboard.writeText('Attempt #1 | Called assigned technician {tech_name} regarding emergency {trade} WO {dispatch_ref}. Response: {tech1_answ}. Notes updated in Oracle and ServiceChannel.')\">\n        Copy\n    </button>\n</div>\n\n<pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Attempt #1 | Called assigned technician {tech_name} regarding emergency {trade} WO {dispatch_ref}. Response: {tech1_answ}. Notes updated in Oracle and ServiceChannel.</code></pre>\n"
                },
                {
                    "id": "step-4-wait5",
                    "title": "Wait 5 Minutes",
                    "showOnlyOnPhase": "phase-4-wait5",
                    "content": "\n<div class=\"rounded border-l-4 border-indigo-500 bg-indigo-900/20 p-3\">\n  <h3 class=\"font-bold text-indigo-400\">Wait 5 Minutes</h3>\n  <p>Wait 5 minutes before calling the technician again. If they accept in the meantime, log it and conclude. Otherwise prepare for Tech Call #2.</p>\n</div>\n"
                },
                {
                    "id": "step-5-wait15",
                    "title": "Wait 15 Minutes for Acceptance",
                    "showOnlyOnPhase": "phase-5-wait15",
                    "content": "\n<div class=\"rounded border-l-4 border-indigo-500 bg-indigo-900/20 p-3\">\n  <h3 class=\"font-bold text-indigo-400\">Wait 15 Minutes</h3>\n  <p>Wait 15 minutes while periodically refreshing ServiceChannel to check whether the technician has accepted the work order.</p>\n\n  <div class=\"mt-4 mb-2 flex items-center justify-between\">\n    <h4 class=\"font-bold text-green-400\">Oracle Note (If Accepted)</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\"\n        onclick=\"navigator.clipboard.writeText('Technician has accepted Work Order | Closing Oracle Ticket as Resolved')\">\n        Copy\n    </button>\n  </div>\n  <pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Technician has accepted Work Order | Closing Oracle Ticket as Resolved</code></pre>\n</div>\n"
                },
                {
                    "id": "step-6-tech2",
                    "title": "Final Tech Call Attempt",
                    "showOnlyOnPhase": "phase-6-tech2",
                    "content": "\n<div class=\"rounded border-l-4 border-yellow-500 bg-yellow-900/20 p-3\">\n  <h3 class=\"font-bold text-yellow-400\">Technician Has Not Accepted the Work Order</h3>\n\n  <p>Place a second call to the technician.</p>\n\n  <div class=\"mt-2 mb-2 flex items-center justify-between\">\n    <h4 class=\"font-bold text-yellow-400\">Escalation Note (Before Calling)</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\"\n        onclick=\"navigator.clipboard.writeText('Reference#: {dispatch_ref} | Assigned Technician {tech_name} has not accepted the work order within the allotted time | Reaching out for update (Attempt #2)')\">\n        Copy\n    </button>\n  </div>\n\n  <pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Reference#: {dispatch_ref} | Assigned Technician {tech_name} has not accepted the work order within the allotted time | Reaching out for update (Attempt #2)</code></pre>\n</div>\n\n<div class=\"space-y-3 mt-4\">\n  <details class=\"rounded-lg border border-yellow-700 bg-yellow-900/20\">\n    <summary class=\"cursor-pointer px-4 py-3 font-bold text-yellow-400\">📬 Technician Voicemail - Attempt #2</summary>\n\n    <div class=\"px-4 pb-4\">\n      <p class=\"mb-2\">Leave the following voicemail.</p>\n\n      <pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Hello, this is [Your Name] from Upstream Facility Services calling regarding emergency {trade} Work Order {dispatch_ref} for Store {store_number}.\n\nWe reached out recently regarding acceptance of this work order.\n\nIf you are able, please accept the work order within the next 15 minutes or contact your Field Support Manager for reassignment.</code></pre>\n    </div>\n  </details>\n</div>\n\n<div class=\"mt-4 mb-2 flex items-center justify-between\">\n    <h4 class=\"font-bold text-blue-400\">Oracle & ServiceChannel Note</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\"\n        onclick=\"navigator.clipboard.writeText('Attempt #2 | Called assigned technician {tech_name} regarding emergency {trade} WO {dispatch_ref}. Response: {tech2_answ}. Notes updated in Oracle and ServiceChannel.')\">\n        Copy\n    </button>\n</div>\n\n<pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Attempt #2 | Called assigned technician {tech_name} regarding emergency {trade} WO {dispatch_ref}. Response: {tech2_answ}. Notes updated in Oracle and ServiceChannel.</code></pre>\n"
                },
                {
                    "id": "step-7-fsm",
                    "title": "Contact the FS Manager",
                    "showOnlyOnPhase": "phase-7-fs",
                    "content": "\n<div class=\"rounded border-l-4 border-blue-500 bg-blue-900/20 p-3\">\n  <h3 class=\"mb-2 font-bold text-blue-400\">Step 4 - Contact the FS Manager</h3>\n\n  <p>Contact the assigned Field Support Manager to request guidance on the emergency work order.</p>\n\n  <ul class=\"mt-2 ml-5 list-disc space-y-1\">\n    <li>Explain why the work order has escalated.</li>\n    <li>Advise of technician contact attempts.</li>\n    <li>Request the next course of action.</li>\n    <li>Document the interaction in Oracle and ServiceChannel.</li>\n  </ul>\n\n  <div class=\"mt-3 rounded border-l-4 border-yellow-500 bg-yellow-900/20 p-3\">\n    <strong>Important</strong><br />\n    Do <strong>not</strong> call the FS Manager if the work order has already been downgraded, unless circumstances have changed that could quickly lead to product loss.\n  </div>\n</div>\n\n<h3 class=\"mb-2 font-bold text-green-400 mt-4\">FS Manager Call Script</h3>\n\n<pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Hello, this is [Your Name] calling from Upstream Facility Services regarding emergency {trade} Work Order {dispatch_ref} for Store {store_number}.\n\nThe work order escalated due to additional alarms.\n\nWe attempted technician contact and need confirmation of next steps for emergency coverage.\n\nThe affected assets listed in ServiceChannel are:\n\n{assets}\n\nPlease advise.</code></pre>\n\n<div class=\"mt-4 mb-2 flex items-center justify-between\">\n    <h4 class=\"font-bold text-blue-400\">Document the Interaction</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\"\n        onclick=\"navigator.clipboard.writeText('Called FS Manager {fs_name} regarding emergency {trade} WO {dispatch_ref}. Advised work order escalated due to additional alarms and affected assets are {assets}. Technician contact status: {tech1_answ} / {tech2_answ}. FS Manager response: {fs_action}. Notes updated in Oracle and ServiceChannel.')\">\n        Copy\n    </button>\n</div>\n\n<pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Called FS Manager {fs_name} regarding emergency {trade} WO {dispatch_ref}. Advised work order escalated due to additional alarms and affected assets are {assets}. Technician contact status: {tech1_answ} / {tech2_answ}. FS Manager response: {fs_action}. Notes updated in Oracle and ServiceChannel.</code></pre>\n\n"
                },
                {
                    "id": "step-8-rm",
                    "title": "Contact the Regional Manager",
                    "showOnlyOnPhase": "phase-8-rm",
                    "content": "\n<div class=\"rounded border-l-4 border-blue-500 bg-blue-900/20 p-3\">\n  <h3 class=\"mb-2 font-bold text-blue-400\">Step 5 - Regional Manager Contact Needed</h3>\n\n  <p>Contact the Regional Manager for direction when technician assignment has not been secured through the technician or Field Support Manager escalation paths.</p>\n\n  <ul class=\"mt-2 ml-5 list-disc space-y-1\">\n    <li>Explain the emergency escalation.</li>\n    <li>Advise of previous technician and FS Manager contact attempts.</li>\n    <li>Request confirmation of next steps for emergency coverage.</li>\n    <li>Document the interaction in Oracle and ServiceChannel.</li>\n  </ul>\n</div>\n\n<h3 class=\"mb-2 font-bold text-green-400 mt-4\">Regional Manager Call Script</h3>\n\n<pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Hello, this is [Your Name] calling regarding emergency {trade} Work Order {dispatch_ref} for Store {store_number}.\n\nThe work order escalated due to additional alarms.\n\nWe attempted Field Support Management contact and need confirmation of next steps for emergency coverage.\n\nThe affected assets listed in ServiceChannel are:\n\n{assets}\n\nPlease advise.</code></pre>\n\n<div class=\"mt-4 mb-2 flex items-center justify-between\">\n    <h4 class=\"font-bold text-blue-400\">Document the Interaction</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\"\n        onclick=\"navigator.clipboard.writeText('Called Regional Manager {rm_name} regarding emergency {trade} WO {dispatch_ref}. Advised WO escalated due to additional alarms and affected assets are {assets}. Technician contact status: {tech1_answ} / {tech2_answ}. Regional Manager response: {rm_action}.')\">\n        Copy\n    </button>\n</div>\n\n<pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Called Regional Manager {rm_name} regarding emergency {trade} WO {dispatch_ref}. Advised WO escalated due to additional alarms and affected assets are {assets}. Technician contact status: {tech1_answ} / {tech2_answ}. Regional Manager response: {rm_action}.</code></pre>\n"
                },
                {
                    "id": "step-9-vendor",
                    "title": "Vendor Assignment",
                    "showOnlyOnPhase": "phase-9-vendor",
                    "content": "\n<div class=\"rounded border-l-4 border-red-500 bg-red-900/20 p-3\">\n  <h3 class=\"font-bold text-red-400\">Final Escalation Path - Begin Vendor Assignment</h3>\n\n  <p>When leadership has not provided an assignment, begin working through the eligible vendor ranking list.</p>\n</div>\n\n<h4 class=\"font-bold text-yellow-400 mt-4\">Vendor Eligibility Requirements</h4>\n\n<ul class=\"ml-5 list-disc\">\n  <li>Vendor ranking must be below 50.</li>\n  <li>Do not assign Walmart HVAC.</li>\n  <li>Do not assign Walmart Insource.</li>\n  <li>Assign one vendor at a time in ranking order.</li>\n</ul>\n\n<div class=\"mt-4 mb-2 flex items-center justify-between\">\n    <h4 class=\"font-bold text-blue-400\">Vendor Assignment Note</h4>\n\n    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700\"\n        onclick=\"navigator.clipboard.writeText('Assigned emergency WO {dispatch_ref} to vendor {vendor_name}, Rank {vendor_rank}. Affected assets: {assets}. Waiting 30 Minutes for Acceptance / Assigning to Next Vendor / Accepted / Escalated.')\">\n        Copy\n    </button>\n</div>\n\n<pre class=\"rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap break-words\"><code>Assigned emergency WO {dispatch_ref} to vendor {vendor_name}, Rank {vendor_rank}. Affected assets: {assets}. Waiting 30 Minutes for Acceptance / Assigning to Next Vendor / Accepted / Escalated.</code></pre>\n"
                }
            ],
            "crystalAttributes": {
                "issueArea": "Refrigeration",
                "problemType": "Emergency",
                "assetType": "Multiplex",
                "problemCode": "MULTICLT",
                "priority": "P1"
            },
            "timerConfig": {
                "enabled": true,
                "location": "header",
                "breakpoints": [
                    {
                        "minuteStart": 0,
                        "minuteEnd": 5,
                        "colorClass": "bg-blue-500",
                        "tooltip": "Wait 5 mins for Tech Attempt 2"
                    },
                    {
                        "minuteStart": 5,
                        "minuteEnd": 15,
                        "colorClass": "bg-green-500",
                        "tooltip": "Wait 15 mins for Tech SC Acceptance / FS / RM Check"
                    },
                    {
                        "minuteStart": 15,
                        "minuteEnd": 30,
                        "colorClass": "bg-yellow-500",
                        "tooltip": "Wait 30 mins for Vendor Acceptance"
                    },
                    {
                        "minuteStart": 30,
                        "minuteEnd": 999,
                        "colorClass": "bg-red-500 text-white animate-pulse",
                        "tooltip": "SLA Exceeded - Move Next Step"
                    }
                ]
            }
        }
    },
    "parserRules": {
        "delimiter": "|",
        "dispatchSchema": [
            "reference_number",
            "contact",
            "position",
            "units_affected",
            "rack_associated",
            "systems_affected",
            "dispatch_message",
            "manual_comment"
        ],
        "schema": [
            "location",
            "site_number",
            "ems",
            "unknown1",
            "network_location",
            "network_address",
            "unknown2",
            "io",
            "io_type",
            "dispatch_type",
            "incident_id"
        ]
    },
    "theme": "theme-classic"
};
