"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

type FileUploadProps = React.HTMLAttributes<HTMLDivElement> & {
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  variant?: "default" | "avatar" | "compact" | "bordered";
  size?: "sm" | "md" | "lg" | "xl";
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  icon?: React.ReactNode;
  label?: string;
  description?: string;
  onFileSelect?: (files: File[]) => void;
  onError?: (error: string) => void;
};

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      inputProps,
      variant = "default",
      size = "md",
      accept,
      multiple = false,
      maxSizeMB,
      icon,
      label,
      description,
      onFileSelect,
      onError,
      className,
      ...rest
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [files, setFiles] = useState<File[]>([]);

    // Handle file validation and processing
    const processFiles = (fileList: FileList | null) => {
      if (!fileList?.length) return;

      const newFiles: File[] = [];
      const maxSizeBytes = maxSizeMB ? maxSizeMB * 1024 * 1024 : Infinity;

      const filesArray = Array.from(fileList);

      const filesToProcess = multiple ? filesArray : [filesArray[0]];

      filesToProcess.forEach((file) => {
        if (!file) return;

        if (file.size > maxSizeBytes) {
          onError?.(
            `File ${file.name} exceeds the maximum size of ${maxSizeMB}MB`
          );
          return;
        }

        if (accept && !isFileTypeAccepted(file, accept)) {
          onError?.(`File ${file.name} type not accepted`);
          return;
        }

        newFiles.push(file);
      });

      if (newFiles.length) {
        setFiles((prev) => (multiple ? [...prev, ...newFiles] : newFiles));
        onFileSelect?.(newFiles);
      }
    };

    const isFileTypeAccepted = (file: File, acceptString: string) => {
      const acceptedTypes = acceptString.split(",").map((type) => type.trim());
      const fileType = file.type;
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

      return acceptedTypes.some((type) => {
        if (type === "*" || type === "*/*") return true;
        if (type.endsWith("/*") && fileType.startsWith(type.replace("/*", "/")))
          return true;
        if (type.startsWith(".") && fileExtension === type) return true;
        return fileType === type;
      });
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragOver(false);
      processFiles(e.dataTransfer.files);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      processFiles(e.target.files);

      if (inputRef.current) inputRef.current.value = "";
    };

    const removeFile = (index: number) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
    };

    // Visual styles based on variants
    const variantClasses = {
      default:
        "border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black dark:text-white text-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20",
      avatar:
        "rounded-full border-dashed border-gray-300 dark:border-gray-700 bg-white dark:bg-black",
      compact:
        "border-solid border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950",
      bordered:
        "border-solid border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/10 shadow-sm",
    };

    const sizeClasses = {
      sm: variant === "avatar" ? "h-20 w-20" : "p-3 min-h-20",
      md: variant === "avatar" ? "h-32 w-32" : "p-5 min-h-32",
      lg: variant === "avatar" ? "h-40 w-40" : "p-6 min-h-40",
      xl: variant === "avatar" ? "h-52 w-52" : "p-8 min-h-52",
    };

    const renderLabel = () => {
      if (label) return <p className='font-medium text-sm mb-1'>{label}</p>;

      if (size === "sm" || variant === "compact") {
        return <p className='text-sm font-medium'>Upload</p>;
      }

      return (
        <p className='font-medium text-base'>
          {icon || (
            <svg
              className='mx-auto h-8 w-8 text-gray-400 dark:text-gray-500'
              stroke='currentColor'
              fill='none'
              viewBox='0 0 24 24'
              aria-hidden='true'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              />
            </svg>
          )}
          <span className='mt-2 block'>Click or drag files</span>
        </p>
      );
    };

    return (
      <div className='w-full'>
        <div
          ref={ref}
          className={cn(
            "border-2 rounded-lg transition-colors cursor-pointer flex flex-col items-center justify-center",
            variantClasses[variant],
            sizeClasses[size],
            dragOver
              ? "ring-2 ring-blue-400 dark:ring-blue-600 border-blue-400 dark:border-blue-600"
              : "",
            className
          )}
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          {...rest}>
          {renderLabel()}

          {description && size !== "sm" && (
            <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
              {description}
            </p>
          )}

          {maxSizeMB && size !== "sm" && (
            <p className='mt-1 text-xs text-gray-500 dark:text-gray-400'>
              Max file size: {maxSizeMB}MB
            </p>
          )}

          <input
            ref={inputRef}
            type='file'
            className='hidden'
            accept={accept}
            multiple={multiple}
            onChange={handleChange}
            {...inputProps}
          />
        </div>

        {files.length > 0 && (
          <div
            className={`mt-2 ${variant === "avatar" ? "w-[10%]" : "w-1/4"} `}>
            <p className='text-sm text-gray-600 dark:text-gray-400'>
              {files.length} file{files.length > 1 ? "s" : ""} selected
            </p>
            <ul className='mt-1 text-xs text-gray-500 dark:text-gray-400 space-y-1 max-h-24  overflow-y-auto'>
              {files.map((file, index) => (
                <li key={index} className='flex justify-between'>
                  <span className='truncate w-[50%] max-w-[60%]'>
                    {file.name}
                  </span>
                  <button
                    type='button'
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className='text-red-500 hover:text-red-700'>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";

export default FileUpload;