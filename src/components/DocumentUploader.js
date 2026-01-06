import React, { useState, useRef } from 'react';
import './DocumentUploader.css';

const DocumentUploader = ({ onAnalysis, isAnalyzing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    setSelectedFile(file);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onAnalysis(selectedFile);
    }
  };

  return (
    <div className="uploader-section">
      <div className="uploader-header">
        <h2>Upload Document for Verification</h2>
        <p>Support for PDF, JPG, PNG, and DOCX files up to 10MB</p>
      </div>
      
      <div 
        className={`upload-area ${dragActive ? 'drag-active' : ''} ${selectedFile ? 'has-file' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !selectedFile && fileInputRef.current.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleChange}
          accept=".pdf,.jpg,.jpeg,.png,.docx"
          style={{ display: 'none' }}
        />
        
        {!selectedFile ? (
          <>
            <svg className="upload-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="17 8 12 3 7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="3" x2="12" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h3>Drag & Drop your document here</h3>
            <p>or click to browse files</p>
          </>
        ) : (
          <div className="file-info">
            <svg className="file-icon" width="48" height="48" viewBox="0 0 24 24" fill="none">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="13 2 13 9 20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="file-details">
              <h4>{selectedFile.name}</h4>
              <p>{(selectedFile.size / 1024).toFixed(2)} KB</p>
            </div>
            <button 
              className="remove-btn"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedFile(null);
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>

      {selectedFile && (
        <button 
          className={`analyze-btn ${isAnalyzing ? 'analyzing' : ''}`}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <span className="spinner"></span>
              Analyzing Document...
            </>
          ) : (
            'Analyze Document'
          )}
        </button>
      )}
    </div>
  );
};

export default DocumentUploader;