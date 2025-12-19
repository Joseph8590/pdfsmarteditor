import React from 'react';
import { useEditor } from '../contexts/EditorContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PageNavigation: React.FC = () => {
    const { currentPage, setCurrentPage, pageCount, sessionId } = useEditor();

    if (!sessionId) return null;

    const handlePrev = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < pageCount - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-gray-200 px-4 py-2 flex items-center gap-4 z-50">
            <button
                onClick={handlePrev}
                disabled={currentPage === 0}
                className={`p-1 rounded-full transition-colors ${currentPage === 0
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                title="Previous Page"
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-gray-600 font-mono">
                Page {Math.min(currentPage + 1, pageCount)} of {pageCount}
            </span>

            <button
                onClick={handleNext}
                disabled={currentPage === pageCount - 1}
                className={`p-1 rounded-full transition-colors ${currentPage === pageCount - 1
                        ? 'text-gray-300 cursor-not-allowed'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                title="Next Page"
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </div>
    );
};

export default PageNavigation;
