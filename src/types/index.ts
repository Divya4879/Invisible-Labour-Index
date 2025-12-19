export interface CountryData {
  code: string;
  name: string;
  femaleUnpaidHours: number;
  maleUnpaidHours: number;
  population: number;
  femalePopulation: number;
  gdp: number;
  averageWage: number;
  year: number;
}

export interface GlobalStats {
  totalCountries: number;
  averageFemaleHours: number;
  averageMaleHours: number;
  totalEconomicValue: number;
  averageGdpPercentage: number;
}

export interface CountryEconomicData {
  country: CountryData;
  annualUnpaidHours: number;
  economicValue: number;
  gdpPercentage: number;
  genderGapHours: number;
  genderGapRatio: number;
}
