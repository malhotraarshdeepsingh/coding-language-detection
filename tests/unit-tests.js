/**
 * Unit Tests for Coding Language Detection
 * Test cases to verify the accuracy of language detection
 */

const { detectLanguage, getConfidenceScore } = require('../index.js');

// Test cases with expected results
const testCases = [
    {
        code: 'function hello() { console.log("Hello World!"); }',
        expected: 'javascript',
        description: 'JavaScript function'
    },
    {
        code: 'def hello():\n    print("Hello World!")',
        expected: 'python', 
        description: 'Python function'
    },
    {
        code: 'public class Hello {\n    public static void main(String[] args) {\n        System.out.println("Hello World!");\n    }\n}',
        expected: 'java',
        description: 'Java class'
    },
    {
        code: '#include <iostream>\nint main() {\n    std::cout << "Hello World!" << std::endl;\n    return 0;\n}',
        expected: 'cpp',
        description: 'C++ program'
    },
    {
        code: 'using System;\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello World!");\n    }\n}',
        expected: 'csharp',
        description: 'C# program'
    }
];

function runTests() {
    console.log('🧪 Running Language Detection Tests...\n');
    
    let passed = 0;
    let total = testCases.length;
    
    testCases.forEach((test, index) => {
        const detected = detectLanguage(test.code);
        const confidence = getConfidenceScore(test.code);
        const isCorrect = detected === test.expected;
        
        console.log(`Test ${index + 1}: ${test.description}`);
        console.log(`Expected: ${test.expected}`);
        console.log(`Detected: ${detected}`);
        console.log(`Confidence: ${confidence}%`);
        console.log(`Result: ${isCorrect ? '✅ PASS' : '❌ FAIL'}\n`);
        
        if (isCorrect) passed++;
    });
    
    console.log(`📊 Test Results: ${passed}/${total} tests passed (${((passed/total) * 100).toFixed(1)}%)`);
    
    if (passed === total) {
        console.log('🎉 All tests passed!');
    } else {
        console.log('⚠️  Some tests failed. Please review the detection logic.');
    }
}

// Run tests if this file is executed directly
if (require.main === module) {
    runTests();
}

module.exports = { runTests };