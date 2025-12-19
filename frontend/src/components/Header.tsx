import React from 'react';
import { useEditor } from '../contexts/EditorContext';

const Header: React.FC = () => {
    const { exportPDF, saveChanges, hasUnsavedChanges, sessionId, isUploading } = useEditor();
    const disabledActions = !sessionId || isUploading;

    return (
        <header className="h-16 bg-white/70 backdrop-blur-xl border-b border-sky-100/50 flex items-center justify-between px-6 shadow-lg shadow-sky-100/20 z-10 relative">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-sky-50/30 via-transparent to-cyan-50/30 pointer-events-none" />

            <div className="flex items-center gap-2 text-sm text-gray-600 relative z-10">
                <span className="font-semibold bg-gradient-to-r from-sky-700 to-cyan-700 bg-clip-text text-transparent">Workspace</span>
                <span className="text-sky-300">/</span>
                <span className="text-gray-500">Untitled Document</span>
            </div>
            <div className="flex items-center gap-3 relative z-10">
                <button
                    onClick={() => exportPDF()}
                    disabled={disabledActions}
                    className={`px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300 border ${disabledActions
                        ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'text-sky-700 hover:text-sky-800 bg-white/80 hover:bg-sky-50 border-sky-200 hover:shadow-lg hover:shadow-sky-200/50 hover:-translate-y-0.5'
                        }`}
                >
                    {isUploading ? 'Uploading…' : 'Export'}
                </button>
                <button
                    onClick={() => saveChanges()}
                    disabled={disabledActions || !hasUnsavedChanges}
                    className={`px-5 py-2 text-sm font-medium text-white rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden ${(hasUnsavedChanges && !disabledActions)
                        ? 'bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 shadow-sky-500/30 hover:shadow-sky-500/50 hover:-translate-y-0.5'
                        : 'bg-gray-400 cursor-not-allowed shadow-none opacity-60'
                        }`}
                >
                    {hasUnsavedChanges && !disabledActions && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer" />
                    )}
                    <span className="relative">{isUploading ? 'Uploading…' : 'Save Changes'}</span>
                </button>
            </div>
        </header>
    );
};

export default Header;
