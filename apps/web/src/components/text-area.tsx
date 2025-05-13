"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useEffect, type TextareaHTMLAttributes } from "react";

interface AutoResizeTextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  value: string;
  onChange: (value: string) => void;
}

export function AutoResizeTextarea({
  className,
  value,
  onChange,

  ...props
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };
  function handleDrop(e: React.DragEvent<HTMLTextAreaElement>) {
    e.preventDefault();
    const droppedText = e.dataTransfer.getData("text");
    if (droppedText) {
      onChange(value + droppedText);
    }
  }

  useEffect(() => {
    resizeTextarea();
  }, [value]);

  return (
    <textarea
      {...props}
      value={value}
      // onDrop={handleDrop}
      onDropCapture={handleDrop}
      ref={textareaRef}
      rows={1}
      onChange={(e) => {
        onChange(e.target.value);
        resizeTextarea();
      }}
      className={cn(`resize-none min-h-14 max-h-80`, className)}
    />
  );
}
