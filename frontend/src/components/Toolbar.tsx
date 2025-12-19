import React from 'react';
import { useEditor } from '../contexts/EditorContext';
import { MousePointer2, Pen, Square, Circle, Type, Palette, Move, Undo } from 'lucide-react';

const Toolbar: React.FC = () => {
  const { drawingMode, setDrawingMode, color, setColor, strokeWidth, setStrokeWidth, fontSize, setFontSize, fontFamily, setFontFamily, undo } = useEditor();

  const modes = [
    { id: 'select', label: 'Select', icon: MousePointer2 },
    { id: 'pen', label: 'Pen', icon: Pen },
    { id: 'rectangle', label: 'Rectangle', icon: Square },
    { id: 'circle', label: 'Circle', icon: Circle },
    { id: 'text', label: 'Text', icon: Type },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Actions */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Actions</label>
        <div className="flex gap-2">
          <button
            onClick={undo}
            className="w-full p-2.5 bg-gradient-to-r from-sky-50 to-cyan-50 border border-sky-200 rounded-xl text-sky-700 hover:from-sky-100 hover:to-cyan-100 hover:text-sky-800 transition-all duration-300 flex items-center justify-center gap-2 group hover:shadow-lg hover:shadow-sky-200/50 hover:-translate-y-0.5"
          >
            <Undo className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="text-sm font-medium">Undo</span>
          </button>
        </div>
      </div>

      {/* Drawing Modes */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Mode</label>
        <div className="grid grid-cols-5 gap-2">
          {modes.map((mode) => {
            const Icon = mode.icon;
            const isActive = drawingMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => setDrawingMode(mode.id)}
                className={`p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center group relative tool-mode-btn ${isActive
                  ? 'bg-gradient-to-br from-sky-600 to-cyan-600 text-white shadow-lg shadow-sky-500/40 scale-105 active'
                  : 'bg-gradient-to-br from-sky-50 to-cyan-50 text-sky-600 hover:from-sky-100 hover:to-cyan-100 hover:text-sky-700 hover:scale-110'
                  }`}
                title={mode.label}
              >
                <Icon className="w-5 h-5" />
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  {mode.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Styling Options */}
      <div className="space-y-4 p-5 bg-gradient-to-br from-sky-50/50 to-cyan-50/50 rounded-2xl border border-sky-100/50 shadow-lg shadow-sky-100/30">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-sky-700 uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-3.5 h-3.5" /> Color
            </label>
            <span className="text-xs font-mono text-sky-600 uppercase font-semibold">{color}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-12 rounded-xl cursor-pointer border-2 border-sky-200 hover:border-sky-400 transition-all"
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-sky-700 uppercase tracking-wider flex items-center gap-2">
              <Move className="w-3.5 h-3.5" /> Stroke
            </label>
            <span className="text-xs font-semibold text-sky-700 bg-sky-100 px-2 py-1 rounded-lg">{strokeWidth}px</span>
          </div>
          <input
            type="range"
            min="1"
            max="20"
            value={strokeWidth}
            onChange={(e) => setStrokeWidth(parseInt(e.target.value))}
            className="w-full h-2 bg-gradient-to-r from-sky-200 to-cyan-200 rounded-full appearance-none cursor-pointer"
          />
        </div>

        {/* Text Options - Only show when text tool is selected or active */}
        <div className="space-y-3 pt-3 border-t border-sky-200/50">
          <label className="text-xs font-semibold text-sky-700 uppercase tracking-wider flex items-center gap-2">
            <Type className="w-3.5 h-3.5" /> Typography
          </label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full p-2.5 text-xs font-medium bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
            >
              <option value="Arial">Arial</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
            <input
              type="number"
              min="8"
              max="72"
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value))}
              className="w-full p-2.5 text-xs font-medium bg-white border border-sky-200 rounded-xl focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;