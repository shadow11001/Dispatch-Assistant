
const TimerEngine = {
    startTime: null,
    interval: null,
    isRunning: false,
    config: null,
    
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
            this.widget.className = "bg-gray-800 border-2 border-gray-600 rounded py-1 px-3 shadow flex items-center space-x-3 transition cursor-pointer";
            if (this.config.location === 'header') {
                // Handled natively by wrapper space-x-6
            } else {
                // Centered absolutely
                this.widget.classList.add('absolute', 'left-1/2', 'transform', '-translate-x-1/2');
            }

            this.widget.innerHTML = `
                <div class="flex items-center space-x-3 pointer-events-none">
                    <div class="flex flex-col items-center leading-none">
                        <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider" id="sla-timer-label">${this.config.defaultLabel || "SLA Time"}</span>
                        <span class="text-lg font-mono text-gray-100 font-bold leading-none" id="sla-timer-display">00:00</span>
                    </div>
                    <div id="sla-timer-tooltip" class="text-xs italic font-bold hidden border-l border-gray-600 pl-3"></div>
                </div>
            `;
            
            const headerContainer = document.querySelector('header');
            const titleElement = document.querySelector('header h1');
            
            if (this.config.location === 'header-center' && headerContainer) {
                // Append broadly to the header and let 'absolute' center it
                headerContainer.appendChild(this.widget);
            } else if (this.config.location === 'header' && titleElement) {
                // Wrap the Title and the Timer together so 'justify-between' doesn't push the timer to the center of the screen
                if (titleElement.parentElement.classList.contains('items-center') && titleElement.parentElement.tagName.toLowerCase() === 'div' && titleElement.parentElement.id === 'header-left-group') {
                    // Already wrapped
                    titleElement.parentElement.appendChild(this.widget);
                } else {
                    const wrapper = document.createElement('div');
                    wrapper.id = 'header-left-group';
                    wrapper.className = "flex items-center space-x-6"; // "space-x-6" provides approx half-inch gap
                    titleElement.parentNode.insertBefore(wrapper, titleElement);
                    wrapper.appendChild(titleElement);
                    wrapper.appendChild(this.widget);
                    this.widget.classList.remove('ml-6'); // Strip redundant margin since Tailwind space-x-6 handles it
                }
            } else {
                document.body.appendChild(this.widget);
            }
        } else {
            this.widget.className = "fixed bottom-4 right-4 bg-gray-800 border-2 border-gray-600 rounded-lg p-3 shadow-2xl z-40 cursor-pointer hover:bg-gray-700 transition";
            this.widget.innerHTML = `
                <div class="flex flex-col items-center justify-center pointer-events-none">
                    <span class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1" id="sla-timer-label">${this.config.defaultLabel || "SLA Time"}</span>
                    <span class="text-2xl font-mono text-gray-100 font-bold" id="sla-timer-display">00:00</span>
                    <div id="sla-timer-tooltip" class="mt-2 text-xs italic text-center text-gray-300 hidden max-w-[150px]"></div>
                </div>
            `;
            document.body.appendChild(this.widget);
        }

        this.display = document.getElementById('sla-timer-display');
        
        // Calculate max configured SLA if breakpoints exist
        this.maxSLA = null;
        if (this.config.breakpoints && this.config.breakpoints.length > 0) {
            // Find max minuteEnd, ignoring 999
            let maxMin = 0;
            this.config.breakpoints.forEach(bp => {
                if (bp.minuteEnd < 999 && bp.minuteEnd > maxMin) {
                    maxMin = bp.minuteEnd;
                }
            });
            if (maxMin > 0) {
                this.maxSLA = maxMin;
            }
        }
        this.label = document.getElementById('sla-timer-label');
        this.tooltip = document.getElementById('sla-timer-tooltip');

        // Setup Edge Glow Overlay
        this.edgeOverlay = document.getElementById('sla-edge-overlay');
        if (!this.edgeOverlay) {
            this.edgeOverlay = document.createElement('div');
            this.edgeOverlay.id = 'sla-edge-overlay';
            this.edgeOverlay.className = 'fixed inset-0 pointer-events-none z-50 hidden transition-all duration-300';
            document.body.appendChild(this.edgeOverlay);
        }

        this.widget.addEventListener('click', () => {
            if (this.isRunning) this.stop();
            else this.start();
        });
        
        // Re-bind dragging if floating
        if (!isHeader) {
            let isDragging = false, currentX = 0, currentY = 0, initialX, initialY, xOffset = 0, yOffset = 0;
            this.widget.addEventListener("mousedown", (e) => {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
                isDragging = true;
            });
            document.addEventListener("mouseup", () => {
                initialX = currentX;
                initialY = currentY;
                isDragging = false;
            });
            document.addEventListener("mousemove", (e) => {
                if (isDragging) {
                    e.preventDefault();
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                    xOffset = currentX;
                    yOffset = currentY;
                    this.widget.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
                }
            });
        }
    },
    
    start: function() {
        if (!this.config || !this.config.enabled) return;
        console.log("TimerEngine start");
        
        // If we are resuming, subtract the properly paused elapsed time from NOW so it "picks up" where it left off safely.
        if (this.pausedElapsed && this.pausedElapsed > 0) {
            this.startTime = Date.now() - this.pausedElapsed;
            this.pausedElapsed = 0; // Handled
        } else {
            this.startTime = Date.now();
        }
        
        this.isRunning = true;
        this.interval = setInterval(() => this.tick(), 1000);
        this.widget.classList.remove('opacity-50', 'hidden');
        if (this.config.location === 'header' || this.config.location === 'header-center') this.widget.style.display = 'flex';
        this.tick();
    },
    
    stop: function() {
        console.log("TimerEngine stop");
        if (this.isRunning && this.startTime) {
            // Save exactly how long we ran before stopping
            this.pausedElapsed = Date.now() - this.startTime;
        }
        this.isRunning = false;
        clearInterval(this.interval);
        if (this.widget) this.widget.classList.add('opacity-50');
    },
    
    reset: function() {
        console.log("TimerEngine reset");
        this.stop();
        this.pausedElapsed = 0;
        this.startTime = null;
        if (this.display) this.display.innerText = "00:00";
        if (this.widget) {
            // Hard completely hide component so it doesn't leave ghost wrappers
            this.widget.classList.add('hidden');
            this.widget.style.display = 'none';
            this.widget.style.borderColor = '';
            this.widget.style.boxShadow = '';
            this.widget.classList.remove('timer-glow-yellow', 'timer-glow-orange', 'timer-glow-red', 'timer-glow-purple', 'timer-glow-blue', 'timer-glow-green', 'bg-red-900', 'border-red-500');
        }
        if (this.tooltip) {
            this.tooltip.classList.add('hidden');
            this.tooltip.innerText = "";
            this.tooltip.style.color = '';
        }
    },
    
    tick: function() {
        if (!this.isRunning) return;
        
        let elapsed = Date.now() - this.startTime;
        let totalSeconds = Math.floor(elapsed / 1000);
        let m = Math.floor(totalSeconds / 60);
        let s = totalSeconds % 60;
        
        let timeStr = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        if (this.maxSLA) {
            timeStr += ` / ${this.maxSLA.toString().padStart(2, '0')}:00`;
        }
        this.display.innerText = timeStr;
        this.evalBreakpoints(m);
    },
    
    evalBreakpoints: function(minutes) {
        if (!this.config || !this.config.breakpoints) return;
        
        let activePoint = null;
        for (let bp of this.config.breakpoints) {
            if (minutes >= bp.minuteStart && minutes <= bp.minuteEnd) {
                activePoint = bp;
                break;
            }
        }
        
        this.widget.style.borderColor = '';
        this.widget.style.boxShadow = '';
        if(this.tooltip) this.tooltip.style.color = '';
        this.widget.classList.remove('timer-glow-yellow', 'timer-glow-orange', 'timer-glow-red', 'timer-glow-purple', 'timer-glow-blue', 'timer-glow-green', 'bg-red-900', 'border-red-500');
        if(this.tooltip) this.tooltip.classList.add('hidden');
        
        // Clear edge glows from overlay
        if (this.edgeOverlay) {
            this.edgeOverlay.className = 'fixed inset-0 pointer-events-none z-50 hidden transition-all duration-300';
        }

        if (activePoint) {
            if (activePoint.colorClass) {
                if (activePoint.colorClass.includes('edge-glow')) {
                    if (this.edgeOverlay) {
                        this.edgeOverlay.classList.remove('hidden');
                        this.edgeOverlay.classList.add(activePoint.colorClass);
                    }
                } else {
                    this.widget.classList.add(...activePoint.colorClass.split(' '));
                }
            } else if (activePoint.customBorderHex) {
                this.widget.style.borderColor = activePoint.customBorderHex;
                this.widget.style.boxShadow = `0 0 10px ${activePoint.customBorderHex}`;
            }
            
            if (activePoint.tooltip) {
                this.tooltip.innerText = activePoint.tooltip;
                this.tooltip.classList.remove('hidden');
                if (activePoint.customTextHex) {
                    this.tooltip.style.color = activePoint.customTextHex;
                }
            }
        }
    }
};
