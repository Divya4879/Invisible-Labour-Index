import React, { memo, useState } from 'react';
import { CheckCircle, Target, AlertTriangle, ArrowRight, Users, BarChart, TrendingDown, TrendingUp } from 'lucide-react';
import { PolicyRecommendation } from '../types/policy';

interface PolicyRecommendationsProps {
  policies: PolicyRecommendation[];
}

const ComplexityIndicator = memo(({ 
  complexity, 
  label 
}: { 
  complexity: number; 
  label: string;
}) => {
  const getColor = (score: number) => {
    if (score <= 3) return 'bg-green-500';
    if (score <= 6) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-slate-600 w-16">{label}:</span>
      <div className="flex space-x-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < complexity ? getColor(complexity) : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium">{complexity}/10</span>
    </div>
  );
});

ComplexityIndicator.displayName = 'ComplexityIndicator';

const StakeholderMap = memo(({ 
  stakeholders 
}: { 
  stakeholders: PolicyRecommendation['stakeholderAnalysis'];
}) => {
  const [activeTab, setActiveTab] = useState<'champions' | 'opponents' | 'neutral'>('champions');

  const renderStakeholder = (stakeholder: any, type: string) => (
    <div key={stakeholder.name} className="bg-white p-3 rounded-lg border border-slate-200">
      <div className="font-medium text-sm text-slate-900 mb-1">{stakeholder.name}</div>
      <div className="flex justify-between text-xs text-slate-600 mb-2">
        <span>Influence: {stakeholder.influence}/10</span>
        <span>
          {type === 'champions' && `Support: ${stakeholder.support}/10`}
          {type === 'opponents' && `Opposition: ${stakeholder.opposition}/10`}
          {type === 'neutral' && `Persuadable: ${stakeholder.persuadability}/10`}
        </span>
      </div>
      {type === 'champions' && (
        <div className="text-xs text-slate-500">{stakeholder.role}</div>
      )}
      {type === 'opponents' && (
        <div className="text-xs text-slate-500">
          Concerns: {stakeholder.concerns.slice(0, 2).join(', ')}
        </div>
      )}
      {type === 'neutral' && (
        <div className="text-xs text-slate-500">
          Interests: {stakeholder.keyInterests.slice(0, 2).join(', ')}
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <h4 className="text-sm font-semibold text-slate-800 mb-3 flex items-center">
        <Users className="h-4 w-4 mr-2" />
        Stakeholder Analysis
      </h4>
      
      <div className="flex space-x-1 mb-3">
        {(['champions', 'opponents', 'neutral'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1 text-xs rounded-md ${
              activeTab === tab 
                ? 'bg-blue-500 text-white' 
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({stakeholders[tab].length})
          </button>
        ))}
      </div>

      <div className="space-y-2 max-h-40 overflow-y-auto">
        {stakeholders[activeTab].map((stakeholder: any) => 
          renderStakeholder(stakeholder, activeTab)
        )}
      </div>
    </div>
  );
});

StakeholderMap.displayName = 'StakeholderMap';

const RiskMatrix = memo(({ 
  risks 
}: { 
  risks: PolicyRecommendation['risks'];
}) => (
  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
    <h4 className="text-sm font-semibold text-red-900 mb-3 flex items-center">
      <AlertTriangle className="h-4 w-4 mr-2" />
      Risk Assessment Matrix
    </h4>
    <div className="space-y-2">
      {risks.map((risk, idx) => {
        const riskScore = risk.probability * risk.impact;
        const riskLevel = riskScore > 7 ? 'High' : riskScore > 4 ? 'Medium' : 'Low';
        const riskColor = riskScore > 7 ? 'text-red-700' : riskScore > 4 ? 'text-yellow-700' : 'text-green-700';
        
        return (
          <div key={idx} className="bg-white p-2 rounded border">
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs font-medium text-slate-800">{risk.type}</span>
              <span className={`text-xs font-semibold ${riskColor}`}>{riskLevel}</span>
            </div>
            <div className="text-xs text-slate-600 mb-1">
              Probability: {(risk.probability * 100).toFixed(0)}% | Impact: {risk.impact}/10
            </div>
            <div className="text-xs text-slate-500">{risk.mitigation}</div>
          </div>
        );
      })}
    </div>
  </div>
));

RiskMatrix.displayName = 'RiskMatrix';

const PolicyRecommendations = memo(({ policies }: PolicyRecommendationsProps) => {
  return (
    <div className="bg-white rounded-xl shadow-xl border border-slate-200">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-5 rounded-t-xl">
        <h2 className="text-xl font-semibold flex items-center">
          <CheckCircle className="h-5 w-5 mr-2" />
          🏛️ Policy Recommendations with Rigorous Analysis
        </h2>
        <p className="text-green-100 mt-2 text-sm">Evidence-based interventions with confidence intervals and complexity assessment</p>
      </div>
      
      <div className="p-6 space-y-8">
        {policies.map((policy, index) => (
          <div key={index} className="border-l-4 border-green-500 pl-6 py-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-r-lg shadow-md">
            
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2 lg:mb-0">🚀 {policy.title}</h3>
              <div className="flex space-x-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase bg-red-600 text-white">
                  {policy.priority}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-600 text-white">
                  Feasibility: {policy.politicalFeasibility}/10
                </span>
              </div>
            </div>
            
            <p className="text-green-800 text-sm mb-6 leading-relaxed">{policy.description}</p>
            
            {/* Enhanced Metrics with Confidence Intervals */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-2 border-blue-500">
                <h4 className="font-semibold text-blue-900 mb-2 text-sm uppercase">💰 Investment</h4>
                <div className="space-y-1">
                  <div className="text-blue-900 font-semibold text-base">
                    ${(policy.investment.mid/1000000000).toFixed(1)}B
                  </div>
                  <div className="text-blue-700 text-xs">
                    Range: ${(policy.investment.low/1000000000).toFixed(1)}B - ${(policy.investment.high/1000000000).toFixed(1)}B
                  </div>
                  <div className="text-blue-600 text-xs">
                    Confidence: {(policy.investment.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-2 border-purple-500">
                <h4 className="font-semibold text-purple-900 mb-2 text-sm uppercase">👥 Jobs Created</h4>
                <div className="space-y-1">
                  <div className="text-purple-900 font-semibold text-base">
                    {policy.jobsCreated.mid.toFixed(1)}M
                  </div>
                  <div className="text-purple-700 text-xs">
                    Range: {policy.jobsCreated.low.toFixed(1)}M - {policy.jobsCreated.high.toFixed(1)}M
                  </div>
                  <div className="text-purple-600 text-xs">
                    Confidence: {(policy.jobsCreated.confidence * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-2 border-orange-500">
                <h4 className="font-semibold text-orange-900 mb-2 text-sm uppercase">📈 GDP Impact</h4>
                <div className="space-y-1">
                  <div className="text-orange-900 font-semibold text-base">
                    {policy.gdpImpact.mid.toFixed(1)}%
                  </div>
                  <div className="text-orange-700 text-xs">
                    Range: {policy.gdpImpact.low.toFixed(1)}% - {policy.gdpImpact.high.toFixed(1)}%
                  </div>
                  <div className="text-orange-600 text-xs">
                    Timeline: {policy.timeline}
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm border-l-2 border-green-500">
                <h4 className="font-semibold text-green-900 mb-2 text-sm uppercase">💵 ROI</h4>
                <div className="space-y-1">
                  <div className="text-green-900 font-semibold text-base">
                    {policy.roi.mid.toFixed(0)}%
                  </div>
                  <div className="text-green-700 text-xs">
                    Range: {policy.roi.low.toFixed(0)}% - {policy.roi.high.toFixed(0)}%
                  </div>
                  <div className="text-green-600 text-xs">
                    Evidence: {policy.evidence.length} sources
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Complexity Analysis */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase flex items-center">
                <BarChart className="h-4 w-4 mr-2" />
                Implementation Complexity Assessment
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <ComplexityIndicator complexity={policy.implementationComplexity.political} label="Political" />
                  <ComplexityIndicator complexity={policy.implementationComplexity.technical} label="Technical" />
                  <ComplexityIndicator complexity={policy.implementationComplexity.financial} label="Financial" />
                  <ComplexityIndicator complexity={policy.implementationComplexity.social} label="Social" />
                </div>
                <div className="bg-slate-50 p-3 rounded">
                  <div className="text-sm font-medium text-slate-800 mb-2">
                    Overall Complexity: {policy.implementationComplexity.overall}/10
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    {policy.implementationComplexity.factors.slice(0, 2).map((factor, idx) => (
                      <div key={idx}>
                        <strong>{factor.category}:</strong> {factor.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <StakeholderMap stakeholders={policy.stakeholderAnalysis} />
              <RiskMatrix risks={policy.risks} />
            </div>

            {/* Sensitivity Analysis */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Sensitivity Analysis
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-red-600">{policy.sensitivityAnalysis.pessimistic.toFixed(1)}</div>
                  <div className="text-xs text-slate-600">Pessimistic Case</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-slate-800">{policy.sensitivityAnalysis.baseCase.toFixed(1)}</div>
                  <div className="text-xs text-slate-600">Base Case</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-green-600">{policy.sensitivityAnalysis.optimistic.toFixed(1)}</div>
                  <div className="text-xs text-slate-600">Optimistic Case</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-slate-500">
                Key assumptions: {policy.sensitivityAnalysis.keyAssumptions.join(', ')}
              </div>
            </div>

            {/* Implementation Roadmap */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-semibold text-slate-900 mb-3 text-sm uppercase flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Implementation Roadmap
              </h4>
              <div className="space-y-2">
                {policy.implementation.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start">
                    <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold mr-3 mt-0.5 flex-shrink-0">
                      {stepIndex + 1}
                    </span>
                    <span className="text-slate-800 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

PolicyRecommendations.displayName = 'PolicyRecommendations';

export default PolicyRecommendations;
