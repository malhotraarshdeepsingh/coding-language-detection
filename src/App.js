import { useState, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState(null);
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    if (code.trim() === "") {
      setLanguage(null);
      setHighlightedCode("");
      return;
    }
    const result = hljs.highlightAuto(code);
    setLanguage(result.language || "Unknown");
    setHighlightedCode(result.value);
  }, [code]);

  return (
    <div className="p-8 min-h-screen bg-gray-900 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-white mb-6">
        Code Language Detector
      </h1>

      <textarea
        className="w-full max-w-4xl h-64 p-4 border-2 border-gray-700 rounded-lg bg-gray-800 text-white font-mono text-lg focus:outline-none focus:border-blue-500"
        placeholder="Paste your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      {language && (
        <div className="w-full max-w-4xl mt-4 p-4 bg-gray-800 border-l-4 border-blue-500 text-white rounded shadow">
          <p className="text-lg">
            <strong>Detected Language:</strong> {language}
          </p>
        </div>
      )}

      {highlightedCode && (
        <pre className="w-full max-w-4xl mt-4 p-4 bg-gray-800 text-white rounded-lg overflow-x-auto shadow-lg">
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      )}
    </div>
  );
}

export default App;
