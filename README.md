# 🌍 Invisible Labor Index

Making unpaid work visible — in real economic terms

## 🎯 Purpose

Quantify and visualize the economic value of unpaid work performed by women using real global datasets, showing how much of the world's economy is invisible.

## 🚀 Features

- **Global Map**: Interactive visualization of unpaid work inequality across countries
- **Country Deep-Dive**: Detailed economic analysis with policy-grade statistics
- **Gender Gap Comparison**: Side-by-side country comparisons
- **Full Transparency**: Complete methodology and data source documentation
- **Mobile Responsive**: Works on all devices
- **No Login Required**: Public good tool for researchers, journalists, and advocates

## 🧱 Architecture

```
Public APIs → Frontend (React) → User Dashboard
```

- **Frontend**: React + TypeScript + Tailwind CSS
- **Charts**: Recharts for data visualization
- **Maps**: React Leaflet for geographic data
- **Data**: Real-time API calls to OECD, World Bank, UN, ILO
- **Deployment**: Netlify/Vercel (static hosting)

## 📊 Data Sources

- **Time Use**: OECD Time Use Database, National Time Use Surveys
- **Economic**: World Bank API (GDP, Population)
- **Wages**: International Labour Organization (ILO)
- **Geographic**: OpenStreetMap

## 🏗️ Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone repository
git clone <repository-url>
cd invisible-labor-index

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Project Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── services/      # API calls and data fetching
├── types/         # TypeScript type definitions
├── utils/         # Calculation utilities
└── data/          # Static data files
```

## 🧮 Calculations

### Economic Value Formula
```
Annual Hours = Daily unpaid hours × 365 × Female population
Economic Value = Annual hours × Average wage
GDP Percentage = (Economic value / National GDP) × 100
```

### Gender Gap Metrics
```
Gap Hours = Female hours - Male hours
Gap Ratio = Female hours / Male hours
```

## 🌐 MVP Countries

Selected for data quality and global representation:
- **India** - National Time Use Survey 2019
- **United States** - American Time Use Survey
- **United Kingdom** - ONS Time Use Survey
- **Canada** - Statistics Canada GSS
- **Australia** - ABS Time Use Survey

## 📱 Pages

1. **Home** - Hero section with global statistics
2. **Global Map** - Country comparison visualization
3. **Country Detail** - In-depth economic analysis
4. **Gender Gap Comparison** - Multi-country comparison tool
5. **Methodology** - Complete transparency documentation
6. **How to Use** - User guides for different audiences

## 🎨 Design Principles

- **Serious & Respectful**: No stereotypical colors or imagery
- **Data-First**: Statistics drive the narrative
- **Accessible**: Screen reader friendly, keyboard navigation
- **Mobile Responsive**: Works on all screen sizes
- **High Contrast**: Clear readability for all users

## 🚀 Deployment

### Netlify (Recommended)
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy automatically on push

### Manual Deployment
```bash
# Build production version
npm run build

# Deploy dist/ folder to any static hosting service
```

## 📖 Usage Examples

### For Journalists
- Global statistics for article headlines
- Country-specific data for local stories
- Economic valuations for policy context

### For Researchers
- Reproducible calculations
- Transparent methodology
- Citation-ready data sources

### For Advocates
- Policy-grade statistics
- Economic impact arguments
- International comparisons

## 🔗 API Integration

The app makes direct calls to public APIs:

```typescript
// World Bank GDP data
const gdpData = await fetch(
  'https://api.worldbank.org/v2/country/IN/indicator/NY.GDP.MKTP.CD?format=json'
);

// OECD Time Use data
const timeUseData = await fetch(
  'https://stats.oecd.org/restsdmx/sdmx.ashx/GetData/TIME_USE/...'
);
```

## 🤝 Contributing

This is a public good project. Contributions welcome:

1. **Data Sources**: Suggest additional reliable datasets
2. **Countries**: Help add countries with quality time use data
3. **Translations**: Internationalization support
4. **Accessibility**: Improve screen reader support
5. **Mobile**: Enhance mobile experience

## 📄 License

MIT License - This tool is designed to be freely used for research, journalism, and advocacy.

## 🙏 Acknowledgments

- National statistical offices for time use surveys
- World Bank for open economic data
- OECD for international standards
- ILO for wage statistics
- All researchers working to make invisible labor visible

---

**"If women stopped unpaid work tomorrow, the global economy would collapse. Yet it is not counted in GDP."**
# Invisible-Labour-Index
