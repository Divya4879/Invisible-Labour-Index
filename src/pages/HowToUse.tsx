import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, FileText, BookOpen, TrendingUp } from 'lucide-react';

const HowToUse: React.FC = () => {
  const userTypes = [
    {
      icon: FileText,
      title: 'Journalists',
      description: 'Writing articles about gender inequality and economic policy',
      steps: [
        'Start with Global Map to identify countries with largest gaps',
        'Use Country Deep-Dive for specific statistics and quotes',
        'Reference Methodology page for credible sourcing',
        'Compare multiple countries for international perspective'
      ]
    },
    {
      icon: BookOpen,
      title: 'Students & Educators',
      description: 'Research projects and classroom discussions',
      steps: [
        'Begin with Home page to understand the concept',
        'Explore Gender Gap Comparison for analysis',
        'Use data for essays on economic inequality',
        'Cite methodology for academic credibility'
      ]
    },
    {
      icon: Users,
      title: 'NGOs & Advocacy Groups',
      description: 'Policy proposals and campaign materials',
      steps: [
        'Identify target countries using Global Map',
        'Extract key statistics from Country pages',
        'Use economic valuations for policy arguments',
        'Reference transparent methodology for credibility'
      ]
    },
    {
      icon: TrendingUp,
      title: 'Policy Researchers',
      description: 'Economic analysis and policy recommendations',
      steps: [
        'Review Methodology for data quality assessment',
        'Compare countries with similar economic profiles',
        'Analyze GDP percentage impacts',
        'Use calculations for economic modeling'
      ]
    }
  ];

  const useCases = [
    {
      title: 'Article: "The $10 Trillion Economy We Don\'t Count"',
      description: 'Journalist uses global statistics and country comparisons to highlight the scale of unpaid work worldwide.',
      tools: ['Global Map', 'Country Deep-Dive', 'Methodology']
    },
    {
      title: 'Research Paper: "Gender Economics in South Asia"',
      description: 'Student compares India with other countries to analyze regional patterns in unpaid work.',
      tools: ['Gender Gap Comparison', 'Country Detail', 'Methodology']
    },
    {
      title: 'Policy Brief: "Investing in Care Infrastructure"',
      description: 'NGO uses economic valuations to argue for government investment in childcare and eldercare.',
      tools: ['Country Deep-Dive', 'Economic Calculations', 'Methodology']
    },
    {
      title: 'Classroom Discussion: "What is Economic Value?"',
      description: 'Educator uses the tool to teach students about GDP limitations and invisible labor.',
      tools: ['Home Page', 'How This Tool Works', 'All Visualizations']
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            How to Use This Tool
          </h1>
          <p className="text-lg text-neutral-600">
            A guide for researchers, journalists, students, and advocates to effectively use the Invisible Labor Index.
          </p>
        </div>

        {/* Simple Flow */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Quick Start Guide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">1</span>
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Start Here</h3>
              <p className="text-sm text-neutral-600">Understand the concept on the Home page</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">2</span>
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Explore</h3>
              <p className="text-sm text-neutral-600">Browse countries on the Global Map</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">3</span>
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Analyze</h3>
              <p className="text-sm text-neutral-600">Deep-dive into specific countries</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">4</span>
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Compare</h3>
              <p className="text-sm text-neutral-600">Use Gender Gap Comparison tool</p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-primary-600 font-bold">5</span>
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Cite</h3>
              <p className="text-sm text-neutral-600">Reference methodology for credibility</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/" className="btn-primary">
              Start Exploring
            </Link>
          </div>
        </div>

        {/* User Type Guides */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Guides by User Type
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTypes.map((userType, index) => (
              <div key={index} className="card">
                <div className="flex items-center space-x-3 mb-4">
                  <userType.icon className="h-8 w-8 text-primary-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {userType.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {userType.description}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {userType.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-start space-x-2">
                      <span className="text-primary-600 font-medium text-sm mt-0.5">
                        {stepIndex + 1}.
                      </span>
                      <span className="text-neutral-700 text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Example Use Cases */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Example Use Cases
          </h2>
          
          <div className="space-y-6">
            {useCases.map((useCase, index) => (
              <div key={index} className="card">
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {useCase.title}
                </h3>
                <p className="text-neutral-700 mb-4">
                  {useCase.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-neutral-600">Tools used:</span>
                  {useCase.tools.map((tool, toolIndex) => (
                    <span
                      key={toolIndex}
                      className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-sm"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Practices */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
            Best Practices
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">For Accuracy</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>• Always reference the data year when citing statistics</li>
                <li>• Include limitations when making policy arguments</li>
                <li>• Cross-reference with original data sources when possible</li>
                <li>• Acknowledge cultural context in international comparisons</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-neutral-900 mb-3">For Impact</h3>
              <ul className="space-y-2 text-neutral-700">
                <li>• Use economic valuations to make abstract concepts concrete</li>
                <li>• Compare with familiar economic indicators (GDP, industries)</li>
                <li>• Focus on gender gap ratios for inequality arguments</li>
                <li>• Combine statistics with human stories for engagement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact & Feedback */}
        <div className="card">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-4">
            Questions or Feedback?
          </h2>
          <p className="text-neutral-700 mb-4">
            This tool is designed to be a public good. If you have suggestions for improvement, 
            additional data sources, or questions about methodology, we'd love to hear from you.
          </p>
          <div className="flex space-x-4">
            <Link to="/methodology" className="btn-secondary">
              View Methodology
            </Link>
            <a 
              href="mailto:feedback@invisible-labor-index.org" 
              className="btn-primary"
            >
              Send Feedback
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
