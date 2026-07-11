window.DispatchAssistantConfig = {
    "version": "1.0.0",
    "lastUpdated": "2026-07-11",
    "author": "Andrew Toothman",
    "changeDescription": "Migrated Dispatch to its own standalone app. Overhauled note template formatting for Dispatch profile. Reverted version to 1.0.0",
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
            "type": "DISPATCH",
            "noteTemplate": "Reference#: {dispatch_ref}\nTrade: {trade}\n\nStore Number: {store_number}\nWO Number: {work_order}\nPriority: {priority}\n\nAffected Assets: {assets}\nEMR Result: {emr_result}\n\nWorkflow Started At: {resume_phase}\n\nStore Contact:\n  Name: {store_mgr_name}\n  Position: {contact_position}\n    Other: {contact_position_other}\n  Result: {store_answ}\n\nTechnician Contact:\n  Tech/Vendor: {tech_name}\n    Attempt 1: {tech1_answ}\n    Attempt 2: {tech2_answ}\n  Decline Reason:\n    Tech Attempt 1: {tech1_decline_reason}\n    Tech Attempt 2: {tech2_decline_reason}\n\nFS Manager Contact:\n  Name: {fs_name}\n  Response: {fs_action}\n    New Priority: {fs_new_priority}\n\nRegional Manager Contact:\n  Name: {rm_name}\n  Response: {rm_action}\n    New Priority: {rm_new_priority}\n\nVendor Assignment:\n  Vendor 1:\n    Name: {vendor_name}\n    Rank: {vendor_rank}\n    Status: {vendor_status}\n  Vendor 2:\n    Name: {vendor_name_2}\n    Rank: {vendor_rank_2}\n    Status: {vendor_status_2}\n\nWork Order Status: {wo_status}",
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
                        "tooltip": "Wait 15 mins for SC Acceptance"
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
                        "tooltip": "SLA Exceeded! Check Task."
                    }
                ]
            },
            "investigationPhases": [
                {
                    "id": "phase-1-init",
                    "title": "Phase 1: First Review & EMR Note",
                    "sequence": 1,
                    "description": "Accept the task and document in Service Channel."
                },
                {
                    "id": "phase-2-store",
                    "title": "Phase 2: Store Contact",
                    "sequence": 2,
                    "activateIf": "(emr_result === 'EMR Note Added') && (resume_phase === 'Start from Beginning' || resume_phase === '' || resume_phase === undefined)",
                    "description": "Call Store Manager or Highest MOD."
                },
                {
                    "id": "phase-3-tech1",
                    "title": "Phase 3: Tech Contact Attempt 1",
                    "sequence": 3,
                    "activateIf": "resume_phase === 'Phase 3: Tech Call 1' || store_answ === 'Answered' || store_answ === 'No Answer / Left Voicemail'",
                    "description": "Call the assigned technician."
                },
                {
                    "id": "phase-4-tech2",
                    "title": "Phase 4: Tech Contact Attempt 2",
                    "sequence": 4,
                    "activateIf": "resume_phase === 'Phase 4: Tech Call 2' || tech1_answ === 'No Answer / Left Voicemail'",
                    "description": "Wait 5 minutes, then call tech again."
                },
                {
                    "id": "phase-5-fs",
                    "title": "Phase 5: FS Manager Escalation",
                    "sequence": 5,
                    "activateIf": "resume_phase === 'Phase 5: FS Manager' || ['Declined', 'Cannot Meet SLA', 'Cannot Support Work', 'Asks for new assignment', 'No clear answer'].includes(tech1_answ) || ['Declined', 'Cannot Meet SLA', 'Cannot Support Work', 'Asks for new assignment', 'No Answer / Left Voicemail'].includes(tech2_answ)",
                    "description": "Contact FS Manager for next steps."
                },
                {
                    "id": "phase-6-rm",
                    "title": "Phase 6: Regional Manager Escalation",
                    "sequence": 6,
                    "activateIf": "resume_phase === 'Phase 6: Regional Manager' || fs_action === 'No Answer / Voicemail Left' || fs_action === 'Nothing changes after 15 minutes'",
                    "description": "Contact RM Manager for next steps."
                },
                {
                    "id": "phase-7-vendor",
                    "title": "Phase 7: Vendor Assignment",
                    "sequence": 7,
                    "activateIf": "resume_phase === 'Phase 7: Vendor Assignment' || rm_action === 'No Answer / Voicemail Left' || rm_action === 'Nothing changes after 15 minutes' || fs_action === 'Assign a vendor' || rm_action === 'Assign a vendor'",
                    "description": "Manually assign the next eligible vendor."
                },
                {
                    "id": "phase-8-resolution",
                    "title": "Phase 8: Resolution & Acceptance",
                    "sequence": 8,
                    "activateIf": "resume_phase === 'Phase 8: Resolution (Already Accepted)' || vendor_status === 'Accepted in SC' || vendor_status_2 === 'Accepted in SC' || tech1_answ === 'Agreed to Accept' || tech2_answ === 'Agreed to Accept' || ['Priority Lowered', 'Assigns new tech', 'Said they will assign', 'Assign named tech', 'Current tech will accept', 'Other Approved Result'].includes(fs_action) || ['Assigns a tech', 'Will handle assignment', 'Lowers priority', 'Other Approved Result'].includes(rm_action) || vendor_status_2 === 'Did Not Accept (List Exhausted)'",
                    "description": "Process the acceptance or wait for SC."
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
                    "id": "work_order",
                    "label": "Work Order Number",
                    "type": "text",
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
                    "type": "select",
                    "phase": "phase-1-init",
                    "required": true,
                    "options": [
                        "Refrigeration",
                        "HVAC",
                        "Lighting",
                        "General Repair",
                        "Other"
                    ]
                },
                {
                    "id": "priority",
                    "label": "Priority",
                    "type": "select",
                    "phase": "phase-1-init",
                    "required": true,
                    "options": [
                        "PE-Emergency-Onsite w/i 2 hours",
                        "PE-Emergency-Onsite w/i 4 hours",
                        "P1-Onsite w/i 24 hours",
                        "P2-Onsite w/i 48 hours",
                        "P3-Onsite w/i 3 days",
                        "P5-Onsite w/i 5 days",
                        "P7-Onsite w/i 7 days",
                        "P21-Onsite w/i 21 days",
                        "Scheduled Service",
                        "Tech Initiated"
                    ]
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
                    "label": "EMR Note Result",
                    "type": "select",
                    "options": [
                        "",
                        "Duplicate Work Order",
                        "Power Outage",
                        "EMR Note Added"
                    ],
                    "phase": "phase-1-init",
                    "required": true
                },
                {
                    "id": "resume_phase",
                    "label": "Start Workflow At",
                    "type": "select",
                    "options": [
                        "Start from Beginning",
                        "Phase 3: Tech Call 1",
                        "Phase 4: Tech Call 2",
                        "Phase 5: FS Manager",
                        "Phase 6: Regional Manager",
                        "Phase 7: Vendor Assignment",
                        "Phase 8: Resolution (Already Accepted)"
                    ],
                    "phase": "phase-1-init",
                    "required": true,
                    "default": "Start from Beginning"
                },
                {
                    "id": "store_mgr_name",
                    "label": "Manager Contacted (Title and Name)",
                    "type": "text",
                    "source": "parsed_contact",
                    "phase": "phase-2-store",
                    "required": true
                },
                {
                    "id": "contact_position",
                    "label": "Contact Position",
                    "type": "select",
                    "options": [
                        "Store Manager",
                        "Team Lead",
                        "Coach",
                        "Other"
                    ],
                    "phase": "phase-2-store",
                    "required": true
                },
                {
                    "id": "contact_position_other",
                    "label": "Other Position",
                    "type": "text",
                    "visibleIf": "contact_position === 'Other'",
                    "phase": "phase-2-store"
                },
                {
                    "id": "store_answ",
                    "label": "Store Call Result",
                    "type": "radio",
                    "options": [
                        "Answered",
                        "No Answer / Left Voicemail",
                        "Store Power Outage",
                        "Issue Fixed"
                    ],
                    "phase": "phase-2-store",
                    "required": true
                },
                {
                    "id": "tech_name",
                    "label": "Tech Name",
                    "type": "text",
                    "phase": "phase-3-tech1",
                    "required": true
                },
                {
                    "id": "tech1_answ",
                    "label": "Tech Call 1 Result",
                    "type": "select",
                    "options": [
                        "",
                        "Agreed to Accept",
                        "No Answer / Left Voicemail",
                        "Declined",
                        "Cannot Meet SLA",
                        "Cannot Support Work",
                        "Asks for new assignment",
                        "No clear answer"
                    ],
                    "phase": "phase-3-tech1",
                    "required": true
                },
                {
                    "id": "timer_15min_tech1",
                    "label": "Wait 15 Mins For Acceptance",
                    "type": "timerStartButton",
                    "phase": "phase-3-tech1",
                    "duration": "15",
                    "options": [
                        "Wait 15 mins for SC Acceptance"
                    ],
                    "visibleIf": "tech1_answ === 'Agreed to Accept'"
                },
                {
                    "id": "timer_5min_tech1",
                    "label": "Wait 5 Mins Before Attempt 2",
                    "type": "timerStartButton",
                    "phase": "phase-3-tech1",
                    "duration": "5",
                    "options": [
                        "Wait 5 mins for Tech Attempt 2"
                    ],
                    "visibleIf": "tech1_answ === 'No Answer / Left Voicemail'"
                },
                {
                    "id": "tech1_decline_reason",
                    "label": "Decline/SLA Reason",
                    "type": "text",
                    "phase": "phase-3-tech1",
                    "visibleIf": "['Declined', 'Cannot Meet SLA', 'Cannot Support Work', 'Asks for new assignment', 'No clear answer'].includes(tech1_answ)"
                },
                {
                    "id": "tech2_answ",
                    "label": "Tech Call 2 Result",
                    "type": "select",
                    "options": [
                        "",
                        "Agreed to Accept",
                        "No Answer / Left Voicemail",
                        "Declined",
                        "Cannot Meet SLA",
                        "Cannot Support Work",
                        "Asks for new assignment"
                    ],
                    "phase": "phase-4-tech2",
                    "required": true
                },
                {
                    "id": "timer_15min_tech2",
                    "label": "Wait 15 Mins For Acceptance",
                    "type": "timerStartButton",
                    "phase": "phase-4-tech2",
                    "duration": "15",
                    "options": [
                        "Wait 15 mins for SC Acceptance"
                    ],
                    "visibleIf": "tech2_answ === 'Agreed to Accept'"
                },
                {
                    "id": "tech2_decline_reason",
                    "label": "Decline/SLA Reason",
                    "type": "text",
                    "phase": "phase-4-tech2",
                    "visibleIf": "['Declined', 'Cannot Meet SLA', 'Cannot Support Work', 'Asks for new assignment'].includes(tech2_answ)"
                },
                {
                    "id": "fs_name",
                    "label": "FS Manager Name",
                    "type": "text",
                    "phase": "phase-5-fs",
                    "required": true
                },
                {
                    "id": "fs_action",
                    "label": "FS Manager Response",
                    "type": "select",
                    "options": [
                        "",
                        "Priority Lowered",
                        "Assigns new tech",
                        "Assign a vendor",
                        "Said they will assign",
                        "Assign named tech",
                        "Current tech will accept",
                        "Other Approved Result",
                        "No Answer / Voicemail Left",
                        "Nothing changes after 15 minutes"
                    ],
                    "phase": "phase-5-fs",
                    "required": true
                },
                {
                    "id": "fs_new_priority",
                    "label": "Lowered Priority",
                    "type": "select",
                    "options": [
                        "PE-Emergency-Onsite w/i 2 hours",
                        "PE-Emergency-Onsite w/i 4 hours",
                        "P1-Onsite w/i 24 hours",
                        "P2-Onsite w/i 48 hours",
                        "P3-Onsite w/i 3 days",
                        "P5-Onsite w/i 5 days",
                        "P7-Onsite w/i 7 days",
                        "P21-Onsite w/i 21 days",
                        "Scheduled Service",
                        "Tech Initiated"
                    ],
                    "phase": "phase-5-fs",
                    "visibleIf": "fs_action === 'Priority Lowered'"
                },
                {
                    "id": "timer_15min_fs",
                    "label": "Wait 15 Mins For FS Assignment/Acceptance",
                    "type": "timerStartButton",
                    "phase": "phase-5-fs",
                    "duration": "15",
                    "options": [
                        "Wait 15 mins for SC Acceptance"
                    ],
                    "visibleIf": "['Assigns new tech', 'Said they will assign', 'Assign named tech', 'Current tech will accept', 'No Answer / Voicemail Left'].includes(fs_action)"
                },
                {
                    "id": "rm_name",
                    "label": "Regional Manager Name",
                    "type": "text",
                    "phase": "phase-6-rm",
                    "required": true
                },
                {
                    "id": "rm_action",
                    "label": "RM Response",
                    "type": "select",
                    "options": [
                        "",
                        "Assigns a tech",
                        "Will handle assignment",
                        "Assign a vendor",
                        "Lowers priority",
                        "Other Approved Result",
                        "No Answer / Voicemail Left",
                        "Nothing changes after 15 minutes"
                    ],
                    "phase": "phase-6-rm",
                    "required": true
                },
                {
                    "id": "rm_new_priority",
                    "label": "Lowered Priority",
                    "type": "select",
                    "options": [
                        "PE-Emergency-Onsite w/i 2 hours",
                        "PE-Emergency-Onsite w/i 4 hours",
                        "P1-Onsite w/i 24 hours",
                        "P2-Onsite w/i 48 hours",
                        "P3-Onsite w/i 3 days",
                        "P5-Onsite w/i 5 days",
                        "P7-Onsite w/i 7 days",
                        "P21-Onsite w/i 21 days",
                        "Scheduled Service",
                        "Tech Initiated"
                    ],
                    "phase": "phase-6-rm",
                    "visibleIf": "rm_action === 'Lowers priority'"
                },
                {
                    "id": "timer_15min_rm",
                    "label": "Wait 15 Mins For RM Assignment/Acceptance",
                    "type": "timerStartButton",
                    "phase": "phase-6-rm",
                    "duration": "15",
                    "options": [
                        "Wait 15 mins for SC Acceptance"
                    ],
                    "visibleIf": "['Assigns a tech', 'Will handle assignment'].includes(rm_action)"
                },
                {
                    "id": "vendor_name",
                    "label": "Vendor Name",
                    "type": "text",
                    "phase": "phase-7-vendor",
                    "required": true
                },
                {
                    "id": "vendor_rank",
                    "label": "Vendor Rank",
                    "type": "text",
                    "phase": "phase-7-vendor",
                    "visibleIf": "vendor_name !== ''",
                    "required": true
                },
                {
                    "id": "vendor_status",
                    "label": "Vendor 1 Status",
                    "type": "select",
                    "options": [
                        "Waiting for Acceptance",
                        "Did Not Accept (Next Vendor)",
                        "Accepted in SC"
                    ],
                    "phase": "phase-7-vendor",
                    "visibleIf": "vendor_name !== ''",
                    "required": true
                },
                {
                    "id": "vendor_name_2",
                    "label": "Vendor 2 Name",
                    "type": "text",
                    "phase": "phase-7-vendor",
                    "visibleIf": "vendor_status === 'Did Not Accept (Next Vendor)'"
                },
                {
                    "id": "vendor_rank_2",
                    "label": "Vendor 2 Rank",
                    "type": "text",
                    "phase": "phase-7-vendor",
                    "visibleIf": "vendor_name_2 !== ''"
                },
                {
                    "id": "timer_30min_vendor2",
                    "label": "Start 30-Minute Vendor Timer",
                    "type": "timerStartButton",
                    "duration": "30",
                    "options": [
                        "Wait 30 mins for Vendor 2"
                    ],
                    "phase": "phase-7-vendor",
                    "visibleIf": "vendor_name_2 !== ''"
                },
                {
                    "id": "vendor_status_2",
                    "label": "Vendor 2 Status",
                    "type": "select",
                    "options": [
                        "Waiting for Acceptance",
                        "Did Not Accept (List Exhausted)",
                        "Accepted in SC"
                    ],
                    "phase": "phase-7-vendor",
                    "visibleIf": "vendor_name_2 !== ''",
                    "required": true
                },
                {
                    "id": "timer_30min_vendor",
                    "label": "Start 30-Minute Vendor Timer",
                    "type": "timerStartButton",
                    "duration": "30",
                    "options": [
                        "Wait 30 mins for Vendor Acceptance"
                    ],
                    "phase": "phase-7-vendor",
                    "visibleIf": "vendor_name !== ''"
                },
                {
                    "id": "wo_status",
                    "label": "Work Order Status",
                    "type": "select",
                    "options": [
                        "",
                        "Accepted",
                        "Active",
                        "Priority Lowered",
                        "Other Approved Result"
                    ],
                    "phase": "phase-8-resolution",
                    "required": true
                }
            ],
            "sopSections": [
                {
                    "id": "step-1-init",
                    "title": "Phase 1: Initial Investigation",
                    "showOnlyOnPhase": "phase-1-init",
                    "content": "<div class=\"space-y-4 text-sm\">\n                <div class=\"rounded border-l-4 border-yellow-500 bg-yellow-900/20 p-3\">\n                    <h4 class=\"font-bold text-yellow-400\">First Work Order Review</h4>\n                    <ul class=\"mt-2 list-disc pl-5 space-y-1\">\n                        <li>Check for duplicate work orders.</li>\n                        <li>Check for known power outages.</li>\n                        <li>Verify current assignment in SC.</li>\n                    </ul>\n                </div>\n                <div class=\"mt-2 mb-1 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-blue-400\">EMR Note Template</h4>\n                    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Checked store for power outage or duplicate work order. | Result: {emr_result} | Working task`)\">Copy</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words overflow-x-auto rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Reference#: {dispatch_ref} | Checked store for power outage or duplicate work order. | Result: {emr_result} | Working task</code></pre>\n            </div>"
                },
                {
                    "id": "terminal-power-outage",
                    "title": "🛑 Workflow Halted: Power Outage / Duplicate",
                    "showIf": "emr_result === 'Duplicate Work Order' || emr_result === 'Power Outage'",
                    "content": "<div class=\"rounded border-l-4 border-red-500 bg-red-900/20 p-3\">\n                <h4 class=\"font-bold text-red-400\">Process Halted</h4>\n                <p>Follow the Power Outage or Duplicate Work Order procedures in the SOP.</p>\n                <div class=\"mt-4 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-red-400\">Closing Note</h4>\n                    <button class=\"rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Task marked as {emr_result} | Closing Oracle Task as Resolved.`)\">Copy</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap\"><code>Reference#: {dispatch_ref} | Task marked as {emr_result} | Closing Oracle Task as Resolved.</code></pre>\n            </div>"
                },
                {
                    "id": "step-2-store",
                    "title": "Phase 2: Store Contact",
                    "showOnlyOnPhase": "phase-2-store",
                    "content": "<h3 class=\"mb-2 text-lg font-bold\">Contact the Store Manager</h3>\n            <p>Call the Store Manager listed on the work order.</p>\n            <div class=\"space-y-3 mt-3 text-sm\">\n              <details class=\"rounded-lg border border-green-700 bg-green-900/20\" open>\n                <summary class=\"cursor-pointer px-4 py-3 font-bold text-green-400 outline-none\">📞 Store Manager Answers</summary>\n                <div class=\"px-4 pb-4\">\n                  <pre class=\"whitespace-pre-wrap break-words rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap\"><code>Hello, my name is [Your Name], calling from Upstream Facility Services regarding emergency {trade} Work Order {work_order} for your store. We are working to get a technician onsite as soon as possible. Do you have any questions?\n\n...Please monitor product and follow refrigeration failure guidelines found on OneWalmart/The WIRE. Have a great day.</code></pre>\n                </div>\n              </details>\n              <details class=\"rounded-lg border border-yellow-700 bg-yellow-900/20\">\n                <summary class=\"cursor-pointer px-4 py-3 font-bold text-yellow-400 outline-none\">📬 Voicemail</summary>\n                <div class=\"px-4 pb-4\">\n                  <pre class=\"whitespace-pre-wrap break-words rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap\"><code>Hello, this is [Your Name] calling regarding emergency {trade} Work Order {work_order} for Store {store_number}. Please monitor product in the affected assets and follow Food Safety Guidelines.</code></pre>\n                  <div class=\"mt-4 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-blue-400\">SC Note Template</h4>\n                    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Called {store_mgr_name} about emergency {trade} Work Order {work_order} | Result: Voicemail Left. The store was told about the work order and correct safety steps.`)\">Copy</button>\n                  </div>\n                  <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Reference#: {dispatch_ref} | Called {store_mgr_name} about emergency {trade} Work Order {work_order} | Result: Voicemail Left. The store was told about the work order and correct safety steps.</code></pre>\n                </div>\n              </details>\n            </div>"
                },
                {
                    "id": "terminal-store-exceptions",
                    "title": "🛑 Workflow Halted: Issue Fixed / Power Outage",
                    "showIf": "store_answ === 'Store Power Outage' || store_answ === 'Issue Fixed'",
                    "content": "<div class=\"rounded border-l-4 border-red-500 bg-red-900/20 p-3 text-sm\">\n                <h4 class=\"font-bold text-red-400 mb-2\">Process Halted</h4>\n                <p>The store reports {store_answ}. Add the details and follow the SOP for closing the task.</p>\n                <div class=\"mt-4 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-red-400\">Closing Note</h4>\n                    <button class=\"rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Store reports {store_answ}. Checking ServiceChannel before closing | Closing Oracle task as resolved.`)\">Copy</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap\"><code>Reference#: {dispatch_ref} | Store reports {store_answ}. Checking ServiceChannel before closing | Closing Oracle task as resolved.</code></pre>\n            </div>"
                },
                {
                    "id": "step-3-tech1",
                    "title": "Phase 3: Tech Call 1",
                    "showOnlyOnPhase": "phase-3-tech1",
                    "content": "<div class=\"rounded border-l-4 border-blue-500 bg-blue-900/20 p-3 text-sm\">\n                <h3 class=\"mb-2 font-bold text-blue-400\">Step 3 - Contact the Assigned Technician</h3>\n                <pre class=\"whitespace-pre-wrap break-words bg-gray-900 border border-gray-700 rounded-lg p-3 whitespace-pre-wrap\"><code>Hello, this is [Your Name] from Upstream Facility Services calling regarding emergency {trade} Work Order for Store {store_number}.\nThe affected equipment listed in ServiceChannel is {assets}.\nThis is a {priority} work order. Can you complete this work within the required SLA?</code></pre>\n                <div class=\"mt-4 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-blue-400\">Call Note Template</h4>\n                    <button class=\"rounded bg-blue-600 px-2 py-1 text-xs hover:bg-blue-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Call 1 | Called assigned tech {tech_name} about emergency {trade} Work Order {work_order} | Result: {tech1_answ} | Notes were added to Oracle and ServiceChannel.`)\">Copy</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Reference#: {dispatch_ref} | Call 1 | Called assigned tech {tech_name} about emergency {trade} Work Order {work_order} | Result: {tech1_answ} | Notes were added to Oracle and ServiceChannel.</code></pre>\n            </div>"
                },
                {
                    "id": "step-4-tech2",
                    "title": "Phase 4: Tech Call 2",
                    "showOnlyOnPhase": "phase-4-tech2",
                    "content": "<div class=\"rounded border-l-4 border-yellow-500 bg-yellow-900/20 p-3 text-sm\">\n                <h3 class=\"mb-2 font-bold text-yellow-400\">Step 4 - Second Call Attempt</h3>\n                <p>Call #1 was not answered. Waiting 5 minutes.</p>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 bg-gray-900 border border-gray-700 rounded-lg p-3 whitespace-pre-wrap\"><code>Hello, this is [Your Name] from Upstream Facility Services. I am calling again about emergency {trade} Work Order for Store {store_number}. Can you complete this work within the required SLA?</code></pre>\n                <div class=\"mt-4 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-yellow-400\">Call 2 Note Template</h4>\n                    <button class=\"rounded bg-yellow-600 px-2 py-1 text-xs hover:bg-yellow-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Call 2 | Called assigned tech {tech_name} about emergency {trade} Work Order {work_order} | Result: {tech2_answ} | Notes were added to Oracle and ServiceChannel.`)\">Copy</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Reference#: {dispatch_ref} | Call 2 | Called assigned tech {tech_name} about emergency {trade} Work Order {work_order} | Result: {tech2_answ} | Notes were added to Oracle and ServiceChannel.</code></pre>\n            </div>"
                },
                {
                    "id": "step-5-fsm",
                    "title": "Phase 5: FS Manager Escalation",
                    "showOnlyOnPhase": "phase-5-fs",
                    "content": "<div class=\"rounded border-l-4 border-orange-500 bg-orange-900/20 p-3 text-sm\">\n                <h3 class=\"mb-2 font-bold text-orange-400\">Step 5 - Contact FS Manager</h3>\n                <pre class=\"whitespace-pre-wrap break-words bg-gray-900 border border-gray-700 rounded-lg p-3 whitespace-pre-wrap\"><code>Hello, this is [Your Name] calling from Upstream Facility Services regarding emergency {trade} Work Order for Store {store_number}.\nWe completed the required tech calls. We need your help with the next step for emergency coverage. The affected equipment is {assets}. Please advise.</code></pre>\n                <div class=\"mt-4 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-orange-400\">FSM Note Template</h4>\n                    <button class=\"rounded bg-orange-600 px-2 py-1 text-xs hover:bg-orange-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Called FS Manager {fs_name} about emergency {trade} Work Order {work_order} | Tech contact result: Escalated | FS Manager response: {fs_action}{_fs_lowered} | Notes were added to Oracle and ServiceChannel.`)\">Copy</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Reference#: {dispatch_ref} | Called FS Manager {fs_name} about emergency {trade} Work Order {work_order} | Tech contact result: Escalated | FS Manager response: {fs_action}{_fs_lowered} | Notes were added to Oracle and ServiceChannel.</code></pre>\n            </div>"
                },
                {
                    "id": "step-6-rm",
                    "title": "Phase 6: Regional Manager Escalation",
                    "showOnlyOnPhase": "phase-6-rm",
                    "content": "<div class=\"rounded border-l-4 border-red-500 bg-red-900/20 p-3 text-sm\">\n                <h3 class=\"mb-2 font-bold text-red-400\">Step 6 - Contact Regional Manager</h3>\n                <pre class=\"whitespace-pre-wrap break-words bg-gray-900 border border-gray-700 rounded-lg p-3 whitespace-pre-wrap\"><code>Hello, this is [Your Name] from Upstream Facility Services. I am calling about emergency {trade} Work Order for Store {store_number}. We completed the tech and FS Manager steps. We need help with the next step for emergency coverage. Please advise.</code></pre>\n                <div class=\"mt-4 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-red-400\">RM Note Template</h4>\n                    <button class=\"rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Called Regional Manager {rm_name} about emergency {trade} Work Order {work_order} | Tech and FS Manager contact result: Escalated | RM response: {rm_action}{_rm_lowered} | Notes were added to Oracle and ServiceChannel.`)\">Copy</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Reference#: {dispatch_ref} | Called Regional Manager {rm_name} about emergency {trade} Work Order {work_order} | Tech and FS Manager contact result: Escalated | RM response: {rm_action}{_rm_lowered} | Notes were added to Oracle and ServiceChannel.</code></pre>\n            </div>"
                },
                {
                    "id": "step-7-vendor",
                    "title": "Phase 7: Vendor Assignment",
                    "showOnlyOnPhase": "phase-7-vendor",
                    "content": "<div class=\"rounded border-l-4 border-purple-500 bg-purple-900/20 p-3 text-sm\">\n                <h3 class=\"mb-2 font-bold text-purple-400\">Step 7 - Vendor Assignment</h3>\n                <ul class=\"mb-3 list-disc pl-5\">\n                    <li>The vendor must be on the approved list and ranked below 50.</li>\n                    <li>Do not assign Walmart HVAC or Walmart Insource.</li>\n                    <li>Give the vendor 30 minutes to accept.</li>\n                </ul>\n                <div class=\"mt-4 flex items-center justify-between\">\n                    <h4 class=\"font-bold text-purple-400\">Vendor Assignment Note</h4>\n                    <button class=\"rounded bg-purple-600 px-2 py-1 text-xs hover:bg-purple-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Assigned emergency {trade} Work Order to vendor {vendor_name}, Rank {vendor_rank} | The assignment was checked in ServiceChannel. Giving the vendor 30 minutes to accept.`)\">Copy</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Reference#: {dispatch_ref} | Assigned emergency {trade} Work Order to vendor {vendor_name}, Rank {vendor_rank} | The assignment was checked in ServiceChannel. Giving the vendor 30 minutes to accept.</code></pre>\n            </div>"
                },
                {
                    "id": "success-accepted",
                    "title": "🎉 Work Order Accepted",
                    "showIf": "wo_status !== '' && wo_status !== undefined",
                    "content": "<div class=\"rounded border-l-4 border-green-500 bg-green-900/20 p-3 text-sm\">\n                <h4 class=\"font-bold text-green-400 text-lg mb-2\">Process Completed!</h4>\n                <p class=\"mb-3\">The work order has been formally accepted or resolved by leadership in ServiceChannel. You may now close the Oracle task.</p>\n                <div class=\"flex items-center justify-between\">\n                    <h4 class=\"font-bold text-green-400\">Closing Note Template</h4>\n                    <button class=\"rounded bg-green-600 px-2 py-1 text-xs hover:bg-green-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Current ServiceChannel assignment checked | Work Order shows {wo_status} | Closing the Oracle task as resolved.`)\">Copy Oracle Note</button>\n                </div>\n                <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3\"><code>Reference#: {dispatch_ref} | Current ServiceChannel assignment checked | Work Order shows {wo_status} | Closing the Oracle task as resolved.</code></pre>\n            </div>",
                    "showOnlyOnPhase": "phase-8-resolution"
                },
                {
                    "id": "terminal-exhausted",
                    "title": "🛑 Workflow Halted: List Exhausted",
                    "showIf": "vendor_status_2 === 'Did Not Accept (List Exhausted)' && wo_status === ''",
                    "content": "<div class=\"rounded border-l-4 border-red-500 bg-red-900/20 p-3 text-sm\">\n            <h4 class=\"font-bold text-red-400 mb-2\">Process Exhausted - Re-Escalate</h4>\n            <p>No approved vendors are left. Re-engage the FS Manager or Operations Manager for manual intervention.</p>\n            <pre class=\"whitespace-pre-wrap break-words mt-2 bg-gray-900 border border-gray-700 rounded-lg p-3 whitespace-pre-wrap\"><code>Hello, this is [Your Name] calling from Upstream Facility Services regarding emergency {trade} Work Order for Store {store_number}.\nWe have exhausted the eligible vendor list and currently have no coverage. Please advise on next steps.</code></pre>\n            <div class=\"mt-4 flex items-center justify-between\">\n                <h4 class=\"font-bold text-red-400\">Escalation Note Template</h4>\n                <button class=\"rounded bg-red-600 px-2 py-1 text-xs hover:bg-red-700 text-white font-bold\" onclick=\"navigator.clipboard.writeText(`Reference#: {dispatch_ref} | Vendor list exhausted | Escalating back to FS/Operations Manager for assignment help.`)\">Copy</button>\n            </div>\n            <pre class=\"whitespace-pre-wrap break-words mt-2 rounded-lg border border-gray-700 bg-gray-900 p-3 whitespace-pre-wrap\"><code>Reference#: {dispatch_ref} | Vendor list exhausted | Escalating back to FS/Operations Manager for assignment help.</code></pre>\n        </div>",
                    "showOnlyOnPhase": "phase-8-resolution"
                }
            ]
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
