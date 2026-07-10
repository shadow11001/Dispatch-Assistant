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
    "systemThresholds": {
        "suction_psi": {
            "name": "Suction Pressure",
            "unit": "PSI",
            "targetVariance": {
                "above": 15,
                "below": -10
            },
            "description": "Direct suction line pressure",
            "severity": "PE-Emergency-Onsite w/i 2 hours"
        },
        "discharge_psi": {
            "name": "Discharge Pressure",
            "unit": "PSI",
            "bounds": {
                "min": 100,
                "max": 325
            },
            "description": "Refrigerant discharge from compressor",
            "severity": "PE-Emergency-Onsite w/i 2 hours"
        },
        "case_temp": {
            "name": "Case Temperature",
            "unit": "°F",
            "targetVariance": {
                "above": 12,
                "below": -12
            },
            "description": "Product case temperature vs setpoint",
            "severity": "PE-Emergency-Onsite w/i 2 hours"
        },
        "glycol_suction_psi": {
            "name": "Glycol Suction Pressure",
            "unit": "PSI",
            "criticalThreshold": 5,
            "targetVariance": {
                "above": 15,
                "below": -10
            },
            "severity": "PE-Emergency-Onsite w/i 2 hours"
        }
    },
    "assetProblemMapping": {
        "Building EMS Controller": [
            "Comm Loss",
            "EP2 Battery Replacement"
        ],
        "Case - Automation Multi": [
            "Predictive Failure",
            "High Temperature"
        ],
        "Case - Automation Single": [
            "Predictive Failure",
            "High Temperature"
        ],
        "Case - Coffin/Bunker": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Case - Frozen Food Doors": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Case - Medium Temp Glass Doors": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Case - Module": [
            "Module Comm Loss - Emergency",
            "Module Comm Loss - Non Emergency"
        ],
        "Case - Multi Deck": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Case - Multiple Cases": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue",
            "Module Comm Loss - Emergency"
        ],
        "Case - OGP": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Case - Self Contained": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Case - Service Deli": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Case - Single Deck": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Rack House": [
            "Chiller EEV Difference",
            "Communication Issue",
            "Compressor Calling with No Amps",
            "Compressor High Start Count",
            "Compressor Lockout - Emergrency",
            "Compressor Lockout - Multiple",
            "Compressor Lockout - Single",
            "Compressor Repair",
            "Condenser High Pressure",
            "Condenser Repair",
            "Dirty Condenser",
            "Glycol Pump Pressure",
            "High Chiller Superheat",
            "High Compression Ratio",
            "High Condenser TD",
            "Hot Gas Bypass Valve",
            "Liquid Line Restriction",
            "Loud Noise",
            "Low Chiller Superheat",
            "Low Compression Ratio",
            "Low Subcooler Superheat",
            "Module Comm Loss - Emergency",
            "Module Comm Loss - Non Emergency",
            "Oil Level Fault",
            "Phase Loss",
            "Planned Power Outage",
            "Predictive Failure",
            "Pressure Relief Alarm",
            "Preventative Maintenance",
            "Pump Failure",
            "Rack Down",
            "Receiver",
            "Refrigerant Leak",
            "Refrigerant Controller - Battery Replacement",
            "Refrigerant Controller Comm Loss",
            "Sensor Fault",
            "Subcooler EEV Stuck Open",
            "Suction Line Pressure Drop",
            "TXV Overfeeding",
            "TXV Underfeeding",
            "VFD Issue",
            "Water Leak"
        ],
        "Refrigerant Leak Detection System": [
            "Communication Issue"
        ],
        "Refrigeration - HO Use Only": [
            "CARB LEAK CHECK",
            "EPA LEAK CHECK",
            "LEAK DETECTION EQUIP INSPECTION",
            "REFRIGERANT RECOVERY",
            "Special Project"
        ],
        "Walk In - Cooler": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Walk In - Freezer": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ],
        "Walk In - Prep Room": [
            "Equipment Damage - Non Safety",
            "Fan Out",
            "Freezing Product",
            "Freon Leak",
            "High Temperature",
            "Iced Coil",
            "Low Temperature",
            "Module Comm Loss - Non Emergency",
            "Predictive Failure",
            "Safety Issue",
            "Sensor Fault",
            "Water Leak",
            "Water Leak - Safety Issue"
        ]
    },
    "genericProfile": {
        "id": "GENERIC",
        "name": "Unknown Alarm",
        "timerConfig": {
            "enabled": true,
            "defaultLabel": "SLA Time",
            "breakpoints": [
                {
                    "minuteStart": 15,
                    "minuteEnd": 999,
                    "colorClass": "timer-glow-red",
                    "tooltip": "A1 reviews blocker, process gap, or coaching opportunity."
                },
                {
                    "minuteStart": 5,
                    "minuteEnd": 9,
                    "colorClass": "timer-glow-purple",
                    "tooltip": "Identify if anything is blocking progress"
                },
                {
                    "minuteStart": 9,
                    "minuteEnd": 12,
                    "colorClass": "timer-glow-yellow",
                    "tooltip": "Post in Help Desk if there is SLA"
                },
                {
                    "minuteStart": 12,
                    "minuteEnd": 15,
                    "colorClass": "timer-glow-orange",
                    "tooltip": "A1 helps recover the task."
                },
                {
                    "minuteStart": 0,
                    "minuteEnd": 5,
                    "colorClass": "",
                    "tooltip": "Work the task."
                }
            ],
            "location": "header"
        },
        "sopText": "\n            <div class=\"text-orange-200 bg-orange-900 border border-orange-700 p-3 rounded mb-3 font-medium\">⚠️ Unknown Alarm Type</div>\n            <p class=\"mb-2\">Follow standard unknown alarm guidelines. If unsure how to proceed, escalate to your supervisor.</p>\n            <h4 class=\"font-bold text-md mt-3 mb-1 text-gray-300\">General Rack Alarm Rules:</h4>\n            <ul class=\"list-disc pl-5 space-y-1 text-gray-300\">\n                <li><strong>Active Alarm Clears:</strong> If the alarm disappears from the queue, it likely self-cleared because the condition resolved.</li>\n                <li><strong>Recall Window:</strong> If the same issue has a prior WO within 10 days, recall/link the WO when available.</li>\n                <li><strong>Snoozing:</strong> Use snooze with extreme caution. Never snooze a Rack alarm for more than 2 hours.</li>\n                <li><strong>Priority Downgrade:</strong> Do not downgrade any WO that generates as PE-2hr or PE-4hr.</li>\n            </ul>\n        ",
        "fields": [
            {
                "id": "store",
                "label": "Store Number",
                "type": "text",
                "source": "parsed_site_number",
                "required": true,
                "phase": "phase-1-investigate"
            },
            {
                "id": "asset",
                "label": "Affected Rack/System",
                "type": "text",
                "phase": "phase-1-investigate"
            },
            {
                "id": "system_reading",
                "label": "System Reading",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "asset !== ''"
            },
            {
                "id": "system_reading_note",
                "label": "System Reading Note",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "system_reading !== '' && asset !== ''"
            },
            {
                "id": "setpoint",
                "label": "System Setpoint",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "asset !== ''"
            },
            {
                "id": "setpoint_type",
                "label": "Setpoint Type",
                "type": "select",
                "phase": "phase-1-investigate",
                "options": [
                    "PSI (Suction Pressure)",
                    "PSI (Discharge Pressure)",
                    "PSI (Drop Leg Pressure)",
                    "Other (List in Custom Field)"
                ],
                "visibleIf": "setpoint !== '' && asset !== ''"
            },
            {
                "id": "case_temps",
                "label": "Case Temps",
                "type": "radio",
                "phase": "phase-1-investigate",
                "options": [
                    "Normal",
                    "High"
                ],
                "visibleIf": "asset !== ''"
            },
            {
                "id": "high_case_temps",
                "label": "Affected Cases",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "case_temps === 'High' && asset !== ''"
            },
            {
                "id": "case_setpoint",
                "label": "Case Setpoint",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "asset !== ''"
            },
            {
                "id": "mod_comm_loss",
                "label": "Modules In Comm Loss",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "asset !== ''"
            },
            {
                "id": "custom_field_1",
                "label": "Custom Field 1",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "asset !== ''"
            },
            {
                "id": "custom_field_2",
                "label": "Custom Field 2",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "custom_field_1 !== '' && asset !== ''"
            },
            {
                "id": "custom_field_3",
                "label": "Custom Field 3",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "custom_field_2 !== '' && asset !== ''"
            },
            {
                "id": "custom_field_4",
                "label": "Custom Field 4",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "custom_field_3 !== '' && asset !== ''"
            },
            {
                "id": "custom_field_5",
                "label": "Custom Field 5",
                "type": "text",
                "phase": "phase-1-investigate",
                "visibleIf": "custom_field_4 !== '' && asset !== ''"
            },
            {
                "id": "time_in_alarm",
                "label": "Time In Alarm",
                "type": "time",
                "phase": "phase-2-dispatch"
            },
            {
                "id": "existing_wo",
                "label": "Existing WO Check",
                "type": "select",
                "options": [
                    "No open WO found",
                    "Linked to WO",
                    "Recalled WO"
                ],
                "phase": "phase-2-dispatch"
            },
            {
                "id": "linked_wo_num",
                "label": "Linked WO Number",
                "type": "text",
                "visibleIf": "existing_wo === 'Linked to WO'",
                "phase": "phase-2-dispatch"
            },
            {
                "id": "action_taken",
                "label": "Action Taken",
                "type": "select",
                "options": [
                    "Created WO",
                    "Snoozed",
                    "Linked Existing WO",
                    "Escalated for Review"
                ],
                "phase": "phase-2-dispatch"
            },
            {
                "id": "priority",
                "label": "WO Priority",
                "type": "select",
                "options": [
                    "PE-Emergency-Onsite w/i 4 hours",
                    "P1-Onsite w/i 24 hours",
                    "P2-Onsite w/i 48 hours",
                    "P3-Onsite w/i 3 days",
                    "P5-Onsite w/i 5 days",
                    "P21-Onsite w/i 21 days",
                    "Scheduled Service",
                    "PE-Emergency-Onsite w/i 2 hours",
                    "P7-Onsite w/i 7 days",
                    "Tech Initiated"
                ],
                "phase": "phase-2-dispatch",
                "visibleIf": "action_taken !== 'Snoozed'"
            },
            {
                "id": "contact_name",
                "label": "Contact Name",
                "type": "text",
                "phase": "phase-3-creation"
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
                "phase": "phase-3-creation"
            },
            {
                "id": "contact_position_other",
                "label": "Other Position",
                "type": "text",
                "visibleIf": "contact_position === 'Other'",
                "phase": "phase-3-creation"
            },
            {
                "id": "contact_result",
                "label": "Store Contact Result",
                "type": "select",
                "options": [
                    "Answered",
                    "No Answer / Left Voicemail",
                    "Call not required"
                ],
                "phase": "phase-3-creation",
                "source": "Answered"
            },
            {
                "id": "custom_notes",
                "label": "Additional Notes",
                "type": "textarea",
                "placeholder": "Any extra diagnostic findings...",
                "phase": "phase-3-creation"
            },
            {
                "id": "additional_dev_notes",
                "label": "Additional Dev Notes",
                "type": "text",
                "phase": "phase-3-creation"
            }
        ],
        "crystalAttributes": {
            "issueArea": "Home Office Only",
            "problemType": "Refrigeration - HO Use Only",
            "assetType": "Requires Manual Selection",
            "problemCode": "Requires Manual Selection",
            "priority": "TBD"
        },
        "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: {system_reading} | System Setpoint: {setpoint} | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Contacted {contact_name} ({contact_position}{contact_position_other}) | {custom_notes} | {reusable_monitor_advisement} | Notes for Dev: Alarm Type: {alarm_type}; System Reading: {system_reading}; Note: {system_reading_note}; System Setpoint: {setpoint} {setpoint_type}; Case Temps: {case_temps}; Affected Cases: {high_case_temps}; Case Setpoint: {case_setpoint}; Module Comm Loss: {mod_comm_loss}; Custom Field 1: {custom_field_1}; Custom Field 2: {custom_field_2}; Custom Field 3: {custom_field_3}; Custom Field 4: {custom_field_4}; Custom Field 5: {custom_field_5}; Additional Dev Notes: {additional_dev_notes}",
        "investigationPhases": [
            {
                "id": "phase-1-investigate",
                "title": "Phase 1 - Investigate",
                "sequence": 1,
                "description": "Investigate the Alarm and be sure to reach out to Leadership or your A1 for guidance."
            },
            {
                "id": "phase-2-dispatch",
                "title": "Phase 2 - Dispatch",
                "sequence": 2,
                "description": "Check ServiceChannel for existing workorders and notate the proposed action."
            },
            {
                "id": "phase-3-creation",
                "title": "Phase 3 - WorkOrder Creation",
                "sequence": 3,
                "activateIf": "action_taken !== 'Snoozed'",
                "description": "Prepare to make the call to the store."
            }
        ],
        "sopSections": [
            {
                "id": "intro",
                "title": "Unknown Alarm Intro",
                "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Hazard Warning Block -->\n    <div class=\"bg-orange-900 bg-opacity-20 border border-orange-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-orange-400 mb-1 flex items-center\">\n            <span class=\"mr-2\">⚠️</span> UNKNOWN ALARM TYPE\n        </h4>\n        <p class=\"text-orange-200 text-xs font-medium pl-6\">\n            Follow standard unknown alarm guidelines. If unsure how to proceed, escalate to your supervisor.\n        </p>\n    </div>\n\n    <!-- General Rules Block -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded shadow-sm\">\n        <h4 class=\"font-bold text-gray-300 mb-3 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">\n            General Rack Alarm Rules\n        </h4>\n        <ul class=\"space-y-2 text-gray-300 pl-2\">\n            <li class=\"flex items-start\">\n                <span class=\"text-blue-500 mr-2 mt-0.5\">•</span>\n                <span><strong class=\"text-gray-200\">Active Alarm Clears:</strong> If the alarm disappears from the queue, it likely self-cleared because the condition resolved.</span>\n            </li>\n            <li class=\"flex items-start\">\n                <span class=\"text-blue-500 mr-2 mt-0.5\">•</span>\n                <span><strong class=\"text-gray-200\">Recall Window:</strong> If the same issue has a prior WO within 10 days, recall/link the WO when available.</span>\n            </li>\n            <li class=\"flex items-start\">\n                <span class=\"text-orange-500 mr-2 mt-0.5\">•</span>\n                <span><strong class=\"text-gray-200\">Snoozing:</strong> Use snooze with extreme caution. Never snooze a Rack alarm for more than 2 hours.</span>\n            </li>\n            <li class=\"flex items-start\">\n                <span class=\"text-red-500 mr-2 mt-0.5\">•</span>\n                <span><strong class=\"text-gray-200\">Priority Downgrade:</strong> Do not downgrade any WO that generates as PE-2hr or PE-4hr.</span>\n            </li>\n        </ul>\n    </div>\n</div>",
                "alwaysShow": true
            },
            {
                "id": "phase3",
                "title": "Phase 3 - Outbound Call",
                "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
                "showAfter": "phase-2-dispatch"
            }
        ]
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
    "activeProfileFields": [
        {
            "id": "store",
            "label": "Store Number",
            "type": "text",
            "source": "parsed_site_number",
            "phase": "phase-1-investigate",
            "required": true
        },
        {
            "id": "rack",
            "label": "Rack",
            "type": "text",
            "phase": "phase-1-investigate",
            "required": true
        },
        {
            "id": "comm_loss_type",
            "label": "Comm Loss Type",
            "type": "select",
            "placeholder": "e.g. AS01a SRVC DELI...",
            "phase": "phase-1-investigate",
            "options": [
                "Entire Rack",
                "Rack Modules",
                "Case Modules",
                "Sensors",
                "Hybrid"
            ],
            "required": true,
            "visibleIf": "rack !== ''"
        },
        {
            "id": "rm_comm_loss",
            "label": "Rack Modules Comm Loss",
            "type": "text",
            "phase": "phase-1-investigate",
            "visibleIf": "rack !== '' && comm_loss_type === 'Rack Modules' || comm_loss_type === 'Hybrid'"
        },
        {
            "id": "rm_cl_type",
            "label": "Rack Module Comm Loss Type",
            "type": "select",
            "options": [
                "Comm Loss",
                "Faulted"
            ],
            "phase": "phase-1-investigate",
            "visibleIf": "rack !== '' && comm_loss_type === 'Rack Modules' || comm_loss_type === 'Hybrid'"
        },
        {
            "id": "cm_comm_loss",
            "label": "Case Module Comm Loss",
            "type": "text",
            "phase": "phase-1-investigate",
            "visibleIf": "rack !== '' && comm_loss_type === 'Case Modules' || comm_loss_type === 'Hybrid'"
        },
        {
            "id": "cm_cl_type",
            "label": "Case Module Comm Loss Type",
            "type": "select",
            "options": [
                "Comm Loss",
                "Faulted",
                "Stale Data"
            ],
            "phase": "phase-1-investigate",
            "visibleIf": "rack !== '' && comm_loss_type === 'Case Modules' || comm_loss_type === 'Hybrid'"
        },
        {
            "id": "sensor_comm_loss",
            "label": "Sensor Comm Loss",
            "type": "text",
            "phase": "phase-1-investigate",
            "visibleIf": "rack !== '' && comm_loss_type === 'Sensors' || comm_loss_type === 'Hybrid'"
        },
        {
            "id": "s_cl_type",
            "label": "Sensor Comm Loss Type",
            "type": "select",
            "options": [
                "Comm Loss",
                "Faulted",
                "Open Fault",
                "Shorted Fault",
                "Stale Data",
                "Mixed"
            ],
            "phase": "phase-1-investigate",
            "visibleIf": "rack !== '' && comm_loss_type === 'Sensors' || comm_loss_type === 'Hybrid'"
        },
        {
            "id": "impact_count",
            "label": "Total Impacted Count",
            "type": "select",
            "options": [
                "2 or fewer",
                "3+ Assets",
                "Entire Rack"
            ],
            "phase": "phase-1-investigate",
            "trainingExplanation": "Determines if this is a minor issue or a major product loss event.",
            "visibleIf": "rack !== ''",
            "required": true
        },
        {
            "id": "time_in_alarm",
            "label": "Time In Alarm",
            "type": "time",
            "phase": "phase-2-dispatch",
            "required": true
        },
        {
            "id": "existing_wo",
            "label": "Existing WO Check",
            "type": "select",
            "options": [
                "No open WO found",
                "Linked to WO",
                "Recalled WO"
            ],
            "phase": "phase-2-dispatch",
            "required": true
        },
        {
            "id": "linked_wo_num",
            "label": "Linked WO Number",
            "type": "text",
            "visibleIf": "existing_wo === 'Linked to WO' || existing_wo === 'Recalled WO (Under 10 Days)'",
            "phase": "phase-2-dispatch"
        },
        {
            "id": "action_taken",
            "label": "Action Taken",
            "type": "select",
            "options": [
                "Created WO",
                "Snoozed",
                "Linked Existing WO",
                "Recalled WO",
                "Snoozed/Escalated for Review"
            ],
            "phase": "phase-2-dispatch",
            "required": true
        },
        {
            "id": "priority",
            "label": "WO Priority",
            "type": "select",
            "options": [
                "PE-Emergency-Onsite w/i 2 hours",
                "PE-Emergency-Onsite w/i 4 hours",
                "P1-Onsite w/i 24 hours",
                "P2-Onsite w/I 48 hours",
                "P3-Onsite w/I 3 days",
                "P5-Onsite w/I 5 days",
                "P7-Onsite w/I 7 days",
                "P21-Onsite w/I 21 days"
            ],
            "phase": "phase-2-dispatch",
            "visibleIf": "action_taken === 'Created WO'",
            "source": ""
        },
        {
            "id": "contact_name",
            "label": "Contact Name",
            "type": "text",
            "phase": "phase-3-creation",
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
            "phase": "phase-3-creation",
            "required": true
        },
        {
            "id": "contact_position_other",
            "label": "Other Position",
            "type": "text",
            "visibleIf": "contact_position === 'Other'",
            "phase": "phase-3-creation"
        },
        {
            "id": "contact_result",
            "label": "Store Contact Result",
            "type": "select",
            "options": [
                "Answered",
                "No Answer / Left Voicemail",
                "Call not required"
            ],
            "default": "Answered",
            "phase": "phase-3-creation",
            "required": true
        },
        {
            "id": "custom_notes",
            "label": "Additional Notes",
            "type": "textarea",
            "placeholder": "Any extra diagnostic findings...",
            "phase": "phase-3-creation"
        },
        {
            "id": "current_status",
            "label": "Current Status",
            "type": "select",
            "required": true
        }
    ],
    "theme": "theme-classic"
};
