import { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Image, FileText, X, Bot, User, Loader2, AlertCircle, ChevronDown, BookOpen, ExternalLink, FileCheck, Clock, Mic, MicOff } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Alert, AlertDescription } from "./ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface ResourceItem {
  id: string;
  name: string;
  type: "pdf" | "image" | "audio" | "document";
  relevance: number;
  pageNumbers?: string;
  timestamp?: string;
  excerpt?: string;
}

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  attachments?: Attachment[];
  resources?: ResourceItem[];
}

interface Attachment {
  id: string;
  name: string;
  type: "image" | "pdf";
  size: string;
  url?: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hello! I'm your NTRO RAG Assistant. I can help you analyze documents, images, and answer questions based on your uploaded data. You can type your questions, use voice input, or attach files (images/PDFs) for analysis.",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Cleanup recording interval on unmount
  useEffect(() => {
    return () => {
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
    };
  }, []);

  // Handle file upload
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, type: "image" | "pdf") => {
    const files = e.target.files;
    if (files) {
      const newAttachments: Attachment[] = Array.from(files).map((file) => ({
        id: Math.random().toString(36).substring(7),
        name: file.name,
        type: type,
        size: formatFileSize(file.size),
        url: URL.createObjectURL(file),
      }));
      setAttachments([...attachments, ...newAttachments]);
    }
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Remove attachment
  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter((att) => att.id !== id));
  };

  // Generate AI response with resources
  const generateAIResponse = (userMessage: string, attachments: Attachment[]): { content: string; resources: ResourceItem[] } => {
    let content = "";
    let resources: ResourceItem[] = [];

    // Mock AI responses based on context
    if (attachments.length > 0) {
      const imageCount = attachments.filter((a) => a.type === "image").length;
      const pdfCount = attachments.filter((a) => a.type === "pdf").length;
      
      if (imageCount > 0 && pdfCount > 0) {
        content = `I've analyzed your ${imageCount} image(s) and ${pdfCount} PDF document(s). Here's what I found:\n\n**Image Analysis:**\n- Detected entities and objects with 94% confidence\n- Extracted text using OCR: "Project Phoenix - Phase 2 Implementation"\n- Identified 3 people in the images\n\n**Document Analysis:**\n- PDF contains 15 pages of technical specifications\n- Key topics: Infrastructure, Security Protocols, Timeline\n- Found 7 relevant citations related to "${userMessage}"\n\n**Cross-Modal Insights:**\n- The images correspond to Section 4.2 in the PDF document\n- Temporal correlation detected: Documents dated October 2024\n- Confidence score: 0.89\n\nWould you like me to elaborate on any specific aspect?`;
        
        resources = [
          { id: "1", name: "Project Phoenix - Technical Specifications.pdf", type: "pdf", relevance: 0.95, pageNumbers: "1-15, 22", timestamp: "Oct 2024", excerpt: "Phase 2 implementation details and infrastructure requirements..." },
          { id: "2", name: "Infrastructure_Diagram_v2.png", type: "image", relevance: 0.92, timestamp: "Oct 2024", excerpt: "Visual representation of system architecture..." },
          { id: "3", name: "Security_Protocols_2024.pdf", type: "pdf", relevance: 0.88, pageNumbers: "4-7", timestamp: "Sep 2024", excerpt: "Enhanced security measures for Phase 2..." },
          { id: "4", name: "Team_Photo_Meeting.jpg", type: "image", relevance: 0.76, timestamp: "Oct 2024" },
        ];
      } else if (imageCount > 0) {
        content = `I've analyzed your ${imageCount} image(s). Here's what I found:\n\n**Visual Analysis:**\n- Detected objects: Document, Person, Computer Screen\n- Extracted text using OCR: "${userMessage.substring(0, 50)}..."\n- Image quality: High (suitable for detailed analysis)\n- Timestamp metadata: October 2024\n\n**Content Understanding:**\n- The image appears to contain official documentation\n- Confidence level: 92%\n- Related documents in database: 5 matches found\n\nWould you like me to search for related documents or provide more details?`;
        
        resources = [
          { id: "1", name: "Uploaded_Image_Analysis.jpg", type: "image", relevance: 0.92, timestamp: "Just now" },
          { id: "2", name: "Related_Document_Report.pdf", type: "pdf", relevance: 0.87, pageNumbers: "3-8", timestamp: "Oct 2024", excerpt: "Similar documentation patterns found..." },
          { id: "3", name: "OCR_Reference_Database.pdf", type: "document", relevance: 0.81, timestamp: "Sep 2024" },
        ];
      } else {
        content = `I've processed your ${pdfCount} PDF document(s). Here's the analysis:\n\n**Document Summary:**\n- Total pages: 23\n- Key sections: Executive Summary, Technical Details, Recommendations\n- Detected entities: 15 organizations, 8 locations, 12 dates\n\n**Relevant Findings for "${userMessage}":**\n1. Section 3.4 discusses implementation strategies\n2. Page 12 contains relevant statistical data\n3. Appendix B has supporting documentation\n\n**Knowledge Graph Connections:**\n- Connected to 8 related documents\n- 12 cross-references identified\n- Timeline spans: Jan 2024 - Oct 2024\n\nI can help you explore specific sections or find related information.`;
        
        resources = [
          { id: "1", name: "Uploaded_Document.pdf", type: "pdf", relevance: 0.95, pageNumbers: "1-23", timestamp: "Just now" },
          { id: "2", name: "Implementation_Strategy_Guide.pdf", type: "pdf", relevance: 0.89, pageNumbers: "12-18", timestamp: "Aug 2024", excerpt: "Detailed implementation strategies and methodologies..." },
          { id: "3", name: "Statistical_Data_Report_2024.pdf", type: "pdf", relevance: 0.85, pageNumbers: "5-12", timestamp: "Jul 2024", excerpt: "Comprehensive statistical analysis..." },
        ];
      }
    } else {
      // Text-only responses
      const lowerMessage = userMessage.toLowerCase();
      if (lowerMessage.includes("security") || lowerMessage.includes("threat")) {
        content = `Based on your query about security, I've searched through our database and found:\n\n**Relevant Documents:**\n- "Cybersecurity Assessment Q3 2024" (Relevance: 0.95)\n- "Threat Analysis Report - October" (Relevance: 0.88)\n- "Security Protocol Guidelines" (Relevance: 0.82)\n\n**Key Insights:**\n- 23 security incidents reported in the last quarter\n- Mitigation strategies implemented with 85% success rate\n- Critical vulnerabilities identified and patched\n\n**Timeline View:**\n- Oct 1: Initial threat detected\n- Oct 5: Response team activated\n- Oct 10: Mitigation deployed\n\nWould you like me to generate a detailed timeline or show the knowledge graph?`;
        
        resources = [
          { id: "1", name: "Cybersecurity_Assessment_Q3_2024.pdf", type: "pdf", relevance: 0.95, pageNumbers: "1-34", timestamp: "Oct 2024", excerpt: "Comprehensive assessment of security posture..." },
          { id: "2", name: "Threat_Analysis_Report_October.pdf", type: "pdf", relevance: 0.88, pageNumbers: "5-18", timestamp: "Oct 2024", excerpt: "Critical threat vectors and mitigation strategies..." },
          { id: "3", name: "Security_Protocol_Guidelines.pdf", type: "pdf", relevance: 0.82, pageNumbers: "2-15", timestamp: "Sep 2024", excerpt: "Updated security protocols and best practices..." },
          { id: "4", name: "Incident_Response_Log.pdf", type: "document", relevance: 0.78, timestamp: "Oct 2024" },
          { id: "5", name: "Security_Briefing_Audio.mp3", type: "audio", relevance: 0.72, timestamp: "Oct 5, 2024", excerpt: "Transcript: 'Response team activated, implementing protocol Delta...'" },
        ];
      } else if (lowerMessage.includes("search") || lowerMessage.includes("find")) {
        content = `I've executed a semantic search across all modalities (text, images, audio). Here are the top results:\n\n**Documents (PDF/DOC):**\n- 12 documents with relevance > 0.80\n- Primary topics: Infrastructure, Development, Security\n\n**Images:**\n- 5 images with matching visual content\n- OCR text matches found in 3 images\n\n**Audio Files:**\n- 2 transcribed recordings mentioning related topics\n- Speaker identification: 4 unique speakers\n\n**Cross-Modal Correlations:**\n- 8 documents reference the same project code\n- Temporal clustering: Most data from September-October 2024\n\nShall I display these in a specific view (List, Graph, or Timeline)?`;
        
        resources = [
          { id: "1", name: "Infrastructure_Overview_2024.pdf", type: "pdf", relevance: 0.91, pageNumbers: "3-12", timestamp: "Oct 2024" },
          { id: "2", name: "Development_Roadmap.pdf", type: "pdf", relevance: 0.88, pageNumbers: "1-8", timestamp: "Sep 2024" },
          { id: "3", name: "System_Architecture_Diagram.png", type: "image", relevance: 0.86, timestamp: "Sep 2024" },
          { id: "4", name: "Meeting_Recording_Sept_24.mp3", type: "audio", relevance: 0.83, timestamp: "Sep 24, 2024", excerpt: "Discussion about project timeline and deliverables..." },
          { id: "5", name: "Security_Framework.pdf", type: "pdf", relevance: 0.81, pageNumbers: "2-9", timestamp: "Aug 2024" },
          { id: "6", name: "Code_Review_Screenshot.png", type: "image", relevance: 0.79, timestamp: "Oct 2024" },
        ];
      } else if (lowerMessage.includes("timeline")) {
        content = `I've generated a timeline based on your query. Here's an overview:\n\n**Timeline Span:** January 2024 - October 2024\n\n**Key Events:**\n- Jan 15: Project initiation documented\n- Mar 22: First phase completion report\n- Jun 10: Mid-term review meeting (audio recording)\n- Aug 05: Security audit conducted\n- Oct 10: Current status report\n\n**Document Distribution:**\n- PDFs: 45 documents\n- Images: 23 screenshots/photos\n- Audio: 8 recordings\n\nEach event has supporting documentation. Would you like to explore a specific time period?`;
        
        resources = [
          { id: "1", name: "Project_Initiation_Document.pdf", type: "pdf", relevance: 0.94, timestamp: "Jan 15, 2024", excerpt: "Initial project charter and objectives..." },
          { id: "2", name: "Phase_1_Completion_Report.pdf", type: "pdf", relevance: 0.92, pageNumbers: "1-18", timestamp: "Mar 22, 2024" },
          { id: "3", name: "Midterm_Review_Recording.mp3", type: "audio", relevance: 0.89, timestamp: "Jun 10, 2024", excerpt: "Stakeholder review and progress assessment..." },
          { id: "4", name: "Security_Audit_Report.pdf", type: "pdf", relevance: 0.87, pageNumbers: "1-25", timestamp: "Aug 5, 2024" },
          { id: "5", name: "Current_Status_Report_Oct.pdf", type: "pdf", relevance: 0.85, pageNumbers: "1-12", timestamp: "Oct 10, 2024" },
        ];
      } else {
        content = `I've processed your query: "${userMessage}"\n\n**Search Results:**\n- Found 18 relevant documents across all formats\n- Average relevance score: 0.84\n- Timespan: Last 6 months\n\n**Key Findings:**\n- Topic clusters identified: Development (8), Security (5), Infrastructure (5)\n- Most cited document: "Strategic Implementation Plan 2024"\n- Knowledge graph shows 15 interconnected entities\n\n**Suggested Actions:**\n1. View detailed search results\n2. Generate knowledge graph visualization\n3. Create incident timeline\n4. Export findings as report\n\nHow would you like to proceed?`;
        
        resources = [
          { id: "1", name: "Strategic_Implementation_Plan_2024.pdf", type: "pdf", relevance: 0.93, pageNumbers: "1-42", timestamp: "Aug 2024", excerpt: "Comprehensive strategic plan for 2024-2025..." },
          { id: "2", name: "Development_Guidelines.pdf", type: "pdf", relevance: 0.87, pageNumbers: "5-15", timestamp: "Sep 2024" },
          { id: "3", name: "Security_Framework_Overview.pdf", type: "pdf", relevance: 0.85, pageNumbers: "3-12", timestamp: "Jul 2024" },
          { id: "4", name: "Infrastructure_Assessment.pdf", type: "pdf", relevance: 0.83, pageNumbers: "1-8", timestamp: "Jun 2024" },
          { id: "5", name: "Project_Timeline_Visual.png", type: "image", relevance: 0.80, timestamp: "Sep 2024" },
        ];
      }
    }

    return { content, resources };
  };

  // Send message
  const handleSendMessage = () => {
    if (!inputText.trim() && attachments.length === 0) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputText.trim() || "Attached files for analysis",
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined,
    };

    setMessages([...messages, userMessage]);
    setIsLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponseData = generateAIResponse(inputText, attachments);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponseData.content,
        timestamp: new Date(),
        resources: aiResponseData.resources,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);

    // Clear input and attachments
    setInputText("");
    setAttachments([]);
  };

  // Handle Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle voice recording
  const toggleRecording = () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      if (recordingIntervalRef.current) {
        clearInterval(recordingIntervalRef.current);
      }
      
      // Simulate voice-to-text conversion
      const mockTranscription = "What are the latest security threats in the cybersecurity assessment report?";
      setInputText(mockTranscription);
      setRecordingTime(0);
      
      // Show notification
      setTimeout(() => {
        alert("Voice input converted: \"" + mockTranscription + "\"");
      }, 100);
    } else {
      // Start recording
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      recordingIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      
      // In a real app, you would initialize speech recognition here
      // For example: navigator.mediaDevices.getUserMedia({ audio: true })
    }
  };

  // Format recording time
  const formatRecordingTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Get icon for file type
  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
      case "document":
        return <FileText className="w-4 h-4 text-red-500" />;
      case "image":
        return <Image className="w-4 h-4 text-blue-500" />;
      case "audio":
        return <FileCheck className="w-4 h-4 text-purple-500" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2>RAG Chat Assistant</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Multimodal Intelligence Analysis • Powered by Advanced AI
            </p>
          </div>
          <Badge variant="outline" className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Online
          </Badge>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${
                message.type === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {message.type === "user" ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>

              {/* Message Content */}
              <div
                className={`flex-1 max-w-[80%] ${
                  message.type === "user" ? "items-end" : "items-start"
                } flex flex-col gap-2`}
              >
                <Card
                  className={`p-4 ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card"
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>

                  {/* Attachments */}
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.attachments.map((att) => (
                        <div
                          key={att.id}
                          className={`flex items-center gap-2 p-2 rounded border ${
                            message.type === "user"
                              ? "border-primary-foreground/20 bg-primary-foreground/10"
                              : "border-border bg-muted/50"
                          }`}
                        >
                          {att.type === "image" ? (
                            <Image className="w-4 h-4" />
                          ) : (
                            <FileText className="w-4 h-4" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate">{att.name}</p>
                            <p className="text-xs opacity-70">{att.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>

                {/* Know Your Resources - Only for AI messages with resources */}
                {message.type === "ai" && message.resources && message.resources.length > 0 && (
                  <Collapsible className="w-full">
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-2 w-full justify-start hover:bg-muted"
                      >
                        <BookOpen className="w-4 h-4" />
                        Know Your Resources ({message.resources.length} sources)
                        <ChevronDown className="w-4 h-4 ml-auto" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <Card className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <FileCheck className="w-4 h-4 text-primary" />
                          <h4 className="text-sm">Source Documents & Citations</h4>
                        </div>
                        <div className="space-y-2">
                          {message.resources.map((resource) => (
                            <div
                              key={resource.id}
                              className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-start gap-3">
                                {getFileIcon(resource.type)}
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-sm truncate">{resource.name}</p>
                                    <Badge variant="secondary" className="text-xs flex-shrink-0">
                                      {Math.round(resource.relevance * 100)}%
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                    {resource.timestamp && (
                                      <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {resource.timestamp}
                                      </span>
                                    )}
                                    {resource.pageNumbers && (
                                      <span>Pages: {resource.pageNumbers}</span>
                                    )}
                                  </div>
                                  {resource.excerpt && (
                                    <p className="text-xs text-muted-foreground mt-2 italic">
                                      "{resource.excerpt}"
                                    </p>
                                  )}
                                </div>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 flex-shrink-0"
                                  title="View document"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </CollapsibleContent>
                  </Collapsible>
                )}

                <span className="text-xs text-muted-foreground px-2">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                <Bot className="w-4 h-4" />
              </div>
              <Card className="p-4 bg-card">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">
                    Analyzing your query...
                  </span>
                </div>
              </Card>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="border-t border-border bg-card p-4">
        <div className="max-w-4xl mx-auto space-y-3">
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2"
                >
                  {att.type === "image" ? (
                    <Image className="w-4 h-4 text-blue-500" />
                  ) : (
                    <FileText className="w-4 h-4 text-red-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate max-w-[200px]">{att.name}</p>
                    <p className="text-xs text-muted-foreground">{att.size}</p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => removeAttachment(att.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Info Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              All data is processed locally with AES-256 encryption. Voice input supported. Formats: Images (JPG, PNG, WebP), Documents (PDF)
            </AlertDescription>
          </Alert>

          {/* Voice Recording Indicator */}
          {isRecording && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-sm text-red-600 dark:text-red-400">Recording...</span>
              </div>
              <Badge variant="secondary" className="font-mono">
                {formatRecordingTime(recordingTime)}
              </Badge>
            </div>
          )}

          {/* Input Box */}
          <div className="flex gap-2">
            {/* Attachment Buttons */}
            <div className="flex gap-1">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => imageInputRef.current?.click()}
                title="Attach Image"
                disabled={isRecording}
              >
                <Image className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                title="Attach PDF"
                disabled={isRecording}
              >
                <FileText className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="icon"
                onClick={toggleRecording}
                title={isRecording ? "Stop Recording" : "Voice Input"}
                className={isRecording ? "animate-pulse" : ""}
              >
                {isRecording ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </Button>
            </div>

            {/* Text Input */}
            <Textarea
              placeholder={isRecording ? "Listening..." : "Type your message, use voice input, or attach files... (Press Enter to send)"}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-[60px] max-h-[150px] resize-none"
              rows={2}
              disabled={isRecording}
            />

            {/* Send Button */}
            <Button
              onClick={handleSendMessage}
              disabled={(!inputText.trim() && attachments.length === 0) || isLoading || isRecording}
              size="icon"
              className="h-[60px] w-[60px]"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden File Inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFileSelect(e, "image")}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        multiple
        className="hidden"
        onChange={(e) => handleFileSelect(e, "pdf")}
      />
    </div>
  );
}
