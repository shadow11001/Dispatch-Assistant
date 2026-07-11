const TimerEngine = {
    startTime: null,
    interval: null,
    isRunning: false,
    config: null,
    durationTarget: null,
    
    init: function(config) {
        console.log("TimerEngine initialized with config:", config);
        this.config = config.timerConfig || { enabled: false };
        if (!this.config.enabled) return;

        // Force a brutally clean re-initialization of the DOM element every time
        let existingWidget = document.getElementById('sla-timer-widget');
        if (existingWidget) {
            existingWidget.parentNode.removeChild(existingWidget);
        }

        this.widget = document.createElement('div');
        this.widget.id = 'sla-timer-widget';
        this.widget.title = 'Click to Stop/Start Timer';

        const isHeader = this.config.location === 'header' || this.config.location === 'header-center';
        
        if (isHeader) {
            this.widget.className = "bg-theme-panel1 border-2 border-theme-border rounded py-1 px-3 shadow flex items-center space-x-3 transition cursor-pointer";
            if (this.config.location === 'header-center') {
                this.widget.classList.add('absolute', 'left-1/2', 'transform', '-translate-x-1/2');
            }

            this.widget.innerHTML = `
                <div class="flex items-center space-x-3 pointer-events-none">
                    <div class="flex flex-col items-center leading-none">
                        <span class="text-[9px] text-theme-accentsec font-bold uppercase tracking-wider" id="sla-timer-label">${this.config.defaultLabel || "SLA Time"}</span>
                        <span class="text-lg font-mono text-gray-100 font-bold leading-none" id="sla-timer-display">00:00</span>
                    </div>
                    <div id="sla-timer-tooltip" class="text-xs italic font-bold hidden border-l border-theme-border pl-3"></div>
                </div>
            `;
            
            const headerContainer = document.querySelector('header');
            const titleElement = document.querySelector('header .walmart-logo-container') || document.querySelector('header h1.classic-title');
            
            if (this.config.location === 'header-center' && headerContainer) {
                headerContainer.appendChild(this.widget);
            } else if (this.config.location === 'header' && titleElement) {
                // Insert directly after the title/logo element
                titleElement.insertAdjacentElement('afterend', this.widget);
            } else if (headerContainer) {
                 headerContainer.appendChild(this.widget);
            } else {
                 document.body.appendChild(this.widget);
            }
            
            this.display = document.getElementById('sla-timer-display');
            this.tooltip = document.getElementById('sla-timer-tooltip');
            this.label = document.getElementById('sla-timer-label');
        } else {
             // Fallback minimal
             this.widget.className = "fixed bottom-16 right-4 bg-theme-panel1 border-2 border-theme-border rounded-lg shadow-lg p-3 w-64 z-50 transition cursor-pointer";
             this.widget.innerHTML = `
                <div class="flex flex-col text-center pointer-events-none">
                    <span class="text-xs text-theme-accentsec font-bold uppercase tracking-wider" id="sla-timer-label">${this.config.defaultLabel || "SLA Time"}</span>
                    <span class="text-2xl font-mono text-gray-100 mt-1 font-bold" id="sla-timer-display">00:00</span>
                    <div id="sla-timer-tooltip" class="text-xs italic font-bold mt-2 pt-2 border-t border-theme-border hidden"></div>
                </div>
            `;
            document.body.appendChild(this.widget);
            this.display = document.getElementById('sla-timer-display');
            this.tooltip = document.getElementById('sla-timer-tooltip');
            this.label = document.getElementById('sla-timer-label');
        }

        this.widget.addEventListener('click', () => {
            if (this.isRunning) this.stop();
        });

        // Provide a manual start method globally for convenience
        window.TimerEngine = this;
        // Do not auto start the timer!
    },
    
    start: function(durationMinutes = null) {
        if (!this.config || !this.config.enabled) return;
        
        // Always reset on start so "start" clicks cleanly override
        this.isRunning = true;
        this.startTime = Date.now();
        
        // Allow an override of the start time via duration (running downwards) or just keep tracking upwards
        if (durationMinutes) {
           this.durationTarget = durationMinutes * 60 * 1000;
        } else {
           this.durationTarget = null;
        }

        if(this.label) this.label.innerText = durationMinutes ? "Wait Timer" : "SLA Time";
        this.widget.classList.remove('opacity-50', 'hidden');

        clearInterval(this.interval);
        this.updateDisplay();
        this.interval = setInterval(() => this.updateDisplay(), 1000);
    },
    
    stop: function() {
        if (!this.isRunning) return;
        this.isRunning = false;
        clearInterval(this.interval);
        
        if (this.label) this.label.innerText = "Timer Stopped";
        this.widget.classList.add('opacity-50');
        
        // Reset classes
        this.widget.classList.remove('animate-pulse', 'bg-red-500', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500');
        this.widget.classList.add('bg-theme-panel1');
    },

    updateDisplay: function() {
        if (!this.isRunning || !this.display) return;
        
        const now = Date.now();
        const elapsed = now - this.startTime;
        let displayMs, isCountDown = false;
        
        if (this.durationTarget) {
            displayMs = this.durationTarget - elapsed;
            isCountDown = true;
            if (displayMs <= 0) displayMs = 0; // Don't go negative
        } else {
            displayMs = elapsed;
        }

        const totalSeconds = Math.floor(displayMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        this.display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        // If it's a fixed countdown timer, we handle visualization separately
        if (isCountDown) {
            if (this.tooltip) {
                this.tooltip.innerText = "Waiting...";
                this.tooltip.classList.remove('hidden');
            }
            this.widget.classList.remove('bg-theme-panel1', 'bg-green-500', 'bg-yellow-500', 'bg-red-500', 'animate-pulse');
            
            if (displayMs === 0) {
                 this.stop();
                 this.display.innerText = "00:00";
                 if(this.tooltip) this.tooltip.innerText = "Time Expired!";
                 if(this.label) this.label.innerText = "Check Task";
                 this.widget.classList.add('bg-red-500', 'text-white', 'animate-pulse');
                 this.widget.classList.remove('opacity-50'); // pop it back actively
            } else if (minutes < 2) {
                 this.widget.classList.add('bg-yellow-500', 'text-black');
            } else {
                 this.widget.classList.add('bg-green-500', 'text-white');
            }
            return;
        }

        // Apply fallback breakpoints mapping if it's counting up normally
        let activeBP = null;
        if (this.config.breakpoints && !isCountDown) {
            activeBP = this.config.breakpoints.find(bp => minutes >= bp.minuteStart && minutes < bp.minuteEnd);
        }

        this.widget.className = "bg-theme-panel1 border-2 border-theme-border rounded py-1 px-3 shadow flex items-center space-x-3 transition cursor-pointer";
        if (this.config.location === 'header-center') this.widget.classList.add('absolute', 'left-1/2', 'transform', '-translate-x-1/2');

        if (activeBP) {
            if (activeBP.colorClass) {
                this.widget.classList.remove('bg-theme-panel1');
                this.widget.classList.add(...activeBP.colorClass.split(' '));
            }
            if (activeBP.tooltip && this.tooltip) {
                this.tooltip.innerText = activeBP.tooltip;
                this.tooltip.classList.remove('hidden');
            } else if (this.tooltip) {
                this.tooltip.classList.add('hidden');
            }
        } else if (this.tooltip) {
            this.tooltip.classList.add('hidden');
        }
    }
};

window.TimerEngine = TimerEngine;
