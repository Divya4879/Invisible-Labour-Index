export interface PolicyScenario {
  country: string;
  policyFocus: string;
  unpaidHours: number;
  population: number;
  gdp: number;
  countryContext: string;
}

export interface CountryData {
  name: string;
  population: number;
  gdp: number;
  unpaidHours: number;
  femaleLabor: number;
  context: 'developed' | 'emerging' | 'frontier';
  successModel: string;
  priority: string;
  politicalStability: number; // 1-10 scale
  institutionalCapacity: number; // 1-10 scale
  fiscalSpace: number; // % of GDP available for new spending
}

export interface ConfidenceInterval {
  low: number;
  mid: number;
  high: number;
  confidence: number; // 0-1 scale
}

export interface SensitivityAnalysis {
  baseCase: number;
  optimistic: number;
  pessimistic: number;
  keyAssumptions: string[];
  sensitivityFactors: {
    factor: string;
    impact: number; // -1 to 1 scale
    likelihood: number; // 0-1 scale
  }[];
}

export interface ImplementationComplexity {
  overall: number; // 1-10 scale (10 = most complex)
  political: number;
  technical: number;
  financial: number;
  social: number;
  factors: {
    category: string;
    description: string;
    complexity: number;
    mitigation: string;
  }[];
}

export interface StakeholderAnalysis {
  champions: {
    name: string;
    influence: number; // 1-10 scale
    support: number; // 1-10 scale
    role: string;
  }[];
  opponents: {
    name: string;
    influence: number;
    opposition: number; // 1-10 scale
    concerns: string[];
  }[];
  neutral: {
    name: string;
    influence: number;
    persuadability: number; // 1-10 scale
    keyInterests: string[];
  }[];
}

export interface PolicyRecommendation {
  title: string;
  priority: string;
  description: string;
  
  // Enhanced metrics with confidence intervals
  investment: ConfidenceInterval;
  roi: ConfidenceInterval;
  jobsCreated: ConfidenceInterval;
  gdpImpact: ConfidenceInterval;
  
  // Rigorous analysis
  sensitivityAnalysis: SensitivityAnalysis;
  implementationComplexity: ImplementationComplexity;
  stakeholderAnalysis: StakeholderAnalysis;
  
  // Timeline and evidence
  timeline: string;
  evidence: string[];
  politicalFeasibility: number;
  
  // Risk assessment
  risks: {
    type: string;
    probability: number; // 0-1 scale
    impact: number; // 1-10 scale
    mitigation: string;
  }[];
  
  implementation: string[];
  competitiveAdvantage: string[];
}

export interface EconomicImpact {
  hiddenValue: ConfidenceInterval;
  gdpPercentage: ConfidenceInterval;
  workforceEquivalent: ConfidenceInterval;
  productivityGain: ConfidenceInterval;
  
  // Sensitivity analysis
  sensitivity: {
    wageAssumption: SensitivityAnalysis;
    participationRate: SensitivityAnalysis;
    hoursReduction: SensitivityAnalysis;
  };
}

export interface AIInsights {
  executiveSummary: string;
  economicImpact: EconomicImpact;
  policies: PolicyRecommendation[];
  
  // Methodology and confidence
  methodology: string;
  confidence: number;
  dataSource: string[];
  
  // Analysis metadata
  analysisDate: string;
  modelVersion: string;
  reviewStatus: 'draft' | 'reviewed' | 'validated';
  
  // Error handling
  error?: string;
  errorDetails?: string;
}
