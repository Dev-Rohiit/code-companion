import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Filter,
  Target,
  Flame,
  ChevronRight,
  Tag,
  Clock,
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

const problems = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    topics: ["Array", "Hash Table"],
    acceptance: 89,
    xp: 50,
    solved: true,
  },
  {
    id: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    topics: ["Linked List", "Math"],
    acceptance: 65,
    xp: 100,
    solved: true,
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    topics: ["String", "Sliding Window"],
    acceptance: 58,
    xp: 100,
    solved: false,
  },
  {
    id: "4",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    topics: ["Array", "Binary Search"],
    acceptance: 42,
    xp: 200,
    solved: false,
  },
  {
    id: "5",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    topics: ["String", "Dynamic Programming"],
    acceptance: 54,
    xp: 100,
    solved: false,
  },
  {
    id: "6",
    title: "Container With Most Water",
    difficulty: "Medium",
    topics: ["Array", "Two Pointers"],
    acceptance: 72,
    xp: 100,
    solved: true,
  },
  {
    id: "7",
    title: "3Sum",
    difficulty: "Medium",
    topics: ["Array", "Two Pointers", "Sorting"],
    acceptance: 48,
    xp: 100,
    solved: false,
  },
  {
    id: "8",
    title: "Valid Parentheses",
    difficulty: "Easy",
    topics: ["Stack", "String"],
    acceptance: 85,
    xp: 50,
    solved: true,
  },
  {
    id: "9",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    topics: ["Linked List", "Divide and Conquer", "Heap"],
    acceptance: 38,
    xp: 200,
    solved: false,
  },
  {
    id: "10",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    topics: ["Array", "Dynamic Programming"],
    acceptance: 78,
    xp: 50,
    solved: true,
  },
];

const difficultyColors = {
  Easy: "bg-success/10 text-success border-success/30",
  Medium: "bg-warning/10 text-warning border-warning/30",
  Hard: "bg-destructive/10 text-destructive border-destructive/30",
};

export default function Practice() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [topicFilter, setTopicFilter] = useState("all");

  const allTopics = [...new Set(problems.flatMap(p => p.topics))];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === "all" || problem.difficulty === difficultyFilter;
    const matchesTopic = topicFilter === "all" || problem.topics.includes(topicFilter);
    return matchesSearch && matchesDifficulty && matchesTopic;
  });

  const stats = {
    total: problems.length,
    solved: problems.filter(p => p.solved).length,
    easy: problems.filter(p => p.difficulty === "Easy" && p.solved).length,
    medium: problems.filter(p => p.difficulty === "Medium" && p.solved).length,
    hard: problems.filter(p => p.difficulty === "Hard" && p.solved).length,
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 pb-24 lg:pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold mb-2">Practice Problems</h1>
          <p className="text-muted-foreground">Sharpen your skills with curated coding challenges</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="glass-card rounded-xl p-4 text-center col-span-2 md:col-span-1">
            <Trophy className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold">{stats.solved}/{stats.total}</p>
            <p className="text-xs text-muted-foreground">Solved</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-2 h-2 rounded-full bg-success mx-auto mb-2" />
            <p className="text-xl font-bold text-success">{stats.easy}</p>
            <p className="text-xs text-muted-foreground">Easy</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-2 h-2 rounded-full bg-warning mx-auto mb-2" />
            <p className="text-xl font-bold text-warning">{stats.medium}</p>
            <p className="text-xs text-muted-foreground">Medium</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <div className="w-2 h-2 rounded-full bg-destructive mx-auto mb-2" />
            <p className="text-xl font-bold text-destructive">{stats.hard}</p>
            <p className="text-xs text-muted-foreground">Hard</p>
          </div>
          <div className="glass-card rounded-xl p-4 text-center col-span-2 md:col-span-1">
            <Flame className="w-5 h-5 text-streak mx-auto mb-2" />
            <p className="text-xl font-bold">750</p>
            <p className="text-xs text-muted-foreground">XP Earned</p>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col md:flex-row gap-4 mb-6"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="flex gap-2">
            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger className="w-32 bg-secondary border-border">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>
            <Select value={topicFilter} onValueChange={setTopicFilter}>
              <SelectTrigger className="w-40 bg-secondary border-border">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                {allTopics.map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Problems List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          {/* Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-secondary/50 text-sm text-muted-foreground font-medium">
            <div className="col-span-1">Status</div>
            <div className="col-span-5">Problem</div>
            <div className="col-span-2">Difficulty</div>
            <div className="col-span-2">Acceptance</div>
            <div className="col-span-2">XP</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-border">
            {filteredProblems.map((problem, index) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-secondary/30 transition-colors items-center"
              >
                <div className="md:col-span-1 flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    problem.solved ? "bg-success" : "bg-secondary"
                  }`}>
                    {problem.solved && (
                      <svg className="w-3 h-3 text-success-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="md:hidden text-sm text-muted-foreground">#{problem.id}</span>
                </div>
                
                <div className="md:col-span-5">
                  <p className="font-medium mb-1 group-hover:text-primary transition-colors">
                    {problem.id}. {problem.title}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {problem.topics.map(topic => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Badge 
                    variant="outline" 
                    className={difficultyColors[problem.difficulty as keyof typeof difficultyColors]}
                  >
                    {problem.difficulty}
                  </Badge>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${problem.acceptance}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-10">{problem.acceptance}%</span>
                  </div>
                </div>
                
                <div className="md:col-span-2 flex items-center justify-between">
                  <Badge variant="outline" className="text-xp border-xp/30">
                    +{problem.xp} XP
                  </Badge>
                  <ChevronRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {filteredProblems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-muted-foreground">No problems found matching your criteria.</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter("all");
                setTopicFilter("all");
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
