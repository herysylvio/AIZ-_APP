import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { initialSubmissions } from '../data/submissions';
import type { Submission } from '../types/aize';

interface ModerationContextValue {
  submissions: Submission[];
  pendingCount: number;
  reportCount: number;
  approve: (id: string) => void;
  reject: (id: string) => void;
}

const ModerationContext = createContext<ModerationContextValue | null>(null);

export function ModerationProvider({ children }: {children: React.ReactNode;}) {
  const [submissions, setSubmissions] = useState<Submission[]>(initialSubmissions);

  const approve = useCallback((id: string) => {
    setSubmissions((prev) =>
    prev.map((s) => s.id === id ? { ...s, status: 'validated', submittedAt: "Publié aujourd'hui" } : s)
    );
  }, []);

  const reject = useCallback((id: string) => {
    setSubmissions((prev) => prev.map((s) => s.id === id ? { ...s, status: 'rejected' } : s));
  }, []);

  const value = useMemo<ModerationContextValue>(
    () => ({
      submissions,
      pendingCount: submissions.filter((s) => s.status === 'pending').length,
      reportCount: submissions.filter((s) => s.status === 'report').length,
      approve,
      reject
    }),
    [submissions, approve, reject]
  );

  return <ModerationContext.Provider value={value}>{children}</ModerationContext.Provider>;
}

export function useModeration(): ModerationContextValue {
  const ctx = useContext(ModerationContext);
  if (!ctx) throw new Error('useModeration must be used within ModerationProvider');
  return ctx;
}