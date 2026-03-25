import { useState, useCallback } from 'react'
import './index.css'
import { FileText, Sparkles } from 'lucide-react'
import UploadSection from './components/UploadSection'
import AnalysisLoading from './components/AnalysisLoading'
import ResultsDashboard from './components/ResultsDashboard'
import { analyzeResumeMock } from './utils/mockAnalyzer'

function App() {
  const [appState, setAppState] = useState('upload') // 'upload', 'analyzing', 'results'
  const [results, setResults] = useState(null)
  const [fileName, setFileName] = useState('')

  const handleFileSelect = useCallback(async (file) => {
    // 1. Switch to analyzing UI
    setFileName(file.name)
    setAppState('analyzing');

    // 2. Mock API call
    try {
      const data = await analyzeResumeMock(file);
      setResults(data);
      setAppState('results');
    } catch (e) {
      console.error(e);
      // fallback in extremely rare edge cases
      setAppState('upload');
    }
  }, []);

  const handleReset = useCallback(() => {
    setAppState('upload');
    setResults(null);
  }, []);

  return (
    <div className="container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header className="fade-in" style={{ padding: '2rem 0', textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--gradient-main)', padding: '12px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-glow)' }}>
            <FileText size={32} color="#fff" />
          </div>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
            Resume Score Analyzer
          </h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>
          Instantly evaluate your resume's
        </p>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

        {appState === 'upload' && (
          <UploadSection onFileSelect={handleFileSelect} />
        )}

        {appState === 'analyzing' && (
          <AnalysisLoading fileName={fileName} />
        )}

        {appState === 'results' && (
          <ResultsDashboard results={results} fileName={fileName} onReset={handleReset} />
        )}

      </main>

      {/* Footer */}
      <footer className="fade-in" style={{ padding: '3rem 0 1rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: 'auto' }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <Sparkles size={16} color="var(--accent-primary)" />
          Powered by Nikhita Munje
        </p>
      </footer>
    </div>
  )
}

export default App
