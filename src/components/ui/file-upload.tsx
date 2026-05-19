import { Button } from "@/components/ui/button";
import { Paperclip, Upload, X } from "lucide-react";
import { useState } from "react";

export function FileUpload() {
  const [files, setFiles] = useState<string[]>([]);

  return (
    <div className="space-y-3">
      <label className="flex cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed bg-card/60 px-6 py-8 text-center">
        <Upload className="h-6 w-6 text-primary" />
        <p className="mt-3 font-medium">Upload files</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Drag documents here or browse from your device.
        </p>
        <input
          type="file"
          className="sr-only"
          multiple
          onChange={(event) => {
            const nextFiles = Array.from(event.target.files ?? []).map(
              (file) => file.name,
            );
            setFiles((current) => [...current, ...nextFiles]);
          }}
        />
      </label>
      {files.length ? (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file}
              className="flex items-center justify-between rounded-2xl border bg-card px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <Paperclip className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{file}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  setFiles((current) => current.filter((item) => item !== file))
                }
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
