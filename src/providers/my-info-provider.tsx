'use client';
import { IMyStudio } from '@/types/my';
import { IPortfolioDetail } from '@/types/portfolio';
import React, { createContext, useContext, useState } from 'react';

interface MyInfoContextType {
  myPage?: IMyStudio;
  portfolioDetail?: IPortfolioDetail;
}

const MyContext = createContext<MyInfoContextType | undefined>(undefined);

export const MyInfoProvider: React.FC<{
  children: React.ReactNode;
  value: MyInfoContextType;
}> = ({ children, value }) => {
  const [myPage, setMyPage] = useState<IMyStudio | undefined>(value.myPage);
  const [portfolioDetail, setPortfolioDetail] = useState<
    IPortfolioDetail | undefined
  >(value.portfolioDetail);

  return (
    <MyContext.Provider value={{ myPage, portfolioDetail }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyInfoContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyProvider');
  }
  return context;
};
