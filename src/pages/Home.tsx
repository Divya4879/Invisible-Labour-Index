import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, DollarSign, Users, TrendingUp, BarChart3, Globe } from 'lucide-react';
import { fetchCountryData } from '../services/dataService';
import { calculateGlobalStats } from '../utils/calculations';
import { formatCurrency, formatHours } from '../utils/calculations';
import { CountryData, GlobalStats } from '../types';
import ScenarioCalculator from '../components/ScenarioCalculator';

const Home: React.FC = () => {
  const [globalStats, setGlobalStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const countries = await fetchCountryData();
        const stats = calculateGlobalStats(countries);
        setGlobalStats(stats);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-32 w-32 border-4 border-neutral-200 border-t-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 container-max text-center px-4 pt-20">
          <div className="animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/20">
              <BarChart3 className="h-5 w-5 text-white" />
              <span className="text-white font-medium">Making the invisible economy visible</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 text-shadow leading-tight">
              If women stopped unpaid work tomorrow,{' '}
              <span className="text-neutral-300">
                the global economy would collapse.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/80 mb-12 max-w-4xl mx-auto font-light leading-relaxed">
              Yet it is not counted in GDP. Quantifying the economic value of unpaid work using real global datasets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/map"
                className="group bg-white text-neutral-900 px-10 py-5 rounded-lg font-bold text-lg transition-all duration-300 shadow-sophisticated hover:shadow-refined hover:-translate-y-1 flex items-center space-x-3"
              >
                <span>Explore the Data</span>
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <Link
                to="/methodology"
                className="btn-ghost text-lg"
              >
                View Methodology
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Global Stats */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              The Hidden Economy
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Real-time data from {globalStats?.totalCountries || 15} countries showing the massive scale of unpaid work
            </p>
          </div>
          
          {globalStats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
              <div className="stat-card text-center group">
                <Clock className="h-16 w-16 text-neutral-700 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <div className="metric-highlight mb-3">
                  {formatHours(globalStats.averageFemaleHours)}
                </div>
                <div className="text-neutral-600 font-medium">Average unpaid work by women daily</div>
                <div className="mt-4 h-1 bg-neutral-900 rounded-full"></div>
              </div>

              <div className="stat-card text-center group">
                <Users className="h-16 w-16 text-neutral-700 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <div className="metric-highlight mb-3">
                  {(globalStats.averageFemaleHours / globalStats.averageMaleHours).toFixed(1)}×
                </div>
                <div className="text-neutral-600 font-medium">More unpaid work than men</div>
                <div className="mt-4 h-1 bg-neutral-700 rounded-full"></div>
              </div>

              <div className="stat-card text-center group">
                <DollarSign className="h-16 w-16 text-neutral-700 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <div className="metric-highlight mb-3">
                  {formatCurrency(globalStats.totalEconomicValue)}
                </div>
                <div className="text-neutral-600 font-medium">Combined economic value</div>
                <div className="mt-4 h-1 bg-neutral-600 rounded-full"></div>
              </div>

              <div className="stat-card text-center group">
                <TrendingUp className="h-16 w-16 text-neutral-700 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
                <div className="metric-highlight mb-3">
                  {globalStats.averageGdpPercentage.toFixed(1)}%
                </div>
                <div className="text-neutral-600 font-medium">Average of national GDP</div>
                <div className="mt-4 h-1 bg-neutral-500 rounded-full"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Calculator */}
      <section className="section-padding bg-neutral-100">
        <div className="container-max">
          <ScenarioCalculator />
        </div>
      </section>

      {/* How This Tool Works */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
              How This Tool Works
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Transforming invisible labor into measurable economic impact through real-time data integration
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: 'Time Use Data', desc: 'Official surveys from 15 countries measuring daily unpaid work hours' },
              { icon: Users, title: 'Real-Time Population', desc: 'Live World Bank API data for accurate population statistics' },
              { icon: DollarSign, title: 'Dynamic Wage Calculation', desc: 'GDP-based wage proxies calculated from real economic data' },
              { icon: TrendingUp, title: 'Live GDP Integration', desc: 'Current GDP data to show unpaid work as percentage of national economy' }
            ].map((step, index) => (
              <div key={index} className="card text-center group sophisticated-hover">
                <div className="bg-neutral-100 rounded-xl w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:bg-neutral-200 transition-colors duration-300">
                  <step.icon className="h-10 w-10 text-neutral-700" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-4">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/methodology" className="btn-secondary">
              View Full Methodology
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neutral-900">
        <div className="container-max text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 text-shadow">
              Ready to Explore the Data?
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 mb-12 leading-relaxed">
              Discover how unpaid work shapes economies around the world with real-time data from 15 countries
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/map" 
                className="group bg-white text-neutral-900 px-10 py-5 rounded-lg font-bold text-lg transition-all duration-300 shadow-sophisticated hover:shadow-refined hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <Globe className="h-6 w-6" />
                <span>View Global Map</span>
              </Link>
              <Link 
                to="/comparison" 
                className="group border-2 border-white text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-white hover:text-neutral-900 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <BarChart3 className="h-6 w-6" />
                <span>Compare Countries</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
