import React, { useState } from 'react';
import { Users, MessageCircle, Plus, Search, Crown, Clock, Send } from 'lucide-react';
import { useUser } from '../context/UserContext';

const StudyGroups: React.FC = () => {
  const { currentExam } = useUser();
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const studyGroups = [
    {
      id: '1',
      name: 'NEET 2025 Warriors',
      subject: 'All Subjects',
      members: 45,
      description: 'Dedicated group for NEET 2025 aspirants. Daily discussions and doubt solving.',
      isJoined: true,
      lastActive: '2 min ago',
      admin: 'Priya Sharma',
      messages: [
        { id: '1', sender: 'Priya Sharma', content: 'Good morning everyone! Ready for today\'s chemistry revision?', time: '9:00 AM', isAdmin: true },
        { id: '2', sender: 'Arjun', content: 'Yes! Can someone help with coordination compounds?', time: '9:02 AM', isAdmin: false },
        { id: '3', sender: 'Kavya', content: 'I can help with that. Let me share some notes.', time: '9:05 AM', isAdmin: false },
        { id: '4', sender: 'You', content: 'Thanks everyone! This group is so helpful 🙌', time: '9:10 AM', isAdmin: false, isMe: true }
      ],
      onlineMembers: 12
    },
    {
      id: '2',
      name: 'Physics Problem Solvers',
      subject: 'Physics',
      members: 28,
      description: 'Focused group for solving challenging physics problems together.',
      isJoined: true,
      lastActive: '15 min ago',
      admin: 'Rohit Kumar',
      messages: [
        { id: '1', sender: 'Rohit Kumar', content: 'Today\'s problem: A ball is thrown vertically upward...', time: '8:30 AM', isAdmin: true },
        { id: '2', sender: 'Sneha', content: 'Working on this. The initial velocity should be...', time: '8:45 AM', isAdmin: false },
      ],
      onlineMembers: 8
    },
    {
      id: '3',
      name: 'Organic Chemistry Hub',
      subject: 'Chemistry',
      members: 35,
      description: 'Master organic chemistry reactions and mechanisms with fellow students.',
      isJoined: false,
      lastActive: '1 hour ago',
      admin: 'Dr. Mehta',
      messages: [],
      onlineMembers: 15
    },
    {
      id: '4',
      name: 'Biology Boosters',
      subject: 'Biology',
      members: 52,
      description: 'From cell biology to ecology - discuss all biology topics here.',
      isJoined: false,
      lastActive: '30 min ago',
      admin: 'Anjali Singh',
      messages: [],
      onlineMembers: 20
    }
  ];

  const filteredGroups = studyGroups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const joinedGroups = filteredGroups.filter(group => group.isJoined);
  const availableGroups = filteredGroups.filter(group => !group.isJoined);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedGroup) return;
    
    // Add message logic here
    setNewMessage('');
  };

  const GroupCard = ({ group, showJoinButton = false }: { group: any, showJoinButton?: boolean }) => (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:border-blue-200 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{group.name}</h3>
            {group.isJoined && (
              <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Joined</span>
            )}
          </div>
          <p className="text-gray-600 text-sm mb-3">{group.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{group.members} members</span>
            </span>
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>Active {group.lastActive}</span>
            </span>
            {group.onlineMembers && (
              <span className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>{group.onlineMembers} online</span>
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
            {group.subject}
          </span>
          {showJoinButton && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
              Join Group
            </button>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Crown className="w-4 h-4 text-yellow-500" />
          <span>Admin: {group.admin}</span>
        </div>
        {group.isJoined && (
          <button
            onClick={() => setSelectedGroup(group.id)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Open Chat</span>
          </button>
        )}
      </div>
    </div>
  );

  if (selectedGroup) {
    const group = studyGroups.find(g => g.id === selectedGroup);
    if (!group) return null;

    return (
      <div className="space-y-6">
        {/* Chat Header */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSelectedGroup(null)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                ← Back to Groups
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{group.name}</h1>
                <p className="text-gray-600">{group.members} members • {group.onlineMembers} online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Active now</span>
            </div>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {group.messages.map((message) => (
              <div key={message.id} className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${message.isMe ? 'text-right' : ''}`}>
                  {!message.isMe && (
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`text-sm font-medium ${message.isAdmin ? 'text-yellow-600' : 'text-gray-700'}`}>
                        {message.sender}
                        {message.isAdmin && <Crown className="w-3 h-3 inline ml-1" />}
                      </span>
                    </div>
                  )}
                  <div className={`rounded-2xl p-3 ${
                    message.isMe 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p>{message.content}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 block">{message.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Study Groups</h1>
            <p className="text-gray-600">Connect with peers, share knowledge, and learn together</p>
          </div>
          <button className="mt-4 md:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>Create Group</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* My Groups */}
      {joinedGroups.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Groups</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {joinedGroups.map((group) => (
              <GroupCard key={group.id} group={group} />
            ))}
          </div>
        </div>
      )}

      {/* Available Groups */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Groups</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {availableGroups.map((group) => (
            <GroupCard key={group.id} group={group} showJoinButton />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{joinedGroups.length}</h3>
          <p className="text-gray-600">Groups Joined</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">89</h3>
          <p className="text-gray-600">Messages Sent</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Crown className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">5</h3>
          <p className="text-gray-600">Helpful Answers</p>
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;