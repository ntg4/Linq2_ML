// Mock data generator for cardiac alerts
class AlertGenerator {
    constructor() {
        this.timePatterns = {
            morning: { start: 6, end: 12, falsePositiveRate: 0.3 },
            afternoon: { start: 12, end: 18, falsePositiveRate: 0.4 },
            evening: { start: 18, end: 22, falsePositiveRate: 0.5 },
            night: { start: 22, end: 6, falsePositiveRate: 0.6 }
        };
    }

    // Generate mock patient data
    generatePatientData() {
        return {
            id: Math.floor(Math.random() * 1000),
            age: Math.floor(Math.random() * (85 - 40) + 40),
            historicalFalsePositiveRate: Math.random() * 0.5,
            activityLevel: ['low', 'moderate', 'high'][Math.floor(Math.random() * 3)]
        };
    }

    // Calculate priority score based on various factors
    calculatePriorityScore(alert) {
        const timeScore = this.getTimeBasedScore(alert.timestamp);
        const patternScore = this.getPatternBasedScore(alert);
        const historyScore = this.getHistoricalScore(alert.patient);
        
        const totalScore = (timeScore + patternScore + historyScore) / 3;
        return totalScore;
    }

    getTimeBasedScore(timestamp) {
        const hour = new Date(timestamp).getHours();
        const timeOfDay = this.getCurrentTimePattern(hour);
        return 1 - timeOfDay.falsePositiveRate;
    }

    getPatternBasedScore(alert) {
        // Simplified pattern recognition
        return Math.random() * 0.5 + 0.5; // Mock score between 0.5 and 1
    }

    getHistoricalScore(patient) {
        return 1 - patient.historicalFalsePositiveRate;
    }

    getCurrentTimePattern(hour) {
        for (const [_, pattern] of Object.entries(this.timePatterns)) {
            if (hour >= pattern.start && hour < pattern.end) {
                return pattern;
            }
        }
        return this.timePatterns.night;
    }

    // Generate a mock alert with priority calculation
    generateAlert() {
        const patient = this.generatePatientData();
        const alert = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date(),
            patient: patient,
            type: ['AF', 'Pause', 'PVC'][Math.floor(Math.random() * 3)],
            reading: Math.random() * 100
        };

        const priorityScore = this.calculatePriorityScore(alert);
        alert.priority = priorityScore > 0.8 ? 'high' :
                        priorityScore > 0.5 ? 'medium' : 'low';
        return alert;
    }
}

// Initialize the dashboard
const alertSystem = new AlertGenerator();
const alerts = Array.from({length: 10}, () => alertSystem.generateAlert());

// Update dashboard stats
function updateStats() {
    document.getElementById('totalAlerts').textContent = alerts.length;
    const distribution = {
        high: alerts.filter(a => a.priority === 'high').length,
        medium: alerts.filter(a => a.priority === 'medium').length,
        low: alerts.filter(a => a.priority === 'low').length
    };
    document.getElementById('priorityDist').textContent = 
        `High: ${distribution.high} | Medium: ${distribution.medium} | Low: ${distribution.low}`;
    
    const falsePositives = alerts.filter(a => a.priority === 'low').length / alerts.length * 100;
    document.getElementById('falsePositiveRate').textContent = `${falsePositives.toFixed(1)}%`;
}

// Render priority distribution chart
function renderPriorityChart() {
    const ctx = document.getElementById('priorityChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['High Priority', 'Medium Priority', 'Low Priority'],
            datasets: [{
                data: [
                    alerts.filter(a => a.priority === 'high').length,
                    alerts.filter(a => a.priority === 'medium').length,
                    alerts.filter(a => a.priority === 'low').length
                ],
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                title: {
                    display: true,
                    text: 'Alert Priority Distribution'
                }
            }
        }
    });
}

// Render timeline chart
function renderTimelineChart() {
    const ctx = document.getElementById('timelineChart').getContext('2d');
    const hourlyData = Array(24).fill(0);
    alerts.forEach(alert => {
        const hour = new Date(alert.timestamp).getHours();
        hourlyData[hour]++;
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: 24}, (_, i) => `${i}:00`),
            datasets: [{
                label: 'Alerts per Hour',
                data: hourlyData,
                borderColor: '#3b82f6',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: '24-Hour Alert Distribution'
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Render alert list
function renderAlerts() {
    const alertList = document.getElementById('alertList');
    alertList.innerHTML = '';
    
    alerts.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
    }).forEach(alert => {
        const alertElement = document.createElement('div');
        alertElement.className = `alert-item ${alert.priority}-priority`;
        alertElement.innerHTML = `
            <div>
                <strong>Patient ID:</strong> ${alert.patient.id} |
                <strong>Type:</strong> ${alert.type} |
                <strong>Priority:</strong> ${alert.priority.toUpperCase()}
            </div>
            <div>
                ${new Date(alert.timestamp).toLocaleTimeString()}
            </div>
        `;
        alertList.appendChild(alertElement);
    });
}

// Initialize dashboard
updateStats();
renderPriorityChart();
renderTimelineChart();
renderAlerts();

// Simulate real-time updates
setInterval(() => {
    alerts.push(alertSystem.generateAlert());
    if (alerts.length > 20) alerts.shift();
    updateStats();
    renderAlerts();
}, 5000);