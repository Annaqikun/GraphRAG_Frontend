import { useState, useRef, useEffect } from "react";
import { Bot, X, Maximize2, Send, Star, ExternalLink, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Resizable } from "re-resizable";
import { ScrollArea } from "./ui/scroll-area";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Citation {
  id: number;
  title: string;
  confidence: number;
  excerpt: string;
  sources: {
    name: string;
    url?: string;
  }[];
}

interface Message {
  id: string;
  type: "ai" | "user";
  content: string;
  timestamp: string;
  sources?: number;
  citations?: Citation[];
}

// Sample citation data
const sampleCitations: Citation[] = [
  {
    id: 1,
    title: "Knowledge Graph Construction",
    confidence: 85,
    excerpt: "Knowledge graphs are structured representations of knowledge that consist of entities and their relationships. They enable semantic search and inference capabilities.",
    sources: [
      { name: "Introduction to Knowledge Graphs", url: "#" },
      { name: "Semantic Web Technologies", url: "#" },
    ],
  },
  {
    id: 2,
    title: "Chatbot Website Use Case Diagram",
    confidence: 90,
    excerpt: "upload documents to the system. This functionally 'extends' to 'View Graph', implying uploaded documents might be processed and visualized graphically.",
    sources: [
      { name: "Knowledge Graph Base...", url: "#" },
      { name: "Chatbot Website Use ...", url: "#" },
    ],
  },
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedLLM, setSelectedLLM] = useState("gpt-4");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! 👋 I'm your AI research assistant. You can ask me anything about your uploaded documents. I'll provide detailed answers with citations from your knowledge base. What would you like to know?",
      timestamp: "3:33 PM",
      sources: 0,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Position the window in the bottom right on first open
  useEffect(() => {
    if (isOpen && position.x === 0 && position.y === 0) {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      setPosition({
        x: windowWidth - 470,
        y: windowHeight - 630,
      });
    }
  }, [isOpen, position]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (dragRef.current && e.target === dragRef.current) {
      setIsDragging(true);
      dragStartPos.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");

    // Simulate AI response with citations
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content:
          "Based on your knowledge graph, the system allows users to upload documents and visualize them as connected entities [Citation 2]. The graph structure enables semantic relationships between concepts [Citation 1].",
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        }),
        sources: 2,
        citations: sampleCitations,
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // Function to render message content with clickable citations
  const renderMessageContent = (message: Message) => {
    if (!message.citations || message.citations.length === 0) {
      return <p className="text-sm leading-relaxed">{message.content}</p>;
    }

    const parts = message.content.split(/(\[Citation \d+\])/g);

    return (
      <p className="text-sm leading-relaxed">
        {parts.map((part, index) => {
          const citationMatch = part.match(/\[Citation (\d+)\]/);
          if (citationMatch) {
            const citationId = parseInt(citationMatch[1]);
            const citation = message.citations?.find((c) => c.id === citationId);

            if (citation) {
              return (
                <HoverCard key={index}>
                  <HoverCardTrigger asChild>
                    <button className="text-indigo-600 hover:text-indigo-700 hover:underline">
                      {part}
                    </button>
                  </HoverCardTrigger>
                  <HoverCardContent
                    className="w-96 p-0 overflow-hidden"
                    side="top"
                    align="start"
                  >
                    <div className="bg-white">
                      {/* Citation Header */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="text-sm text-gray-900 flex-1">{citation.title}</h4>
                          <div className="flex items-center gap-1 px-2 py-1 bg-gray-50 rounded">
                            <Star size={12} className="text-gray-600 fill-gray-600" />
                            <span className="text-xs text-gray-700">{citation.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Citation Content */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-xs text-gray-700 leading-relaxed">
                          {citation.excerpt}
                        </p>
                      </div>

                      {/* Open Source Button */}
                      <div className="px-4 py-3 border-b border-gray-100 flex justify-center">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm text-gray-700">
                          <ExternalLink size={14} />
                          Open Source
                        </button>
                      </div>

                      {/* Sources List */}
                      <div className="px-4 py-3 bg-gray-50">
                        <p className="text-xs text-gray-600 mb-2">Sources:</p>
                        <div className="space-y-1.5">
                          {citation.sources.map((source, idx) => (
                            <button
                              key={idx}
                              className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg hover:bg-gray-100 transition-colors w-full text-left"
                            >
                              <ExternalLink size={12} className="text-gray-500 flex-shrink-0" />
                              <span className="text-xs text-gray-700 truncate">{source.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            }
          }
          return <span key={index}>{part}</span>;
        })}
      </p>
    );
  };

  return (
    <>
      {/* Floating AI Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-500 hover:bg-indigo-600 rounded-full shadow-lg flex items-center justify-center z-40 transition-colors"
      >
        <Bot size={24} className="text-white" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            style={{
              position: "fixed",
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: 50,
            }}
          >
            <Resizable
              defaultSize={{
                width: 450,
                height: 550,
              }}
              minWidth={400}
              minHeight={500}
              maxWidth={800}
              maxHeight={900}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
            >
              <div className="h-full flex flex-col">
                {/* Header */}
                <div className="border-b border-gray-100">
                  <div
                    ref={dragRef}
                    onMouseDown={handleMouseDown}
                    className="flex items-center justify-between px-5 py-4 cursor-move select-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center">
                        <Bot size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-gray-900">AI Assistant</h3>
                        <p className="text-xs text-gray-500">20 documents</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                      >
                        <Maximize2 size={16} className="text-gray-600" />
                      </button>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors"
                      >
                        <X size={16} className="text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* LLM Selector */}
                  <div className="px-5 pb-4">
                    <Select value={selectedLLM} onValueChange={setSelectedLLM}>
                      <SelectTrigger className="w-full bg-gray-50 border-gray-200 h-10">
                        <SelectValue placeholder="Select LLM" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        <SelectItem value="gpt-4-turbo">GPT-4 Turbo</SelectItem>
                        <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
                        <SelectItem value="claude-3-opus">Claude 3 Opus</SelectItem>
                        <SelectItem value="claude-3-sonnet">Claude 3 Sonnet</SelectItem>
                        <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                        <SelectItem value="llama-2-70b">Llama 2 70B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Messages Area */}
                <ScrollArea className="flex-1 p-5">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="flex gap-3">
                        {message.type === "ai" && (
                          <div className="w-10 h-10 flex-shrink-0 bg-indigo-500 rounded-full flex items-center justify-center">
                            <Bot size={20} className="text-white" />
                          </div>
                        )}
                        <div className={message.type === "user" ? "ml-auto" : "flex-1"}>
                          <div
                            className={`rounded-2xl p-4 ${
                              message.type === "ai"
                                ? "bg-gray-50 text-gray-900"
                                : "bg-indigo-500 text-white ml-auto max-w-md"
                            }`}
                          >
                            {message.type === "ai" ? (
                              renderMessageContent(message)
                            ) : (
                              <p className="text-sm leading-relaxed">{message.content}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                            <span>{message.timestamp}</span>
                            {message.type === "ai" && message.sources !== undefined && message.sources > 0 && (
                              <>
                                <span>•</span>
                                <span>{message.sources} sources</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      placeholder="Ask about your research..."
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="w-12 h-12 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-colors"
                    >
                      <Send size={18} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </Resizable>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
