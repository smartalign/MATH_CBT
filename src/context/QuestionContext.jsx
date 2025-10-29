import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * QUESTION TYPE DEFINITION
 * Defines the structure of a question in our CBT system
 */
export interface Question {
  id: string;                    // Unique identifier for each question
  questionText: string;          // The actual question (supports HTML from WYSIWYG)
  options: string[];             // Array of 4 answer options (A, B, C, D)
  correctAnswer: number;         // Index of correct option (0-3)
  topic?: string;                // Optional: Math topic (Algebra, Geometry, etc.)
  difficulty?: 'easy' | 'medium' | 'hard'; // Optional: Difficulty level
  createdAt: Date;               // Timestamp when question was created
}

/**
 * CONTEXT STATE INTERFACE
 * Defines what data and functions will be available through context
 */
interface QuestionContextType {
  questions: Question[];                           // Array of all questions
  addQuestion: (question: Omit<Question, 'id' | 'createdAt'>) => void; // Add new question
  deleteQuestion: (id: string) => void;            // Delete a question by ID
  updateQuestion: (id: string, question: Partial<Question>) => void;   // Update existing question
}

// Create the context with undefined default (will be provided by Provider)
const QuestionContext = createContext<QuestionContextType | undefined>(undefined);

/**
 * QUESTION PROVIDER COMPONENT
 * Wraps the app and provides question management functionality to all children
 */
export const QuestionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // State to store all questions - starts with sample questions for demo
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      questionText: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correctAnswer: 1,
      topic: 'Basic Arithmetic',
      difficulty: 'easy',
      createdAt: new Date(),
    },
    {
      id: '2',
      questionText: 'Solve for x: 2x + 5 = 15',
      options: ['3', '5', '7', '10'],
      correctAnswer: 1,
      topic: 'Algebra',
      difficulty: 'medium',
      createdAt: new Date(),
    },
  ]);

  /**
   * ADD QUESTION FUNCTION
   * Creates a new question with auto-generated ID and timestamp
   */
  const addQuestion = (questionData: Omit<Question, 'id' | 'createdAt'>) => {
    const newQuestion: Question = {
      ...questionData,
      id: Date.now().toString(),  // Simple ID generation using timestamp
      createdAt: new Date(),      // Add creation timestamp
    };
    
    // Add new question to the beginning of the array
    setQuestions(prev => [newQuestion, ...prev]);
  };

  /**
   * DELETE QUESTION FUNCTION
   * Removes a question from the array by filtering it out
   */
  const deleteQuestion = (id: string) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  /**
   * UPDATE QUESTION FUNCTION
   * Updates specific fields of an existing question
   */
  const updateQuestion = (id: string, updatedData: Partial<Question>) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === id ? { ...q, ...updatedData } : q
      )
    );
  };

  // Provide the context value to all children components
  return (
    <QuestionContext.Provider value={{ questions, addQuestion, deleteQuestion, updateQuestion }}>
      {children}
    </QuestionContext.Provider>
  );
};

/**
 * CUSTOM HOOK TO USE QUESTION CONTEXT
 * Provides easy access to question management throughout the app
 */
export const useQuestions = () => {
  const context = useContext(QuestionContext);
  
  // Error handling: ensure hook is used within provider
  if (!context) {
    throw new Error('useQuestions must be used within QuestionProvider');
  }
  
  return context;
};
