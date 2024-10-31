import React from 'react';
import { BookMarked, ThumbsUp, ThumbsDown, Plus, Tag } from 'lucide-react';
import { Note } from '../types';

interface NotesPanelProps {
  notes: Note[];
  onAddNote: (text: string, type: Note['type']) => void;
}

export function NotesPanel({ notes, onAddNote }: NotesPanelProps) {
  const [activeType, setActiveType] = React.useState<Note['type']>('note');
  const [input, setInput] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddNote(input, activeType);
      setInput('');
    }
  };

  return (
    <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Tag className="w-5 h-5 text-state-grid" />
          <h2 className="text-xl font-semibold text-gray-800">记录与评估</h2>
        </div>
        <div className="flex space-x-2">
          {[
            { type: 'note' as const, icon: BookMarked, label: '笔记' },
            { type: 'pro' as const, icon: ThumbsUp, label: '优点' },
            { type: 'con' as const, icon: ThumbsDown, label: '缺点' },
          ].map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors
                        flex items-center justify-center gap-2
                        ${
                          activeType === type
                            ? 'bg-state-grid/10 text-state-grid'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-lg mb-3 ${
              note.type === 'pro'
                ? 'bg-green-50 border-l-4 border-green-500'
                : note.type === 'con'
                ? 'bg-red-50 border-l-4 border-red-500'
                : 'bg-gray-50 border-l-4 border-state-grid'
            }`}
          >
            <div className="flex justify-between items-start">
              <p className="text-gray-800">{note.text}</p>
              <span className="text-xs text-gray-500">{note.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="添加新记录..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-state-grid focus:border-transparent bg-gray-50"
          />
          <button
            type="submit"
            className="p-3 bg-state-grid text-white rounded-lg hover:bg-state-grid-light 
                     transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}