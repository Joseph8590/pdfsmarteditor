import React from 'react';
import { useEditor } from '../contexts/EditorContext';
import { ZoomOut, Maximize } from 'lucide-react';

const ZoomControls: React.FC = () => {
    const { zoom, setZoom } = useEditor();



    const handleZoomOut = () => {
        setZoom(Math.max(zoom - 0.1, 0.5)); // Min zoom 0.5x
    };

    const handleResetZoom = () => {
        setZoom(1);
    };

    return (
        <div className="absolute bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex items-center gap-1 z-50">
            <button
                onClick={handleZoomOut}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                title="Zoom Out"
            >
                <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-xs font-medium text-gray-600 w-12 text-center font-mono">
                {Math.round(zoom * 100)}%
            </span>



            <div className="w-px h-4 bg-gray-200 mx-1"></div>

            <button
                onClick={handleResetZoom}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                title="Fit to Width"
            >
                <Maximize className="w-4 h-4" />
            </button>
        </div>
    );
};

export default ZoomControls;
