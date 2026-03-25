import React, { useState, useEffect } from 'react';
import { Search, FileSearch, CheckCircle2 } from 'lucide-react';

export default function AnalysisLoading({ fileName }) {
  const [step, setStep] = useState(0);

  const steps = [
    { text: 'Parsing PDF structure...', icon: Search },
    { text: 'Extracting key experience and skills...', icon: FileSearch },
    { text: 'Calculating ATS score...', icon: CheckCircle2 }
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 800);
    const timer2 = setTimeout(() => setStep(2), 1600);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="glass-panel fade-in" style={{ width: '100%', maxWidth: '600px', padding: '3rem', margin: '0 auto', textAlign: 'center' }}>
      <div style={{ position: 'relative', width: '80px', height: '80px', margin: '0 auto 2rem' }}>
        <div className="animate-spin" style={{ 
          position: 'absolute', inset: 0,
          border: '4px solid rgba(59, 130, 246, 0.2)',
          borderTopColor: 'var(--accent-primary)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--accent-primary)'
        }}>
          <FileSearch size={32} className="animate-pulse" />
        </div>
      </div>
      
      <h2 style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>Analyzing Resume...</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', wordBreak: 'break-all' }}>
        File: {fileName}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', maxWidth: '300px', margin: '0 auto' }}>
        {steps.map((s, idx) => {
          const Icon = s.icon;
          const isActive = step === idx;
          const isDone = step > idx;
          
          return (
            <div key={idx} style={{ 
              display: 'flex', alignItems: 'center', gap: '0.75rem',
              opacity: isDone || isActive ? 1 : 0.4,
              transition: 'all 0.3s',
              color: isDone ? 'var(--success)' : isActive ? 'var(--accent-primary)' : 'var(--text-secondary)'
            }}>
              <Icon size={20} className={isActive ? 'animate-pulse' : ''} />
              <span style={{ color: isActive ? 'var(--text-primary)' : '' }}>{s.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
