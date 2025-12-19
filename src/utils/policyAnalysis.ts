import { 
  PolicyScenario, 
  CountryData, 
  ConfidenceInterval, 
  SensitivityAnalysis, 
  ImplementationComplexity,
  StakeholderAnalysis,
  PolicyRecommendation,
  EconomicImpact 
} from '../types/policy';

// Calculate confidence intervals based on data quality and assumptions
export const calculateConfidenceInterval = (
  baseValue: number, 
  uncertainty: number, 
  dataQuality: number = 0.8
): ConfidenceInterval => {
  const adjustedUncertainty = uncertainty * (1 - dataQuality);
  return {
    low: baseValue * (1 - adjustedUncertainty),
    mid: baseValue,
    high: baseValue * (1 + adjustedUncertainty),
    confidence: dataQuality
  };
};

// Rigorous sensitivity analysis
export const performSensitivityAnalysis = (
  baseValue: number,
  keyFactors: { name: string; variance: number; correlation: number }[]
): SensitivityAnalysis => {
  // Monte Carlo-style sensitivity calculation
  const optimisticMultiplier = keyFactors.reduce((acc, factor) => 
    acc * (1 + factor.variance * factor.correlation), 1);
  const pessimisticMultiplier = keyFactors.reduce((acc, factor) => 
    acc * (1 - factor.variance * Math.abs(factor.correlation)), 1);

  return {
    baseCase: baseValue,
    optimistic: baseValue * optimisticMultiplier,
    pessimistic: baseValue * pessimisticMultiplier,
    keyAssumptions: keyFactors.map(f => f.name),
    sensitivityFactors: keyFactors.map(factor => ({
      factor: factor.name,
      impact: factor.correlation,
      likelihood: 1 - Math.abs(factor.variance)
    }))
  };
};

// Implementation complexity scoring based on real factors
export const calculateImplementationComplexity = (
  country: CountryData,
  policyType: string,
  economicScale: number
): ImplementationComplexity => {
  
  // Political complexity factors
  const politicalComplexity = Math.min(10, Math.max(1, 
    10 - country.politicalStability + 
    (country.context === 'frontier' ? 3 : country.context === 'emerging' ? 1 : 0)
  ));

  // Technical complexity based on policy type
  const technicalComplexityMap: Record<string, number> = {
    'childcare': 4,
    'eldercare': 6,
    'comprehensive': 9,
    'healthcare': 7,
    'education': 5,
    'mental': 6,
    'financial': 3,
    'cooking': 2,
    'cleaning': 2
  };
  const technicalComplexity = technicalComplexityMap[policyType] || 5;

  // Financial complexity based on scale and fiscal space
  const gdpPercentage = economicScale / (country.gdp * 1000000000) * 100;
  const financialComplexity = Math.min(10, Math.max(1,
    (gdpPercentage / country.fiscalSpace) * 5
  ));

  // Social complexity based on cultural factors
  const socialComplexity = Math.min(10, Math.max(1,
    (100 - country.femaleLabor) / 10 + 
    (country.context === 'frontier' ? 2 : 0)
  ));

  const overall = Math.round((politicalComplexity + technicalComplexity + financialComplexity + socialComplexity) / 4);

  return {
    overall,
    political: politicalComplexity,
    technical: technicalComplexity,
    financial: financialComplexity,
    social: socialComplexity,
    factors: [
      {
        category: 'Political',
        description: `Political stability: ${country.politicalStability}/10, institutional capacity affects implementation`,
        complexity: politicalComplexity,
        mitigation: 'Build cross-party consensus, leverage existing successful programs'
      },
      {
        category: 'Technical',
        description: `${policyType} infrastructure requires specialized systems and workforce`,
        complexity: technicalComplexity,
        mitigation: 'Partner with international experts, phased technology deployment'
      },
      {
        category: 'Financial',
        description: `Investment represents ${gdpPercentage.toFixed(1)}% of GDP vs ${country.fiscalSpace}% fiscal space`,
        complexity: financialComplexity,
        mitigation: 'Multi-year funding, international development finance, private partnerships'
      },
      {
        category: 'Social',
        description: `Cultural adaptation needed for ${100 - country.femaleLabor}% traditional households`,
        complexity: socialComplexity,
        mitigation: 'Community engagement, gradual rollout, cultural sensitivity training'
      }
    ]
  };
};

// Stakeholder analysis with political mapping
export const analyzeStakeholders = (
  country: CountryData,
  policyType: string
): StakeholderAnalysis => {
  
  const getMinistryInfluence = (country: CountryData) => 
    country.context === 'developed' ? 8 : country.context === 'emerging' ? 6 : 4;

  return {
    champions: [
      {
        name: `${country.name} Ministry of Women & Social Development`,
        influence: getMinistryInfluence(country),
        support: 9,
        role: 'Primary policy owner and implementation lead'
      },
      {
        name: `${country.name} Economic Planning Commission`,
        influence: getMinistryInfluence(country) + 1,
        support: 7,
        role: 'Budget allocation and economic impact validation'
      },
      {
        name: 'International Development Partners (World Bank, UN Women)',
        influence: country.context === 'frontier' ? 8 : 5,
        support: 9,
        role: 'Technical assistance and co-financing'
      },
      {
        name: 'Women\'s Rights Organizations',
        influence: country.femaleLabor > 50 ? 6 : 4,
        support: 10,
        role: 'Advocacy and grassroots mobilization'
      }
    ],
    opponents: [
      {
        name: 'Fiscal Conservative Coalition',
        influence: country.context === 'developed' ? 7 : 4,
        opposition: 6,
        concerns: ['Budget deficit concerns', 'Government overreach', 'Private sector displacement']
      },
      {
        name: 'Traditional Family Advocacy Groups',
        influence: (100 - country.femaleLabor) / 10,
        opposition: 8,
        concerns: ['Cultural values', 'Family structure changes', 'Government interference']
      },
      {
        name: 'Existing Service Providers',
        influence: 5,
        opposition: 7,
        concerns: ['Market disruption', 'Competition from subsidized services', 'Regulatory burden']
      }
    ],
    neutral: [
      {
        name: `${country.name} Business Federation`,
        influence: 8,
        persuadability: 7,
        keyInterests: ['Workforce productivity', 'Tax implications', 'Regulatory clarity']
      },
      {
        name: `${country.name} Labor Unions`,
        influence: country.context === 'developed' ? 6 : 3,
        persuadability: 8,
        keyInterests: ['Job creation', 'Worker rights', 'Wage impacts']
      },
      {
        name: 'Regional Governments',
        influence: 6,
        persuadability: 6,
        keyInterests: ['Implementation burden', 'Local economic impact', 'Political credit']
      }
    ]
  };
};

// Enhanced economic impact calculation with confidence intervals
export const calculateEconomicImpact = (
  scenario: PolicyScenario,
  country: CountryData
): EconomicImpact => {
  
  const femalePopulation = scenario.population * 0.49;
  const hourlyWage = country.context === 'developed' ? 25 : country.context === 'emerging' ? 18 : 12;
  const baseEconomicValue = femalePopulation * 1000000 * scenario.unpaidHours * 365 * hourlyWage;
  
  // Data quality assessment
  const dataQuality = country.context === 'developed' ? 0.85 : country.context === 'emerging' ? 0.75 : 0.65;
  
  // Sensitivity factors
  const wageFactors = [
    { name: 'Regional wage variation', variance: 0.3, correlation: 0.8 },
    { name: 'Skill premium adjustments', variance: 0.2, correlation: 0.6 },
    { name: 'Productivity differentials', variance: 0.25, correlation: 0.7 }
  ];

  const participationFactors = [
    { name: 'Cultural acceptance rates', variance: 0.4, correlation: 0.6 },
    { name: 'Service accessibility', variance: 0.3, correlation: 0.8 },
    { name: 'Economic incentives', variance: 0.2, correlation: 0.9 }
  ];

  const hoursFactors = [
    { name: 'Service substitution rates', variance: 0.5, correlation: 0.7 },
    { name: 'Quality preferences', variance: 0.3, correlation: -0.4 },
    { name: 'Behavioral adaptation', variance: 0.4, correlation: 0.5 }
  ];

  return {
    hiddenValue: calculateConfidenceInterval(baseEconomicValue, 0.3, dataQuality),
    gdpPercentage: calculateConfidenceInterval(
      (baseEconomicValue / (scenario.gdp * 1000000000)) * 100, 
      0.25, 
      dataQuality
    ),
    workforceEquivalent: calculateConfidenceInterval(
      (scenario.unpaidHours * femalePopulation * 365) / (8 * 250) / 1000000,
      0.2,
      dataQuality
    ),
    productivityGain: calculateConfidenceInterval(
      ((baseEconomicValue / (scenario.gdp * 1000000000)) * 100) * 0.43,
      0.4,
      dataQuality * 0.8 // Lower confidence for productivity estimates
    ),
    sensitivity: {
      wageAssumption: performSensitivityAnalysis(hourlyWage, wageFactors),
      participationRate: performSensitivityAnalysis(country.femaleLabor, participationFactors),
      hoursReduction: performSensitivityAnalysis(scenario.unpaidHours, hoursFactors)
    }
  };
};
