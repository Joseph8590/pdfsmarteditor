import React, { useEffect, useState } from 'react';
import { Clock, FileText, X, Trash2 } from 'lucide-react';
import { getRecentFiles, removeRecentFile, clearRecentFiles, formatFileSize, formatDate, type RecentFile } from '../services/recentFiles';

interface RecentFilesProps {
    onFileSelect?: (fileName: string) => void;
}

const RecentFiles: React.FC<RecentFilesProps> = ({ onFileSelect }) => {
    const [files, setFiles] = useState<RecentFile[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const loadFiles = () => {
        setFiles(getRecentFiles());
    };

    useEffect(() => {
        loadFiles();
        // Listen for storage changes in case other tabs update it
        window.addEventListener('storage', loadFiles);
        // Custom event for internal updates
        window.addEventListener('recent-files-updated', loadFiles);
        return () => {
            window.removeEventListener('storage', loadFiles);
            window.removeEventListener('recent-files-updated', loadFiles);
        };
    }, []);

    const handleRemove = (e: React.MouseEvent, fileName: string) => {
        e.stopPropagation();
        removeRecentFile(fileName);
        loadFiles();
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        clearRecentFiles();
        loadFiles();
    }

    if (files.length === 0) return null;

    return (
        <div className="relative mt-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-[var(--bg-secondary)]/50 hover:bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl transition-all duration-200 group"
            >
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <Clock className="w-4 h-4 group-hover:text-[var(--color-primary-600)] transition-colors" />
                    <span className="text-sm font-medium">Recent Files ({files.length})</span>
                </div>
                <span className="text-[10px] text-[var(--text-secondary)] bg-[var(--bg-primary)] px-2 py-0.5 rounded-full border border-[var(--border-color)]">
                    {isOpen ? 'Hide' : 'Show'}
                </span>
            </button>

            {isOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl shadow-xl overflow-hidden z-20 animate-scale-in">
                    <div className="flex justify-between items-center px-4 py-2 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/50">
                        <span className="text-xs font-semibold text-[var(--text-secondary)]">History</span>
                        <button
                            onClick={handleClear}
                            className="text-[10px] flex items-center gap-1 text-red-500 hover:text-red-600 transition-colors"
                        >
                            <Trash2 className="w-3 h-3" /> Clear All
                        </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                        {files.map((file) => (
                            <div
                                key={file.name}
                                onClick={() => onFileSelect?.(file.name)}
                                className="flex items-center justify-between p-3 hover:bg-[var(--hover-bg)] cursor-pointer border-b border-[var(--border-color)]/50 last:border-0 transition-colors group"
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="p-2 rounded-lg bg-[var(--bg-primary)] text-[var(--color-primary-600)]">
                                        <FileText className="w-4 h-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-medium text-[var(--text-primary)] truncate" title={file.name}>{file.name}</span>
                                        <span className="text-[10px] text-[var(--text-secondary)]">
                                            {formatFileSize(file.size)} • {formatDate(file.lastOpened)}
                                        </span>
                                    </div>
                                </div>
                                <button
                                    onClick={(e) => handleRemove(e, file.name)}
                                    className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-red-50 text-red-400 hover:text-red-500 transition-all"
                                    title={`Remove ${file.name}`}
                                    aria-label={`Remove ${file.name}`}
                                >
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RecentFiles;
