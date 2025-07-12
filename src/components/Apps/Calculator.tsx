import React, { useState, useEffect, useRef, useCallback } from 'react';

// Define the type for history entries for better display
interface HistoryEntry {
    type: 'expression' | 'result';
    value: string;
}
/**
 * Calculator component for basic arithmetic operations with history.
 * Features:
 * - Keyboard and mouse input
 * - Order of operations (PEMDAS)
 * - Calculation history
 * - AC, CE, %, sign change, and decimal support
 */
const Calculator: React.FC = () => {

    const [currentInput, setCurrentInput] = useState('0');
    
    const [expression, setExpression] = useState<string[]>([]);
    
    const [lastActionEquals, setLastActionEquals] = useState(false);
    
    const [history, setHistory] = useState<HistoryEntry[]>([]); 

    const calculatorRef = useRef<HTMLDivElement>(null); 

   
    const isOperator = useCallback((char: string) => ['+', '-', '*', '/'].includes(char), []); 


    const evaluateExpression = useCallback((exp: string[]): string => {
        if (exp.length === 0) return '0';
        // --- FIXED THE ANNOYING TOKENIZATION LOGIC ---
        const tokens: (number | string)[] = [];
        for (const item of exp) {
            if (isOperator(item)) {
                tokens.push(item);
            } else {
                const num = parseFloat(item);
                if (isNaN(num)) {

                    return 'Error';
                }
                tokens.push(num);
            }
        }
        // --- END FIXED TOKENIZATION LOGIC ---

        // Handle unary minus at the start or after an operator
        const processedTokens: (number | string)[] = [];
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i] === '-' && (i === 0 || (typeof tokens[i - 1] === 'string' && isOperator(String(tokens[i - 1]))))) {
                if (typeof tokens[i + 1] === 'number') {
                    processedTokens.push(-tokens[i + 1]);
                    i++; 
                } else {
                    processedTokens.push('-');
                }
            } else {
                processedTokens.push(tokens[i]);
            }
        }

        const precedence: { [key: string]: number } = { '+': 1, '-': 1, '*': 2, '/': 2 };

        const applyOp = (operator: string, b: number, a: number): number => {
            switch (operator) {
                case '+': return a + b;
                case '-': return a - b;
                case '*': return a * b;
                case '/':
                    if (b === 0) throw new Error("Division by zero");
                    return a / b;
                default: return 0;
            }
        };

        const values: number[] = [];
        const ops: string[] = [];

        try {
            for (let i = 0; i < processedTokens.length; i++) {
                const token = processedTokens[i];
                if (typeof token === 'number') {
                    values.push(token);
                } else if (isOperator(String(token))) {
                    while (ops.length > 0 && precedence[ops[ops.length - 1]] >= precedence[String(token)]) {

                        if (values.length < 2) throw new Error("Invalid expression: insufficient operands for operator " + ops[ops.length - 1]);
                        values.push(applyOp(ops.pop()!, values.pop()!, values.pop()!));
                    }
                    ops.push(String(token));
                } else {
                    throw new Error("Invalid token in expression: " + token);
                }
            }

            while (ops.length > 0) {
                if (values.length < 2) throw new Error("Invalid expression: insufficient operands for remaining operators.");
                values.push(applyOp(ops.pop()!, values.pop()!, values.pop()!));
            }

            const result = values.pop();
            if (result === undefined || !isFinite(result)) {
                throw new Error("Calculation error: result is not a finite number.");
            }
            return String(result);
        } catch (_error: unknown) { 
            console.error("Evaluation error:", _error instanceof Error ? _error.message : _error); // Log error for debugging
            return 'Error'; 
        }
    }, [isOperator]);

  
    const handleDigitClick = useCallback((digit: string) => {
        if (lastActionEquals) {
            setExpression([]);
            setCurrentInput(digit);
            setLastActionEquals(false);
        } else if (currentInput === '0' && digit !== '.') {
            setCurrentInput(digit);
        } else if (currentInput.includes('.') && digit === '.') {
           
            return;
        } else {
            setCurrentInput((prev) => prev + digit);
        }
    }, [currentInput, lastActionEquals, setExpression, setCurrentInput, setLastActionEquals]); // Dependencies for useCallback

    // Handle operator clicks
    const handleOperatorClick = useCallback((operator: string) => {
        setLastActionEquals(false);

        let updatedExpression = [...expression];

     
        if (lastActionEquals) {
            updatedExpression = [currentInput, operator];
        }

        else if (updatedExpression.length > 0 && isOperator(updatedExpression[updatedExpression.length - 1])) {
            updatedExpression[updatedExpression.length - 1] = operator;

            if (currentInput !== '0') {
                updatedExpression.push(currentInput);
            }
        }

        else if (currentInput === '0' && updatedExpression.length === 0) {
            updatedExpression.push('0');
            updatedExpression.push(operator);
        }
 
        else {
            updatedExpression.push(currentInput);
            updatedExpression.push(operator);
        }

        setExpression(updatedExpression);
        setCurrentInput('0'); 
    }, [currentInput, expression, lastActionEquals, isOperator, setExpression, setCurrentInput]); // All setter functions are stable

    const handleEqualsClick = useCallback(() => {
        // If last action was equals, and no new input, pressing '=' again does nothing for now.

        if (lastActionEquals) {
            return;
        }

        const expressionToEvaluate = [...expression];

        // Build the final expression to be evaluated.
        // 1. If there's a trailing operator and no new number was typed (currentInput is '0'),
        //    then remove the trailing operator. E.g., '5 + =' should evaluate to '5'.
        if (expressionToEvaluate.length > 0 && isOperator(expressionToEvaluate[expressionToEvaluate.length - 1]) && currentInput === '0') {
            expressionToEvaluate.pop();
        }
        // 2. Otherwise, add the current input as the last operand.
        //    This covers cases like '8 * 9 =' where '9' is in currentInput.
        //    Also handles cases like '5=' where expression is empty and currentInput is '5'.
        else if (currentInput !== '0' || expressionToEvaluate.length === 0) {
            expressionToEvaluate.push(currentInput);
        }
        // 3. If currentInput is '0' and expression is not empty (e.g., "5 + 0 =")
        else if (currentInput === '0' && expressionToEvaluate.length > 0) {
             expressionToEvaluate.push('0');
        }
        // If `expressionToEvaluate` is still empty, it means no valid operation (e.g., just pressing '=' from start)
        if (expressionToEvaluate.length === 0) {
            return;
        }

        try {
            const result = evaluateExpression(expressionToEvaluate);
            setHistory(prev => [...prev, { type: 'expression', value: expressionToEvaluate.join(' ') }, { type: 'result', value: result }]);
            setCurrentInput(result);
            setExpression([]);
            setLastActionEquals(true);
        } catch (_e: unknown) {
            setCurrentInput('Error');
            setExpression([]);
            setLastActionEquals(true);
        }
    }, [currentInput, expression, evaluateExpression, setHistory, isOperator, setCurrentInput, setExpression, setLastActionEquals, lastActionEquals]);


    const handleAllClear = useCallback(() => {
        setCurrentInput('0');
        setExpression([]);
        setLastActionEquals(false);
        setHistory([]); // Clear history as well
    }, [setCurrentInput, setExpression, setLastActionEquals, setHistory]); // Dependencies for useCallback

    const handleClearEntry = () => {
        setCurrentInput('0');
    };

    const handleSignChange = () => {
        setCurrentInput((prev) => {
            if (prev === '0' || prev === 'Error') return prev;
            return String(parseFloat(prev) * -1);
        });
    };

    const handlePercentage = () => {
        setCurrentInput((prev) => {
            const num = parseFloat(prev);
            if (isNaN(num) || prev === 'Error') return 'Error';
            // Simple percentage: divides current input by 100
            // For more complex (e.g., 100 + 10%), you'd need more logic
            return String(num / 100);
        });
    };

    // --- Keyboard Support ---
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const { key } = event;

            // Prevent default behavior for keys we handle to stop browser shortcuts
            if (
                /\d/.test(key) || // Digits
                ['+', '-', '*', '/', '.', 'Enter', '=', 'Backspace', 'Escape'].includes(key)
            ) {
                event.preventDefault();
            }

            if (/\d/.test(key)) { // Digits 0-9
                handleDigitClick(key);
            } else if (['+', '-', '*', '/'].includes(key)) { // Operators
                handleOperatorClick(key);
            } else if (key === '.') { // Decimal
                handleDigitClick('.');
            } else if (key === 'Enter' || key === '=') { // Equals
                handleEqualsClick();
            } else if (key === 'Backspace') { // Backspace (CE logic for current input)
                setCurrentInput(prev => {
                    if (prev.length === 1 || prev === 'Error') return '0';
                    return prev.slice(0, -1);
                });
            } else if (key === 'Escape') { // Escape (AC logic)
                handleAllClear();
            }
        };

        // Attach event listener to the calculator container for better focus management
        const currentRef = calculatorRef.current;
        if (currentRef) {
            currentRef.focus(); // Ensure the calculator div can receive focus
            currentRef.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            if (currentRef) {
                currentRef.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [handleDigitClick, handleOperatorClick, handleEqualsClick, handleAllClear]); // Dependencies for useCallback

    // Determine the display value: expression or current input
    const displayExpression = expression.join(' ') + (currentInput !== '0' && !isOperator(currentInput) ? ` ${currentInput}` : '');
    const mainDisplay = currentInput;

    return (
        // Added tabIndex={0} to make the div focusable for keyboard events
        <div
            ref={calculatorRef}
            tabIndex={0}
            className="w-[260px] h-[340px] flex flex-col bg-[#EFEFEF] border border-[#7B8BBA] shadow-md rounded-sm font-xp text-sm select-none outline-none focus:outline-none" // Added focus:outline-none for cleaner focus
        >
            {/* Calculator Display Area */}
            <div className="flex flex-col items-end justify-end p-2 border-b border-[#7B8BBA] bg-[#CECECE] h-24">
                {/* History Display */}
                <div className="text-xs text-gray-600 h-6 overflow-hidden whitespace-nowrap px-1 w-full text-right">
                    {history.length > 0 ? (
                        <div className="flex flex-col items-end">
                            {history.slice(-2).map((entry, index) => ( // Display last 2 history entries
                                <span key={index} className={entry.type === 'result' ? 'font-semibold text-sm' : ''}>
                                    {entry.value}
                                </span>
                            ))}
                        </div>
                    ) : (
                        ''
                    )}
                </div>

                {/* Current Expression Display */}
                <div className="text-sm text-gray-700 h-6 overflow-hidden whitespace-nowrap px-1">
                    {displayExpression.replace(/\s[\+\-\*\/]\s$/, '')}
                </div>
                {/* Main Input Display */}
                <div className="text-4xl font-bold text-black h-12 overflow-hidden whitespace-nowrap px-1">
                    {mainDisplay}
                </div>
            </div>

            {/* Buttons Grid */}
            <div className="grid grid-cols-4 gap-[2px] p-[2px] flex-grow">
                {/* Top Row - Special Functions */}
                <button className="btn-calc-xp func" onClick={handleAllClear}>AC</button>
                <button className="btn-calc-xp func" onClick={handleClearEntry}>CE</button>
                <button className="btn-calc-xp func" onClick={handlePercentage}>%</button>
                <button className="btn-calc-xp op" onClick={() => handleOperatorClick('/')}>/</button>

                {/* Number Rows */}
                <button className="btn-calc-xp num" onClick={() => handleDigitClick('7')}>7</button>
                <button className="btn-calc-xp num" onClick={() => handleDigitClick('8')}>8</button>
                <button className="btn-calc-xp num" onClick={() => handleDigitClick('9')}>9</button>
                <button className="btn-calc-xp op" onClick={() => handleOperatorClick('*')}>*</button>

                <button className="btn-calc-xp num" onClick={() => handleDigitClick('4')}>4</button>
                <button className="btn-calc-xp num" onClick={() => handleDigitClick('5')}>5</button>
                <button className="btn-calc-xp num" onClick={() => handleDigitClick('6')}>6</button>
                <button className="btn-calc-xp op" onClick={() => handleOperatorClick('-')}>-</button>

                <button className="btn-calc-xp num" onClick={() => handleDigitClick('1')}>1</button>
                <button className="btn-calc-xp num" onClick={() => handleDigitClick('2')}>2</button>
                <button className="btn-calc-xp num" onClick={() => handleDigitClick('3')}>3</button>
                <button className="btn-calc-xp op row-span-2" onClick={() => handleOperatorClick('+')}>+</button> {/* Plus button takes 2 rows */}

                {/* Bottom Row - Zero, Decimal, Sign Change, Equals */}
                <button className="btn-calc-xp num col-span-2" onClick={() => handleDigitClick('0')}>0</button>
                <button className="btn-calc-xp num" onClick={() => handleDigitClick('.')}>.</button>
                <button className="btn-calc-xp func" onClick={handleSignChange}>+/-</button>
                <button className="btn-calc-xp equals" onClick={handleEqualsClick}>=</button>
            </div>
        </div>
    );
};

export default Calculator;