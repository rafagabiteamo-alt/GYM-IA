import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { StudentList } from './components/StudentList';
import { Expenses } from './components/Expenses';
import { AIAssistant } from './components/AIAssistant';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { PageView, Student, Transaction, User } from './types';
import { MOCK_STUDENTS, MOCK_TRANSACTIONS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>('landing');
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('gymflow_users');
    if (storedUsers) {
      setRegisteredUsers(JSON.parse(storedUsers));
    }

    const storedSession = localStorage.getItem('gymflow_session');
    if (storedSession && storedUsers) {
      const users: User[] = JSON.parse(storedUsers);
      const user = users.find(u => u.email === storedSession);
      if (user) {
        setCurrentUser(user);
        setCurrentPage('dashboard');
      }
    }
  }, []);

  const handleLoginSuccess = (email: string) => {
    const user = registeredUsers.find(u => u.email === email);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('gymflow_session', email);
      setCurrentPage('dashboard');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('gymflow_session');
    setCurrentUser(null);
    setCurrentPage('landing');
  };

  const handleAddStudent = (newStudent: Omit<Student, 'id'>) => {
    const student: Student = {
      ...newStudent,
      id: Date.now().toString()
    };
    setStudents([...students, student]);
  };

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents(students.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };

  const handleDeleteStudent = (id: string) => {
    setStudents(students.filter(s => s.id !== id));
  };

  const handleAddTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString()
    };
    setTransactions([transaction, ...transactions]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  const handleRegisterUser = (user: User) => {
    const updatedUsers = [...registeredUsers, user];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem('gymflow_users', JSON.stringify(updatedUsers));
  };

  if (currentPage === 'landing') {
    return <LandingPage onNavigate={setCurrentPage} />;
  }

  if (currentPage === 'login' || currentPage === 'register') {
    return (
      <Auth 
        view={currentPage} 
        onNavigate={setCurrentPage} 
        onSuccess={handleLoginSuccess}
        users={registeredUsers}
        onRegister={handleRegisterUser}
      />
    );
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard students={students} transactions={transactions} />;
      case 'students':
        return (
          <StudentList 
            students={students} 
            onAddStudent={handleAddStudent}
            onUpdateStudent={handleUpdateStudent}
            onDeleteStudent={handleDeleteStudent}
          />
        );
      case 'expenses':
        return (
          <Expenses 
            transactions={transactions} 
            onAddTransaction={handleAddTransaction} 
            onDeleteTransaction={handleDeleteTransaction}
          />
        );
      case 'ai':
        return <AIAssistant students={students} transactions={transactions} />;
      default:
        return <Dashboard students={students} transactions={transactions} />;
    }
  };

  return (
    <Layout 
      currentPage={currentPage} 
      setCurrentPage={setCurrentPage}
      onLogout={handleLogout}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;
