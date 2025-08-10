import React, { useState } from 'react';
import { Gift, Users, Copy, Share2, Trophy, Star, ExternalLink } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Referral: React.FC = () => {
  const { stats } = useUser();
  const [copied, setCopied] = useState(false);
  
  const referralCode = 'NGS' + stats.rank.toString().padStart(4, '0');
  const referralLink = `https://neogenstudy.com/signup?ref=${referralCode}`;
  
  const referralStats = {
    totalReferrals: 8,
    successfulReferrals: 6,
    pointsEarned: 300,
    currentMonthReferrals: 3
  };

  const rewards = [
    { points: 50, reward: 'Premium Notes Access', description: '1 month access to premium study materials', claimed: true },
    { points: 100, reward: 'Mock Test Bundle', description: '10 additional mock tests', claimed: true },
    { points: 200, reward: 'Doubt Solver Pro', description: 'Priority doubt solving for 1 month', claimed: false },
    { points: 500, reward: 'Personal Mentor', description: '1-on-1 mentoring session', claimed: false },
    { points: 1000, reward: 'Course Scholarship', description: '50% off on premium course', claimed: false }
  ];

  const leaderboard = [
    { rank: 1, name: 'Priya Sharma', referrals: 25, points: 1250 },
    { rank: 2, name: 'Arjun Patel', referrals: 22, points: 1100 },
    { rank: 3, name: 'Kavya Reddy', referrals: 18, points: 900 },
    { rank: 4, name: 'You', referrals: referralStats.successfulReferrals, points: referralStats.pointsEarned },
    { rank: 5, name: 'Rohit Kumar', referrals: 12, points: 600 }
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareViaWebAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join NeoGenStudy',
          text: 'Join me on NeoGenStudy and ace your competitive exams!',
          url: referralLink,
        });
      } catch (err) {
        console.error('Error sharing: ', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Refer & Earn</h1>
            <p className="text-purple-100 text-lg mb-4">
              Invite friends and earn amazing rewards together!
            </p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">{referralStats.successfulReferrals} friends joined</span>
              </div>
              <div className="flex items-center space-x-2">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">{referralStats.pointsEarned} points earned</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-32 h-32 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Gift className="w-16 h-16" />
            </div>
          </div>
        </div>
      </div>

      {/* Referral Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{referralStats.totalReferrals}</h3>
          <p className="text-gray-600">Total Invites</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{referralStats.successfulReferrals}</h3>
          <p className="text-gray-600">Successful Referrals</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Gift className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{referralStats.pointsEarned}</h3>
          <p className="text-gray-600">Points Earned</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-md text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{referralStats.currentMonthReferrals}</h3>
          <p className="text-gray-600">This Month</p>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Referral Link</h2>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Your Referral Code</p>
              <p className="text-2xl font-bold text-blue-600">{referralCode}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Earn per referral</p>
              <p className="text-2xl font-bold text-green-600">50 pts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700"
            />
            <button
              onClick={copyToClipboard}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                copied 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              <Copy className="w-5 h-5" />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
            <button
              onClick={shareViaWebAPI}
              className="flex items-center space-x-2 px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Step 1</h3>
            <p className="text-sm text-blue-700">Share your unique referral link with friends</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">Step 2</h3>
            <p className="text-sm text-green-700">They sign up and start their study journey</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-2">Step 3</h3>
            <p className="text-sm text-purple-700">You both earn points and unlock rewards</p>
          </div>
        </div>
      </div>

      {/* Rewards Catalog */}
      <div className="bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Rewards Catalog</h2>
        
        <div className="space-y-4">
          {rewards.map((reward, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-6 rounded-lg border-2 transition-colors ${
                reward.claimed 
                  ? 'border-green-200 bg-green-50' 
                  : referralStats.pointsEarned >= reward.points
                  ? 'border-blue-200 bg-blue-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  reward.claimed 
                    ? 'bg-green-100' 
                    : referralStats.pointsEarned >= reward.points
                    ? 'bg-blue-100'
                    : 'bg-gray-100'
                }`}>
                  <Gift className={`w-6 h-6 ${
                    reward.claimed 
                      ? 'text-green-600' 
                      : referralStats.pointsEarned >= reward.points
                      ? 'text-blue-600'
                      : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{reward.reward}</h3>
                  <p className="text-sm text-gray-600">{reward.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="font-bold text-gray-900">{reward.points} pts</p>
                  {!reward.claimed && referralStats.pointsEarned < reward.points && (
                    <p className="text-sm text-gray-500">
                      {reward.points - referralStats.pointsEarned} more needed
                    </p>
                  )}
                </div>
                
                {reward.claimed ? (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Claimed
                  </span>
                ) : referralStats.pointsEarned >= reward.points ? (
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Claim
                  </button>
                ) : (
                  <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm font-medium">
                    Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-xl p-8 shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Referral Leaderboard</h2>
        
        <div className="space-y-3">
          {leaderboard.map((user, index) => (
            <div 
              key={index}
              className={`flex items-center justify-between p-4 rounded-lg ${
                user.name === 'You' 
                  ? 'bg-blue-50 border-2 border-blue-200' 
                  : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  user.rank === 1 ? 'bg-yellow-100 text-yellow-700' :
                  user.rank === 2 ? 'bg-gray-100 text-gray-700' :
                  user.rank === 3 ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {user.rank}
                </div>
                <div>
                  <p className={`font-semibold ${user.name === 'You' ? 'text-blue-900' : 'text-gray-900'}`}>
                    {user.name}
                  </p>
                  <p className="text-sm text-gray-600">{user.referrals} successful referrals</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gray-900">{user.points} pts</p>
                {user.rank <= 3 && (
                  <div className="flex items-center space-x-1">
                    <Trophy className={`w-4 h-4 ${
                      user.rank === 1 ? 'text-yellow-500' :
                      user.rank === 2 ? 'text-gray-500' :
                      'text-orange-500'
                    }`} />
                    <span className="text-xs text-gray-500">Top {user.rank}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Sharing */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">🚀 Spread the Word!</h2>
        <p className="text-green-100 mb-6">
          Help your friends succeed in their competitive exams while earning amazing rewards for yourself!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={`https://wa.me/?text=Join me on NeoGenStudy and ace your competitive exams! ${referralLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Share on WhatsApp</span>
          </a>
          
          <a
            href={`https://twitter.com/intent/tweet?text=Join me on NeoGenStudy and ace your competitive exams!&url=${referralLink}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            <span>Share on Twitter</span>
          </a>
          
          <button
            onClick={shareViaWebAPI}
            className="flex items-center justify-center space-x-2 bg-white bg-opacity-20 rounded-lg p-3 hover:bg-opacity-30 transition-colors"
          >
            <Share2 className="w-5 h-5" />
            <span>More Options</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Referral;