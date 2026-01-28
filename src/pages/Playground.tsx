import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightSpecialChars, drawSelection, dropCursor, rectangularSelection, crosshairCursor, highlightActiveLine } from "@codemirror/view";
import { EditorState, Compartment } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { rust } from "@codemirror/lang-rust";
import { oneDark } from "@codemirror/theme-one-dark";
import { defaultKeymap, history, historyKeymap } from "@codemirror/commands";
import { autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap } from "@codemirror/autocomplete";
import { bracketMatching, foldGutter, foldKeymap, indentOnInput, syntaxHighlighting, defaultHighlightStyle } from "@codemirror/language";
import { motion } from "framer-motion";
import * as ts from "typescript";
import { 
  Play, 
  Save, 
  Plus, 
  X, 
  ChevronDown,
  Terminal,
  Settings,
  Maximize2,
  Minimize2,
  Copy,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const languages = [
  { id: "javascript", name: "JavaScript", extension: "js" },
  { id: "typescript", name: "TypeScript", extension: "ts" },
  { id: "python", name: "Python", extension: "py" },
  { id: "cpp", name: "C++", extension: "cpp" },
  { id: "c", name: "C", extension: "c" },
  { id: "java", name: "Java", extension: "java" },
  { id: "rust", name: "Rust", extension: "rs" },
  { id: "go", name: "Go", extension: "go" },
  { id: "ruby", name: "Ruby", extension: "rb" },
];

const defaultCode: Record<string, string> = {
  javascript: `// Welcome to CodeCraft Playground!
// Start coding in JavaScript

function greet(name) {
  return \`Hello, \${name}! Welcome to CodeCraft.\`;
}

console.log(greet("World"));

// Try the autocomplete - type 'console.' and see suggestions!
`,
  typescript: `// TypeScript with type safety
interface User {
  name: string;
  age: number;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}

const user: User = { name: "Alice", age: 25 };
console.log(greetUser(user));
`,
  python: `# Welcome to CodeCraft Playground!
# Start coding in Python

def greet(name: str) -> str:
    return f"Hello, {name}! Welcome to CodeCraft."

print(greet("World"))

# List comprehension example
numbers = [1, 2, 3, 4, 5]
squares = [n ** 2 for n in numbers]
print(f"Squares: {squares}")
`,
  cpp: `// Welcome to CodeCraft Playground!
// Start coding in C++

#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "! Welcome to CodeCraft.";
}

int main() {
    std::cout << greet("World") << std::endl;
    return 0;
}
`,
  c: `// Welcome to CodeCraft Playground!
// Start coding in C

#include <stdio.h>

void greet(const char* name) {
    printf("Hello, %s! Welcome to CodeCraft.\\n", name);
}

int main() {
    greet("World");
    return 0;
}
`,
  java: `// Welcome to CodeCraft Playground!
// Start coding in Java

public class Main {
    public static String greet(String name) {
        return "Hello, " + name + "! Welcome to CodeCraft.";
    }
    
    public static void main(String[] args) {
        System.out.println(greet("World"));
    }
}
`,
  rust: `// Welcome to CodeCraft Playground!
// Start coding in Rust

fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to CodeCraft.", name)
}

fn main() {
    println!("{}", greet("World"));
    
    // Vector example
    let numbers = vec![1, 2, 3, 4, 5];
    let squares: Vec<i32> = numbers.iter().map(|n| n * n).collect();
    println!("Squares: {:?}", squares);
}
`,
  go: `// Welcome to CodeCraft Playground!
// Start coding in Go

package main

import "fmt"

func greet(name string) string {
    return fmt.Sprintf("Hello, %s! Welcome to CodeCraft.", name)
}

func main() {
    fmt.Println(greet("World"))
}
`,
  ruby: `# Welcome to CodeCraft Playground!
# Start coding in Ruby

def greet(name)
  "Hello, #{name}! Welcome to CodeCraft."
end

puts greet("World")

# Array manipulation
numbers = [1, 2, 3, 4, 5]
squares = numbers.map { |n| n ** 2 }
puts "Squares: #{squares}"
`,
};

interface Tab {
  id: string;
  name: string;
  language: string;
  content: string;
}

export default function Playground() {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const languageCompartment = useRef(new Compartment());
  const activeTabRef = useRef<string>("");
  const tabsRef = useRef<Tab[]>([]);
  
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", name: "main.js", language: "javascript", content: defaultCode.javascript },
  ]);
  const [activeTab, setActiveTab] = useState("1");
  const [output, setOutput] = useState<string[]>([
    "CodeCraft Console v1.0.0",
    "Ready to run your code...",
  ]);
  const [isOutputExpanded, setIsOutputExpanded] = useState(true);
  const [isRunning, setIsRunning] = useState(false);

  const getLanguageExtension = useCallback((lang: string) => {
    switch (lang) {
      case "javascript":
      case "typescript":
        return javascript({ typescript: lang === "typescript" });
      case "python":
        return python();
      case "cpp":
      case "c":
        return cpp();
      case "java":
        return java();
      case "rust":
        return rust();
      default:
        return javascript();
    }
  }, []);

  const currentTab = useMemo(() => {
    return tabs.find(tab => tab.id === activeTab);
  }, [tabs, activeTab]);

  useEffect(() => {
    activeTabRef.current = activeTab;
    tabsRef.current = tabs;
  }, [activeTab, tabs]);

  useEffect(() => {
    if (!editorRef.current) return;
    if (viewRef.current) return;

    const startState = EditorState.create({
      doc: "",
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        keymap.of([
          ...closeBracketsKeymap,
          ...defaultKeymap,
          ...historyKeymap,
          ...foldKeymap,
          ...completionKeymap,
        ]),
        languageCompartment.current.of(getLanguageExtension("javascript")),
        oneDark,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newContent = update.state.doc.toString();
            const tabId = activeTabRef.current;
            setTabs(prev => prev.map(tab =>
              tab.id === tabId ? { ...tab, content: newContent } : tab
            ));
          }
        }),
        EditorView.theme({
          "&": {
            height: "100%",
            fontSize: "14px",
          },
          ".cm-scroller": {
            fontFamily: "'JetBrains Mono', monospace",
            overflow: "auto",
          },
          ".cm-content": {
            padding: "16px 0",
          },
          ".cm-gutters": {
            backgroundColor: "transparent",
            border: "none",
          },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [getLanguageExtension]);

  useEffect(() => {
    if (!viewRef.current) return;
    if (!currentTab) return;

    // Keep header language selector in sync with current file.
    setSelectedLanguage(currentTab.language);

    viewRef.current.dispatch({
      effects: languageCompartment.current.reconfigure(getLanguageExtension(currentTab.language)),
      changes: {
        from: 0,
        to: viewRef.current.state.doc.length,
        insert: currentTab.content,
      },
    });
  }, [currentTab, getLanguageExtension]);

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang);
    const langInfo = languages.find(l => l.id === lang);
    
    // Update current tab
    setTabs(prev => prev.map(tab => {
      if (tab.id === activeTab) {
        return {
          ...tab,
          language: lang,
          name: `main.${langInfo?.extension || "txt"}`,
          content: defaultCode[lang] || "",
        };
      }
      return tab;
    }));

    // Update editor language
    if (viewRef.current) {
      viewRef.current.dispatch({
        effects: languageCompartment.current.reconfigure(getLanguageExtension(lang)),
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: defaultCode[lang] || "",
        },
      });
    }
  };

  const addNewTab = () => {
    const newId = String(Date.now());
    const langInfo = languages.find(l => l.id === selectedLanguage);
    const newTab: Tab = {
      id: newId,
      name: `file${tabs.length + 1}.${langInfo?.extension || "txt"}`,
      language: selectedLanguage,
      content: "",
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTab(newId);
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      toast({
        title: "Cannot close",
        description: "You need at least one file open",
        variant: "destructive",
      });
      return;
    }
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (activeTab === tabId) {
      setActiveTab(newTabs[0].id);
    }
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput(prev => [...prev, "", `> Running ${selectedLanguage} code...`]);
    
    const startedAt = performance.now();
    const tab = tabsRef.current.find(t => t.id === activeTabRef.current);
    const code = viewRef.current?.state.doc.toString() ?? tab?.content ?? "";

    try {
      if (selectedLanguage !== "javascript" && selectedLanguage !== "typescript") {
        throw new Error(`Runner not implemented for ${selectedLanguage} yet. Try JavaScript/TypeScript for now.`);
      }

      const logs: string[] = [];
      const originalLog = console.log;
      const originalError = console.error;

      console.log = (...args: unknown[]) => {
        logs.push(args.map(a => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
        originalLog(...args);
      };
      console.error = (...args: unknown[]) => {
        logs.push(args.map(a => (typeof a === "string" ? a : JSON.stringify(a))).join(" "));
        originalError(...args);
      };

      try {
        const runnable =
          selectedLanguage === "typescript"
            ? ts.transpileModule(code, {
                compilerOptions: {
                  target: ts.ScriptTarget.ES2020,
                  module: ts.ModuleKind.ESNext,
                  jsx: ts.JsxEmit.ReactJSX,
                },
              }).outputText
            : code;

        // Execute in a function scope (no imports, browser APIs available).
        // eslint-disable-next-line no-new-func
        const fn = new Function(runnable);
        fn();
      } finally {
        console.log = originalLog;
        console.error = originalError;
      }

      const elapsed = Math.round(performance.now() - startedAt);
      setOutput(prev => [
        ...prev,
        ...(logs.length ? logs : ["(no output)"]),
        "",
        `✓ Code executed successfully`,
        `  Execution time: ${elapsed}ms`,
      ]);
    } catch (err) {
      const elapsed = Math.round(performance.now() - startedAt);
      const message = err instanceof Error ? err.message : String(err);
      setOutput(prev => [
        ...prev,
        `✗ ${message}`,
        "",
        `  Execution time: ${elapsed}ms`,
      ]);
    }
    
    setIsRunning(false);
  };

  const saveCode = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    if (currentTab) {
      localStorage.setItem(`codecraft_${currentTab.id}`, JSON.stringify(currentTab));
      toast({
        title: "Saved!",
        description: "Your code has been saved to local storage",
      });
    }
  };

  const clearOutput = () => {
    setOutput(["Console cleared", ""]);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output.join("\n"));
    toast({
      title: "Copied!",
      description: "Output copied to clipboard",
    });
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-lg">Playground</h1>
          <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-40 h-8 bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {languages.map(lang => (
                <SelectItem key={lang.id} value={lang.id}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={saveCode}>
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>
          <Button 
            variant="hero" 
            size="sm" 
            onClick={runCode}
            disabled={isRunning}
          >
            <Play className="w-4 h-4 mr-1" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="h-10 bg-secondary/50 border-b border-border flex items-center px-2 gap-1 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors group",
                activeTab === tab.id
                  ? "bg-card text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              )}
            >
              <span className="font-mono text-xs">{tab.name}</span>
              <X 
                className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                onClick={(e) => closeTab(tab.id, e)}
              />
            </button>
          ))}
          <button
            onClick={addNewTab}
            className="flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-card/50 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <div ref={editorRef} className="h-full" />
        </div>

        {/* Output Panel */}
        <motion.div 
          initial={false}
          animate={{ height: isOutputExpanded ? 200 : 40 }}
          className="border-t border-border bg-card/30 flex flex-col"
        >
          {/* Output Header */}
          <div className="h-10 flex items-center justify-between px-4 border-b border-border">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Console</span>
              <Badge variant="outline" className="text-xs">
                {output.length - 2} lines
              </Badge>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="w-7 h-7" onClick={copyOutput}>
                <Copy className="w-3.5 h-3.5" />
              </Button>
              <Button variant="ghost" size="icon" className="w-7 h-7" onClick={clearOutput}>
                <RotateCcw className="w-3.5 h-3.5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="w-7 h-7"
                onClick={() => setIsOutputExpanded(!isOutputExpanded)}
              >
                {isOutputExpanded ? (
                  <Minimize2 className="w-3.5 h-3.5" />
                ) : (
                  <Maximize2 className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
          </div>
          
          {/* Output Content */}
          {isOutputExpanded && (
            <div className="flex-1 p-4 overflow-auto font-mono text-sm">
              {output.map((line, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "leading-relaxed",
                    line.startsWith(">") && "text-primary",
                    line.startsWith("✓") && "text-success",
                    line.startsWith("✗") && "text-destructive"
                  )}
                >
                  {line || " "}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
