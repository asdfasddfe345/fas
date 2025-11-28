import React, { useState } from 'react';
import { Download, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { exportToPDF, exportToWord } from '../utils/exportUtils';
import { ResumeData, UserType } from '../types/resume';

interface ExportButtonsProps {
  resumeData: ResumeData;
  userType?: UserType;
  targetRole?: string;
  onShowProfile?: (mode?: 'profile' | 'wallet') => void;
  walletRefreshKey?: number;
}

export const ExportButtons: React.FC<ExportButtonsProps> = ({
  resumeData,
  userType = 'experienced',
  targetRole,
  onShowProfile,
  walletRefreshKey
}) => {
  const [isExportingPDF, setIsExportingPDF] = useState(false);
  const [isExportingWord, setIsExportingWord] = useState(false);
  const [exportStatus, setExportStatus] = useState<{
    type: 'pdf' | 'word' | null;
    status: 'success' | 'error' | null;
    message: string;
  }>({ type: null, status: null, message: '' });

  const handleExportPDF = async () => {
    if (isExportingPDF || isExportingWord) return;

    setIsExportingPDF(true);
    setExportStatus({ type: null, status: null, message: '' });

    try {
      await exportToPDF(resumeData, userType);
      setExportStatus({
        type: 'pdf',
        status: 'success',
        message: 'PDF exported successfully!'
      });
      setTimeout(() => {
        setExportStatus({ type: null, status: null, message: '' });
      }, 3000);
    } catch (error) {
      console.error('PDF export failed:', error);
      setExportStatus({
        type: 'pdf',
        status: 'error',
        message: 'PDF export failed. Please try again.'
      });
      setTimeout(() => {
        setExportStatus({ type: null, status: null, message: '' });
      }, 5000);
    } finally {
      setIsExportingPDF(false);
    }
  };

  const handleExportWord = async () => {
    if (isExportingWord || isExportingPDF) return;

    setIsExportingWord(true);
    setExportStatus({ type: null, status: null, message: '' });

    try {
      await exportToWord(resumeData, userType);
      setExportStatus({
        type: 'word',
        status: 'success',
        message: 'Word document exported successfully!'
      });
      setTimeout(() => {
        setExportStatus({ type: null, status: null, message: '' });
      }, 3000);
    } catch (error) {
      console.error('Word export failed:', error);
      setExportStatus({
        type: 'word',
        status: 'error',
        message: 'Word export failed. Please try again.'
      });
      setTimeout(() => {
        setExportStatus({ type: null, status: null, message: '' });
      }, 5000);
    } finally {
      setIsExportingWord(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Export buttons hidden - ATS compatibility focus only */}
    </div>
  );
};