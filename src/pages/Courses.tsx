import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter, 
  Clock, 
  Users, 
  Star,
  ChevronRight,
  BookOpen,
  Trophy,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const courses = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Master the basics of JavaScript programming from scratch. Learn variables, functions, objects, and more.",
    language: "JavaScript",
    level: "Beginner",
    duration: "10 hours",
    lessons: 20,
    students: 12500,
    rating: 4.9,
    icon: "🟨",
    color: "from-yellow-500/20 to-yellow-600/20",
    border: "border-yellow-500/30",
  },
  {
    id: "2",
    title: "Python for Data Science",
    description: "Learn Python with a focus on data analysis, visualization, and machine learning basics.",
    language: "Python",
    level: "Intermediate",
    duration: "15 hours",
    lessons: 28,
    students: 8400,
    rating: 4.8,
    icon: "🐍",
    color: "from-blue-500/20 to-green-500/20",
    border: "border-green-500/30",
  },
  {
    id: "3",
    title: "TypeScript Mastery",
    description: "Take your JavaScript skills to the next level with TypeScript's type system and advanced features.",
    language: "TypeScript",
    level: "Advanced",
    duration: "12 hours",
    lessons: 24,
    students: 5600,
    rating: 4.9,
    icon: "🔷",
    color: "from-blue-500/20 to-blue-600/20",
    border: "border-blue-500/30",
  },
  {
    id: "4",
    title: "C++ for Competitive Programming",
    description: "Master C++ for competitive programming with focus on algorithms and data structures.",
    language: "C++",
    level: "Advanced",
    duration: "20 hours",
    lessons: 35,
    students: 3200,
    rating: 4.7,
    icon: "⚡",
    color: "from-purple-500/20 to-blue-500/20",
    border: "border-purple-500/30",
  },
  {
    id: "5",
    title: "Java Complete Course",
    description: "Comprehensive Java course covering core concepts, OOP, and enterprise development basics.",
    language: "Java",
    level: "Beginner",
    duration: "18 hours",
    lessons: 30,
    students: 9800,
    rating: 4.6,
    icon: "☕",
    color: "from-red-500/20 to-orange-500/20",
    border: "border-orange-500/30",
  },
  {
    id: "6",
    title: "Rust Systems Programming",
    description: "Learn Rust for safe, concurrent, and performant systems programming.",
    language: "Rust",
    level: "Intermediate",
    duration: "16 hours",
    lessons: 26,
    students: 2100,
    rating: 4.8,
    icon: "🦀",
    color: "from-orange-500/20 to-red-500/20",
    border: "border-red-500/30",
  },
  {
    id: "7",
    title: "Go Backend Development",
    description: "Build fast and efficient backend services with Go. Learn concurrency, APIs, and microservices.",
    language: "Go",
    level: "Intermediate",
    duration: "14 hours",
    lessons: 22,
    students: 4300,
    rating: 4.7,
    icon: "🐹",
    color: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
  },
  {
    id: "8",
    title: "Ruby on Rails Bootcamp",
    description: "Full-stack web development with Ruby on Rails. Build real-world applications from scratch.",
    language: "Ruby",
    level: "Beginner",
    duration: "22 hours",
    lessons: 38,
    students: 3800,
    rating: 4.5,
    icon: "💎",
    color: "from-red-500/20 to-pink-500/20",
    border: "border-pink-500/30",
  },
];

const levelColors = {
  Beginner: "bg-success/10 text-success border-success/30",
  Intermediate: "bg-warning/10 text-warning border-warning/30",
  Advanced: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [languageFilter, setLanguageFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = languageFilter === "all" || course.language === languageFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    return matchesSearch && matchesLanguage && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
          <p className="text-muted-foreground">Choose from our curated learning paths to master any language</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-2">
            <Select value={languageFilter} onValueChange={setLanguageFilter}>
              <SelectTrigger className="w-40 bg-secondary border-border">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="JavaScript">JavaScript</SelectItem>
                <SelectItem value="Python">Python</SelectItem>
                <SelectItem value="TypeScript">TypeScript</SelectItem>
                <SelectItem value="C++">C++</SelectItem>
                <SelectItem value="Java">Java</SelectItem>
                <SelectItem value="Rust">Rust</SelectItem>
                <SelectItem value="Go">Go</SelectItem>
                <SelectItem value="Ruby">Ruby</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40 bg-secondary border-border">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { icon: BookOpen, label: "Total Courses", value: "8" },
            { icon: Clock, label: "Hours of Content", value: "127+" },
            { icon: Users, label: "Students", value: "50K+" },
            { icon: Trophy, label: "Completions", value: "25K+" },
          ].map((stat, index) => (
            <div key={stat.label} className="glass-card rounded-xl p-4 text-center">
              <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <Link to={`/course/${course.id}`}>
                <div className={`glass-card rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 group cursor-pointer ${course.border}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${course.color} flex items-center justify-center text-3xl`}>
                      {course.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                          {course.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={levelColors[course.level as keyof typeof levelColors]}>
                          {course.level}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {course.language}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        {course.lessons} lessons
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-xp text-xp" />
                        <span className="font-semibold">{course.rating}</span>
                      </div>
                      <span className="text-muted-foreground">
                        ({(course.students / 1000).toFixed(1)}k)
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {course.students.toLocaleString()} students enrolled
                    </span>
                    <Button variant="ghost" size="sm" className="group-hover:text-primary">
                      Start Learning
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No courses found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setLanguageFilter("all");
                setLevelFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
