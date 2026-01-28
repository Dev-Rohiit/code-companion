import { motion } from "framer-motion";
import { 
  Flame, 
  Zap, 
  Trophy, 
  Target,
  BookOpen,
  Clock,
  TrendingUp,
  Calendar,
  ChevronRight,
  Star,
  Award,
  Play,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const streakData = [true, true, true, true, true, false, true]; // Last 7 days

const currentCourse = {
  title: "JavaScript Fundamentals",
  progress: 65,
  lessonsCompleted: 13,
  totalLessons: 20,
  nextLesson: "Array Methods Deep Dive",
};

const recentActivity = [
  { type: "lesson", title: "Variables and Data Types", time: "2 hours ago", xp: 50 },
  { type: "problem", title: "Two Sum", time: "Yesterday", xp: 100 },
  { type: "badge", title: "7 Day Streak!", time: "Yesterday", xp: 200 },
  { type: "lesson", title: "Functions Basics", time: "2 days ago", xp: 50 },
];

const badges = [
  { name: "First Steps", icon: "🎯", earned: true },
  { name: "Week Warrior", icon: "🔥", earned: true },
  { name: "Problem Solver", icon: "🧩", earned: true },
  { name: "Speed Demon", icon: "⚡", earned: false },
  { name: "Perfectionist", icon: "💎", earned: false },
  { name: "Mentor", icon: "🎓", earned: false },
];

const recommendedCourses = [
  { title: "Python for Beginners", level: "Beginner", duration: "8 hours", image: "🐍" },
  { title: "Advanced TypeScript", level: "Advanced", duration: "12 hours", image: "🔷" },
  { title: "Data Structures", level: "Intermediate", duration: "15 hours", image: "🌳" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h1>
          <p className="text-muted-foreground">Keep up the great work. You're making amazing progress!</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Flame, label: "Day Streak", value: "7", color: "text-streak", bg: "bg-streak/10" },
            { icon: Zap, label: "Total XP", value: "2,450", color: "text-xp", bg: "bg-xp/10" },
            { icon: Trophy, label: "Rank", value: "#124", color: "text-primary", bg: "bg-primary/10" },
            { icon: Target, label: "Problems", value: "47", color: "text-accent", bg: "bg-accent/10" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card rounded-xl p-4"
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Streak Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  This Week's Progress
                </h2>
                <Badge variant="outline" className="border-streak text-streak">
                  <Flame className="w-3 h-3 mr-1" />
                  7 Day Streak
                </Badge>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <div key={day} className="text-center">
                    <p className="text-xs text-muted-foreground mb-2">{day}</p>
                    <div
                      className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center ${
                        streakData[index]
                          ? "bg-gradient-to-br from-primary to-cyan-400"
                          : "bg-secondary"
                      }`}
                    >
                      {streakData[index] ? (
                        <Flame className="w-5 h-5 text-primary-foreground" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Current Course */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Continue Learning
                </h2>
                <Link to="/courses">
                  <Button variant="ghost" size="sm">
                    View All
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-secondary/50 rounded-xl p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{currentCourse.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {currentCourse.lessonsCompleted} of {currentCourse.totalLessons} lessons completed
                    </p>
                  </div>
                  <span className="text-2xl">📦</span>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-semibold">{currentCourse.progress}%</span>
                  </div>
                  <Progress value={currentCourse.progress} className="h-2" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">Next lesson:</p>
                    <p className="text-sm font-medium">{currentCourse.nextLesson}</p>
                  </div>
                  <Link to="/lesson/1">
                    <Button variant="hero" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      Continue
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="font-semibold flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" />
                Recent Activity
              </h2>
              
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        activity.type === "badge" ? "bg-xp/20" : "bg-primary/10"
                      }`}>
                        {activity.type === "lesson" && <BookOpen className="w-4 h-4 text-primary" />}
                        {activity.type === "problem" && <Target className="w-4 h-4 text-primary" />}
                        {activity.type === "badge" && <Award className="w-4 h-4 text-xp" />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xp border-xp/30">
                      +{activity.xp} XP
                    </Badge>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Daily Goal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="font-semibold flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-primary" />
                Daily Goal
              </h2>
              
              <div className="relative mb-4">
                <div className="w-32 h-32 mx-auto">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="none"
                      className="text-secondary"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="url(#gradient)"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset="75.36"
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="hsl(173, 80%, 50%)" />
                        <stop offset="100%" stopColor="hsl(200, 90%, 55%)" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-2xl font-bold">70%</p>
                      <p className="text-xs text-muted-foreground">Complete</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Complete 2 more lessons to reach your daily goal
                </p>
                <Link to="/courses">
                  <Button variant="outline" size="sm" className="w-full">
                    Start a Lesson
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Badges
                </h2>
                <span className="text-sm text-muted-foreground">3/6</span>
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge) => (
                  <div
                    key={badge.name}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center p-2 ${
                      badge.earned
                        ? "bg-secondary"
                        : "bg-secondary/30 opacity-50"
                    }`}
                  >
                    <span className="text-2xl mb-1">{badge.icon}</span>
                    <span className="text-[10px] text-center text-muted-foreground leading-tight">
                      {badge.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recommended Courses */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl p-6"
            >
              <h2 className="font-semibold flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-primary" />
                Recommended
              </h2>
              
              <div className="space-y-3">
                {recommendedCourses.map((course) => (
                  <Link 
                    key={course.title}
                    to="/courses"
                    className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <span className="text-2xl">{course.image}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{course.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{course.level}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {course.duration}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
