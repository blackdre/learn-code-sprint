
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  onSubmit: (code: string) => { success: boolean; feedback?: string };
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode, language, onSubmit }) => {
  const [code, setCode] = useState(initialCode);
  const [result, setResult] = useState<{ success: boolean; feedback?: string } | null>(null);

  const handleSubmit = () => {
    const submissionResult = onSubmit(code);
    setResult(submissionResult);
  };

  const formatCode = (code: string, language: string): React.ReactNode => {
    // This is a simple syntax highlighting implementation
    // In a real app, you'd use a library like Prism or Highlight.js

    const keywordRegex = /\b(function|return|if|else|for|while|var|let|const|import|export|class)\b/g;
    const stringRegex = /(["'`])(?:(?=(\\?))\2.)*?\1/g;
    const commentRegex = /\/\/.*|\/\*[\s\S]*?\*\//g;
    const numberRegex = /\b\d+\b/g;

    let formattedCode = code
      .replace(commentRegex, match => `<span class="comment">${match}</span>`)
      .replace(keywordRegex, match => `<span class="keyword">${match}</span>`)
      .replace(stringRegex, match => `<span class="string">${match}</span>`)
      .replace(numberRegex, match => `<span class="number">${match}</span>`);

    return (
      <pre dangerouslySetInnerHTML={{ __html: formattedCode }} />
    );
  };

  return (
    <Card className="w-full border border-border">
      <CardHeader className="bg-secondary border-b border-border">
        <div className="flex justify-between items-center">
          <CardTitle className="text-sm font-medium">{language}</CardTitle>
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-destructive" />
            <div className="h-3 w-3 rounded-full bg-muted" />
            <div className="h-3 w-3 rounded-full bg-primary" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="code-editor">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="min-h-[300px] w-full p-4 bg-code text-code-foreground font-mono text-sm resize-none outline-none"
            spellCheck="false"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-border p-4 bg-secondary">
        <div className="flex-1">
          {result && (
            <div className={`flex items-center ${result.success ? 'text-green-500' : 'text-destructive'}`}>
              {result.success ? (
                <Check className="h-4 w-4 mr-2" />
              ) : (
                <X className="h-4 w-4 mr-2" />
              )}
              <span>{result.feedback || (result.success ? 'Test passed!' : 'Test failed!')}</span>
            </div>
          )}
        </div>
        <Button onClick={handleSubmit}>Submit Solution</Button>
      </CardFooter>
    </Card>
  );
};

export default CodeEditor;
