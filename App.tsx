import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentList';
import { Expenses } from './components/Expenses';
import { AIAssistant } from './components/AIAssistant';
import { LandingPage } from './components/LandingPage';
import { PageView, Student, Expense } from './types';
import { MOCK_STUDENTS, MOCK_EXPENSES } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [expenses, setExpenses] = useState<Expense[]>(MOCK_EXPENSES);

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const student: Student = {
      ...newStudent,
      id: Date.now().toString()
    };
    setStudents([...students, student]);
  };

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Date.now().toString()
    };
    setExpenses([...expenses, expense]);
  };

  if (currentPage === 'landing') {
    return <LandingPage onEnterApp={() => setCurrentPage('dashboard')} />;
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard students={students} expenses={expenses} />;
      case 'students':
        return <StudentList students={students} onAddStudent={handleAddStudent} />;
      case 'expenses':
        return <Expenses expenses={expenses} onAddExpense={handleAddExpense} />;
      case 'ai':
        return <AIAssistant students={students} expenses={expenses} />;
      default:
        return <Dashboard students={students} expenses={expenses} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      onLogout={() => setCurrentPage('landing')}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
