import React from 'react';
import { KEYBOARD_SHORTCUTS } from '../hooks/useKeyboardShortcuts';
import { X } from 'lucide-react';

interface ShortcutsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={onClose}>
            <div
                className="w-full max-w-md bg-[var(--card-bg)] rounded-2xl shadow-2xl border border-[var(--border-color)] overflow-hidden animate-scale-in"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
                    <h2 className="text-lg font-semibold text-[var(--color-primary-600)]">Keyboard Shortcuts</h2>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-[var(--hover-bg)] text-[var(--text-secondary)] transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-4 space-y-3">
                    {KEYBOARD_SHORTCUTS.map((shortcut, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <span className="text-sm text-[var(--text-primary)]">{shortcut.description}</span>
                            <div className="flex gap-1">
                                {shortcut.keys.map((key, i) => (
                                    <kbd key={i} className="px-2 py-1 text-xs font-semibold text-[var(--text-secondary)] bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg shadow-sm">
                                        {key}
                                    </kbd>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-[var(--bg-primary)]/50 border-t border-[var(--border-color)] text-center">
                    <p className="text-xs text-[var(--text-secondary)]">
                        Press <kbd className="font-bold">?</kbd> to open this menu anytime
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ShortcutsModal;
