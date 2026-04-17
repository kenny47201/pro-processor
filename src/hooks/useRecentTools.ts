import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'pp:recent-tools';
const MAX_RECENT = 6;

export interface RecentToolEntry {
  id: string;
  label: string;
  tab: string;
  lastUsed: number;
  count: number;
}

function read(): RecentToolEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((e) => e && typeof e.id === 'string');
  } catch {
    return [];
  }
}

function write(entries: RecentToolEntry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    /* ignore quota */
  }
}

export function useRecentTools() {
  const [recents, setRecents] = useState<RecentToolEntry[]>(() => read());

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setRecents(read());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const recordUse = useCallback((id: string, label: string, tab: string) => {
    setRecents((prev) => {
      const existing = prev.find((e) => e.id === id);
      const updated: RecentToolEntry = {
        id,
        label,
        tab,
        lastUsed: Date.now(),
        count: (existing?.count ?? 0) + 1,
      };
      const rest = prev.filter((e) => e.id !== id);
      const next = [updated, ...rest]
        .sort((a, b) => b.lastUsed - a.lastUsed)
        .slice(0, MAX_RECENT);
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    write([]);
    setRecents([]);
  }, []);

  return { recents, recordUse, clear };
}
