"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AutoResizeTextarea } from "./text-area";
import {
  ArrowUpCircleIcon,
  PaperclipIcon,
  MicIcon,
  SmileIcon,
  ImageIcon,
  XIcon,
  Loader2Icon,
  SendIcon,
} from "lucide-react";

// Extended interface with more configuration options
interface ChatFormProps {
  // Core functionality
  onSubmit?: (message: string, attachments: File[], model?: string) => void;
  onTyping?: (isTyping: boolean) => void;
  initialValue?: string;

  // Visual & behavior options
  showModels?: boolean;

  /**
   * Enables or disables the ability to attach files in the chat form.
   * If true, users can upload attachments. If false, the attachment UI is hidden.
   */
  enableAttachments?: boolean;
  enableEmoji?: boolean;
  enableVoice?: boolean;
  enableImages?: boolean;

  /**
   * change variants
   */
  variant?: "default" | "minimal" | "bordered" | "floating";
  size?: "sm" | "md" | "lg";
  position?: "center" | "full" | "responsive";

  // State flags
  loading?: boolean;
  disabled?: boolean;

  // Customization
  placeholder?: string;
  maxAttachments?: number;
  acceptedFileTypes?: string;
  maxMessageLength?: number;

  availableModels?: { id: string; name: string }[];
  defaultModel?: string;

  // Custom classes
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
}

export function ChatForm({
  onSubmit,
  onTyping,
  initialValue = "",
  showModels = false,
  enableAttachments = false,
  enableEmoji = false,
  enableVoice = false,
  enableImages = false,

  variant = "default",
  size = "md",
  position = "responsive",

  // State flags
  loading = false,
  disabled = false,

  // Customization
  placeholder = "Type a message...",
  maxAttachments = 5,
  acceptedFileTypes = "*/*",
  maxMessageLength,

  // Model options
  availableModels = [
    { id: "gpt-4", name: "GPT-4" },
    { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
    { id: "mistral-7b", name: "Mistral 7B" },
    { id: "llama-3", name: "LLaMA 3" },
  ],
  defaultModel = "gpt-4",

  className,
  inputClassName,
  buttonClassName,
}: ChatFormProps) {
  // State
  const [input, setInput] = useState<string>(initialValue);
  const [model, setModel] = useState<string>(defaultModel);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isTypingTimeout, setIsTypingTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && attachments.length === 0) return;

    if (onSubmit) {
      onSubmit(input.trim(), attachments, showModels ? model : undefined);
    }

    setInput("");
    setAttachments([]);

    if (onTyping) {
      onTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && !disabled) {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  const handleTyping = (value: string) => {
    setInput(value);

    if (onTyping) {
      if (isTypingTimeout) {
        clearTimeout(isTypingTimeout);
      }

      onTyping(true);

      const timeout = setTimeout(() => {
        onTyping(false);
      }, 1000);

      setIsTypingTimeout(timeout);
    }
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);

      if (attachments.length + newFiles.length > maxAttachments) {
        console.warn(`Maximum ${maxAttachments} attachments allowed`);
        const availableSlots = maxAttachments - attachments.length;
        const filesToAdd = newFiles.slice(0, availableSlots);

        setAttachments([...attachments, ...filesToAdd]);
      } else {
        setAttachments([...attachments, ...newFiles]);
      }

      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleDragOver = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!enableAttachments || disabled) return;
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!enableAttachments || disabled) return;

    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);

      if (attachments.length + newFiles.length > maxAttachments) {
        // You could add a toast notification here
        console.warn(`Maximum ${maxAttachments} attachments allowed`);

        const availableSlots = maxAttachments - attachments.length;
        const filesToAdd = newFiles.slice(0, availableSlots);

        setAttachments([...attachments, ...filesToAdd]);
      } else {
        setAttachments([...attachments, ...newFiles]);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (isTypingTimeout) {
        clearTimeout(isTypingTimeout);
      }
    };
  }, [isTypingTimeout]);

  const variantClasses = {
    default: "bg-white dark:bg-[#171717] ",
    minimal: "bg-transparent",
    bordered:
      "border border-gray-300  dark:bg-[#171717] bg-white dark:bg-gray-900",
    floating:
      "bg-white  dark:bg-[#252525] border border-gray-200 dark:border-gray-800 shadow-lg",
  };

  const sizeClasses = {
    sm: "p-2 rounded-lg",
    md: "p-3 rounded-xl",
    lg: "p-4 rounded-2xl",
  };

  // Position styling
  const positionClasses = {
    center: "mx-auto max-w-2xl",
    full: "w-full",
    responsive: "w-full md:w-3/4 lg:w-1/2 mx-auto",
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "relative overflow-hidden transition-all duration-200",
        variantClasses[variant],
        sizeClasses[size],
        positionClasses[position],
        isDragging && "ring-2 ring-blue-500 dark:ring-blue-400",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}>
      {/* Attachment Preview Area */}
      {attachments.length > 0 && (
        <div className='mb-2 flex flex-wrap gap-2'>
          {attachments.map((file, index) => (
            <div
              key={index}
              className='group relative flex items-center bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 text-sm'>
              <span className='max-w-[180px] truncate'>{file.name}</span>
              <button
                type='button'
                onClick={() => handleRemoveFile(index)}
                className='ml-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'>
                <XIcon className='h-4 w-4' />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className='flex flex-col'>
        <AutoResizeTextarea
          value={input}
          onChange={handleTyping}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxMessageLength}
          disabled={disabled || loading}
          className={cn(
            "bg-transparent w-full px-3 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none",
            inputClassName
          )}
        />

        {/* Controls Row */}
        <div className='flex items-center justify-between pt-2'>
          {/* Left side controls */}
          <div className='flex items-center space-x-2'>
            {/* Model selector */}
            {showModels && (
              <select
                className={cn(
                  "text-sm rounded-lg py-1 px-2",
                  "bg-gray-200 dark:bg-[#101010cd] text-gray-900 dark:text-white",
                  "border-0 focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400"
                )}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={disabled || loading}>
                {availableModels.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.name}
                  </option>
                ))}
              </select>
            )}

            {/* Attachments button */}
            {enableAttachments && (
              <>
                <button
                  type='button'
                  onClick={() => fileInputRef.current?.click()}
                  className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'
                  disabled={
                    disabled || loading || attachments.length >= maxAttachments
                  }
                  title='Attach files'>
                  <PaperclipIcon className='h-5 w-5' />
                  <input
                    ref={fileInputRef}
                    type='file'
                    className='hidden'
                    onChange={handleFileChange}
                    multiple
                    accept={acceptedFileTypes}
                    disabled={
                      disabled ||
                      loading ||
                      attachments.length >= maxAttachments
                    }
                  />
                </button>
              </>
            )}

            {enableImages && (
              <button
                type='button'
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'
                disabled={disabled || loading}
                title='Add image'>
                <ImageIcon className='h-5 w-5' />
              </button>
            )}

            {enableEmoji && (
              <button
                type='button'
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'
                disabled={disabled || loading}
                title='Add emoji'>
                <SmileIcon className='h-5 w-5' />
              </button>
            )}

            {enableVoice && (
              <button
                type='button'
                className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700'
                disabled={disabled || loading}
                title='Voice input'>
                <MicIcon className='h-5 w-5' />
              </button>
            )}
          </div>

          <button
            type='submit'
            disabled={
              disabled || loading || (!input.trim() && attachments.length === 0)
            }
            className={cn(
              "p-2 rounded-full flex items-center justify-center transition-colors duration-200",
              !input.trim() && attachments.length === 0
                ? "text-gray-400 dark:text-gray-600 cursor-not-allowed"
                : "text-blue-500 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/20",
              buttonClassName
            )}
            title='Send message'>
            {loading ? (
              <Loader2Icon className='h-5 w-5 animate-spin' />
            ) : (
              <SendIcon className='h-5 w-5' />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

export default ChatForm;
