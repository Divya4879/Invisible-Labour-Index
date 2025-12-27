# 🌍 Invisible Labor Index

**Making the $18 Trillion Invisible Economy Visible**

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://invisible-labour-index.netlify.app)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)

> **The world's first real-time tracking system for unpaid care work across 10+ major economies**

Check it out at:- [Invisible Labor Index](https://invisible-labour-index.netlify.app)

<img width="1896" height="936" alt="image" src="https://github.com/user-attachments/assets/a926ee63-2436-46b4-9739-d3231c8a908f" />

---

## 🎯 The $18 Trillion Economic Blind Spot

Every country is missing 15-40% of their economic activity from official GDP calculations. This isn't an accounting error, it's the
systematic exclusion of unpaid care work that keeps societies functioning. From childcare and eldercare to household management and
community support, this invisible labor represents the largest unrecognized economic sector in human history.

The Invisible Labor Index is the world's first real-time tracking system that aims to quantify and visualize this massive economic value
of unpaid care work performed predominantly by women. Using the latest data from World Bank APIs, OECD Time Use Databases, and
national statistical offices across 20+ major economies, it aims to reveal the true economic picture that policymakers have been missing.

The Hidden Economic Reality:
 - **$18+ trillion** in annual global economic value goes uncounted.
 - **Women perform 75%** of the world's unpaid care work.
 - **4.2 hours daily** average unpaid work by women vs 1.7 hours by men.
 - **If valued at minimum wage**, unpaid care work would represent 15-40% of national GDP.
 - **Zero recognition** in official economic indicators and policy decisions.

What We Track in Real-Time:
 - Economic value calculations using current wage data and population statistics
 - Gender gap analysis showing the disproportionate burden on women
 - Country-by-country breakdowns revealing which nations have the largest invisible economies
 - Policy impact modeling to show how investments in care infrastructure could unlock economic growth
 - Historical trends showing how this gap has evolved over time

Why This Matters Now:
Traditional economic models are fundamentally broken. They count the production of every widget and service transaction, but ignore
the care work that enables all other economic activity. When a parent stays home to care for a child, GDP goes down. When they pay
someone else to do the same work, GDP goes up. This accounting fiction has real consequences for policy, investment, and social
recognition.

The Invisible Labor Index makes the invisible visible, providing policymakers, researchers, and advocates with the data-driven
evidence needed to build more inclusive economic policies and recognize the true drivers of economic prosperity.

---

## ✨ Key Features

### 🚨 Crisis Monitor Dashboard
 - **Real-time tracking** of $18+ trillion in invisible economic activity
 - **Live data integration** from World Bank, OECD, and national surveys
 - **Economic impact visualization** showing true GDP contributions
 - **Gender gap analysis** across 10+ major economies

### 📊 Global Rankings & Trends
- **Historical trend analysis** showing policy impact over time
- **Comparative rankings** by economic value and gender equality
- **Mobile-responsive charts** built with Recharts

### 🧠 AI-Powered Policy Impact Engine
- **Policy scenario modeling** with economic impact predictions
- **AI-generated recommendations** using Gemini API integration
- **Implementation complexity analysis** with confidence intervals
- **Stakeholder impact assessment** for policy makers

### 🔍 Advanced Analytics
- **Sensitivity analysis** for policy interventions
- **Economic multiplier calculations** showing ripple effects
- **Risk assessment** with political stability factors
- **ROI projections** for care infrastructure investments

---

## 🏗️ Technical Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Data Sources  │────│   React Frontend │────│  User Interface │
│                 │    │                  │    │                 │
│ • World Bank    │    │ • TypeScript     │    │ • Interactive   │
│ • OECD          │    │ • Tailwind CSS   │    │   Dashboards    │
│ • National      │    │ • React Router   │    │ • Policy Tools  │
│   Surveys       │    │ • Recharts       │    │ • AI Insights   │
│ • Gemini AI     │    │ • React Leaflet  │    │ • Mobile Ready  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Components
- **Charts**: Recharts for data visualization
- **AI**: Google Gemini API for policy analysis
- **Data**: Real-time APIs (World Bank, OECD, ILO)
- **Deployment**: Netlify with automatic CI/CD

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/Divya4879/Invisible-Labour-Index.git
cd Invisible-Labor-Index

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Gemini API key to .env

# Start development server
npm run dev
```

---

## 📊 Data Sources & Methodology

### Primary Data Sources
- **World Bank Open Data**: GDP, population, economic indicators
- **OECD Time Use Database**: International time use surveys
- **National Statistical Offices**: Country-specific time use data
- **International Labour Organization**: Wage and employment data

### Economic Calculation Formula
```typescript
// Core economic valuation
const annualUnpaidHours = dailyHours × 365 × femalePopulation;
const economicValue = annualUnpaidHours × averageWage;
const gdpPercentage = (economicValue / nationalGDP) × 100;

// Gender gap metrics
const genderGapHours = femaleHours - maleHours;
const genderGapRatio = femaleHours / maleHours;
```

### Countries Covered (10+ Major Economies)
🇺🇸 United States • 🇨🇳 China • 🇯🇵 Japan • 🇩🇪 Germany • 🇮🇳 India • 🇬🇧 United Kingdom • 🇫🇷 France • 🇮🇹 Italy • 🇧🇷 Brazil • 🇨🇦 Canada • 🇷🇺 Russia • 🇰🇷 South Korea • 🇦🇺 Australia • 🇪🇸 Spain • 🇲🇽 Mexico • 🇮🇩 Indonesia • 🇳🇱 Netherlands • 🇸🇦 Saudi Arabia • 🇹🇷 Turkey • 🇨🇭 Switzerland

---

## 🎨 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── Navigation.tsx    # Main navigation
│   ├── PolicyHeader.tsx  # Policy tool header
│   ├── ScenarioConfig.tsx # Policy configuration
│   └── EconomicImpactDashboard.tsx
├── pages/               # Route components
│   ├── Landing.tsx      # Hero landing page
│   ├── Dashboard.tsx    # Crisis monitor
│   ├── Trends.tsx       # Global rankings
│   ├── PolicySimulator.tsx # AI policy engine
│   └── ...
├── services/            # API integrations
│   ├── dataService.ts   # Data fetching logic
│   ├── worldBankAPI.ts  # World Bank integration
│   └── geminiService.ts # AI service
├── utils/               # Utility functions
│   ├── calculations.ts  # Economic calculations
│   └── policyAnalysis.ts # Policy modeling
├── types/               # TypeScript definitions
└── data/                # Static data files
    └── timeUseData.ts   # Time use survey data
```

---

## 🔎 Project Deep Dive

### Crisis Monitor Dashboard
Based on latest data, tracking of invisible economic activity with:
- The latest economic impact calculations
- Gender gap visualizations
- Top 10 country rankings
- Historical trend analysis

### AI Policy Impact Engine
Advanced policy modeling featuring:
- **Scenario Configuration**: Customize policy parameters
- **Economic Impact Prediction**: AI-powered outcome modeling
- **Implementation Analysis**: Complexity and feasibility scoring
- **Stakeholder Assessment**: Multi-dimensional impact analysis

### Global Rankings & Trends
Comprehensive country comparisons with:
- Economic value rankings
- Gender equality metrics
- Policy effectiveness tracking

---

## 📈 Performance & Optimization

- **Code Splitting**: Lazy loading for optimal performance
- **Bundle Size**: Optimized with Vite and tree-shaking
- **Caching**: Efficient API response caching
- **Mobile First**: Responsive design for all devices
- **Accessibility**: WCAG 2.1 AA compliant

---

## 🤝 Contributing

Contributions are welcome to make invisible labor more visible worldwide!

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Areas
- 🌍 **Data Sources**: Add new countries or update existing data
- 🎨 **UI/UX**: Improve user experience and accessibility
- 🧮 **Calculations**: Enhance economic modeling algorithms
- 🌐 **Internationalization**: Add multi-language support
- 📱 **Mobile**: Optimize mobile experience
- 🔍 **Analytics**: Add new visualization features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **National Statistical Offices** for time use survey data
- **World Bank** for open economic data APIs
- **OECD** for international standards and datasets
- **International Labour Organization** for wage statistics
- **Google** for Gemini AI API access

---


<div align="center">

**"If women stopped unpaid work tomorrow, the global economy would collapse. Yet it is not counted in GDP."**

*Making the invisible visible, one country at a time.*

[![Star this repo](https://img.shields.io/github/stars/Divya4879/Invisible-Labour-Index?style=social)](https://github.com/Divya4879/Invisible-Labour-Index)

</div>
