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
        },
        {
            "version": "1.0.9",
            "date": "2026-07-05",
            "author": "Andrew Toothman",
            "description": "Updated SCL, RDN, MCL profiles."
        },
        {
            "version": "1.0.7",
            "date": "2026-07-02",
            "author": "Andrew Toothman",
            "description": ""
        },
        {
            "version": "1.0.7",
            "date": "2026-07-02",
            "author": "Andrew Toothman",
            "description": "Updated Profiles"
        },
        {
            "version": "1.0.7",
            "date": "2026-07-02",
            "author": "Andrew Toothman",
            "description": "Updated RPL Profile and config"
        },
        {
            "version": "1.0.6",
            "date": "2026-06-28",
            "author": "Andrew Toothman",
            "description": "Updated initial AT profiles, general configuration, and testing/refinement."
        },
        {
            "version": "1.0.5",
            "date": "2026-06-28",
            "author": "System Admin",
            "description": ""
        },
        {
            "version": "1.0.4",
            "date": "2026-06-28",
            "author": "System Admin",
            "description": ""
        },
        {
            "version": "1.0.3",
            "date": "2026-06-28",
            "author": "System Admin",
            "description": "Updated RPL, Showcasing all features available. Updated GENERIC for automated alarm type profile generation."
        },
        {
            "version": "1.0.2",
            "date": "2026-06-27",
            "author": "System Admin",
            "description": "Update RPL"
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
                    "type": "radio",
                    "options": "Agreed to Accept,No Answer / Voicemail Left,Declined,Cannot Meet SLA,Cannot Support Work,Asks for new assignment,No clear answer",
                    "phase": "phase-3-tech1"
                },
                {
                    "id": "tech2_answ",
                    "label": "Tech Call 2 Result",
                    "type": "radio",
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
                    "title": "Step 1: First Review & EMR Note",
                    "content": "<p>Check for duplicates, power outages, and verify priority/tech. Then add the EMR note.</p><div class=\"note-container\"><pre class=\"note-content\">Checked store for power outage or duplicate work order. Result: {emr_result}. Working task reference: {dispatch_ref}.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": "phase-1-init"
                },
                {
                    "title": "Step 2: Store Contact",
                    "content": "<p><strong>If they answer:</strong> Say: Hello, my name is [Agent Name]. I am calling from Upstream Facility Services about emergency {trade} Work Order {dispatch_ref} for your store. We are working to get technician coverage.<br><em>Refrigeration:</em> Please watch the affected product and follow the refrigeration failure and food safety steps found on OneWalmart or The WIRE.<br><em>Other:</em> Please follow your store's safety and operating steps.</p><p><strong>If no answer (Voicemail left):</strong> Say: Hello, this is [Agent Name] from Upstream Facility Services. I am calling about emergency {trade} Work Order {dispatch_ref} for Store {store_number}. We are working to get technician coverage. Please follow the store's safety and operating steps. This call will be added to the work order. (Add refrigeration line if applicable).</p><div class=\"note-container\"><pre class=\"note-content\">Reference {dispatch_ref} | Called {store_mgr_name} about emergency {trade} Work Order {dispatch_ref}. Result: {store_answ}. The store was told about the work order and the correct safety, store, or product steps.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": "phase-2-store"
                },
                {
                    "title": "Step 3: Tech Call #1",
                    "content": "<p><strong>Script:</strong> Hello, this is [Agent Name] from Upstream Facility Services. I am calling about emergency {trade} Work Order {dispatch_ref} for Store {store_number}. The affected equipment listed in ServiceChannel is {assets}. This is a {priority} work order. Can you complete this work within the required SLA?</p><p><strong>Voicemail Script:</strong> Hello, this is [Agent Name]... The affected equipment is listed in ServiceChannel as {assets}. We will try to call you again in about five minutes.</p><div class=\"note-container\"><pre class=\"note-content\">Call #1 | Called assigned tech {tech_name} about emergency {trade} Work Order {dispatch_ref}. Result: {tech1_answ}. Notes were added to Oracle and ServiceChannel.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": "phase-3-tech1"
                },
                {
                    "title": "Tech Call #2 (After 5-Minute Wait)",
                    "content": "<p><strong>Script:</strong> Hello, this is [Agent Name] from Upstream Facility Services. I am calling again about emergency {trade} Work Order {dispatch_ref} for Store {store_number}. Can you complete this work within the required SLA?</p><div class=\"note-container\"><pre class=\"note-content\">Call #2 | Called assigned tech {tech_name} about emergency {trade} Work Order {dispatch_ref}. Result: {tech2_answ}. Notes were added to Oracle and ServiceChannel.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": "phase-6-tech2"
                },
                {
                    "title": "Tech Change Note (As Needed)",
                    "content": "<p>If the assigned tech changes, use this note and start over at Call #1 with the new tech.</p><div class=\"note-container\"><pre class=\"note-content\">Reference {dispatch_ref} | Assignment changed from [Old Tech] to {tech_name}. The current assignment, trade, phone number, and status were checked. Current status: [Status]. Next step: [Step].</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": ""
                },
                {
                    "title": "Step 5: FS Manager Contact",
                    "content": "<p><strong>Script:</strong> Hello, this is [Agent Name] from Upstream Facility Services. I am calling about emergency {trade} Work Order {dispatch_ref} for Store {store_number}. We completed the required tech calls. We need your help with the next step for emergency coverage. The affected equipment listed in ServiceChannel is {assets}. Please advise.</p><div class=\"note-container\"><pre class=\"note-content\">Called FS Manager {fs_name} about emergency {trade} Work Order {dispatch_ref}. Tech contact result: {tech1_answ} / {tech2_answ}. FS Manager response: {fs_action}. Notes were added to Oracle and ServiceChannel.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": "phase-7-fs"
                },
                {
                    "title": "Step 6: Regional Manager Contact",
                    "content": "<p><strong>Script:</strong> Hello, this is [Agent Name] from Upstream Facility Services. I am calling about emergency {trade} Work Order {dispatch_ref} for Store {store_number}. We completed the tech and FS Manager steps. We need help with the next step for emergency coverage. The affected equipment listed in ServiceChannel is {assets}. Please advise.</p><div class=\"note-container\"><pre class=\"note-content\">Called Regional Manager {rm_name} about emergency {trade} Work Order {dispatch_ref}. Tech and FS Manager contact result: FS did not answer/no change. Regional Manager response: {rm_action}. Notes were added to Oracle and ServiceChannel.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": "phase-8-rm"
                },
                {
                    "title": "Step 7: Vendor Assignment",
                    "content": "<p>Assign the highest-ranked approved vendor. Give them 30 minutes.</p><div class=\"note-container\"><pre class=\"note-content\">Reference {dispatch_ref} | Assigned emergency {trade} Work Order {dispatch_ref} to vendor {vendor_name}, Rank {vendor_rank}. The assignment was checked in ServiceChannel. Giving the vendor 30 minutes to accept.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div><br><p><strong>If vendor doesn't accept in 30 mins:</strong></p><div class=\"note-container\"><pre class=\"note-content\">Reference {dispatch_ref} | Vendor {vendor_name}, Rank {vendor_rank}, did not accept within 30 minutes. The current assignment and status were checked. Moving to the next approved vendor.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": "phase-9-vendor"
                },
                {
                    "title": "Closing Oracle Task",
                    "content": "<p>Once ServiceChannel shows a valid final result (Accepted / Active / Priority Lowered / Cancelled), close the Oracle task.</p><div class=\"note-container\"><pre class=\"note-content\">Current ServiceChannel assignment checked: [Tech/Vendor]. Work Order {dispatch_ref} shows [Result]. Closing the Oracle task as resolved.</pre><button class=\"copy-note-btn w-full mt-2 wmt-button\">Copy Note</button></div>",
                    "showOnlyOnPhase": ""
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
            "alarm_message",
            "manual_comment"
        ]
    },
    "theme": "theme-classic"
};
