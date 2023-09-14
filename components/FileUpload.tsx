"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import "@uploadthing/react/styles.css";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  value: string;
  endpoint: "messageFile" | "serverImage";
  onChange: (url?: string) => void;
}

const FileUpload = ({ value, endpoint, onChange }: FileUploadProps) => {
  // Checking the filename
  const fileType = value?.split(".").pop();

  // checking if it's an image
  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="absolute right-0 top-0 rounded-full bg-background p-1 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative mt-2 flex items-center rounded-md p-2">
        <FileIcon className="h-10 w-10 " />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm hover:underline"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          className="absolute -right-2 -top-2 rounded-full bg-background p-1 shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // TODO: style dropzone
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log("error", error);
      }}
    />
  );
};

export default FileUpload;
