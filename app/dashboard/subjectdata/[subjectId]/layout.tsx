'use client';

import React, { ReactNode,  } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
interface SubjectDetailLayoutProps  {
  children: ReactNode;
  params: Promise<{
    subjectId: string;
  }>;
  
}

export default function SubjectDetailLayout({ 
  children, 
  params 
}: SubjectDetailLayoutProps) {
  // Unwrap params safely with React.use()
    const [subjectId, setSubjectId] = React.useState<string>('');

  const pathname = usePathname();
  

  React.useEffect(() => {
    params.then(({ subjectId }) => {
      setSubjectId(subjectId);
    });
  }, [params]);

  // Determine which tab is active
  const isInfoPage = pathname.includes('/info');
  
  return (
    <div className="container mx-auto px-4">
      {/* Tab navigation */}
      <div className=" relative flex mb-6 border-b border-purple-800">

      <div
          className={`absolute bottom-0 h-0.5 bg-purple-500 transition-all duration-300`}
          style={{
            width: isInfoPage ? '207px' : '187px', // Adjust width based on the active tab
            transform: isInfoPage ? 'translateX(187px)' : 'translateX(0)', // Adjust position
          }}
        ></div>        
        
        
        <Link
          href={`/dashboard/subjectdata/${subjectId}`}
          className={`px-4 py-3 font-medium text-sm transition-colors ${
            !isInfoPage 
              ? 'text-white border-purple-500' 
              : 'text-purple-300 hover:text-white'
          }`}
        >
          Análisis de rendimiento
        </Link>
        
        <Link
          href={`/dashboard/subjectdata/${subjectId}/info`}
          className={`px-4 py-3 font-medium text-sm transition-colors ${
            isInfoPage 
              ? 'text-white border-purple-500' 
              : 'text-purple-300 hover:text-white'
          }`}
        >
          Información de asignatura
        </Link>
      </div>
      
      {/* Content */}
      {children}
    </div>
  );
}