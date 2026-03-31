'use client';

import { useState, useEffect } from 'react';
import { DYN, BATTLES, ARTICLES, DYKS } from './data';

const STORAGE_KEY = 'bharatam_data';

export function useData() {
  const [data, setData] = useState({
    DYN: { ancient: [], medieval: [], modern: [] },
    BATTLES: [],
    ARTICLES: [],
    DYKS: []
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Try to load from localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        
        // Merge stored data with defaults
        setData({
          DYN: {
            ancient: parsed.dynasties?.length > 0 ? parsed.dynasties : DYN.ancient,
            medieval: DYN.medieval,
            modern: DYN.modern
          },
          BATTLES: parsed.battles?.length > 0 ? parsed.battles : BATTLES,
          ARTICLES: parsed.articles?.length > 0 ? parsed.articles : ARTICLES,
          DYKS: parsed.dyks?.length > 0 ? parsed.dyks : DYKS
        });
      } catch (e) {
        // Use defaults if parsing fails
        setData({ DYN, BATTLES, ARTICLES, DYKS });
      }
    } else {
      // Use defaults
      setData({ DYN, BATTLES, ARTICLES, DYKS });
    }
    
    setIsLoaded(true);
  }, []);

  return { data, isLoaded };
}
