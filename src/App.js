import React, { useState } from 'react';
import './App.css';
import DocumentUploader from './components/DocumentUploader';
import AnalysisResults from './components/AnalysisResults';
import Header from './components/Header';
import Features from './components/Features';

function App() {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = async (file) => {
    setIsAnalyzing(true);
    
    // Simulate document analysis
    setTimeout(() => {
      const mockResult = {
        fileName: file.name,
        fileSize: (file.size / 1024).toFixed(2) + ' KB',
        uploadTime: new Date().toLocaleString(),
        authenticity: Math.random() > 0.5 ? 'Authentic' : 'Suspicious',
        confidence: (Math.random() * 30 + 70).toFixed(2),
        checks: {
          metadata: Math.random() > 0.3,
          watermark: Math.random() > 0.4,
          textConsistency: Math.random() > 0.3,
          imageForensics: Math.random() > 0.4,
          digitalSignature: Math.random() > 0.5,
          fontAnalysis: Math.random() > 0.3
        },
        warnings: [],
        recommendations: []
      };

      // Add warnings based on failed checks
      Object.entries(mockResult.checks).forEach(([key, passed]) => {
        if (!passed) {
          mockResult.warnings.push(`${key.replace(/([A-Z])/g, ' $1').trim()} check failed`);
        }
      });

      if (mockResult.authenticity === 'Suspicious') {
        mockResult.recommendations.push('Manual verification recommended');
        mockResult.recommendations.push('Contact issuing authority for verification');
      }

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <div className="container">
          <DocumentUploader 
            onAnalysis={handleAnalysis} 
            isAnalyzing={isAnalyzing}
          />
          {analysisResult && (
            <AnalysisResults result={analysisResult} />
          )}
          <Features />
        </div>
      </main>
    </div>
  );
}

export default App;