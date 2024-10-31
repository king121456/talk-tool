import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ConversationArea } from './components/ConversationArea';
import { NotesPanel } from './components/NotesPanel';
import { SelectionMenu } from './components/SelectionMenu';
import { Conversation, Message, Note } from './types';

function App() {
  const [activeConversation, setActiveConversation] = useState(1);
  const [selectedText, setSelectedText] = useState('');
  const [menuPosition, setMenuPosition] = useState<{ x: number; y: number } | null>(null);
  
  const [conversations] = useState<Conversation[]>([
    { id: 1, name: "项目讨论 - 产品设计", date: "2024-03-15", status: 'active' },
    { id: 2, name: "客户会议 - 需求分析", date: "2024-03-14", status: 'completed' },
    { id: 3, name: "团队会议 - 周报", date: "2024-03-13", status: 'pending' },
  ]);

  const [messages] = useState<Message[]>([
    {
      id: 1,
      type: 'analysis',
      text: "系统正在实时分析对话内容...",
      keywords: ['产品设计', '用户体验', '界面布局'],
      timestamp: "14:30"
    },
    {
      id: 2,
      type: 'response',
      text: "根据分析，本次讨论主要围绕产品界面的用户体验展开，重点关注了布局优化和交互设计。",
      timestamp: "14:31"
    }
  ]);

  const [notes, setNotes] = useState<Note[]>([
    { id: 1, text: "提出了创新的解决方案", type: 'pro', timestamp: "14:15" },
    { id: 2, text: "需要更多技术细节", type: 'con', timestamp: "14:20" },
    { id: 3, text: "下周安排跟进会议", type: 'note', timestamp: "14:25" },
  ]);

  const handleSendMessage = (text: string) => {
    console.log('Sending message:', text);
  };

  const handleAddNote = (text: string, type: Note['type']) => {
    const newNote = {
      id: notes.length + 1,
      text,
      type,
      timestamp: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    };
    setNotes([...notes, newNote]);
    setSelectedText('');
    setMenuPosition(null);
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim()) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(selection.toString());
      setMenuPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      });
    } else {
      setSelectedText('');
      setMenuPosition(null);
    }
  };

  const handleAdoptSegment = (text: string) => {
    handleAddNote(text, 'note');
  };

  return (
    <div className="h-screen flex bg-gray-50">
      <Sidebar
        conversations={conversations}
        onSelectConversation={setActiveConversation}
        activeId={activeConversation}
      />
      <ConversationArea
        title={conversations.find(c => c.id === activeConversation)?.name || ''}
        messages={messages}
        onSendMessage={handleSendMessage}
        onTextSelection={handleTextSelection}
        onAdoptSegment={handleAdoptSegment}
      />
      <NotesPanel
        notes={notes}
        onAddNote={handleAddNote}
      />
      {menuPosition && selectedText && (
        <SelectionMenu
          position={menuPosition}
          onSelect={handleAddNote}
          selectedText={selectedText}
          onClose={() => {
            setSelectedText('');
            setMenuPosition(null);
          }}
        />
      )}
    </div>
  );
}

export default App;