import { Bold, Code, Image, Italic, Link, List, Table, Underline } from "lucide-react";
import { Button } from "#components/ui/button.tsx";
import { Textarea } from "#components/ui/textarea.tsx";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function RichTextEditor({ value, onChange, placeholder, className }: RichTextEditorProps) {
  return (
    <div className="border border-gray-200 rounded-lg">
      {/* Toolbar */}
      <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50 dark:bg-gray-800">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm">A</span>
          <span className="text-xs">↓</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm font-bold text-red-500 dark:text-red-400">A</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Link className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm">≈</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Underline className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm">1.</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm">←</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm">→</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm">≡</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm">≣</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <span className="text-sm">⫴</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Table className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-1 p-2 border-b border-gray-200 bg-gray-50 dark:bg-gray-800">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Code className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <Image className="h-4 w-4" />
        </Button>
      </div>

      {/* Text Area */}
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`min-h-[150px] border-0 rounded-t-none resize-none focus:ring-0 ${className}`}
      />
    </div>
  );
}
