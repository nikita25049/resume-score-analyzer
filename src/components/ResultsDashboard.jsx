import React from 'react';
import { Target, Lightbulb, TrendingUp, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';

export default function ResultsDashboard({ results, fileName, onReset }) {
  if (!results) return null;

  const { score, keywords, suggestions } = results;

  // Determine score color
  let scoreColor = 'var(--success)';
  if (score < 60) scoreColor = 'var(--danger)';
  else if (score < 80) scoreColor = 'var(--warning)';

  return (
    <div className="fade-in" style={{ width: '100%', maxWidth: '800px', gap: '2rem', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Banner / Score Card */}
      <div className="glass-panel" style={{ display: 'flex', padding: '3rem', flexWrap: 'wrap', gap: '3rem', alignItems: 'center', justifyContent: 'center' }}>
        
        {/* Circular Progress Indicator */}
        <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="75" cy="75" r="65" stroke="var(--border-color)" strokeWidth="12" fill="none" />
            <circle 
              cx="75" cy="75" r="65" 
              stroke={scoreColor} 
              strokeWidth="12" fill="none" 
              strokeDasharray="408" 
              strokeDashoffset={408 - (408 * score) / 100} 
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1.5s ease-out' }} 
            />
          </svg>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--text-primary)', lineHeight: 1 }}>{score}</span>
            <span style={{ fontSize: '1rem', color: 'var(--text-secondary)', display: 'block' }}>/ 100</span>
          </div>
        </div>

        {/* Score Context */}
        <div style={{ flex: '1 1 300px', textAlign: 'left' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>Resume Score</h2>
          <p style={{ color: 'var(--accent-primary)', fontSize: '0.95rem', marginBottom: '1rem', fontWeight: 500 }}>
            File: {fileName}
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            {score >= 80 ? 'Excellent! Your resume is highly competitive.' : score >= 60 ? 'Good, but there is room for targeted improvements.' : 'Needs work. Follow the suggestions below.'}
          </p>
          <button 
            onClick={onReset}
            style={{ 
              padding: '0.5rem 1rem', 
              background: 'transparent', 
              border: '1px solid var(--border-color)', 
              color: 'var(--text-primary)', 
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Analyse Another Resume
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* Keywords */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-primary)' }}>
            <Target size={24} />
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Extracted Keywords</h3>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {keywords.map((kw, i) => (
              <span key={i} style={{ 
                background: 'rgba(59, 130, 246, 0.1)', 
                color: 'var(--accent-primary)', 
                padding: '0.5rem 1rem', 
                borderRadius: '999px',
                fontSize: '0.9rem',
                border: '1px solid rgba(59, 130, 246, 0.2)'
              }}>
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--warning)' }}>
            <Lightbulb size={24} />
            <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Improvement Suggestions</h3>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {suggestions.map((sug, i) => (
              <li key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ 
                  background: 'rgba(245, 158, 11, 0.1)', 
                  color: 'var(--warning)', 
                  padding: '6px', 
                  borderRadius: '50%',
                  marginTop: '2px' 
                }}>
                  <TrendingUp size={16} />
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{sug}</p>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
