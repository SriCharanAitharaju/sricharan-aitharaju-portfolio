import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { MessageCircle, X, Send, Cpu } from "lucide-react";

const SUGGESTIONS = [
  "What are Sricharan's top skills?",
  "Tell me about his projects",
  "Is he available for VLSI internships?",
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const busy = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    sendMessage({ text });
    setInput("");
  };

  const ask = (text: string) => {
    if (busy) return;
    sendMessage({ text });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat assistant"}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-[0_10px_40px_-10px_hsl(var(--primary)/0.6)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm h-[32rem] rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-gradient-to-r from-primary/10 to-transparent">
            <div className="h-9 w-9 rounded-full bg-primary/15 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight">Ask about Sricharan</p>
              <p className="text-xs text-muted-foreground">Projects · Skills · Resume</p>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Hi! I can answer questions about Sricharan's background, projects, and skills.
                </p>
                <div className="flex flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="text-left text-sm px-3 py-2 rounded-lg border border-border hover:border-primary/60 hover:bg-primary/5 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap ${
                      isUser
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted text-foreground rounded-bl-sm"
                    }`}
                  >
                    {text || (busy ? "…" : "")}
                  </div>
                </div>
              );
            })}

            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm text-muted-foreground">
                  Thinking…
                </div>
              </div>
            )}

            {error && (
              <p className="text-xs text-destructive">
                Something went wrong. Please try again.
              </p>
            )}
          </div>

          {/* Composer */}
          <form onSubmit={submit} className="border-t border-border p-3 flex items-center gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything…"
              className="flex-1 bg-muted/50 border border-border rounded-full px-4 py-2 text-sm outline-none focus:border-primary"
              disabled={busy}
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              aria-label="Send"
              className="h-9 w-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 hover:scale-105 transition-transform"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
