import React, { useEffect, useState } from 'react';
import { Send, Sparkles, Check, MessageSquare } from 'lucide-react';
import { Message } from '../types';

interface ConversationAreaProps {
  title: string;
  messages: Message[];
  onSendMessage: (text: string) => void;
  onTextSelection: () => void;
  onAdoptSegment: (text: string) => void;
}

interface DialogueSegment {
  id: string;
  text: string;
  timestamp: string;
  isAdopted: boolean;
}

const dialogueContent = [
  '我认为在产品设计方面，我们需要更注重用户体验。目前的界面虽然功能齐全，但操作流程还不够顺畅。',
  '对，特别是在移动端的适配上，我们要考虑到不同设备的使用场景。',
  '我们的竞品分析显示，用户最看重的是响应速度和界面简洁度。',
  '数据分析表明，用户在首次使用时的停留时间普遍不超过3分钟，这说明我们的引导流程可能存在问题。',
  '建议我们可以增加新手引导功能，通过简单的动画展示核心功能的使用方法。',
  '是的，我们还需要优化错误提示的方式，让用户能更直观地理解问题所在。',
  '关于性能优化，我建议我们可以采用懒加载的方式，优先加载用户最常用的功能模块。',
  '我们的用户调研显示，有超过60%的用户希望能有更个性化的设置选项。',
  '安全性也是一个重要考虑因素，建议增加双因素认证的选项。',
  '对产品的长期规划来说，我们需要考虑如何让系统更具可扩展性。',
];

export function ConversationArea({
  title,
  messages,
  onSendMessage,
  onTextSelection,
  onAdoptSegment,
}: ConversationAreaProps) {
  const [input, setInput] = useState('');
  const [segments, setSegments] = useState<DialogueSegment[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const addNewSegment = () => {
    if (currentIndex >= dialogueContent.length) {
      setCurrentIndex(0);
      return;
    }

    const newSegment: DialogueSegment = {
      id: Date.now().toString(),
      text: dialogueContent[currentIndex],
      timestamp: new Date().toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
      isAdopted: false,
    };

    setSegments((prev) => [...prev, newSegment]);
    setCurrentIndex((prev) => prev + 1);
  };

  // useEffect(() => {
  //   const timer = setInterval(addNewSegment, 20000);
  //   addNewSegment(); // Add first segment immediately

  //   return () => clearInterval(timer);
  // }, [currentIndex]);

  const handleAdopt = (segment: DialogueSegment) => {
    if (segment.isAdopted) return;

    setSegments((prev) =>
      prev.map((seg) =>
        seg.id === segment.id ? { ...seg, isAdopted: true } : seg
      )
    );
    onAdoptSegment(segment.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
        <p className="text-sm text-gray-500">实时对话分析与记录</p>
      </div>
      <div className="flex-1 overflow-y-auto p-6" onMouseUp={onTextSelection}>
        <div className="space-y-6">
          {/* System Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`p-4 rounded-lg max-w-2xl ${
                message.type === 'analysis'
                  ? 'bg-gray-50 border-l-4 border-state-grid ml-auto'
                  : 'bg-white border border-gray-200'
              }`}
            >
              <div className="flex items-start gap-3">
                {message.type === 'analysis' && (
                  <Sparkles className="w-5 h-5 text-state-grid mt-1" />
                )}
                <div className="flex-1">
                  <p className="text-gray-800">{message.text}</p>
                  {message.keywords && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.keywords.map((keyword, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 text-sm bg-state-grid/10 text-state-grid rounded-full"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="text-xs text-gray-500 mt-2 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Dialogue Segments */}
          {segments.map((segment) => (
            <div
              key={segment.id}
              className="bg-white border border-gray-200 rounded-lg p-4 max-w-2xl"
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-state-grid mt-1" />
                <div className="flex-1">
                  <p className="text-gray-800">{segment.text}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {segment.timestamp}
                    </span>
                    <button
                      onClick={() => handleAdopt(segment)}
                      disabled={segment.isAdopted}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm
                        ${
                          segment.isAdopted
                            ? 'bg-green-50 text-green-600 cursor-default'
                            : 'bg-state-grid/10 text-state-grid hover:bg-state-grid/20 transition-colors'
                        }`}
                    >
                      <Check className="w-4 h-4" />
                      {segment.isAdopted ? '已采纳' : '采纳'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="输入分析指令..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-state-grid focus:border-transparent bg-gray-50"
          />
          <button
            type="submit"
            className="p-3 bg-state-grid text-white rounded-lg hover:bg-state-grid-light 
                     transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
