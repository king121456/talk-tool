import React from 'react';
import { BookMarked, ThumbsUp, ThumbsDown, X } from 'lucide-react';
import { Note } from '../types';

interface SelectionMenuProps {
  position: { x: number; y: number };
  selectedText: string;
  onSelect: (text: string, type: Note['type']) => void;
  onClose: () => void;
}

export function SelectionMenu({ position, selectedText, onSelect, onClose }: SelectionMenuProps) {
  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 transform -translate-x-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div className="flex items-center gap-1 p-1">
        <button
          onClick={() => onSelect(selectedText, 'note')}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-700 flex items-center gap-1"
          title="添加到笔记"
        >
          <BookMarked className="w-4 h-4" />
        </button>
        <button
          onClick={() => onSelect(selectedText, 'pro')}
          className="p-2 hover:bg-gray-100 rounded-lg text-green-600 flex items-center gap-1"
          title="添加到优点"
        >
          <ThumbsUp className="w-4 h-4" />
        </button>
        <button
          onClick={() => onSelect(selectedText, 'con')}
          className="p-2 hover:bg-gray-100 rounded-lg text-red-500 flex items-center gap-1"
          title="添加到缺点"
        >
          <ThumbsDown className="w-4 h-4" />
        </button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"
          title="关闭"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}