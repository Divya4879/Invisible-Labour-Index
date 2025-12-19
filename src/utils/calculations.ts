import { CountryData, CountryEconomicData, GlobalStats } from '../types';

export const calculateCountryEconomics = (country: CountryData): CountryEconomicData => {
  // Annual unpaid hours = daily hours × 365 × female population
  const annualUnpaidHours = country.femaleUnpaidHours * 365 * country.femalePopulation;
  
  // Economic value = annual hours × average wage
  const economicValue = annualUnpaidHours * country.averageWage;
  
  // GDP percentage = (economic value / GDP) × 100
  const gdpPercentage = (economicValue / country.gdp) * 100;
  
  // Gender gap calculations
  const genderGapHours = country.femaleUnpaidHours - country.maleUnpaidHours;
  const genderGapRatio = country.femaleUnpaidHours / country.maleUnpaidHours;

  return {
    country,
    annualUnpaidHours,
    economicValue,
    gdpPercentage,
    genderGapHours,
    genderGapRatio
  };
};

export const calculateGlobalStats = (countries: CountryData[]): GlobalStats => {
  const totalCountries = countries.length;
  
  const averageFemaleHours = countries.reduce((sum, c) => sum + c.femaleUnpaidHours, 0) / totalCountries;
  const averageMaleHours = countries.reduce((sum, c) => sum + c.maleUnpaidHours, 0) / totalCountries;
  
  const economicData = countries.map(calculateCountryEconomics);
  const totalEconomicValue = economicData.reduce((sum, c) => sum + c.economicValue, 0);
  const averageGdpPercentage = economicData.reduce((sum, c) => sum + c.gdpPercentage, 0) / totalCountries;

  return {
    totalCountries,
    averageFemaleHours,
    averageMaleHours,
    totalEconomicValue,
    averageGdpPercentage
  };
};

export const formatCurrency = (value: number): string => {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(1)}T`;
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(1)}M`;
  }
  return `$${value.toLocaleString()}`;
};

export const formatHours = (hours: number): string => {
  return `${hours.toFixed(1)} hrs/day`;
};

export const formatPercentage = (percentage: number): string => {
  return `${percentage.toFixed(1)}%`;
};
