/**
 * Coding Language Detection
 * A lightweight JavaScript tool for detecting programming languages from code snippets
 * Written in less than 50 lines of JavaScript
 * 
 * @author Arshdeep Singh Malhotra
 * @version 1.0.0
 */

const languagePatterns = {
    javascript: [/function\s+\w+\s*\(/, /console\.log\s*\(/, /var\s+\w+\s*=/, /let\s+\w+\s*=/, /const\s+\w+\s*=/],
    python: [/def\s+\w+\s*\(/, /print\s*\(/, /import\s+\w+/, /if\s+__name__\s*==\s*['"]\__main__['"]/, /class\s+\w+\s*\(/],
    java: [/public\s+class\s+\w+/, /public\s+static\s+void\s+main/, /System\.out\.print/, /import\s+java\./, /private\s+\w+\s+\w+/],
    cpp: [/#include\s*<\w+>/, /int\s+main\s*\(/, /std::cout/, /using\s+namespace\s+std/, /cout\s*<</, /#include\s*"\w+"/],
    csharp: [/using\s+System/, /public\s+class\s+\w+/, /static\s+void\s+Main/, /Console\.WriteLine/, /namespace\s+\w+/],
    php: [/<\?php/, /echo\s+/, /\$\w+\s*=/, /function\s+\w+\s*\(/, /class\s+\w+/],
    ruby: [/def\s+\w+/, /puts\s+/, /class\s+\w+/, /end\s*$/, /@\w+\s*=/],
    python: [/def\s+\w+\(/, /print\(/, /import\s+\w+/, /if\s+__name__/, /:\s*$/],
    go: [/package\s+main/, /func\s+main\(\)/, /import\s+/, /fmt\.Print/, /var\s+\w+\s+\w+/],
    rust: [/fn\s+main\(\)/, /let\s+mut\s+/, /println!/, /use\s+std::/, /struct\s+\w+/]
};

function detectLanguage(code) {
    const scores = {};
    
    for (const [language, patterns] of Object.entries(languagePatterns)) {
        scores[language] = 0;
        patterns.forEach(pattern => {
            if (pattern.test(code)) scores[language]++;
        });
    }
    
    const detected = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);
    return scores[detected] > 0 ? detected : 'unknown';
}

function getConfidenceScore(code) {
    const detected = detectLanguage(code);
    const patterns = languagePatterns[detected] || [];
    const matches = patterns.filter(pattern => pattern.test(code)).length;
    return Math.min(100, (matches / patterns.length) * 100);
}

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { detectLanguage, getConfidenceScore };
}

// Example usage
if (require.main === module) {
    const examples = [
        'function hello() { console.log("Hello World!"); }',
        'def hello():\n    print("Hello World!")',
        'public class Hello {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}'
    ];
    
    examples.forEach((code, index) => {
        console.log(`Example ${index + 1}:`);
        console.log(`Language: ${detectLanguage(code)}`);
        console.log(`Confidence: ${getConfidenceScore(code)}%\n`);
    });
}