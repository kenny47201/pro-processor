import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'pp:pinned-tools';
const MAX_PINNED = 12;

function read(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id) => typeof id === 'string');
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    /* ignore quota */
  }
}

export function usePinnedTools() {
  const [pinned, setPinned] = useState<string[]>(() => read());

  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setPinned(read());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const isPinned = useCallback((id: string) => pinned.includes(id), [pinned]);

  const toggle = useCallback((id: string) => {
    setPinned((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id].slice(0, MAX_PINNED);
      write(next);
      return next;
    });
  }, []);

  const clear = useCallback(() => {
    write([]);
    setPinned([]);
  }, []);

  return { pinned, isPinned, toggle, clear };
}
