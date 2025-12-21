import React, { useState } from 'react';
import { useEditor } from '../contexts/EditorContext';
import { Grid, GripVertical } from 'lucide-react';

// Note: This component assumes page data is available. 
// For now, it's a placeholder visualization that would integrate with a real PDF rendering engine.

interface PageThumbnailsProps {
    isOpen?: boolean;
}

const PageThumbnails: React.FC<PageThumbnailsProps> = ({ isOpen = false }) => {
    const { pageCount, currentPage, setCurrentPage } = useEditor();
    const [isExpanded, setIsExpanded] = useState(isOpen);

    if (pageCount === 0) return null;

    return (
        <div className={`fixed left-0 top-1/2 -translate-y-1/2 z-20 transition-all duration-300 transform ${isExpanded ? 'translate-x-0' : '-translate-x-full pl-2'}`}>
            <div className="bg-[var(--sidebar-bg)] backdrop-blur-xl border border-[var(--border-color)] shadow-xl rounded-r-2xl overflow-hidden flex">
                {/* Content */}
                <div className={`w-64 h-[calc(100vh-12rem)] flex flex-col transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
                    <div className="p-4 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50 flex items-center justify-between">
                        <h3 className="font-semibold text-[var(--text-primary)]">Pages ({pageCount})</h3>
                        <button onClick={() => setIsExpanded(false)} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                            Close
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                        {Array.from({ length: pageCount }).map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setCurrentPage(index)}
                                className={`group relative aspect-[3/4] bg-white rounded-lg border-2 transition-all cursor-pointer hover:scale-105 ${currentPage === index
                                    ? 'border-[var(--color-primary-500)] shadow-lg ring-2 ring-[var(--color-primary-200)]'
                                    : 'border-transparent hover:border-[var(--color-primary-300)] shadow-sm'}`}
                            >
                                <div className="absolute top-2 left-2 w-6 h-6 bg-[var(--color-primary-600)] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                                    {index + 1}
                                </div>
                                {/* Placeholder for page content */}
                                <div className="absolute inset-0 flex items-center justify-center text-[var(--color-primary-100)] opacity-20">
                                    <Grid className="w-12 h-12" />
                                </div>

                                {/* Drag handle */}
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-[var(--text-secondary)]">
                                    <GripVertical className="w-4 h-4" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-6 bg-[var(--bg-secondary)] hover:bg-[var(--hover-bg)] border-l border-[var(--border-color)] flex items-center justify-center cursor-pointer transition-colors"
                    title="Toggle Page Thumbnails"
                >
                    <div className="rotate-90 text-xs font-medium text-[var(--text-secondary)] whitespace-nowrap tracking-widest uppercase">
                        Thumbnails
                    </div>
                </button>
            </div>
        </div>
    );
};

export default PageThumbnails;
