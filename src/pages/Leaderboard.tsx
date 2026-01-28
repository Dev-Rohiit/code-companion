import { motion } from "framer-motion";
import { 
  Trophy, 
  Medal, 
  Crown,
  Flame,
  Zap,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const leaderboardData = [
  { rank: 1, name: "AlgoMaster", xp: 125400, streak: 120, problems: 450, change: "same", avatar: "AM", badges: ["🏆", "⚡", "🔥"] },
  { rank: 2, name: "CodeNinja", xp: 118200, streak: 95, problems: 425, change: "up", avatar: "CN", badges: ["🥈", "💎", "🌟"] },
  { rank: 3, name: "DevWarrior", xp: 112500, streak: 88, problems: 398, change: "up", avatar: "DW", badges: ["🥉", "🎯", "⭐"] },
  { rank: 4, name: "ByteCrusher", xp: 98700, streak: 75, problems: 356, change: "down", avatar: "BC", badges: ["🔥", "💪"] },
  { rank: 5, name: "SyntaxSage", xp: 95200, streak: 82, problems: 342, change: "same", avatar: "SS", badges: ["🧠", "✨"] },
  { rank: 6, name: "LogicLord", xp: 89400, streak: 60, problems: 315, change: "up", avatar: "LL", badges: ["🎓", "🌈"] },
  { rank: 7, name: "DataDragon", xp: 84100, streak: 55, problems: 298, change: "down", avatar: "DD", badges: ["🐉", "💫"] },
  { rank: 8, name: "StackSurfer", xp: 78900, streak: 48, problems: 275, change: "same", avatar: "ST", badges: ["🏄", "🌊"] },
  { rank: 9, name: "ArrayAce", xp: 72500, streak: 42, problems: 258, change: "up", avatar: "AA", badges: ["🎰", "🎲"] },
  { rank: 10, name: "RecursiveRuby", xp: 68200, streak: 35, problems: 235, change: "down", avatar: "RR", badges: ["💎", "🔄"] },
];

const currentUser = {
  rank: 124,
  name: "You",
  xp: 2450,
  streak: 7,
  problems: 47,
  change: "up",
  avatar: "YO",
  badges: ["🎯", "🔥"],
};

const rankColors = [
  "from-yellow-500 to-amber-600", // 1st
  "from-slate-300 to-slate-400", // 2nd
  "from-orange-400 to-orange-600", // 3rd
];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">Compete with coders worldwide</p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {/* 2nd Place */}
          <div className="flex flex-col items-center pt-8">
            <div className="relative">
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${rankColors[1]} flex items-center justify-center text-xl md:text-2xl font-bold shadow-lg`}>
                {leaderboardData[1].avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-slate-400 flex items-center justify-center">
                <Medal className="w-5 h-5 text-slate-700" />
              </div>
            </div>
            <p className="mt-4 font-semibold text-sm md:text-base">{leaderboardData[1].name}</p>
            <p className="text-xs md:text-sm text-muted-foreground">{leaderboardData[1].xp.toLocaleString()} XP</p>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${rankColors[0]} flex items-center justify-center text-2xl md:text-3xl font-bold shadow-xl animate-pulse-glow`}>
                {leaderboardData[0].avatar}
              </div>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <Crown className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-yellow-900" />
              </div>
            </div>
            <p className="mt-4 font-bold text-base md:text-lg gradient-text">{leaderboardData[0].name}</p>
            <p className="text-sm text-muted-foreground">{leaderboardData[0].xp.toLocaleString()} XP</p>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center pt-12">
            <div className="relative">
              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${rankColors[2]} flex items-center justify-center text-lg md:text-xl font-bold shadow-lg`}>
                {leaderboardData[2].avatar}
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-orange-500 flex items-center justify-center">
                <Medal className="w-4 h-4 text-orange-900" />
              </div>
            </div>
            <p className="mt-4 font-semibold text-sm md:text-base">{leaderboardData[2].name}</p>
            <p className="text-xs md:text-sm text-muted-foreground">{leaderboardData[2].xp.toLocaleString()} XP</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="weekly" className="mb-6">
          <TabsList className="grid w-full grid-cols-3 bg-secondary">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="alltime">All Time</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-secondary/50 text-sm text-muted-foreground font-medium">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">User</div>
            <div className="col-span-2 text-center">XP</div>
            <div className="col-span-2 text-center">Streak</div>
            <div className="col-span-2 text-center">Problems</div>
            <div className="col-span-1 text-center">Badges</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.03 }}
                className="grid grid-cols-12 gap-4 p-4 hover:bg-secondary/30 transition-colors items-center"
              >
                <div className="col-span-2 md:col-span-1 flex items-center gap-2">
                  <span className={`font-bold ${index < 3 ? 'text-lg' : ''}`}>
                    {user.rank}
                  </span>
                  {user.change === "up" && <ArrowUp className="w-3 h-3 text-success" />}
                  {user.change === "down" && <ArrowDown className="w-3 h-3 text-destructive" />}
                  {user.change === "same" && <Minus className="w-3 h-3 text-muted-foreground" />}
                </div>
                
                <div className="col-span-6 md:col-span-4 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                    index < 3 
                      ? `bg-gradient-to-br ${rankColors[index]}` 
                      : 'bg-secondary'
                  }`}>
                    {user.avatar}
                  </div>
                  <span className="font-semibold">{user.name}</span>
                </div>
                
                <div className="col-span-4 md:col-span-2 text-center flex items-center justify-center gap-1">
                  <Zap className="w-4 h-4 text-xp" />
                  <span className="font-semibold">{user.xp.toLocaleString()}</span>
                </div>
                
                <div className="hidden md:flex col-span-2 items-center justify-center gap-1">
                  <Flame className="w-4 h-4 text-streak" />
                  <span>{user.streak}</span>
                </div>
                
                <div className="hidden md:flex col-span-2 items-center justify-center gap-1">
                  <Star className="w-4 h-4 text-primary" />
                  <span>{user.problems}</span>
                </div>
                
                <div className="hidden md:flex col-span-1 items-center justify-center gap-0.5">
                  {user.badges.slice(0, 3).map((badge, i) => (
                    <span key={i} className="text-sm">{badge}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Your Ranking */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 glass-card rounded-xl p-4 border-primary/30 glow-primary"
        >
          <div className="grid grid-cols-12 gap-4 items-center">
            <div className="col-span-2 md:col-span-1 flex items-center gap-2">
              <span className="font-bold text-primary">{currentUser.rank}</span>
              <ArrowUp className="w-3 h-3 text-success" />
            </div>
            
            <div className="col-span-6 md:col-span-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center font-bold text-sm">
                {currentUser.avatar}
              </div>
              <div>
                <span className="font-semibold">{currentUser.name}</span>
                <p className="text-xs text-muted-foreground">Your current rank</p>
              </div>
            </div>
            
            <div className="col-span-4 md:col-span-2 text-center flex items-center justify-center gap-1">
              <Zap className="w-4 h-4 text-xp" />
              <span className="font-semibold">{currentUser.xp.toLocaleString()}</span>
            </div>
            
            <div className="hidden md:flex col-span-2 items-center justify-center gap-1">
              <Flame className="w-4 h-4 text-streak" />
              <span>{currentUser.streak}</span>
            </div>
            
            <div className="hidden md:flex col-span-2 items-center justify-center gap-1">
              <Star className="w-4 h-4 text-primary" />
              <span>{currentUser.problems}</span>
            </div>
            
            <div className="hidden md:flex col-span-1 items-center justify-center gap-0.5">
              {currentUser.badges.map((badge, i) => (
                <span key={i} className="text-sm">{badge}</span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
