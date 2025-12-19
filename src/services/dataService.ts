import { CountryData } from '../types';
import { fetchWorldBankData, calculateWageProxy } from './worldBankAPI';
import { getTimeUseData, TIME_USE_DATABASE } from '../data/timeUseData';

export const fetchCountryData = async (): Promise<CountryData[]> => {
  const countries: CountryData[] = [];
  
  for (const timeUseEntry of TIME_USE_DATABASE) {
    try {
      // Fetch real-time World Bank data
      const worldBankData = await fetchWorldBankData(timeUseEntry.countryCode);
      
      if (worldBankData) {
        const femalePopulation = (worldBankData.population * worldBankData.femalePopulationPercent) / 100;
        const averageWage = calculateWageProxy(worldBankData.gdp, worldBankData.population);
        
        countries.push({
          code: timeUseEntry.countryCode,
          name: timeUseEntry.countryName,
          femaleUnpaidHours: timeUseEntry.femaleUnpaidHours,
          maleUnpaidHours: timeUseEntry.maleUnpaidHours,
          population: worldBankData.population,
          femalePopulation: femalePopulation,
          gdp: worldBankData.gdp,
          averageWage: averageWage,
          year: timeUseEntry.surveyYear
        });
      }
    } catch (error) {
      console.error(`Failed to fetch data for ${timeUseEntry.countryCode}:`, error);
    }
  }
  
  return countries;
};

export const fetchSingleCountryData = async (countryCode: string): Promise<CountryData | null> => {
  const timeUseData = getTimeUseData(countryCode);
  if (!timeUseData) return null;
  
  try {
    const worldBankData = await fetchWorldBankData(countryCode);
    if (!worldBankData) return null;
    
    const femalePopulation = (worldBankData.population * worldBankData.femalePopulationPercent) / 100;
    const averageWage = calculateWageProxy(worldBankData.gdp, worldBankData.population);
    
    return {
      code: timeUseData.countryCode,
      name: timeUseData.countryName,
      femaleUnpaidHours: timeUseData.femaleUnpaidHours,
      maleUnpaidHours: timeUseData.maleUnpaidHours,
      population: worldBankData.population,
      femalePopulation: femalePopulation,
      gdp: worldBankData.gdp,
      averageWage: averageWage,
      year: timeUseData.surveyYear
    };
  } catch (error) {
    console.error(`Failed to fetch data for ${countryCode}:`, error);
    return null;
  }
};
