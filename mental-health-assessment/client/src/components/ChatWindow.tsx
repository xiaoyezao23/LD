import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageCircle, 
  X, 
  Send, 
  Heart,
  Sparkles
} from "lucide-react";

/**
 * 聊天窗口组件
 * 设计风格：温暖陪伴风格
 * 用于5-9分区间用户的情绪缓冲和初步沟通
 * 
 * 主要目的：
 * 1. 帮助用户泄压、情绪释放
 * 2. 初步了解用户状态
 * 3. 筛查是否有隐藏的风险信号
 */

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  scaleName: string;
  score: number;
}

// 预设的温暖回复（静态版本，后续可接入AI）
const warmResponses = [
  "我听到你了，谢谢你愿意和我分享。能告诉我更多关于你最近的感受吗？",
  "你的感受是完全可以理解的。在这段时间里，有什么特别让你感到困扰的事情吗？",
  "谢谢你的信任。你现在感觉怎么样？有什么我可以帮助你的吗？",
  "我理解这对你来说可能不容易。你愿意多说说最近发生了什么吗？",
  "你的感受很重要。除了这些，还有什么其他的想法或感受想要分享的吗？"
];

export default function ChatWindow({ 
  isOpen, 
  onClose, 
  onOpen,
  scaleName,
  score 
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `你好，我注意到你在${scaleName}中的得分是${score}分。这个分数说明你最近可能有一些轻微的情绪波动。\n\n我在这里陪伴你，如果你愿意的话，可以和我聊聊最近的感受。无论是什么，我都会认真倾听。💙`,
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // 模拟AI回复（静态版本）
    setTimeout(() => {
      const randomResponse = warmResponses[Math.floor(Math.random() * warmResponses.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* 入口按钮 - 当聊天窗口关闭时显示 */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={onOpen}
              className="h-14 px-5 rounded-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 text-white shadow-lg shadow-primary/30 gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>想聊聊吗？</span>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 聊天窗口 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* 头部 */}
            <div className="flex-shrink-0 px-4 py-3 bg-gradient-to-r from-primary to-purple-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">温暖陪伴</h3>
                    <p className="text-xs text-white/80">我在这里倾听你</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-white/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* 消息区域 */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-purple-50/50 to-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? 'bg-gradient-to-r from-primary to-purple-500 text-white rounded-br-md'
                        : 'bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                  </div>
                </motion.div>
              ))}

              {/* 正在输入提示 */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                    <div className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">正在思考...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* 输入区域 */}
            <div className="flex-shrink-0 p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2">
                <Textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="说说你的感受..."
                  className="min-h-[44px] max-h-[100px] resize-none rounded-xl border-gray-200 focus:border-primary focus:ring-primary/20"
                  rows={1}
                />
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim() || isTyping}
                  className="h-11 w-11 rounded-xl bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                按 Enter 发送，Shift + Enter 换行
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
