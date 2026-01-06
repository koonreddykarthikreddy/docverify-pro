import React from 'react';
import './AnalysisResults.css';

const AnalysisResults = ({ result }) => {
  const isAuthentic = result.authenticity === 'Authentic';
  
  return (
    <div className="results-section">
      <div className="results-header">
        <h2>Analysis Results</h2>
      </div>

      <div className={`authenticity-badge ${isAuthentic ? 'authentic' : 'suspicious'}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {isAuthentic ? (
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          ) : (
            <>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </>
          )}
        </svg>
        <div>
          <h3>{result.authenticity}</h3>
          <p>Confidence: {result.confidence}%</p>
        </div>
      </div>

      <div className="results-grid">
        <div className="result-card">
          <h4>Document Information</h4>
          <div className="info-list">
            <div className="info-item">
              <span className="label">File Name:</span>
              <span className="value">{result.fileName}</span>
            </div>
            <div className="info-item">
              <span className="label">File Size:</span>
              <span className="value">{result.fileSize}</span>
            </div>
            <div className="info-item">
              <span className="label">Upload Time:</span>
              <span className="value">{result.uploadTime}</span>
            </div>
          </div>
        </div>

        <div className="result-card">
          <h4>Verification Checks</h4>
          <div className="checks-list">
            {Object.entries(result.checks).map(([key, passed]) => (
              <div key={key} className={`check-item ${passed ? 'passed' : 'failed'}`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  {passed ? (
                    <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  ) : (
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  )}
                </svg>
                <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {result.warnings.length > 0 && (
        <div className="warnings-card">
          <h4>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Warnings
          </h4>
          <ul>
            {result.warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {result.recommendations.length > 0 && (
        <div className="recommendations-card">
          <h4>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Recommendations
          </h4>
          <ul>
            {result.recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;