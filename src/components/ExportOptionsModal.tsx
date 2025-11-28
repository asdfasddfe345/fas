// src/components/ExportOptionsModal.tsx
import React from 'react';
import { X, FileText, Download, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { ExportOptions } from '../types/export';
import { ResumeData, UserType } from '../types/resume';

interface ExportOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  optimizedResume: ResumeData | null;
  userType: UserType;
  handleExportFile: (options: ExportOptions, format: 'pdf' | 'word') => Promise<void>;
  isExportingPDF: boolean;
  isExportingWord: boolean;
  exportStatus: {
    type: 'pdf' | 'word' | null;
    status: 'success' | 'error' | null;
    message: string;
  };
}

export const ExportOptionsModal: React.FC<ExportOptionsModalProps> = ({
  isOpen,
  onClose,
  optimizedResume,
  userType,
  handleExportFile,
  isExportingPDF,
  isExportingWord,
  exportStatus,
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Default export options for the modal (can be customized if needed)
  const defaultModalExportOptions = {
    layoutType: 'standard',
    paperSize: 'a4',
    fontFamily: 'Calibri',
    nameSize: 26,
    sectionHeaderSize: 11,
    subHeaderSize: 10.5,
    bodyTextSize: 10,
    sectionSpacing: 3,
    entrySpacing: 2,
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-fade-in" onClick={handleBackdropClick}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[95vh] overflow-y-auto dark:bg-dark-100 dark:shadow-dark-xl animate-scale-in">
        {/* Header */}
        <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-6 border-b border-gray-200 dark:from-dark-200 dark:to-dark-300 dark:border-dark-400">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-white/50 z-10 min-w-[44px] min-h-[44px] dark:text-gray-500 dark:hover:text-gray-300 dark:hover:bg-dark-300/50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="text-center">
            <div className="bg-gradient-to-br from-neon-cyan-500 to-neon-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg dark:shadow-neon-cyan">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Download Your Resume
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Choose your preferred format for download.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Export buttons hidden - ATS compatibility focus only */}
          <div className="text-center text-gray-600 dark:text-gray-300 py-8">
            <p>Export functionality is currently focused on ATS optimization.</p>
            <p className="mt-2 text-sm">View your optimized resume in the preview panel.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
