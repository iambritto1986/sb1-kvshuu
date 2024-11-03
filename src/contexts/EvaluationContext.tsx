import React, { createContext, useContext, useState, useCallback } from 'react';
import { Evaluation, EvaluationStatus } from '../types/evaluation';

interface EvaluationContextType {
  evaluations: Evaluation[];
  addEvaluation: (evaluation: Omit<Evaluation, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateEvaluation: (id: string, updates: Partial<Evaluation>) => void;
  getEvaluation: (id: string) => Evaluation | undefined;
  deleteEvaluation: (id: string) => void;
  updateStatus: (id: string, status: EvaluationStatus) => void;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export const EvaluationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);

  const addEvaluation = useCallback((evaluation: Omit<Evaluation, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEvaluation: Evaluation = {
      ...evaluation,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setEvaluations(prev => [...prev, newEvaluation]);
  }, []);

  const updateEvaluation = useCallback((id: string, updates: Partial<Evaluation>) => {
    setEvaluations(prev => prev.map(evaluation => 
      evaluation.id === id ? { ...evaluation, ...updates, updatedAt: new Date() } : evaluation
    ));
  }, []);

  const getEvaluation = useCallback((id: string) => {
    return evaluations.find(evaluation => evaluation.id === id);
  }, [evaluations]);

  const deleteEvaluation = useCallback((id: string) => {
    setEvaluations(prev => prev.filter(evaluation => evaluation.id !== id));
  }, []);

  const updateStatus = useCallback((id: string, status: EvaluationStatus) => {
    setEvaluations(prev => prev.map(evaluation => 
      evaluation.id === id ? { ...evaluation, status, updatedAt: new Date() } : evaluation
    ));
  }, []);

  return (
    <EvaluationContext.Provider value={{
      evaluations,
      addEvaluation,
      updateEvaluation,
      getEvaluation,
      deleteEvaluation,
      updateStatus
    }}>
      {children}
    </EvaluationContext.Provider>
  );
};

export const useEvaluations = () => {
  const context = useContext(EvaluationContext);
  if (context === undefined) {
    throw new Error('useEvaluations must be used within an EvaluationProvider');
  }
  return context;
};