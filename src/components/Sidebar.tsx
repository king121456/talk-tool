import React, { useState } from 'react';
import { Users, Plus, Search, ChevronDown, ChevronRight, UserCircle2, Building2, Users2, Briefcase, Award } from 'lucide-react';
import { Conversation, UserCategory, User } from '../types';

interface SidebarProps {
  conversations: Conversation[];
  onSelectConversation: (id: number) => void;
  activeId: number;
}

export function Sidebar({ conversations, onSelectConversation, activeId }: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<UserCategory[]>([
    {
      id: 'leadership',
      name: '领导班子',
      icon: 'Building2',
      isExpanded: true,
      users: [
        { id: 1, name: '张明', title: '董事长', selected: false },
        { id: 2, name: '李华', title: '总经理', selected: false },
      ]
    },
    {
      id: 'interviewers',
      name: '谈话人',
      icon: 'Users2',
      isExpanded: false,
      users: [
        { id: 3, name: '王强', title: '人力资源总监', selected: false },
        { id: 4, name: '赵燕', title: '部门主管', selected: false },
      ]
    },
    {
      id: 'external',
      name: '外部董事',
      icon: 'Briefcase',
      isExpanded: false,
      users: [
        { id: 5, name: '陈明', title: '外部董事', selected: false },
        { id: 6, name: '刘洋', title: '外部董事', selected: false },
      ]
    },
    {
      id: 'level3a',
      name: '三级正',
      icon: 'Award',
      isExpanded: false,
      users: [
        { id: 7, name: '周伟', title: '部门经理', selected: false },
        { id: 8, name: '孙芳', title: '技术总监', selected: false },
      ]
    },
    {
      id: 'level3b',
      name: '三级副',
      icon: 'UserCircle2',
      isExpanded: false,
      users: [
        { id: 9, name: '郭静', title: '副经理', selected: false },
        { id: 10, name: '杨光', title: '副总监', selected: false },
      ]
    }
  ]);

  const getIcon = (iconName: string) => {
    const icons = {
      Building2: Building2,
      Users2: Users2,
      Briefcase: Briefcase,
      Award: Award,
      UserCircle2: UserCircle2,
    };
    return icons[iconName as keyof typeof icons];
  };

  const toggleCategory = (categoryId: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId 
        ? { ...category, isExpanded: !category.isExpanded }
        : category
    ));
  };

  const toggleUser = (categoryId: string, userId: number) => {
    setCategories(categories.map(category => 
      category.id === categoryId
        ? {
            ...category,
            users: category.users.map(user =>
              user.id === userId
                ? { ...user, selected: !user.selected }
                : user
            )
          }
        : category
    ));
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    users: category.users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.users.length > 0);

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">用户选择</h2>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-state-grid">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索用户..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-state-grid focus:border-transparent"
          />
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredCategories.map((category) => (
          <div key={category.id} className="border-b border-gray-100">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {React.createElement(getIcon(category.icon), {
                  className: "w-5 h-5 text-state-grid"
                })}
                <span className="font-medium text-gray-700">{category.name}</span>
                <span className="text-sm text-gray-500">
                  ({category.users.filter(u => u.selected).length}/{category.users.length})
                </span>
              </div>
              {category.isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
            
            {category.isExpanded && (
              <div className="bg-gray-50">
                {category.users.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => toggleUser(category.id, user.id)}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={user.selected}
                      onChange={() => {}}
                      className="w-4 h-4 rounded border-gray-300 text-state-grid 
                               focus:ring-state-grid mr-3"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>已选择用户</span>
          <span>{categories.reduce((acc, cat) => 
            acc + cat.users.filter(u => u.selected).length, 0
          )} 人</span>
        </div>
      </div>
    </div>
  );
}