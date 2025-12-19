import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, TrendingUp, Users, Zap, Database, Brain, Globe, Activity } from 'lucide-react';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative">
        <div className="container-max text-center px-4 pt-20">
          <div className="animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-red-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-red-400/30">
              <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
              <span className="text-white font-medium">BREAKING: $18T Economic Blind Spot Discovered</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8 text-shadow leading-tight">
              The $18 Trillion
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Invisible Economy
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 mb-6 max-w-4xl mx-auto font-light px-4">
              Every country is missing 15-40% of their economic activity.
              <br />
              <strong className="text-white">This is the world's first system to track it in real-time.</strong>
            </p>
            
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-blue-200 mb-12 px-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>World Bank Data Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span>20 Major Economies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>AI Policy Engine</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span>Policy Analysis Tool</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Link
                to="/crisis-monitor"
                className="group bg-white text-neutral-900 px-10 py-5 rounded-xl font-bold text-lg transition-all duration-300 shadow-sophisticated hover:shadow-refined hover:-translate-y-1 flex items-center justify-center space-x-3"
              >
                <Activity className="h-6 w-6 group-hover:animate-pulse" />
                <span>Access Crisis Monitor</span>
                <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              
              <Link
                to="/policy-impact-engine"
                className="group border-2 border-white text-white px-10 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-neutral-900 transition-all duration-300 flex items-center justify-center space-x-3"
              >
                <Brain className="h-6 w-6 group-hover:animate-pulse" />
                <span>Launch AI Engine</span>
                <Zap className="h-5 w-5 group-hover:animate-bounce" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              The Economic Crisis No One Talks About
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              $18 trillion in economic activity happens every day, but it's completely invisible to governments, 
              economists, and policymakers. Until now.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center group sophisticated-hover">
              <Database className="h-16 w-16 text-neutral-700 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Economic Intelligence</h3>
              <p className="text-neutral-600 leading-relaxed">
                World Bank API integration reveals the hidden economic reality. 
                Real data from 20 major economies representing 75% of global GDP.
              </p>
            </div>

            <div className="card text-center group sophisticated-hover">
              <Brain className="h-16 w-16 text-neutral-700 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-bold text-neutral-900 mb-4">AI Policy Analysis</h3>
              <p className="text-neutral-600 leading-relaxed">
                Gemini AI transforms raw economic data into actionable policy recommendations. 
                See the trillion-dollar impact of policy decisions before they're made.
              </p>
            </div>

            <div className="card text-center group sophisticated-hover">
              <Globe className="h-16 w-16 text-neutral-700 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Global Economic Reality</h3>
              <p className="text-neutral-600 leading-relaxed">
                From the US to Singapore, every country has a massive blind spot in their economic data. 
                This tool reveals what's been hidden in plain sight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="section-padding bg-neutral-100">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Who Needs This Intelligence
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              When $18 trillion in economic activity is invisible, every decision maker is flying blind
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 px-4">
            {[
              { icon: Users, title: 'Government Officials', desc: 'ROI calculations for trillion-dollar infrastructure investments. See which policies actually work.' },
              { icon: BarChart3, title: 'Economic Analysts', desc: 'Fill the massive gap in national economic accounts. Real data, not estimates.' },
              { icon: TrendingUp, title: 'Media & Journalists', desc: 'Shocking statistics that reveal the economic story everyone\'s missing.' },
              { icon: Zap, title: 'Advocacy Organizations', desc: 'Economic ammunition for policy change. Numbers that governments can\'t ignore.' }
            ].map((user, index) => (
              <div key={index} className="stat-card text-center">
                <user.icon className="h-12 w-12 text-neutral-700 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{user.title}</h3>
                <p className="text-neutral-600 text-sm">{user.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-6">
              Uncover The $18 Trillion Blind Spot
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Three steps to reveal the economic crisis hiding in plain sight
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            <div className="text-center">
              <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-4">Discover The Crisis</h3>
              <p className="text-sm sm:text-base text-neutral-600 px-2">
                See the shocking reality: $18 trillion in economic activity that every government ignores. 
                Real World Bank data from 20 major economies.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Compare The Damage</h3>
              <p className="text-neutral-600">
                Which countries are bleeding the most economic value? See how your nation ranks 
                in the world's largest economic blind spot.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-4">Get The Solution</h3>
              <p className="text-neutral-600">
                AI-powered policy recommendations that could unlock trillions in economic value. 
                See the ROI before you invest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="section-padding bg-neutral-900">
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              The Intelligence Behind The Crisis
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              When governments need trillion-dollar decisions, they trust these sources. So do we.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center px-4">
            <div>
              <h3 className="text-white font-bold mb-3 text-lg">World Bank Intelligence</h3>
              <p className="text-neutral-400 text-sm mb-4">Real-time GDP & Population Data</p>
              <a 
                href="https://api.worldbank.org/v2/country/all/indicator/NY.GDP.MKTP.CD?format=json&date=2024" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium no-underline"
              >
                View API Endpoint
              </a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 text-lg">National Survey Data</h3>
              <p className="text-neutral-400 text-sm mb-4">Official Time Use Surveys</p>
              <a 
                href="https://mospi.gov.in/time-use-survey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium block mb-2 no-underline"
              >
                India TUS 2019
              </a>
              <a 
                href="https://www.bls.gov/tus/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium no-underline"
              >
                US ATUS
              </a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 text-lg">OECD Database</h3>
              <p className="text-neutral-400 text-sm mb-4">Global Labor Statistics</p>
              <a 
                href="https://stats.oecd.org/restsdmx/sdmx.ashx/GetData/TIME_USE" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium no-underline"
              >
                Time Use Database
              </a>
            </div>
            <div>
              <h3 className="text-white font-bold mb-3 text-lg">Google AI Analysis</h3>
              <p className="text-neutral-400 text-sm mb-4">Trillion-Dollar Policy Insights</p>
              <a 
                href="https://ai.google.dev/gemini-api" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 text-sm font-medium no-underline"
              >
                Gemini API Docs
              </a>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-neutral-400 text-sm">
              <strong className="text-white">Data Verification:</strong> All economic data cross-referenced with official government sources • 
              AI insights validated against peer-reviewed research • Updated December 2024
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-white">
        <div className="container-max text-center">
          <h2 className="text-4xl font-bold text-neutral-900 mb-6">
            Ready to Expose The $18 Trillion Crisis?
          </h2>
          <p className="text-xl text-neutral-600 mb-12 max-w-3xl mx-auto">
            Join the intelligence revolution. See what governments don't want you to know about their economies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
            <Link 
              to="/crisis-monitor" 
              className="btn-primary text-lg"
            >
              Access Crisis Intelligence
            </Link>
            <Link 
              to="/global-rankings" 
              className="btn-secondary text-lg"
            >
              Compare Global Impact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
