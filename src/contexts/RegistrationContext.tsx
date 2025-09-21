import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, RegistrationData } from '@/types';

interface RegistrationContextType {
  registrationData: RegistrationData | null;
  setRegistrationData: (data: RegistrationData) => void;
  formData: Partial<User>;
  setFormData: (data: Partial<User>) => void;
  updateFormField: (field: keyof User, value: string | File) => void;
  clearRegistration: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};

interface RegistrationProviderProps {
  children: ReactNode;
}

export const RegistrationProvider: React.FC<RegistrationProviderProps> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

  const updateFormField = (field: keyof User, value: string | File) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const clearRegistration = () => {
    setRegistrationData(null);
    setFormData({});
  };

  return (
    <RegistrationContext.Provider
      value={{
        registrationData,
        setRegistrationData,
        formData,
        setFormData,
        updateFormField,
        clearRegistration
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};