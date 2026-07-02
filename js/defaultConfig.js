window.AlarmAssistantConfig = {
  "remodels": [
    "298",
    "483",
    "604",
    "670",
    "818",
    "991",
    "1174",
    "1620",
    "1638",
    "4648",
    "4990",
    "5363",
    "5771",
    "5845",
    "5872"
  ],
  "version": "1.0.7",
  "lastUpdated": "2026-07-02",
  "author": "Andrew Toothman",
  "changeDescription": "Updated Profiles",
  "history": [
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
    "RPL": {
      "id": "RPL",
      "name": "Rack Phase Loss",
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
          "title": "Overview",
          "alwaysShow": false,
          "content": "\n                        <h3 class=\"font-bold text-lg text-red-500 mb-2\">🚨 Rack Phase Loss (RPL)</h3>\n                        <p class=\"mb-2\"><strong>Issue:</strong> Rack lost a leg of power, has overvoltage, or undervoltage. Rack may shut down until power returns.</p>\n                        \n                        <div class=\"bg-gray-800 p-2 rounded mb-2 border-l-4 border-blue-500\">\n                            <ul class=\"list-disc pl-5 space-y-1 text-gray-300 text-sm\">\n                                <li><strong>Required Action:</strong> PE2 – Onsite within 2 hours.</li>\n                                <li>Confirm active PE2 exists or create one.</li>\n                                <li>Check for an open WO for the same alarm before creating a new one. (10-day recall rule)</li>\n                            </ul>\n                        </div>\n                    ",
          "trainingExplanation": "Phase loss indicates a critical facility power issue affecting the refrigeration rack. The rack shuts down to protect its compressors from burning out due to dirty power.",
          "showIf": "",
          "showAfter": "",
          "showOnlyOnPhase": "phase-1-investigate"
        },
        {
          "id": "snooze-warning",
          "title": "Snooze Warning",
          "showIf": "action_taken === 'Snoozed'",
          "content": "\n                        <div class=\"bg-orange-900 border border-orange-500 rounded p-2 mb-2\">\n                            <h4 class=\"font-bold text-orange-200\">⚠️ Snooze Caution</h4>\n                            <p class=\"text-sm text-orange-100\">Most Rack alarms should not be snoozed. Never snooze a Rack alarm for more than 2 hours. Always comment when snoozing.</p>\n                        </div>\n                    ",
          "trainingExplanation": "Phase loss is usually a hard failure. We only snooze if the graph proves it was a 2-second blip and everything is already back to 100% normal."
        },
        {
          "id": "Snooze",
          "title": "Snooze",
          "content": "                        <div class=\"bg-orange-900 border border-orange-500 rounded p-2 mb-2\">\n                            <h4 class=\"font-bold text-orange-200\">⚠️ Snooze Caution</h4>\n                            <p class=\"text-sm text-orange-100\">This Rack alarm should probably be snoozed. Never snooze a Rack alarm for more than 2 hours. Always comment when snoozing.</p>\n                        </div>\n                    ",
          "showIf": "system_reading === 'Cleared' && comp_status === 'Running Normally' && case_temps === 'Normal' || (((system_reading === 'Flashing/Intermittent' && comp_status === 'Running Normally' && case_temps === 'Normal') || (system_reading === 'Flashing/Intermittent' && comp_status === 'Some Running' && case_temps === 'Normal') || (system_reading === 'Cleared' && comp_status === 'Some Running' && case_temps === 'Normal')))"
        },
        {
          "id": "Phase Loss Phase 1",
          "title": "Phase Loss Phase 1",
          "content": "<div class=\"space-y-3 text-sm\">\n    <p class=\"bg-gray-800 p-2 rounded border border-gray-700\">\n        Follow the following guides if needed: \n        <a href=\"https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Novar%20-%20How%20To%20Check%20A%20Phase%20Loss.aspx\" target=\"_blank\" class=\"text-blue-400 hover:text-blue-300 underline font-bold\">Rack Phase Loss Guide</a>\n    </p>\n\n    <div class=\"pl-2 space-y-2\">\n        <p><strong>Step 1.</strong> Login to the EMS</p>\n        <p><strong>Step 2.</strong> Determine if the Rack is in Phase Loss</p>\n        <p><strong>Step 3.</strong> Check if compressors are running normally</p>\n        <p><strong>Step 4.</strong> Check Case Temps and make sure they are normal. If any Case Temps are High, list the Affected Cases</p>\n    </div>\n</div>",
          "showIf": "",
          "showOnlyOnPhase": "phase-1-investigate"
        },
        {
          "id": "Phase Loss Phase 3",
          "title": "Phase Loss Phase 3",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch",
          "showOnlyOnPhase": "phase-3-creation"
        }
      ],
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Rack House",
        "problemCode": "Phase Loss",
        "priority": "PE-Emergency-Onsite w/I 2 hours"
      },
      "fields": [
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
          "label": "Affected Rack/System",
          "type": "text",
          "phase": "phase-1-investigate",
          "required": true
        },
        {
          "id": "system_reading",
          "label": "System Reading (Alarm Status)",
          "type": "select",
          "options": [
            "Phase Loss Confirmed",
            "Flashing/Intermittent",
            "Cleared"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Document if the alarm is still active right now.",
          "visibleIf": "rack !== ''",
          "required": true
        },
        {
          "id": "comp_status",
          "label": "Compressor Status",
          "type": "select",
          "options": [
            "All Off",
            "Some Running",
            "Running Normally",
            "Unknown/No Data"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Usually Phase Loss drops all compressors offline to protect them.",
          "visibleIf": "rack !== ''",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Compressor%20Triage.aspx"
        },
        {
          "id": "case_temps",
          "label": "Case Temps",
          "type": "radio",
          "options": [
            "Normal",
            "High"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Are the cases warming up yet? Helps justify priority.",
          "visibleIf": "rack !== ''",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Working%20Single%20Case%20Alarms.aspx"
        },
        {
          "id": "high_case_temps",
          "label": "Affected Cases",
          "type": "text",
          "visibleIf": "case_temps === 'High'",
          "phase": "phase-1-investigate"
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
            "Recalled WO (Under 10 Days)"
          ],
          "phase": "phase-2-dispatch",
          "trainingExplanation": "If the same issue has a prior WO within 10 days, recall/link the WO.",
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
            "Escalated for Review"
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
          "default": "PE-Emergency-Onsite w/i 2 hours",
          "phase": "phase-2-dispatch",
          "trainingExplanation": "Rack Phase Loss is always a PE2, do not downgrade.",
          "required": false,
          "visibleIf": "action_taken !== 'Created WO'"
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
          "phase": "phase-3-creation",
          "trainingExplanation": "Standard escalation requires notifying the store to monitor product.",
          "source": "Answered",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/IGCanadaWiki/SitePages/Outbound-Calls.aspx"
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings, why it was snoozed, etc...",
          "phase": "phase-3-creation",
          "trainingExplanation": "Always document why Priority was selected, and if snoozed, justify why."
        }
      ],
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: {system_reading} | System Setpoint: {setpoint} | Compressor Status: {comp_status} | Case Temps: {case_temps} | Affected Cases: {high_case_temps} | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Contacted {contact_name} ({contact_position}{contact_position_other}) | Contact Result: {contact_result} | {custom_notes} | {reusable_monitor_advisement}"
    },
    "SCL": {
      "id": "SCL",
      "name": "Suction Comm Loss",
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
          "title": "Overview",
          "alwaysShow": true,
          "content": "\n                <h3 class=\"font-bold text-lg text-purple-400 mb-2\">📡 Suction Comm Loss (SCL)</h3>\n                <p class=\"mb-2\"><strong>Issue:</strong> RIM/module tied to suction PSI is in communication loss.</p>\n                <div class=\"bg-gray-800 p-2 rounded mb-2 border-l-4 border-blue-500\">\n                    <ul class=\"list-disc pl-5 space-y-1 text-gray-300 text-sm\">\n                        <li><strong>Action:</strong> Create WO for tech onsite.</li>\n                        <li><strong>Note:</strong> Always reach out to a Store Contact and advise them to monitor product.</li>\n                    </ul>\n                </div>\n            ",
          "trainingExplanation": "Comm loss means the rack controller is blind to suction pressure. We need a tech."
        },
        {
          "id": "impact-guidance",
          "title": "Impact Rules",
          "alwaysShow": true,
          "content": "\n                <div class=\"bg-blue-900 border border-blue-500 rounded p-2 mb-2 text-sm text-blue-200\">\n                    <strong>Priority Guidance:</strong>\n                    <ul class=\"list-disc pl-5 mt-1\">\n                        <li>Default: PE2 - Onsite within 2 hours.</li>\n                    </ul>\n                </div>\n            "
        },
        {
          "id": "phase3",
          "title": "Phase 3 - Outbound Call",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch"
        }
      ],
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Rack House",
        "problemCode": "Sensor Fault",
        "priority": "PE-Emergency-Onsite w/i 2 hours"
      },
      "fields": [
        {
          "id": "store",
          "label": "Store Number",
          "type": "text",
          "source": "parsed_site_number",
          "phase": "phase-1-investigate"
        },
        {
          "id": "rack",
          "label": "Rack/Area",
          "type": "text",
          "phase": "phase-1-investigate"
        },
        {
          "id": "assets",
          "label": "Impacted Assets",
          "type": "text",
          "placeholder": "e.g. B05, B06, RCU1...",
          "phase": "phase-1-investigate",
          "trainingExplanation": "Check rack layout to see exactly what this module controls."
        },
        {
          "id": "impact_count",
          "label": "Impacted Count",
          "type": "select",
          "options": [
            "1 Asset",
            "Multiple Assets",
            "Unknown"
          ],
          "phase": "phase-1-investigate"
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
          "phase": "phase-2-dispatch",
          "trainingExplanation": "Recall window is 10 days."
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
            "Recalled WO",
            "Escalated for Review"
          ],
          "phase": "phase-2-dispatch"
        },
        {
          "id": "priority",
          "label": "WO Priority",
          "type": "select",
          "options": [
            "PE-Emergency-Onsite w/i 2 hours",
            "PE-Emergency-Onsite w/i 4 hours",
            "P1-Onsite w/i 24 hours",
            "P3-Onsite w/i 3 days"
          ],
          "default": "PE-Emergency-Onsite w/i 2 hours",
          "phase": "phase-2-dispatch"
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
          "default": "Answered",
          "phase": "phase-3-creation"
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings...",
          "phase": "phase-3-creation"
        }
      ],
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: {assets} | System Setpoint: N/A | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Impacted Count: {impact_count}. Contacted {contact_name} ({contact_position}{contact_position_other}) | Contact Result: {contact_result} | {custom_notes} | {reusable_monitor_advisement}"
    },
    "GSP": {
      "id": "GSP",
      "name": "Glycol/Chiller Suction Pressure",
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
      "thresholdDefinitions": {
        "glycolSuction": "glycol_suction_psi"
      },
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
          "title": "Overview",
          "alwaysShow": true,
          "content": "\n                <h3 class=\"font-bold text-lg text-teal-400 mb-2\">💧 Glycol/Chiller Suction Pressure (GSP)</h3>\n                <p class=\"mb-2\"><strong>Issue:</strong> Alerts related to glycol chiller loops requiring immediate attention if pressures drop below bounds.</p>\n                <div class=\"bg-blue-900 p-2 rounded border-l-4 border-blue-400 mb-3 text-sm\">\n                    <strong>Operational Bounds:</strong>\n                    <ul class=\"list-disc pl-5\">\n                        <li>Glycol Suction PSI: ±15 above, -10 below target</li>\n                        <li>Glycol Critical Threshold: &lt;5 PSI</li>\n                    </ul>\n                </div>\n                <div class=\"bg-gray-800 p-2 rounded mb-2 border-l-4 border-blue-500\">\n                    <ul class=\"list-disc pl-5 space-y-1 text-gray-300 text-sm\">\n                        <li>Identify the suction pressure and threshold.</li>\n                        <li>Verify if the system flow is impacted visually on the controller.</li>\n                        <li>If Suction PSI drops under 5 PSI: <strong>PE2 – Onsite within 2 hours</strong>.</li>\n                    </ul>\n                </div>\n            ",
          "trainingExplanation": "Glycol chillers pump coolant to multiple cases. If suction drops, cases will starve."
        },
        {
          "id": "phase3",
          "title": "Phase 3 - Outbound Call",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch"
        }
      ],
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Rack House",
        "problemCode": "Suction Line Pressure Drop",
        "priority": "PE-Emergency-Onsite w/i 2 hours"
      },
      "fields": [
        {
          "id": "store",
          "label": "Store Number",
          "type": "text",
          "source": "parsed_site_number",
          "phase": "phase-1-investigate"
        },
        {
          "id": "system",
          "label": "System",
          "type": "text",
          "default": "MTC",
          "phase": "phase-1-investigate"
        },
        {
          "id": "suction",
          "label": "Suction PSI",
          "type": "text",
          "phase": "phase-1-investigate"
        },
        {
          "id": "threshold",
          "label": "Suction Status",
          "type": "select",
          "options": [
            "Exceeds ±15 PSI (High)",
            "Below -10 PSI (Low)",
            "Below 5 PSI (Critical Glycol)",
            "Within Normal Range"
          ],
          "phase": "phase-1-investigate"
        },
        {
          "id": "time_in_alarm",
          "label": "Time In Alarm",
          "type": "time",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "pumps",
          "label": "Pump Status",
          "type": "select",
          "options": [
            "On",
            "Off",
            "Unknown"
          ],
          "phase": "phase-2-dispatch"
        },
        {
          "id": "temp_impact",
          "label": "Temp Impact",
          "type": "radio",
          "options": [
            "None",
            "Impacting Product"
          ],
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
          "phase": "phase-3-creation"
        },
        {
          "id": "linked_wo_num",
          "label": "Linked WO Number",
          "type": "text",
          "visibleIf": "existing_wo === 'Linked to WO'",
          "phase": "phase-3-creation"
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
            "Escalated for Review"
          ],
          "phase": "phase-3-creation"
        },
        {
          "id": "priority",
          "label": "WO Priority",
          "type": "select",
          "options": [
            "PE-Emergency-Onsite w/i 2 hours",
            "PE-Emergency-Onsite w/i 4 hours",
            "P1-Onsite w/i 24 hours"
          ],
          "default": "PE-Emergency-Onsite w/i 2 hours",
          "phase": "phase-3-creation"
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
          "default": "Answered",
          "phase": "phase-3-creation"
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings...",
          "phase": "phase-3-creation"
        }
      ],
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {system} | System Reading: {suction} | System Setpoint: {threshold} | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: {temp_impact}. Pumps: {pumps}. Contacted {contact_name} ({contact_position}{contact_position_other}) | Contact Result: {contact_result} | {custom_notes} | {reusable_monitor_advisement}"
    },
    "RDN": {
      "id": "RDN",
      "name": "Rack Download Needed",
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
          "title": "Overview",
          "alwaysShow": true,
          "content": "\n                <h3 class=\"font-bold text-lg text-yellow-400 mb-2\">💾 Rack Download Needed (RDN)</h3>\n                <p class=\"mb-2\"><strong>Issue:</strong> The controller requires a firmware/configuration download to recover from a fault or update.</p>\n                <div class=\"bg-gray-800 p-2 rounded mb-2 border-l-4 border-blue-500\">\n                    <ul class=\"list-disc pl-5 space-y-1 text-gray-300 text-sm\">\n                        <li>Document the controller model (e.g. Novar ESS32).</li>\n                        <li>Push the download payload and set a snooze timer for re-checking (2 hours standard).</li>\n                        <li>Always reach out to a Store Contact and advise them to monitor product if it was unexpected.</li>\n                    </ul>\n                </div>\n            ",
          "trainingExplanation": "Firmware drift can cause communication or logging issues. Downloading resets the configuration state."
        },
        {
          "id": "phase3",
          "title": "Phase 3 - Outbound Call",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch"
        }
      ],
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Energy Management System",
        "problemCode": "Controller Download",
        "priority": "P3-Onsite w/i 3 days"
      },
      "fields": [
        {
          "id": "store",
          "label": "Store Number",
          "type": "text",
          "source": "parsed_site_number",
          "phase": "phase-1-investigate"
        },
        {
          "id": "rack",
          "label": "Controller/Rack",
          "type": "text",
          "phase": "phase-1-investigate"
        },
        {
          "id": "controller",
          "label": "Controller Model",
          "type": "text",
          "default": "Novar ESS32",
          "phase": "phase-1-investigate"
        },
        {
          "id": "download_type",
          "label": "Download Type",
          "type": "text",
          "default": "Main and Comm",
          "phase": "phase-1-investigate"
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
            "Download started; snoozed 2 hours",
            "Created WO",
            "Linked WO",
            "Recalled WO",
            "Escalated for Review"
          ],
          "default": "Download started; snoozed 2 hours",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "recheck",
          "label": "Recheck Time",
          "type": "time",
          "placeholder": "e.g. 7AM",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "priority",
          "label": "WO Priority",
          "type": "select",
          "options": [
            "PE-Emergency-Onsite w/i 2 hours",
            "P1-Onsite w/i 24 hours",
            "P3-Onsite w/i 3 days"
          ],
          "default": "P3-Onsite w/i 3 days",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "contact_name",
          "label": "Contact Name",
          "type": "text",
          "phase": "phase-2-dispatch"
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
          "phase": "phase-2-dispatch"
        },
        {
          "id": "contact_position_other",
          "label": "Other Position",
          "type": "text",
          "visibleIf": "contact_position === 'Other'",
          "phase": "phase-2-dispatch"
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
          "phase": "phase-2-dispatch"
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings...",
          "phase": "phase-2-dispatch"
        }
      ],
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: Controller: {controller} | System Setpoint: N/A | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Download Type: {download_type}. Recheck Time: {recheck}. Contacted {contact_name} ({contact_position}{contact_position_other}) | Contact Result: {contact_result} | {custom_notes} | {reusable_monitor_advisement}"
    },
    "MCL": {
      "id": "MCL",
      "name": "Module Comm Loss",
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
          "title": "Overview",
          "alwaysShow": true,
          "content": "\n                <h3 class=\"font-bold text-lg text-blue-400 mb-2\">📶 Module Comm Loss (MCL)</h3>\n                <p class=\"mb-2\"><strong>Issue:</strong> Communication loss with assets or racks.</p>\n                <div class=\"bg-gray-800 p-2 rounded mb-2 border-l-4 border-blue-500\">\n                    <ul class=\"list-disc pl-5 space-y-1 text-gray-300 text-sm\">\n                        <li>Identify the impacted cases/assets.</li>\n                        <li>If it involves multiple critical cases (4+), create a PE4 WO or P3 WO dependent on specific thresholds.</li>\n                        <li>Always reach out to a Store Contact and advise them to monitor product.</li>\n                    </ul>\n                </div>\n            ",
          "trainingExplanation": "Loss of comms means we can no longer see temperatures or control the case valves."
        },
        {
          "id": "phase3",
          "title": "Phase 3 - Outbound Call",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch"
        }
      ],
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Multiple Case Assets / Rack",
        "problemCode": "Communication Issue",
        "priority": "P3-Onsite w/i 3 days"
      },
      "fields": [
        {
          "id": "store",
          "label": "Store Number",
          "type": "text",
          "source": "parsed_site_number",
          "phase": "phase-1-investigate"
        },
        {
          "id": "rack",
          "label": "Rack/Area",
          "type": "text",
          "phase": "phase-1-investigate"
        },
        {
          "id": "assets",
          "label": "Impacted Assets",
          "type": "text",
          "placeholder": "e.g. AS01a SRVC DELI...",
          "phase": "phase-1-investigate"
        },
        {
          "id": "impact_count",
          "label": "Impacted Count",
          "type": "select",
          "options": [
            "1-3 Cases",
            "4+ Cases",
            "Entire Rack"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Determines if this is a minor issue or a major product loss event."
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
            "Recalled WO",
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
            "P3-Onsite w/i 3 days"
          ],
          "default": "P3-Onsite w/i 3 days",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "contact_name",
          "label": "Contact Name",
          "type": "text",
          "phase": "phase-2-dispatch"
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
          "phase": "phase-2-dispatch"
        },
        {
          "id": "contact_position_other",
          "label": "Other Position",
          "type": "text",
          "visibleIf": "contact_position === 'Other'",
          "phase": "phase-2-dispatch"
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
          "phase": "phase-2-dispatch"
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings...",
          "phase": "phase-2-dispatch"
        }
      ],
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: {assets} | System Setpoint: N/A | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Impacted Count: {impact_count}. Contacted {contact_name} ({contact_position}{contact_position_other}) | Contact Result: {contact_result} | {custom_notes} | {reusable_monitor_advisement}"
    },
    "HSP": {
      "id": "HSP",
      "name": "High Suction Pressure",
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
      "thresholdDefinitions": {
        "suction": "suction_psi",
        "discharge": "discharge_psi"
      },
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
          "title": "Overview",
          "alwaysShow": true,
          "content": "\n                        <h3 class=\"font-bold text-lg text-orange-400 mb-2\">⚠️ High Suction Pressure (HSP)</h3>\n                        <p class=\"mb-2\"><strong>Issue:</strong> Rack suction pressure exceeding expected thresholds. This usually signals a compressor staging problem, bad transducer, or severe case load.</p>\n                        \n                        <div class=\"bg-blue-900 p-2 rounded border-l-4 border-blue-400 mb-3 text-sm\">\n                            <strong>Operational Bounds:</strong>\n                            <ul class=\"list-disc pl-5\">\n                                <li>Suction PSI: ±15 above, -10 below target</li>\n                                <li>Discharge PSI: 100–325 PSI (outside = transducer fault)</li>\n                            </ul>\n                        </div>\n\n                        <div class=\"bg-gray-800 p-2 rounded mb-2 border-l-4 border-blue-500\">\n                            <ul class=\"list-disc pl-5 space-y-1 text-gray-300 text-sm\">\n                                <li>Analyze current suction vs discharge readings.</li>\n                                <li>Check if the transducer is simply shorted/open vs true high pressure.</li>\n                            </ul>\n                        </div>\n                    ",
          "trainingExplanation": "Always verify if a transducer has shorted before dispatching a Rack down emergency WO. An open transducer reads very negative. Shorted reads max positive."
        },
        {
          "id": "sensor-failure-action",
          "title": "Transducer Action",
          "showIf": "condition === 'Open Transducer' || condition === 'Shorted Transducer'",
          "content": "\n                        <div class=\"bg-red-900 border border-red-500 rounded p-2 mb-2\">\n                            <h4 class=\"font-bold text-red-200\">🛠️ Transducer Action</h4>\n                            <p class=\"text-sm text-red-100\">Ensure force is placed in EMS per process and create PE2 WO (Problem Code: Condenser Repair when applicable).</p>\n                        </div>\n                    ",
          "trainingExplanation": "Placing a force on a bad sensor ensures the rack controllers do not drive compressors excessively based on erroneous data."
        },
        {
          "id": "rack-impact-action",
          "title": "Rack Emergency Action",
          "showIf": "condition === 'True High Pressure / Rack Impact'",
          "content": "\n                        <div class=\"bg-orange-900 border border-orange-500 rounded p-2 mb-2\">\n                            <h4 class=\"font-bold text-orange-200\">🚨 Rack Impact Notice</h4>\n                            <p class=\"text-sm text-orange-100\">Document impacted cases and rack readings. Prioritize dispatch to PE2 - Rack Down.</p>\n                        </div>\n                    "
        },
        {
          "id": "phase3",
          "title": "Phase 3 - Outbound Call",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch"
        }
      ],
      "recommendations": [
        {
          "condition": "condition === 'Open Transducer' || condition === 'Shorted Transducer'",
          "action": "FORCE_VALUE",
          "params": {
            "formula": "parseInt(discharge) > 200 ? 90 : (parseInt(discharge) > 150 ? 60 : 40)",
            "label": "Recommended Forced Suction Value"
          }
        }
      ],
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Rack House",
        "problemCode": "High Suction Issue",
        "priority": "PE-Emergency-Onsite w/i 2 hours"
      },
      "fields": [
        {
          "id": "store",
          "label": "Store Number",
          "type": "text",
          "source": "parsed_site_number",
          "phase": "phase-1-investigate"
        },
        {
          "id": "rack",
          "label": "Rack",
          "type": "text",
          "phase": "phase-1-investigate",
          "trainingExplanation": "Identifies whether this alert affects a single asset or an entire bank of cases."
        },
        {
          "id": "suction",
          "label": "Suction PSI",
          "type": "text",
          "placeholder": "e.g. -25, 63, 100",
          "phase": "phase-1-investigate",
          "trainingExplanation": "Current reading of suction pressure line. Negative generally indicates shorted sensor."
        },
        {
          "id": "discharge",
          "label": "Discharge PSI",
          "type": "text",
          "phase": "phase-1-investigate",
          "trainingExplanation": "Compare with suction; if discharge looks perfectly normal, suction sensor is likely the culprit."
        },
        {
          "id": "condition",
          "label": "Transducer Diagnosis",
          "type": "radio",
          "options": [
            "True High Pressure / Rack Impact",
            "Open Transducer",
            "Shorted Transducer"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "This helps decide whether we need an emergency rack down WO or a transducer swap WO."
        },
        {
          "id": "compressors",
          "label": "Compressor Stats",
          "type": "textarea",
          "placeholder": "COMP 1 VS Status ON AMPs 0.0A...",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "case_impact",
          "label": "Case Impact",
          "type": "select",
          "options": [
            "None",
            "Impacting Product"
          ],
          "phase": "phase-2-dispatch"
        },
        {
          "id": "time_in_alarm",
          "label": "Time In Alarm",
          "type": "text",
          "phase": "phase-3-creation"
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
          "phase": "phase-3-creation",
          "trainingExplanation": "Ensure we do not create duplicate service calls."
        },
        {
          "id": "linked_wo_num",
          "label": "Linked WO Number",
          "type": "text",
          "visibleIf": "existing_wo === 'Linked to WO'",
          "phase": "phase-3-creation"
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
            "Escalated for Review"
          ],
          "phase": "phase-3-creation"
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
          "phase": "phase-3-creation",
          "trainingExplanation": "PE2 is default for Rack issues. P1 for transducer, unless product is failing."
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
            "Advised to monitor product",
            "No Answer / Left Voicemail",
            "Call not required"
          ],
          "phase": "phase-3-creation",
          "trainingExplanation": "Required to document adherence to escalation SOPs."
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings...",
          "phase": "phase-3-creation"
        }
      ],
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: {suction} | System Setpoint: {discharge} | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Condition: {condition}. Compressors: {compressors}. Case Impact: {case_impact}. {contact_result} [Contact: {contact_name} - {contact_position} {contact_position_other}]. {custom_notes}. {reusable_monitor_advisement}"
    },
    "RSD": {
      "id": "RSD",
      "name": "Rack Stale Data",
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
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Requires Manual Selection",
        "problemCode": "Requires Manual Selection",
        "priority": "TBD"
      },
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: {system_reading} | System Setpoint: {setpoint} | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Contacted {contact_name} ({contact_position}{contact_position_other}) | {custom_notes} | {reusable_monitor_advisement} | Notes for Dev: Alarm Type: {alarm_type}; System Reading: {system_reading}; Note: {system_reading_note}; System Setpoint: {setpoint} {setpoint_type}; Case Temps: {case_temps}; Affected Cases: {high_case_temps}; Case Setpoint: {case_setpoint}; Module Comm Loss: {mod_comm_loss}; Custom Field 1: {custom_field_1}; Custom Field 2: {custom_field_2}; Custom Field 3: {custom_field_3}; Custom Field 4: {custom_field_4}; Custom Field 5: {custom_field_5}; Additional Dev Notes: {additional_dev_notes}",
      "fields": [
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
          "label": "Affected Rack/System",
          "type": "text",
          "phase": "phase-1-investigate",
          "required": true
        },
        {
          "id": "system_reading",
          "label": "System Reading (Alarm Status)",
          "type": "select",
          "options": [
            "Phase Loss Confirmed",
            "Flashing/Intermittent",
            "Cleared"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Document if the alarm is still active right now.",
          "visibleIf": "rack !== ''",
          "required": true
        },
        {
          "id": "comp_status",
          "label": "Compressor Status",
          "type": "select",
          "options": [
            "All Off",
            "Some Running",
            "Running Normally",
            "Unknown/No Data"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Usually Phase Loss drops all compressors offline to protect them.",
          "visibleIf": "rack !== ''",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Compressor%20Triage.aspx"
        },
        {
          "id": "case_temps",
          "label": "Case Temps",
          "type": "radio",
          "options": [
            "Normal",
            "High"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Are the cases warming up yet? Helps justify priority.",
          "visibleIf": "rack !== ''",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Working%20Single%20Case%20Alarms.aspx"
        },
        {
          "id": "high_case_temps",
          "label": "Affected Cases",
          "type": "text",
          "visibleIf": "case_temps === 'High'",
          "phase": "phase-1-investigate"
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
            "Recalled WO (Under 10 Days)"
          ],
          "phase": "phase-2-dispatch",
          "trainingExplanation": "If the same issue has a prior WO within 10 days, recall/link the WO.",
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
            "Escalated for Review"
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
          "default": "PE-Emergency-Onsite w/i 2 hours",
          "phase": "phase-2-dispatch",
          "trainingExplanation": "Rack Phase Loss is always a PE2, do not downgrade.",
          "required": false,
          "visibleIf": "action_taken !== 'Created WO'"
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
          "phase": "phase-3-creation",
          "trainingExplanation": "Standard escalation requires notifying the store to monitor product.",
          "source": "Answered",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/IGCanadaWiki/SitePages/Outbound-Calls.aspx"
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings, why it was snoozed, etc...",
          "phase": "phase-3-creation",
          "trainingExplanation": "Always document why Priority was selected, and if snoozed, justify why."
        }
      ],
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
          "title": "Rack Stale Data Overview",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded shadow-sm\">\n        <h4 class=\"font-bold text-gray-300 mb-3 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">Stale Data Guidance</h4>\n        <p class=\"text-gray-300 mb-2\">Stale data occurs when the EMS stops receiving updates from the rack controller.</p>\n        <ul class=\"space-y-2 text-gray-300 pl-2\">\n            <li class=\"flex items-start\"><span class=\"text-blue-500 mr-2 mt-0.5\">•</span><span>Verify if there is a network outage or if only this controller is offline.</span></li>\n            <li class=\"flex items-start\"><span class=\"text-blue-500 mr-2 mt-0.5\">•</span><span>Check for overlapping comm loss alarms.</span></li>\n            <li class=\"flex items-start\"><span class=\"text-orange-500 mr-2 mt-0.5\">•</span><span>Snoozing: Stale data might resolve on network reconnect, but extended loss requires a dispatch.</span></li>\n        </ul>\n    </div>\n</div>",
          "alwaysShow": true
        },
        {
          "id": "phase1",
          "title": "Phase 1 Assessment",
          "content": "<p class=\"text-sm text-gray-300\">Check affected systems and verify parameters.</p>",
          "phase": "phase-1-investigate"
        },
        {
          "id": "phase2",
          "title": "Phase 2 Rules",
          "content": "<p class=\"text-sm text-gray-300\">Do not downgrade priority. Check for existing WO.</p>",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "phase3",
          "title": "Phase 3 - Outbound Call",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch"
        }
      ]
    },
    "RF": {
      "id": "RF",
      "name": "Rack Fault",
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
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Requires Manual Selection",
        "problemCode": "Requires Manual Selection",
        "priority": "TBD"
      },
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: {system_reading} | System Setpoint: {setpoint} | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Contacted {contact_name} ({contact_position}{contact_position_other}) | {custom_notes} | {reusable_monitor_advisement} | Notes for Dev: Alarm Type: {alarm_type}; System Reading: {system_reading}; Note: {system_reading_note}; System Setpoint: {setpoint} {setpoint_type}; Case Temps: {case_temps}; Affected Cases: {high_case_temps}; Case Setpoint: {case_setpoint}; Module Comm Loss: {mod_comm_loss}; Custom Field 1: {custom_field_1}; Custom Field 2: {custom_field_2}; Custom Field 3: {custom_field_3}; Custom Field 4: {custom_field_4}; Custom Field 5: {custom_field_5}; Additional Dev Notes: {additional_dev_notes}",
      "fields": [
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
          "label": "Affected Rack/System",
          "type": "text",
          "phase": "phase-1-investigate",
          "required": true
        },
        {
          "id": "system_reading",
          "label": "System Reading (Alarm Status)",
          "type": "select",
          "options": [
            "Phase Loss Confirmed",
            "Flashing/Intermittent",
            "Cleared"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Document if the alarm is still active right now.",
          "visibleIf": "rack !== ''",
          "required": true
        },
        {
          "id": "comp_status",
          "label": "Compressor Status",
          "type": "select",
          "options": [
            "All Off",
            "Some Running",
            "Running Normally",
            "Unknown/No Data"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Usually Phase Loss drops all compressors offline to protect them.",
          "visibleIf": "rack !== ''",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Compressor%20Triage.aspx"
        },
        {
          "id": "case_temps",
          "label": "Case Temps",
          "type": "radio",
          "options": [
            "Normal",
            "High"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Are the cases warming up yet? Helps justify priority.",
          "visibleIf": "rack !== ''",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Working%20Single%20Case%20Alarms.aspx"
        },
        {
          "id": "high_case_temps",
          "label": "Affected Cases",
          "type": "text",
          "visibleIf": "case_temps === 'High'",
          "phase": "phase-1-investigate"
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
            "Recalled WO (Under 10 Days)"
          ],
          "phase": "phase-2-dispatch",
          "trainingExplanation": "If the same issue has a prior WO within 10 days, recall/link the WO.",
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
            "Escalated for Review"
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
          "default": "PE-Emergency-Onsite w/i 2 hours",
          "phase": "phase-2-dispatch",
          "trainingExplanation": "Rack Phase Loss is always a PE2, do not downgrade.",
          "required": false,
          "visibleIf": "action_taken !== 'Created WO'"
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
          "phase": "phase-3-creation",
          "trainingExplanation": "Standard escalation requires notifying the store to monitor product.",
          "source": "Answered",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/IGCanadaWiki/SitePages/Outbound-Calls.aspx"
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings, why it was snoozed, etc...",
          "phase": "phase-3-creation",
          "trainingExplanation": "Always document why Priority was selected, and if snoozed, justify why."
        }
      ],
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
          "title": "Rack Fault Overview",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded shadow-sm\">\n        <h4 class=\"font-bold text-gray-300 mb-3 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">Rack Fault Guidance</h4>\n        <p class=\"text-gray-300 mb-2\">A Rack Fault is a generalized alarm indicating an unhandled problem at the rack level.</p>\n        <ul class=\"space-y-2 text-gray-300 pl-2\">\n            <li class=\"flex items-start\"><span class=\"text-blue-500 mr-2 mt-0.5\">•</span><span>Investigate the rack's sub-parameters to find the root cause (e.g., oil, temp, etc.).</span></li>\n            <li class=\"flex items-start\"><span class=\"text-orange-500 mr-2 mt-0.5\">•</span><span>Do not snooze unless the fault is identified and actively resolving.</span></li>\n            <li class=\"flex items-start\"><span class=\"text-red-500 mr-2 mt-0.5\">•</span><span>Priority Downgrade: Do not downgrade any WO that generates as PE-2hr or PE-4hr without documented approval.</span></li>\n        </ul>\n    </div>\n</div>",
          "alwaysShow": true
        },
        {
          "id": "phase1",
          "title": "Phase 1 Assessment",
          "content": "<p class=\"text-sm text-gray-300\">Check affected systems and verify parameters.</p>",
          "phase": "phase-1-investigate"
        },
        {
          "id": "phase2",
          "title": "Phase 2 Rules",
          "content": "<p class=\"text-sm text-gray-300\">Do not downgrade priority. Check for existing WO.</p>",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "phase3",
          "title": "Phase 3 - Outbound Call",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch"
        }
      ]
    },
    "HDP": {
      "id": "HDP",
      "name": "High Discharge Pressure",
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
      "crystalAttributes": {
        "issueArea": "Home Office Only",
        "problemType": "Refrigeration - HO Use Only",
        "assetType": "Requires Manual Selection",
        "problemCode": "Requires Manual Selection",
        "priority": "TBD"
      },
      "noteTemplate": "Task ID: {alert_id} | Store: {store} | Alarm Type: {alarm_type} | Affected Rack/System: {rack} | System Reading: {system_reading} | System Setpoint: {setpoint} | Time In Alarm: {time_in_alarm} | Existing WO Check: {existing_wo} {linked_wo_num} | Action Taken: {action_taken} | WO Priority: {priority} | Additional Notes: Contacted {contact_name} ({contact_position}{contact_position_other}) | {custom_notes} | {reusable_monitor_advisement} | Notes for Dev: Alarm Type: {alarm_type}; System Reading: {system_reading}; Note: {system_reading_note}; System Setpoint: {setpoint} {setpoint_type}; Case Temps: {case_temps}; Affected Cases: {high_case_temps}; Case Setpoint: {case_setpoint}; Module Comm Loss: {mod_comm_loss}; Custom Field 1: {custom_field_1}; Custom Field 2: {custom_field_2}; Custom Field 3: {custom_field_3}; Custom Field 4: {custom_field_4}; Custom Field 5: {custom_field_5}; Additional Dev Notes: {additional_dev_notes}",
      "fields": [
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
          "label": "Affected Rack/System",
          "type": "text",
          "phase": "phase-1-investigate",
          "required": true
        },
        {
          "id": "system_reading",
          "label": "System Reading (Alarm Status)",
          "type": "select",
          "options": [
            "Phase Loss Confirmed",
            "Flashing/Intermittent",
            "Cleared"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Document if the alarm is still active right now.",
          "visibleIf": "rack !== ''",
          "required": true
        },
        {
          "id": "comp_status",
          "label": "Compressor Status",
          "type": "select",
          "options": [
            "All Off",
            "Some Running",
            "Running Normally",
            "Unknown/No Data"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Usually Phase Loss drops all compressors offline to protect them.",
          "visibleIf": "rack !== ''",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Compressor%20Triage.aspx"
        },
        {
          "id": "case_temps",
          "label": "Case Temps",
          "type": "radio",
          "options": [
            "Normal",
            "High"
          ],
          "phase": "phase-1-investigate",
          "trainingExplanation": "Are the cases warming up yet? Helps justify priority.",
          "visibleIf": "rack !== ''",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/BCKnowledgebase/Pages/Working%20Single%20Case%20Alarms.aspx"
        },
        {
          "id": "high_case_temps",
          "label": "Affected Cases",
          "type": "text",
          "visibleIf": "case_temps === 'High'",
          "phase": "phase-1-investigate"
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
            "Recalled WO (Under 10 Days)"
          ],
          "phase": "phase-2-dispatch",
          "trainingExplanation": "If the same issue has a prior WO within 10 days, recall/link the WO.",
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
            "Escalated for Review"
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
          "default": "PE-Emergency-Onsite w/i 2 hours",
          "phase": "phase-2-dispatch",
          "trainingExplanation": "Rack Phase Loss is always a PE2, do not downgrade.",
          "required": false,
          "visibleIf": "action_taken !== 'Created WO'"
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
          "phase": "phase-3-creation",
          "trainingExplanation": "Standard escalation requires notifying the store to monitor product.",
          "source": "Answered",
          "required": true,
          "trainingLink": "https://teams.wal-mart.com/sites/IGCanadaWiki/SitePages/Outbound-Calls.aspx"
        },
        {
          "id": "custom_notes",
          "label": "Additional Notes",
          "type": "textarea",
          "placeholder": "Any extra diagnostic findings, why it was snoozed, etc...",
          "phase": "phase-3-creation",
          "trainingExplanation": "Always document why Priority was selected, and if snoozed, justify why."
        }
      ],
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
          "title": "High Discharge Pressure Overview",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded shadow-sm\">\n        <h4 class=\"font-bold text-gray-300 mb-3 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">High Discharge Pressure Guidance</h4>\n        <p class=\"text-gray-300 mb-2\">High discharge pressure can indicate a condenser issue, fan failure, or high ambient temps.</p>\n        <ul class=\"space-y-2 text-gray-300 pl-2\">\n            <li class=\"flex items-start\"><span class=\"text-blue-500 mr-2 mt-0.5\">•</span><span>Check condenser fans and ambient temperature.</span></li>\n            <li class=\"flex items-start\"><span class=\"text-red-500 mr-2 mt-0.5\">•</span><span>Dangerous condition: can lead to rack venting refrigerant if not resolved quickly. Emergency dispatch is typical.</span></li>\n            <li class=\"flex items-start\"><span class=\"text-orange-500 mr-2 mt-0.5\">•</span><span>Snoozing: Never snooze a Rack alarm for more than 2 hours.</span></li>\n        </ul>\n    </div>\n</div>",
          "alwaysShow": true
        },
        {
          "id": "phase1",
          "title": "Phase 1 Assessment",
          "content": "<p class=\"text-sm text-gray-300\">Check affected systems and verify parameters.</p>",
          "phase": "phase-1-investigate"
        },
        {
          "id": "phase2",
          "title": "Phase 2 Rules",
          "content": "<p class=\"text-sm text-gray-300\">Do not downgrade priority. Check for existing WO.</p>",
          "phase": "phase-2-dispatch"
        },
        {
          "id": "phase3",
          "title": "Phase 3 - Outbound Call",
          "content": "<div class=\"space-y-4 max-w-full text-sm\">\n    <!-- Mandatory Requirements Block -->\n    <div class=\"bg-red-900 bg-opacity-20 border border-red-700 rounded p-3 shadow-sm\">\n        <h4 class=\"font-bold text-red-400 mb-2 flex items-center\">\n            <span class=\"mr-2\">💚</span> DO NOT MISS THESE REQUIREMENTS\n        </h4>\n        <ul class=\"text-gray-300 space-y-1 list-disc list-inside pl-5\">\n            <li><strong class=\"text-gray-200\">Do Not Ask the Store if They Want a Work Order:</strong> The alarm condition determines when a WO is created.</li>\n            <li><strong>ALWAYS use the Scripted Closing:</strong> <em class=\"text-blue-300\">\"Please monitor product and follow refrigeration failure guidelines that can be found on The Wire.\"</em></li>\n            <li>If a Manager Asks \"When is the tech going to arrive?\": <em class=\"text-yellow-300\">\"A technician will be onsite as soon as possible based on technician assignment.\"</em></li>\n        </ul>\n    </div>\n\n    <!-- Collapsible Scenario 1: Manager Answers -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-blue-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 1: Manager Answers\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-blue-500\">\n            <div class=\"space-y-2 text-gray-300\">\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent</span></p>\n                <p class=\"italic\">\"Hello, my name is [FirstName], calling from Upstream Facility Services about a refrigeration issue at your store. For documentation, could I please get your first name, last name, and position?\"</p>\n                \n                <p class=\"italic\">\"The issue I’m calling about is [CaseOrRack] in alarm for [Issue Type]. It has been in alarm for about [Time], currently running at [CurrentReading] with a setpoint of [SetPoint].\"</p>\n                \n                <p class=\"italic\">\"We have created an emergency response work order and a technician will be onsite ASAP. Do you have any questions for me at this time?\"</p>\n\n                <p><span class=\"font-bold text-green-400 text-xs uppercase tracking-wider\">Manager</span></p>\n                <p class=\"italic\">\"[Asks Question] or No thank you.\"</p>\n\n                <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Closing</span></p>\n                <p class=\"italic font-bold text-blue-300\">\"All right, thank you for your time today. Please monitor product and follow refrigeration failure guidelines as found on The Wire and have a great day.\"</p>\n            </div>\n        </div>\n    </details>\n\n    <!-- Collapsible Scenario 2: No Answer (Voicemail) -->\n    <details class=\"bg-gray-800 border border-gray-700 rounded shadow-sm group\">\n        <summary class=\"font-bold text-yellow-400 cursor-pointer p-3 outline-none hover:bg-gray-700 transition\">\n            🎬 Scenario 2: No Answer (Leave Voicemail)\n        </summary>\n        <div class=\"p-3 border-t border-gray-700 space-y-3 bg-gray-900 border-l-4 border-l-yellow-500\">\n            <p><span class=\"font-bold text-purple-400 text-xs uppercase tracking-wider\">Agent Voicemail Script</span></p>\n            <p class=\"text-gray-300 italic mb-4\">\"Good [Morning/Afternoon/Evening], my name is [FirstName]. I’m calling from Upstream Facility Services regarding [CaseorRack] in alarm for [IssueType]. It has been in alarm for about [Time], currently running at [TempOrRackReading] with a setpoint of [SetPoint]. We have created an emergency response work order and a technician will be onsite ASAP.\"</p>\n            \n            <p class=\"text-blue-300 italic mb-4 font-bold\">\"Please monitor product and follow refrigeration failure guidelines as found on The Wire. Thank you.\"</p>\n\n            <div class=\"bg-gray-800 p-2 rounded mt-2\">\n                <span class=\"font-bold text-gray-400 text-xs uppercase block mb-1\">Required Action After Voicemail:</span>\n                <ul class=\"list-disc pl-4 text-xs text-gray-400 space-y-1\">\n                    <li>Document the attempted contact, who was called, and that a VM was left.</li>\n                    <li>Continue to the next manager contact on the approved list if required.</li>\n                </ul>\n            </div>\n        </div>\n    </details>\n\n    <!-- Call Procedure Recap -->\n    <div class=\"bg-gray-800 border border-gray-700 p-3 rounded\">\n        <h4 class=\"font-bold text-gray-300 mb-2 border-b border-gray-700 pb-1 text-xs uppercase tracking-wider\">🧠 CI Project Recap Checklist</h4>\n        <div class=\"grid grid-cols-1 gap-1 text-xs text-gray-400\">\n            <p>✅ Main store line attempted first</p>\n            <p>✅ Approved manager contact list attempted before declaring no answer</p>\n            <p>✅ Voicemail left where available</p>\n            <p>✅ Full manager information documented when contact is made</p>\n            <p>✅ Professional closing executed</p>\n        </div>\n    </div>\n</div>",
          "showAfter": "phase-2-dispatch"
        }
      ]
    }
  },
  "parserRules": {
    "delimiter": "|",
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
      "alarm_type",
      "incident_id"
    ]
  },
  "activeProfileFields": [
    {
      "id": "store",
      "label": "Store Number",
      "type": "text",
      "source": "parsed_site_number",
      "phase": "phase-1-investigate"
    },
    {
      "id": "rack",
      "label": "Rack/Area",
      "type": "text",
      "phase": "phase-1-investigate"
    },
    {
      "id": "assets",
      "label": "Impacted Assets",
      "type": "text",
      "placeholder": "e.g. B05, B06, RCU1...",
      "phase": "phase-1-investigate",
      "trainingExplanation": "Check rack layout to see exactly what this module controls."
    },
    {
      "id": "impact_count",
      "label": "Impacted Count",
      "type": "select",
      "options": [
        "1 Asset",
        "Multiple Assets",
        "Unknown"
      ],
      "phase": "phase-1-investigate"
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
      "phase": "phase-2-dispatch",
      "trainingExplanation": "Recall window is 10 days."
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
        "Recalled WO",
        "Escalated for Review"
      ],
      "phase": "phase-2-dispatch"
    },
    {
      "id": "priority",
      "label": "WO Priority",
      "type": "select",
      "options": [
        "PE-Emergency-Onsite w/i 2 hours",
        "PE-Emergency-Onsite w/i 4 hours",
        "P1-Onsite w/i 24 hours",
        "P3-Onsite w/i 3 days"
      ],
      "default": "PE-Emergency-Onsite w/i 2 hours",
      "phase": "phase-2-dispatch"
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
      "default": "Answered",
      "phase": "phase-3-creation"
    },
    {
      "id": "custom_notes",
      "label": "Additional Notes",
      "type": "textarea",
      "placeholder": "Any extra diagnostic findings...",
      "phase": "phase-3-creation"
    }
  ]
};