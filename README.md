# Cardiac Alert Prioritization System

## Overview
A smart triage system designed to complement Medtronic's AccuRhythm™ AI platform for cardiac monitoring devices. This system adds an intelligent prioritization layer to help clinicians manage alerts more efficiently from insertable cardiac monitors (ICMs).

## Problem Statement
Currently, clinicians spend approximately 401 hours reviewing false alerts yearly for every 200 LINQ II™ ICM patients. Even with AccuRhythm™ AI's impressive reduction in false alerts, optimizing the clinical workflow remains crucial. This project aims to enhance alert management efficiency while maintaining the high sensitivity of the existing system.

## Solution
An AI-powered dashboard that:
- Provides intelligent alert prioritization without affecting existing sensitivity
- Maintains AccuRhythm™ AI's 99% preservation of true AF alerts and 100% preservation of true pause alerts
- Offers real-time visualization of alert patterns and distributions
- Helps optimize the 401 hours currently spent on alert review

## Features

### 1. Smart Priority Scoring
- Time-based pattern analysis
- Patient history integration
- Activity context consideration
- Real-time pattern recognition

### 2. Real-Time Visualization
- Priority Distribution Chart
- 24-Hour Alert Timeline
- Dynamic Alert List with Priority Color-Coding
- Performance Metrics Dashboard

### 3. Priority Categories
- High Priority (Red): Requires immediate attention
- Medium Priority (Orange): Standard review required
- Low Priority (Green): Routine review

## Technical Stack
- Vanilla JavaScript for core functionality
- Chart.js for data visualization
- HTML5/CSS3 for interface
- Real-time data processing capabilities

## Live Demo
Visit: https://ntg4.github.io/linq2_ml/

## Quick Start

### Installation
```bash
# Clone the repository
git clone https://github.com/ntg4/linq2_ml

# Navigate to project directory
cd cardiac-alert-dashboard

# No additional installations required
# Open index.html in your browser
```

### Files Structure
```
├── index.html      # Main HTML file
├── styles.css      # Styling
└── script.js       # Core functionality
```

## Performance Metrics
- Alert Priority Accuracy: 85%
- Processing Time: Real-time
- Maintains existing AccuRhythm™ AI sensitivity
- Zero impact on true alert detection

## Future Enhancements
1. Integration Capabilities
   - Direct CareLink™ network integration
   - Mobile app synchronization
   - Multi-device support

2. Advanced Analytics
   - Patient-specific learning
   - Predictive alert analysis
   - Trend identification

3. User Experience
   - Customizable thresholds
   - Role-based views
   - Mobile optimization

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments
- Inspired by Medtronic's LINQ II™ ICM system
- Built to complement AccuRhythm™ AI capabilities
- Focused on enhancing clinical workflow efficiency

## Contact
Naman Sehgal - namansehgal@usf.edu

Project Link: https://github.com/ntg4/linq2_ml

---

**Note**: This is a prototype system intended for demonstration purposes. Any implementation in a clinical setting would require appropriate validation and regulatory approval. All metrics are based on simulated data and would need clinical validation.