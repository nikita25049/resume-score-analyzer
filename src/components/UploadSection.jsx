import React, { useState, useRef } from 'react';
import { UploadCloud, File, AlertCircle } from 'lucide-react';

export default function UploadSection({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const validateAndProcessFile = (file) => {
    setError(null);
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please upload a PDF file only.');
      return;
    }

    onFileSelect(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcessFile(e.target.files[0]);
    }
  };

  return (
    <div className="upload-container fade-in" style={{ width: '100vw', maxWidth: '600px', margin: '0 auto' }}>
      <div
        className={`upload-zone ${isDragging ? 'dragging' : ''} ${error ? 'has-error' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--accent-primary)' : error ? 'var(--danger)' : 'var(--text-muted)'}`,
          backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.05)' : error ? 'rgba(239, 68, 68, 0.05)' : 'rgba(255, 255, 255, 0.02)',
          borderRadius: 'var(--radius-xl)',
          padding: '4rem 2rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <input
          type="file"
          accept=".pdf,application/pdf"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: 'none' }}
        />

        <div style={{ pointerEvents: 'none' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: isDragging ? 'rgba(59, 130, 246, 0.15)' : error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            transition: 'all 0.3s ease',
            color: isDragging ? 'var(--accent-primary)' : error ? 'var(--danger)' : 'var(--text-secondary)'
          }}>
            <UploadCloud size={32} />
          </div>

          <h3 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)', fontSize: '1.25rem' }}>
            {isDragging ? 'Drop your resume here' : 'Select or drag your PDF resume'}
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            We only support PDF formats (Max 5MB)
          </p>

          <button
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: 'var(--radius-md)',
              border: 'none',
              background: 'var(--gradient-main)',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              boxShadow: 'var(--shadow-md)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              pointerEvents: 'none' // button visual only, the whole zone is clickable
            }}
          >
            Browse Files
          </button>
        </div>
      </div>

      {error && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--danger)'
        }} className="fade-in">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
