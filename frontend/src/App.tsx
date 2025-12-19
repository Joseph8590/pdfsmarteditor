import { useState } from 'react';
import { EditorProvider } from './contexts/EditorContext';
import FileUpload from './components/FileUpload';
import PDFViewer from './components/PDFViewer';
import Toolbar from './components/Toolbar';
import ImageUpload from './components/ImageUpload';
import { FileText, Scissors, RefreshCw, Shield, Zap } from 'lucide-react';
import Header from './components/Header';
import PageNavigation from './components/PageNavigation';
import ZoomControls from './components/ZoomControls';
import ManipulationTools from './components/tools/ManipulationTools';
import ConversionTools from './components/tools/ConversionTools';
import SecurityTools from './components/tools/SecurityTools';
import AdvancedTools from './components/tools/AdvancedTools';
import './App.css';

type ViewMode = 'editor' | 'manipulation' | 'conversion' | 'security' | 'advanced';

function App() {
  const [activeView, setActiveView] = useState<ViewMode>('editor');

  const renderContent = () => {
    switch (activeView) {
      case 'editor':
        return (
          <div className="flex-1 relative overflow-auto p-8 animate-fade-in">
            <div className="min-h-full bg-white rounded-2xl shadow-2xl shadow-cyan-200/30 border border-cyan-100/50 relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-transparent to-blue-50/30 pointer-events-none" />
              <PDFViewer />
              <PageNavigation />
              <ZoomControls />
            </div>
          </div>
        );
      case 'manipulation':
        return <ManipulationTools />;
      case 'conversion':
        return <ConversionTools />;
      case 'security':
        return <SecurityTools />;
      case 'advanced':
        return <AdvancedTools />;
      default:
        return null;
    }
  };

  return (
    <EditorProvider>
      <div className="flex h-screen w-full bg-gradient-to-br from-slate-50 via-cyan-50/30 to-blue-50/30 overflow-hidden font-sans text-gray-900 relative">
        {/* Animated background mesh */}
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          backgroundImage: `radial-gradient(at 40% 20%, hsla(199,89%,48%,0.08) 0px, transparent 50%),
                           radial-gradient(at 80% 0%, hsla(180,84%,30%,0.08) 0px, transparent 50%),
                           radial-gradient(at 0% 50%, hsla(217,91%,60%,0.08) 0px, transparent 50%),
                           radial-gradient(at 80% 50%, hsla(173,80%,40%,0.08) 0px, transparent 50%)`
        }} />

        {/* Sidebar */}
        <aside className="w-80 bg-white/80 backdrop-blur-xl border-r border-cyan-100/50 flex flex-col shadow-xl shadow-cyan-100/50 z-10 relative sidebar-gradient">
          {/* Logo Section */}
          <div className="p-6 border-b border-cyan-100/50 flex items-center gap-3 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5" />
            <div className="flex items-center justify-center relative">
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain drop-shadow-md transform hover:rotate-6 transition-transform" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 bg-clip-text text-transparent animate-slide-in-right">
              PDF Smart Editor
            </h1>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Navigation Menu */}
            <div className="space-y-2 animate-slide-in-left">
              <h2 className="text-xs font-semibold text-cyan-600 uppercase tracking-wider px-1">Navigation</h2>
              <button
                onClick={() => setActiveView('editor')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${activeView === 'editor'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-700'
                  }`}
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm font-medium">Editor</span>
              </button>
              <button
                onClick={() => setActiveView('manipulation')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${activeView === 'manipulation'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-700'
                  }`}
              >
                <Scissors className="w-4 h-4" />
                <span className="text-sm font-medium">Manipulation</span>
              </button>
              <button
                onClick={() => setActiveView('conversion')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${activeView === 'conversion'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-700'
                  }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span className="text-sm font-medium">Conversion</span>
              </button>
              <button
                onClick={() => setActiveView('security')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${activeView === 'security'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-700'
                  }`}
              >
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Security</span>
              </button>
              <button
                onClick={() => setActiveView('advanced')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 ${activeView === 'advanced'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 scale-105'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 hover:text-cyan-700'
                  }`}
              >
                <Zap className="w-4 h-4" />
                <span className="text-sm font-medium">Advanced</span>
              </button>
            </div>

            {activeView === 'editor' && (
              <>
                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-xs font-semibold text-cyan-600 uppercase tracking-wider px-1">Document</h2>
                  <FileUpload />
                </div>

                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-xs font-semibold text-cyan-600 uppercase tracking-wider px-1">Tools</h2>
                  <Toolbar />
                </div>

                <div className="space-y-4 animate-fade-in">
                  <h2 className="text-xs font-semibold text-cyan-600 uppercase tracking-wider px-1">Assets</h2>
                  <ImageUpload />
                </div>
              </>
            )}
          </div>

          <div className="p-4 border-t border-cyan-100/50 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 backdrop-blur-sm">
            <p className="text-xs text-center text-cyan-600 font-medium">
              v1.0.0 • Premium Edition ✨
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative flex flex-col">
          <Header />
          {renderContent()}
        </main>
      </div>
    </EditorProvider>
  );
}

export default App;
