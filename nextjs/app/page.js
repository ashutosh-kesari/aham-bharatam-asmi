'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { DYN, BATTLES, ARTICLES, DYKS, BATTLE_IMAGES } from '../lib/data';
import { getSiteData } from '../lib/supabaseData';
import { enrichDynasty, getDynastyHref, ERA_LABELS } from '../lib/dynastyUtils';
import { HISTORICAL_MAPS } from '../lib/historicalMaps';
import { DEFAULT_QUIZ_QUESTIONS } from '../lib/quizData';

const FAVORITES_KEY = 'bharatam_favorites';
const DYNASTY_BATCH_SIZE = 4;
const ERA_KEYS = ['ancient', 'medieval', 'modern'];
const REGION_FILTERS = ['All Regions', 'Pan-Indian', 'North', 'Northwest', 'South', 'West', 'Deccan'];
const ERA_FILTERS = ['all', 'ancient', 'medieval', 'modern'];
const MAP_FILTERS = ['all', 'ancient', 'medieval', 'modern'];
const NAV_ITEMS = [
  { page: 'history', label: 'History & Power' },
  { page: 'dynasties', label: 'Dynasties' },
  { page: 'maps', label: 'Map Atlas' },
  { page: 'quiz', label: 'Quiz' },
  { page: 'battles', label: 'Battles' },
];
const DEFAULT_VISIBLE = {
  ancient: DYNASTY_BATCH_SIZE,
  medieval: DYNASTY_BATCH_SIZE,
  modern: DYNASTY_BATCH_SIZE,
};

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[randomIndex]] = [copy[randomIndex], copy[i]];
  }
  return copy;
}

function buildAllDynasties(siteData) {
  return ERA_KEYS.flatMap((era) =>
    (siteData.DYN?.[era] || []).map((dynasty) => enrichDynasty(dynasty, era)),
  ).sort((left, right) => left.sortYear - right.sortYear);
}

function getFilteredDynasties(allDynasties, eraFilter, regionFilter) {
  return allDynasties.filter((dynasty) => {
    const eraMatch = eraFilter === 'all' || dynasty.era === eraFilter;
    const regionMatch = regionFilter === 'All Regions' || dynasty.region === regionFilter;
    return eraMatch && regionMatch;
  });
}

function getTimelineQuizPool(allDynasties) {
  return allDynasties.filter((dynasty) => (dynasty.rulers || []).length >= 4);
}

function normalizeText(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function Home() {
  const [siteData, setSiteData] = useState({
    DYN,
    BATTLES,
    ARTICLES,
    DYKS,
    MAPS: HISTORICAL_MAPS,
    QUIZZES: DEFAULT_QUIZ_QUESTIONS,
  });
  const [currentPage, setCurrentPage] = useState('home');
  const [showDyk, setShowDyk] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [introDone, setIntroDone] = useState(false);
  const [splashVisible, setSplashVisible] = useState(true);
  const [introArrowLaunched, setIntroArrowLaunched] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [navSolid, setNavSolid] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [dykText, setDykText] = useState('');
  const [selectedDynasty, setSelectedDynasty] = useState(null);
  const [selectedBattle, setSelectedBattle] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedEraFilter, setSelectedEraFilter] = useState('all');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState('All Regions');
  const [visibleDynasties, setVisibleDynasties] = useState(DEFAULT_VISIBLE);
  const [selectedMapFilter, setSelectedMapFilter] = useState('all');
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizChoice, setQuizChoice] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timelineFocusIndex, setTimelineFocusIndex] = useState(0);
  const [timelineQuizId, setTimelineQuizId] = useState(null);
  const [timelineQuizOrder, setTimelineQuizOrder] = useState([]);
  const [timelineQuizResult, setTimelineQuizResult] = useState(null);
  const [mobileNavPhase, setMobileNavPhase] = useState('closed');
  const [chatPhase, setChatPhase] = useState('closed');
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text:
        'Ask about a dynasty, battle, map, quiz, or any Indian or world history topic. If it is not in Bharatam, I will fetch a short answer from the web.',
    },
  ]);
  const cursorRef = useRef({ x: -200, y: -200, rx: -200, ry: -200 });
  const audioRef = useRef(null);
  const timelineTickAudioRef = useRef(null);
  const timelinePageRef = useRef(null);
  const hasStartedRef = useRef(false);
  const soundStateRef = useRef(true);
  const loadMoreRefs = useRef({});
  const draggedRulerIndex = useRef(null);
  const mobileNavTimerRef = useRef(null);
  const chatTimerRef = useRef(null);

  const allDynasties = buildAllDynasties(siteData);
  const favoriteDynasties = allDynasties.filter((dynasty) => favorites.includes(dynasty.id));
  const filteredDynasties = useMemo(
    () => getFilteredDynasties(allDynasties, selectedEraFilter, selectedRegionFilter),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedEraFilter, selectedRegionFilter, siteData],
  );
  const mapData = siteData.MAPS?.length ? siteData.MAPS : HISTORICAL_MAPS;
  const quizQuestions = siteData.QUIZZES?.length ? siteData.QUIZZES : DEFAULT_QUIZ_QUESTIONS;
  const dynastiesByEra = ERA_KEYS.reduce((accumulator, era) => {
    accumulator[era] = filteredDynasties.filter((dynasty) => dynasty.era === era);
    return accumulator;
  }, {});
  const filteredMaps = mapData.filter((map) => selectedMapFilter === 'all' || map.era === selectedMapFilter);
  const timelineDynasties = useMemo(
    () => [...filteredDynasties].sort((left, right) => left.sortYear - right.sortYear),
    [filteredDynasties],
  );
  const focusedTimelineDynasty = timelineDynasties[timelineFocusIndex] || timelineDynasties[0] || null;
  const timelineQuizPool = getTimelineQuizPool(allDynasties);
  const currentQuiz = quizQuestions[quizIndex] || quizQuestions[0] || null;
  const mobileNavOpen = mobileNavPhase === 'open' || mobileNavPhase === 'opening';
  const chatOpen = chatPhase === 'open' || chatPhase === 'opening';

  const selectTimelineQuiz = useCallback(
    (preferredDynastyId) => {
      const preferred =
        timelineQuizPool.find((dynasty) => dynasty.id === preferredDynastyId) ||
        timelineQuizPool[0] ||
        null;

      if (!preferred) {
        setTimelineQuizId(null);
        setTimelineQuizOrder([]);
        setTimelineQuizResult(null);
        return;
      }

      setTimelineQuizId(preferred.id);
      setTimelineQuizOrder(shuffle(preferred.rulers.slice(0, 4)));
      setTimelineQuizResult(null);
    },
    [timelineQuizPool],
  );

  const getDynastyById = useCallback(
    (id) => allDynasties.find((dynasty) => dynasty.id === id) || allDynasties[0] || null,
    [allDynasties],
  );

  const getBattleById = useCallback(
    (id) => (siteData.BATTLES || []).find((battle) => battle.id === id) || siteData.BATTLES?.[0] || null,
    [siteData.BATTLES],
  );

  const getArticleById = useCallback(
    (id) => (siteData.ARTICLES || []).find((article) => article.id === id) || siteData.ARTICLES?.[0] || null,
    [siteData.ARTICLES],
  );

  const fadeIn = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const steps = 50;
    const duration = 3000;
    const interval = duration / steps;
    let step = 0;
    clearInterval(audio._fi);
    audio._fi = setInterval(() => {
      step += 1;
      audio.volume = Math.min(0.42, 0.42 * (step / steps));
      if (step >= steps) clearInterval(audio._fi);
    }, interval);
  };

  const fadeOut = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const from = audio.volume;
    const steps = 35;
    const duration = 1600;
    const interval = duration / steps;
    let step = 0;
    clearInterval(audio._fi);
    audio._fi = setInterval(() => {
      step += 1;
      audio.volume = Math.max(0, from * (1 - step / steps));
      if (step >= steps) {
        clearInterval(audio._fi);
        audio.pause();
      }
    }, interval);
  };

  const navigateTo = useCallback(
    (page) => {
      setCurrentPage(page);
      if (page !== 'home' && !showDyk) {
        setTimeout(() => setShowDyk(true), 500);
      }
    },
    [showDyk],
  );

  const handleDynastyClick = useCallback(
    (dynastyId) => {
      const dynasty = getDynastyById(dynastyId);
      setSelectedDynasty(dynasty);
      navigateTo('chronology');
    },
    [getDynastyById, navigateTo],
  );

  const handleBattleClick = useCallback(
    (battleId) => {
      const battle = getBattleById(battleId);
      setSelectedBattle(battle);
      navigateTo('bdetail');
    },
    [getBattleById, navigateTo],
  );

  const handleArticleClick = useCallback(
    (articleId) => {
      const article = getArticleById(articleId);
      setSelectedArticle(article);
      navigateTo('article');
    },
    [getArticleById, navigateTo],
  );

  const toggleFavorite = useCallback((dynastyId) => {
    setFavorites((current) =>
      current.includes(dynastyId)
        ? current.filter((item) => item !== dynastyId)
        : [...current, dynastyId],
    );
  }, []);

  const openMobileNav = useCallback(() => {
    clearTimeout(mobileNavTimerRef.current);
    if (mobileNavPhase === 'open' || mobileNavPhase === 'opening') return;
    setMobileNavPhase('opening');
    mobileNavTimerRef.current = setTimeout(() => setMobileNavPhase('open'), 520);
  }, [mobileNavPhase]);

  const closeMobileNav = useCallback(() => {
    clearTimeout(mobileNavTimerRef.current);
    if (mobileNavPhase === 'closed' || mobileNavPhase === 'closing') return;
    setMobileNavPhase('closing');
    mobileNavTimerRef.current = setTimeout(() => setMobileNavPhase('closed'), 480);
  }, [mobileNavPhase]);

  const toggleMobileNav = useCallback(() => {
    if (mobileNavOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  }, [mobileNavOpen, closeMobileNav, openMobileNav]);

  const openChat = useCallback(() => {
    clearTimeout(chatTimerRef.current);
    if (chatPhase === 'open' || chatPhase === 'opening') return;
    setChatPhase('opening');
    chatTimerRef.current = setTimeout(() => setChatPhase('open'), 520);
  }, [chatPhase]);

  const closeChat = useCallback(() => {
    clearTimeout(chatTimerRef.current);
    if (chatPhase === 'closed' || chatPhase === 'closing') return;
    setChatPhase('closing');
    chatTimerRef.current = setTimeout(() => setChatPhase('closed'), 480);
  }, [chatPhase]);

  const toggleChat = useCallback(() => {
    if (chatOpen) {
      closeChat();
    } else {
      openChat();
    }
  }, [chatOpen, closeChat, openChat]);

  const handleMobileNavNavigate = useCallback(
    (page) => {
      closeMobileNav();
      navigateTo(page);
    },
    [closeMobileNav, navigateTo],
  );

  const performChatAction = useCallback(
    (action) => {
      if (!action) return;
      if (action.type === 'navigate') navigateTo(action.page);
      if (action.type === 'dynasty') handleDynastyClick(action.id);
      if (action.type === 'battle') handleBattleClick(action.id);
      if (action.type === 'article') handleArticleClick(action.id);
    },
    [navigateTo, handleDynastyClick, handleBattleClick, handleArticleClick],
  );

  const buildChatReply = useCallback(
    (message) => {
      const normalized = normalizeText(message);

      if (!normalized) {
        return { text: 'Ask about a dynasty, a battle, maps, or quizzes.' };
      }

      if (normalized.includes('map') || normalized.includes('atlas')) {
        return {
          text: 'Opening the historical map atlas. You can filter the atlas by era once you are there.',
          action: { type: 'navigate', page: 'maps' },
        };
      }

      if (normalized.includes('quiz')) {
        return {
          text: 'Opening the quiz section. The top card is the quick quiz and the second card is the timeline ordering challenge.',
          action: { type: 'navigate', page: 'quiz' },
        };
      }

      if (normalized.includes('timeline') || normalized.includes('chronology')) {
        return {
          text: 'Opening the dynasty timeline view.',
          action: { type: 'navigate', page: 'timeline' },
        };
      }

      const dynastyMatch = allDynasties.find((dynasty) => {
        const dynastyName = normalizeText(dynasty.name);
        return normalized.includes(dynastyName) || dynastyName.includes(normalized) || normalized === dynasty.id;
      });

      if (dynastyMatch) {
        return {
          text: `${dynastyMatch.name} spans ${dynastyMatch.period}. ${dynastyMatch.summary}`,
          action: { type: 'dynasty', id: dynastyMatch.id },
        };
      }

      const battleMatch = (siteData.BATTLES || []).find((battle) => {
        const battleName = normalizeText(battle.name);
        return normalized.includes(battleName) || battleName.includes(normalized) || normalized === battle.id;
      });

      if (battleMatch) {
        return {
          text: `${battleMatch.name} (${battleMatch.year}): ${battleMatch.summary}`,
          action: { type: 'battle', id: battleMatch.id },
        };
      }

      const articleMatch = (siteData.ARTICLES || []).find((article) => {
        const articleTitle = normalizeText(article.title);
        return normalized.includes(articleTitle) || articleTitle.includes(normalized) || normalized === article.id;
      });

      if (articleMatch) {
        return {
          text: `${articleMatch.title}: ${articleMatch.excerpt}`,
          action: { type: 'article', id: articleMatch.id },
        };
      }

      const mapMatch = mapData.find((map) => {
        const mapTitle = normalizeText(map.title);
        return normalized.includes(mapTitle) || mapTitle.includes(normalized);
      });

      if (mapMatch) {
        return {
          text: `${mapMatch.title} is in the map atlas under ${ERA_LABELS[mapMatch.era]}. Opening maps now.`,
          action: { type: 'navigate', page: 'maps' },
        };
      }

      return {
        needsWeb: true,
      };
    },
    [allDynasties, siteData.BATTLES, siteData.ARTICLES, mapData],
  );

  const submitChatMessage = useCallback(async () => {
    const trimmed = chatInput.trim();
    if (!trimmed || chatLoading) return;

    const reply = buildChatReply(trimmed);
    setChatInput('');
    setChatMessages((current) => [...current, { role: 'user', text: trimmed }]);

    if (!reply.needsWeb) {
      setChatMessages((current) => [...current, { role: 'assistant', text: reply.text }]);
      performChatAction(reply.action);
      return;
    }

    const pendingId = `web-${Date.now()}`;
    setChatLoading(true);
    setChatMessages((current) => [
      ...current,
      { id: pendingId, role: 'assistant', text: '🔍 Searching the web...', pending: true, sources: [] },
    ]);

    try {
      const response = await fetch(`/api/history-chat?q=${encodeURIComponent(trimmed)}`);
      const data = await response.json().catch(() => ({}));
      const answer =
        response.ok && typeof data?.answer === 'string'
          ? data.answer
          : 'I could not fetch a short answer right now. Please try again.';
      const sources = response.ok && Array.isArray(data?.sources) ? data.sources : [];

      setChatMessages((current) =>
        current.map((message) =>
          message.id === pendingId
            ? { ...message, text: answer, sources, pending: false }
            : message,
        ),
      );
    } catch {
      setChatMessages((current) =>
        current.map((message) =>
          message.id === pendingId
            ? {
                ...message,
                text: 'I encountered an error fetching web results. Please try again.',
                sources: [],
                pending: false,
              }
            : message,
        ),
      );
    } finally {
      setChatLoading(false);
    }
  }, [chatInput, chatLoading, buildChatReply, performChatAction]);

  const toggleSound = () => {
    const nextState = !soundOn;
    setSoundOn(nextState);

    if (!audioRef.current) return;

    if (nextState) {
      if (!hasStartedRef.current) {
        audioRef.current.play().then(() => {
          hasStartedRef.current = true;
          fadeIn();
        }).catch(() => {});
      } else {
        audioRef.current.play().then(() => fadeIn()).catch(() => {});
      }
    } else {
      fadeOut();
    }
  };

  useEffect(() => {
    soundStateRef.current = soundOn;
  }, [soundOn]);

  useEffect(
    () => () => {
      clearTimeout(chatTimerRef.current);
    },
    [],
  );

  const submitQuizChoice = (option) => {
    if (!currentQuiz) return;
    if (quizChoice) return;
    setQuizChoice(option);
    if (option === currentQuiz.answer) {
      setQuizScore((score) => score + 1);
    }
  };

  const nextQuizQuestion = () => {
    if (!quizQuestions.length) return;
    if (quizIndex === quizQuestions.length - 1) {
      setQuizComplete(true);
      return;
    }

    setQuizChoice(null);
    setQuizIndex((index) => index + 1);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setQuizChoice(null);
    setQuizScore(0);
    setQuizComplete(false);
  };

  const moveTimelineRuler = (fromIndex, toIndex) => {
    setTimelineQuizOrder((current) => {
      const next = [...current];
      const [moved] = next.splice(fromIndex, 1);
      next.splice(toIndex, 0, moved);
      return next;
    });
  };

  const checkTimelineQuiz = () => {
    const dynasty = timelineQuizPool.find((item) => item.id === timelineQuizId);
    if (!dynasty) return;

    const expected = dynasty.rulers.slice(0, 4).map((ruler) => ruler.name).join('|');
    const actual = timelineQuizOrder.map((ruler) => ruler.name).join('|');
    setTimelineQuizResult(actual === expected ? 'correct' : 'incorrect');
  };

  const playTimelineTick = useCallback(() => {
    if (!soundOn || typeof window === 'undefined') return;

    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;

    if (!timelineTickAudioRef.current) {
      timelineTickAudioRef.current = new AudioContextClass();
    }

    const context = timelineTickAudioRef.current;
    if (context.state === 'suspended') {
      context.resume().catch(() => {});
    }

    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    const filter = context.createBiquadFilter();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(460, now);
    oscillator.frequency.exponentialRampToValueAtTime(320, now + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(920, now);
    filter.Q.value = 0.2;

    gainNode.gain.setValueAtTime(0.0001, now);
    gainNode.gain.exponentialRampToValueAtTime(0.014, now + 0.012);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(context.destination);

    oscillator.start(now);
    oscillator.stop(now + 0.12);
  }, [soundOn]);

  const updateTimelineFocus = useCallback(
    (nextIndex, fromScroll = false) => {
      if (timelineDynasties.length === 0) return;
      const boundedIndex = Math.max(0, Math.min(nextIndex, timelineDynasties.length - 1));
      setTimelineFocusIndex((current) => {
        if (current === boundedIndex) return current;
        if (!fromScroll) playTimelineTick();
        return boundedIndex;
      });
    },
    [playTimelineTick, timelineDynasties.length],
  );

  const scrollTimelineToIndex = useCallback(
    (nextIndex) => {
      const container = timelinePageRef.current;
      const boundedIndex = Math.max(0, Math.min(nextIndex, timelineDynasties.length - 1));
      if (!container || timelineDynasties.length === 0) return;

      const card = container.querySelector(`[data-timeline-index="${boundedIndex}"]`);
      const scrubber = container.querySelector('.timeline-scrubber');
      const scrubberHeight = scrubber instanceof HTMLElement ? scrubber.offsetHeight : 0;

      if (card instanceof HTMLElement) {
        const targetTop = Math.max(0, card.offsetTop - scrubberHeight - 24);
        container.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
        return;
      }

      if (timelineDynasties.length <= 1) return;

      const maxScroll = Math.max(0, container.scrollHeight - container.clientHeight);
      const progress = boundedIndex / (timelineDynasties.length - 1);
      container.scrollTo({
        top: maxScroll * progress,
        behavior: 'smooth',
      });
    },
    [timelineDynasties.length],
  );

  const syncTimelineFocusFromScroll = useCallback(
    (container) => {
      if (!container || timelineDynasties.length === 0) return;

      const cards = Array.from(container.querySelectorAll('[data-timeline-index]'));
      if (cards.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const anchorY = containerRect.top + Math.min(container.clientHeight * 0.52, 360);

      let nextIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card) => {
        if (!(card instanceof HTMLElement)) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - anchorY);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nextIndex = Number(card.dataset.timelineIndex || 0);
        }
      });

      updateTimelineFocus(nextIndex);
    },
    [timelineDynasties.length, updateTimelineFocus],
  );

  // Load data, favorites, and audio on mount.
  useEffect(() => {
    let active = true;

    getSiteData().then((data) => {
      if (!active) return;
      setSiteData(data);
      setDykText(data.DYKS[Math.floor(Math.random() * data.DYKS.length)]);
      const dynasties = buildAllDynasties(data);
      setSelectedDynasty((current) => current || dynasties[0] || null);
      setSelectedBattle((current) => current || data.BATTLES?.[0] || null);
      setSelectedArticle((current) => current || data.ARTICLES?.[0] || null);
    });

    if (typeof window !== 'undefined') {
      const storedFavorites = window.localStorage.getItem(FAVORITES_KEY);
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites));
        } catch {}
      }
    }

    setIsMounted(true);
    audioRef.current = new Audio('/audio/bg-music.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    const attemptPlay = () => {
      if (!soundStateRef.current || hasStartedRef.current || !audioRef.current) return;
      audioRef.current.play().then(() => {
        hasStartedRef.current = true;
        fadeIn();
      }).catch(() => {});
    };

    const events = ['click', 'touchstart', 'keydown', 'scroll', 'pointerdown'];
    events.forEach((event) => document.addEventListener(event, attemptPlay, { passive: true }));

    return () => {
      active = false;
      events.forEach((event) => document.removeEventListener(event, attemptPlay));
    };
  }, []);

  useEffect(() => {
    if (!isMounted || typeof window === 'undefined') return;
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites, isMounted]);

  useEffect(() => {
    setVisibleDynasties(DEFAULT_VISIBLE);
  }, [selectedEraFilter, selectedRegionFilter]);

  useEffect(() => {
    if (timelineDynasties.length === 0) {
      setTimelineFocusIndex(0);
      return;
    }

    const preferredId =
      selectedDynasty && timelineDynasties.some((dynasty) => dynasty.id === selectedDynasty.id)
        ? selectedDynasty.id
        : timelineDynasties[0].id;

    const nextIndex = Math.max(
      0,
      timelineDynasties.findIndex((dynasty) => dynasty.id === preferredId),
    );

    setTimelineFocusIndex((current) => {
      const bounded = Math.max(0, Math.min(current, timelineDynasties.length - 1));
      return current === nextIndex || (selectedDynasty == null && bounded === current) ? bounded : nextIndex;
    });
  }, [selectedDynasty, timelineDynasties]);

  useEffect(() => {
    if (currentPage !== 'timeline' || typeof window === 'undefined') return undefined;

    const frame = window.requestAnimationFrame(() => {
      syncTimelineFocusFromScroll(timelinePageRef.current);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentPage, syncTimelineFocusFromScroll, timelineDynasties.length]);

  useEffect(() => {
    if (quizIndex >= quizQuestions.length) {
      setQuizIndex(0);
      setQuizChoice(null);
      setQuizComplete(false);
    }
  }, [quizIndex, quizQuestions.length]);

  useEffect(() => {
    if (timelineQuizPool.length === 0) return;

    const preferred = selectedDynasty && timelineQuizPool.some((dynasty) => dynasty.id === selectedDynasty.id)
      ? selectedDynasty.id
      : timelineQuizPool[0]?.id;

    if (!timelineQuizId || !timelineQuizPool.some((dynasty) => dynasty.id === timelineQuizId)) {
      selectTimelineQuiz(preferred);
    }
  }, [selectedDynasty, timelineQuizId, timelineQuizPool, selectTimelineQuiz]);

  useEffect(() => {
    if (introDone) return undefined;
    const timer = setTimeout(() => setIntroArrowLaunched(true), 1100);
    return () => clearTimeout(timer);
  }, [introDone]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && hash !== 'home') {
      setCurrentPage(hash);
    }
  }, []);

  useEffect(() => {
    const handlePopState = (event) => {
      const page = (event.state && event.state.page) || 'home';
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    if (currentPage !== 'home') {
      history.pushState({ page: currentPage }, '', `#${currentPage}`);
    } else {
      history.replaceState({ page: 'home' }, '', '#home');
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      setNavSolid(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return undefined;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSearchOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [searchOpen]);

  // Particles effect.
  useEffect(() => {
    if (!isMounted) return undefined;

    const canvas = document.getElementById('cvs');
    if (!canvas) return undefined;

    const context = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particles = [];
    const count = 90;
    let animationFrameId;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const createParticle = () => {
      const gold = Math.random() > 0.32;
      return {
        x: Math.random() * width,
        y: height + 10,
        r: Math.random() * 1.3 + 0.28,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -(Math.random() * 0.46 + 0.14),
        ma: Math.random() * 0.42 + 0.07,
        life: 0,
        ml: Math.random() * 420 + 180,
        col: gold ? [200, 148, 42] : [224, 115, 24],
      };
    };

    resize();
    for (let index = 0; index < count; index += 1) {
      const particle = createParticle();
      particle.y = Math.random() * height;
      particle.life = Math.floor(Math.random() * particle.ml);
      particles.push(particle);
    }

    const draw = () => {
      context.clearRect(0, 0, width, height);
      particles.forEach((particle, index) => {
        const progress = particle.life / particle.ml;
        const alpha =
          progress < 0.1
            ? particle.ma * (progress / 0.1)
            : progress > 0.82
              ? particle.ma * ((1 - progress) / 0.18)
              : particle.ma;

        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
        context.fillStyle = `rgb(${particle.col[0]},${particle.col[1]},${particle.col[2]})`;
        context.fill();

        particle.x += particle.dx;
        particle.y += particle.dy;
        particle.life += 1;

        if (particle.life >= particle.ml || particle.y < -8) {
          particles[index] = createParticle();
        }
      });

      context.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMounted]);

  // Cursor effect.
  useEffect(() => {
    if (!isMounted) return undefined;

    const timeoutId = setTimeout(() => {
      const dot = document.getElementById('cdot');
      const ring = document.getElementById('cring');
      if (!dot || !ring) return;

      const handleMove = (event) => {
        cursorRef.current.x = event.clientX;
        cursorRef.current.y = event.clientY;
      };

      document.addEventListener('mousemove', handleMove, { passive: true });

      const animate = () => {
        dot.style.transform = `translate3d(${cursorRef.current.x}px, ${cursorRef.current.y}px, 0) translate(-50%, -50%)`;

        cursorRef.current.rx += (cursorRef.current.x - cursorRef.current.rx) * 0.18;
        cursorRef.current.ry += (cursorRef.current.y - cursorRef.current.ry) * 0.18;

        ring.style.transform = `translate3d(${cursorRef.current.rx}px, ${cursorRef.current.ry}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(animate);
      };

      animate();

      const handleHover = (event) => {
        const target = event.target.closest(
          'a, button, [data-page], .dc, .bc, .rel-c, .hp-card, .other-dyn-card, .timeline-overview-card, .map-card, .quiz-option, .timeline-draggable',
        );

        if (target) {
          ring.style.width = '46px';
          ring.style.height = '46px';
          ring.style.borderColor = 'rgba(200,148,42,0.75)';
        } else {
          ring.style.width = '32px';
          ring.style.height = '32px';
          ring.style.borderColor = 'rgba(200,148,42,0.4)';
        }
      };

      document.addEventListener('mouseover', handleHover);

      return () => {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseover', handleHover);
      };
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [isMounted]);

  useEffect(() => {
    if (introDone) return undefined;

    const timer = setTimeout(() => {
      setSplashVisible(false);
      setIntroDone(true);

      if (typeof window !== 'undefined' && window.gsap) {
        const timeline = window.gsap.timeline({ defaults: { ease: 'power3.out' } });
        timeline
          .to('#he-aham', { opacity: 1, y: 0, duration: 0.7 })
          .to('#he1', { opacity: 1, y: 0, scale: 1, duration: 1.05 }, '-=0.42')
          .to('#he2', { opacity: 1, duration: 0.6 }, '-=0.5')
          .to('#he3', { opacity: 1, y: 0, duration: 0.85 }, '-=0.4')
          .to('#he4', { opacity: 1, y: 0, duration: 0.75 }, '-=0.4')
          .to('#he5', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
          .to(['#hca', '#hcb', '#hcc'], { opacity: 1, y: 0, duration: 0.75, stagger: 0.16 }, '-=0.32')
          .to('#scue', { opacity: 1, duration: 0.7 }, '-=0.18');
      } else {
        const ids = ['he-aham', 'he1', 'he2', 'he3', 'he4', 'he5', 'hca', 'hcb', 'hcc', 'scue'];
        ids.forEach((id, index) => {
          const element = document.getElementById(id);
          if (!element) return;
          setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'none';
          }, 80 + index * 105);
        });
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, [introDone]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const items = [];

    allDynasties.forEach((dynasty) => {
      items.push({
        tag: 'Dynasty',
        name: dynasty.name,
        desc: dynasty.summary,
        action: () => {
          setSearchOpen(false);
          handleDynastyClick(dynasty.id);
        },
      });

      (dynasty.rulers || []).forEach((ruler) => {
        items.push({
          tag: 'Ruler',
          name: `${ruler.name} · ${dynasty.name}`,
          desc: ruler.desc,
          action: () => {
            setSearchOpen(false);
            handleDynastyClick(dynasty.id);
          },
        });
      });
    });

    (siteData.BATTLES || []).forEach((battle) => {
      items.push({
        tag: 'Battle',
        name: `${battle.name} (${battle.year})`,
        desc: battle.summary,
        action: () => {
          setSearchOpen(false);
          handleBattleClick(battle.id);
        },
      });
    });

    (siteData.ARTICLES || []).forEach((article) => {
      items.push({
        tag: 'Article',
        name: article.title,
        desc: article.excerpt,
        action: () => {
          setSearchOpen(false);
          handleArticleClick(article.id);
        },
      });
    });

    mapData.forEach((map) => {
      items.push({
        tag: 'Map',
        name: `${map.title} (${map.yearLabel})`,
        desc: map.description,
        action: () => {
          setSearchOpen(false);
          navigateTo('maps');
        },
      });
    });

    const matches = items
      .filter((item) => item.name.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query))
      .slice(0, 8);

    setSearchResults(matches);
  }, [searchQuery, allDynasties, siteData.BATTLES, siteData.ARTICLES, mapData, handleDynastyClick, handleBattleClick, handleArticleClick, navigateTo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );

    const timeoutId = setTimeout(() => {
      document
        .querySelectorAll(
          '.dc:not(.vis), .bc:not(.vis), .hp-card:not(.vis), .tl-e:not(.vis), .timeline-overview-card:not(.vis), .map-card:not(.vis), .quiz-card:not(.vis)',
        )
        .forEach((element) => observer.observe(element));
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [currentPage, selectedDynasty, selectedMapFilter, filteredDynasties.length]);

  useEffect(() => {
    if (currentPage !== 'dynasties') return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const era = entry.target.getAttribute('data-era');
          if (!era) return;

          setVisibleDynasties((current) => ({
            ...current,
            [era]: Math.min((current[era] || DYNASTY_BATCH_SIZE) + DYNASTY_BATCH_SIZE, dynastiesByEra[era].length),
          }));
        });
      },
      { rootMargin: '180px 0px' },
    );

    ERA_KEYS.forEach((era) => {
      const node = loadMoreRefs.current[era];
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [currentPage, dynastiesByEra.ancient.length, dynastiesByEra.medieval.length, dynastiesByEra.modern.length]);

  const renderDynastyCard = (dynasty, index) => (
    <article
      key={dynasty.id}
      className="dc"
      style={{ transitionDelay: `${(index * 0.055).toFixed(2)}s` }}
      onClick={() => handleDynastyClick(dynasty.id)}
    >
      <button
        className={`favorite-chip ${favorites.includes(dynasty.id) ? 'active' : ''}`}
        onClick={(event) => {
          event.stopPropagation();
          toggleFavorite(dynasty.id);
        }}
        aria-label={favorites.includes(dynasty.id) ? 'Remove from favorites' : 'Add to favorites'}
      >
        ★
      </button>
      <div className="dc-tags">
        <span>{ERA_LABELS[dynasty.era]}</span>
        <span>{dynasty.region}</span>
      </div>
      <div className="dc-per">{dynasty.period}</div>
      <div className="dc-nm">{dynasty.name}</div>
      <div className="dc-fn">
        Founder: <em>{dynasty.founder}</em>
      </div>
      <div className="dc-sg">{dynasty.summary}</div>
      <div className="dc-actions">
        <button className="dc-bt">Explore Chronology →</button>
        <Link
          className="text-link"
          href={getDynastyHref(dynasty.id)}
          onClick={(event) => event.stopPropagation()}
        >
          Open SEO page
        </Link>
      </div>
    </article>
  );

  const renderBattleCard = (battle, index) => (
    <div
      key={battle.id}
      className="bc"
      style={{ transitionDelay: `${(index * 0.055).toFixed(2)}s` }}
      onClick={() => handleBattleClick(battle.id)}
    >
      <div className="bc-yr">{battle.year}</div>
      <div className="bc-nm">
        {battle.icon} {battle.name}
      </div>
      <div className="bc-bt">
        Between: <strong>{battle.between}</strong>
      </div>
      <div className="bc-sm">{battle.summary}</div>
      <button className="bc-bt2">View Details →</button>
    </div>
  );

  const renderHistoryCard = (article, index) => (
    <div
      key={article.id}
      className="hp-card"
      style={{ transitionDelay: `${(index * 0.08).toFixed(2)}s` }}
      onClick={() => handleArticleClick(article.id)}
    >
      <div className="hp-card-img-wrap">
        <Image
          className="hp-card-img"
          src={article.img}
          alt={article.imgAlt}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
        />
      </div>
      <div className="hp-card-body">
        <div className="hp-card-cat">{article.cat}</div>
        <div className="hp-card-title">{article.title}</div>
        <div className="hp-card-excerpt">{article.excerpt}</div>
        <div className="hp-card-cta">Read Article →</div>
      </div>
    </div>
  );

  return (
    <>
      {splashVisible && (
        <div id="intro-splash" style={{ opacity: splashVisible ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <canvas id="intro-canvas"></canvas>
          <div className="intro-logo-wrap">
            <Image id="intro-logo" src="/images/logo.png" alt="Bharatam Logo" width={320} height={320} priority />
            <div className={`intro-arrow ${introArrowLaunched ? 'launch' : ''}`} aria-hidden="true">
              <span className="intro-arrow-line"></span>
              <span className="intro-arrow-head"></span>
            </div>
          </div>
        </div>
      )}

      <div className={`dyk ${showDyk ? 'on' : ''}`} id="dyk">
        <button className="dyk-x" onClick={() => setShowDyk(false)}>
          ✕
        </button>
        <div className="dyk-lb">⚡ Did You Know?</div>
        <div className="dyk-tx" id="dyk-tx">
          {dykText || (isMounted ? DYKS[0] : '')}
        </div>
      </div>

      <div className={`chat-shell ${chatPhase}`}>
        <div className={`chat-panel ${chatPhase}`} aria-hidden={chatPhase === 'closed'}>
          <div className="chat-panel-head">
            <div>
              <div className="chat-panel-eye">Bharatam AI Guide</div>
              <strong>History Assistant</strong>
            </div>
            <button className="chat-close" onClick={closeChat}>
              ✕
            </button>
          </div>
          <div className="chat-messages">
            {chatMessages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-message ${message.role}${message.pending ? ' pending' : ''}`}>
                <p className="chat-message-text">{message.text}</p>
                {Array.isArray(message.sources) && message.sources.length > 0 && (
                  <div className="chat-sources">
                    <span className="chat-sources-label">🌐 Sources</span>
                    <ul className="chat-sources-list">
                      {message.sources.map((src, si) => (
                        <li key={si} className="chat-source-item">
                          <a href={src.url} target="_blank" rel="noopener noreferrer" className="chat-source-link">
                            <span className="chat-source-title">{src.title}</span>
                            {src.snippet && <span className="chat-source-snippet">{src.snippet}</span>}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="chat-quick-actions">
            <button className="text-link" onClick={() => performChatAction({ type: 'navigate', page: 'maps' })}>
              Open maps
            </button>
            <button className="text-link" onClick={() => performChatAction({ type: 'navigate', page: 'quiz' })}>
              Start quiz
            </button>
            <button className="text-link" onClick={() => handleDynastyClick('maurya')}>
              Show Maurya
            </button>
          </div>
          <div className="chat-input-row">
            <input
              className="chat-input"
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              disabled={chatLoading}
              onKeyDown={(event) => {
                if (event.key === 'Enter') submitChatMessage();
              }}
              placeholder="Ask about Indian or world history..."
            />
            <button className="chat-send" onClick={submitChatMessage} disabled={chatLoading}>
              {chatLoading ? '...' : 'Send'}
            </button>
          </div>
        </div>
        <button className={`chat-launcher ${chatOpen ? 'active' : ''}`} onClick={toggleChat}>
          <span>AI Chatbot</span>
          <small>{chatOpen ? 'Close' : 'Ask Bharatam AI'}</small>
        </button>
      </div>

      <nav id="nav" className={navSolid ? 'solid' : ''}>
        <div
          className="nav-brand"
          onClick={() => navigateTo('home')}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Image
            src="/images/logo.png"
            alt="Bharatam Logo"
            width={32}
            height={32}
            priority
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 6px rgba(200,148,42,.5))',
              flexShrink: 0,
              marginTop: 0,
            }}
          />
          BHARATAM
        </div>
        <ul className="nav-links">
          {NAV_ITEMS.map((item) => (
            <li key={item.page}>
              <a className={currentPage === item.page ? 'nav-active' : ''} onClick={() => navigateTo(item.page)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="nav-acts">
          <button className={`nav-menu-btn ${mobileNavOpen ? 'active' : ''}`} onClick={toggleMobileNav} aria-label="Open navigation menu">
            <span className="nav-menu-line"></span>
            <span className="nav-menu-line"></span>
            <span className="nav-menu-line"></span>
          </button>
          <button
            className="nav-btn"
            id="home-btn"
            onClick={() => navigateTo('home')}
            style={{ fontSize: '1rem', opacity: currentPage === 'home' ? 0 : 1 }}
          >
            ⌂
          </button>
          <button className={`nav-btn ${soundOn ? 'on' : ''}`} onClick={toggleSound}>
            {soundOn ? '♫' : '♪'}
          </button>
          <button className="nav-btn" onClick={() => setSearchOpen(true)}>
            ⌕
          </button>
        </div>
      </nav>

      <div className={`mobile-nav-shell ${mobileNavPhase}`}>
        <button className={`mobile-nav-backdrop ${mobileNavPhase}`} onClick={closeMobileNav} aria-label="Close navigation menu"></button>
        <aside className={`mobile-nav-panel ${mobileNavPhase}`} aria-hidden={mobileNavPhase === 'closed'}>
          <div className="mobile-nav-eye">Quick Navigation</div>
          <div className="mobile-nav-title">Bharatam Menu</div>
          <div className="mobile-nav-list">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.page}
                className={`mobile-nav-link ${currentPage === item.page ? 'active' : ''}`}
                onClick={() => handleMobileNavNavigate(item.page)}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>

      <div className={`pg ${currentPage === 'home' ? 'act' : ''}`} id="pg-home">
        <div className="hbg"></div>
        <div className="hero-wrap">
          <div className="h-aham" id="he-aham">
            Aham
          </div>
          <div className="h-title" id="he1">
            BHARATAM
          </div>
          <div className="h-sep" id="he2">
            <div className="sep-ln r"></div>
            <div className="sep-dia"></div>
            <div className="sep-ln"></div>
          </div>
          <div className="h-sans" id="he3">
            BHARATAM
          </div>
          <div className="h-tag" id="he4">
            Echoes of a Civilization that Shaped Time.
          </div>
          <div
            id="he5"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(.42rem,1.2vw,.54rem)',
              letterSpacing: '.32em',
              color: 'var(--text3)',
              textTransform: 'uppercase',
              marginTop: 14,
            }}
          >
            Founded by Ashutosh Kesari
          </div>
        </div>

        <div className="h-cards">
          <div className="h-card" id="hca" onClick={() => handleDynastyClick('maurya')}>
            <div className="h-card-inner">
              <div className="h-card-ico ico-d">👑</div>
              <div className="h-card-body">
                <div className="h-card-ttl">Ashoka – The Emperor Who Chose Dharma</div>
                <div className="h-card-dsc">Explore the dynasties that shaped the soul of Bharat.</div>
                <div className="h-card-cta">Dynasties of Bharat →</div>
              </div>
            </div>
          </div>
          <div className="h-card" id="hcb" onClick={() => navigateTo('timeline')}>
            <div className="h-card-inner">
              <div className="h-card-ico ico-b">⏳</div>
              <div className="h-card-body">
                <div className="h-card-ttl">A Visual Timeline of Dynasties</div>
                <div className="h-card-dsc">See India&apos;s dynastic story arranged as one continuous chronology.</div>
                <div className="h-card-cta">Open Timeline →</div>
              </div>
            </div>
          </div>
          <div className="h-card" id="hcc" onClick={() => navigateTo('maps')}>
            <div className="h-card-inner">
              <div className="h-card-ico ico-h">🗺️</div>
              <div className="h-card-body">
                <div className="h-card-ttl">Historical Maps Across Eras</div>
                <div className="h-card-dsc">Compare representative political maps from Maurya to the Sikh Empire.</div>
                <div className="h-card-cta">Open Map Atlas →</div>
              </div>
            </div>
          </div>
        </div>

        <div className="s-cue" id="scue">
          <div className="s-cue-tx">Explore Further</div>
          <div className="s-cue-ln"></div>
        </div>
      </div>

      <div className={`pg inner ${currentPage === 'history' ? 'act' : ''}`} id="pg-history">
        <div className="hp-hdr">
          <div className="hp-eye">Bharat Through the Ages</div>
          <div className="hp-ttl">History &amp; Power</div>
          <div className="hp-sub">
            Deep chronicles of the events, invasions, and civilizational currents that forged India&apos;s
            extraordinary story.
          </div>
        </div>
        <div className="hp-divider">
          <div className="hp-divider-ln"></div>
          <div className="hp-divider-dia"></div>
          <div className="hp-divider-ln"></div>
        </div>
        <div className="hp-grid" id="hp-grid">
          {(siteData.ARTICLES || []).map(renderHistoryCard)}
        </div>
      </div>

      <div className={`pg inner ${currentPage === 'article' ? 'act' : ''}`} id="pg-article">
        <div className="art-lay" id="art-content">
          <button className="art-back" onClick={() => navigateTo('history')}>
            ← Back to History &amp; Power
          </button>
          <div className="art-cat">{selectedArticle?.cat || siteData.ARTICLES?.[0]?.cat}</div>
          <div className="art-title">{selectedArticle?.title || siteData.ARTICLES?.[0]?.title}</div>
          <div className="art-meta">{selectedArticle?.subtitle || siteData.ARTICLES?.[0]?.subtitle}</div>
          <Image
            className="art-hero"
            src={selectedArticle?.img || siteData.ARTICLES?.[0]?.img}
            alt={selectedArticle?.imgAlt || siteData.ARTICLES?.[0]?.imgAlt}
            width={1200}
            height={675}
            sizes="(max-width: 900px) 100vw, 860px"
          />
          <div className="art-sep">
            <div className="art-sep-ln"></div>
            <div className="art-sep-dia"></div>
            <div className="art-sep-ln"></div>
          </div>
          <div className="art-body">
            {(selectedArticle?.body || siteData.ARTICLES?.[0]?.body)?.map((block, index) => {
              if (block.type === 'p') return <p key={index}>{block.text}</p>;
              if (block.type === 'h3') return <h3 key={index}>{block.text}</h3>;
              if (block.type === 'quote') {
                return (
                  <div key={index} className="art-blockquote">
                    <p>{block.text}</p>
                  </div>
                );
              }
              if (block.type === 'img') {
                return (
                  <div key={index} className="art-img-wrap">
                    <Image
                      src={block.src}
                      alt={block.alt}
                      width={900}
                      height={560}
                      sizes="(max-width: 900px) 100vw, 860px"
                    />
                    <div className="art-img-caption">{block.caption}</div>
                  </div>
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={index}>
                    {(block.items || []).map((item, itemIndex) => (
                      <li key={`${item}-${itemIndex}`}>{item}</li>
                    ))}
                  </ul>
                );
              }
              return null;
            })}
          </div>
          <div className="art-sep" style={{ marginTop: 40 }}>
            <div className="art-sep-ln"></div>
            <div className="art-sep-dia"></div>
            <div className="art-sep-ln"></div>
          </div>
          <div style={{ textAlign: 'center', padding: '20px 0 10px' }}>
            <button className="art-back" onClick={() => navigateTo('history')}>
              ← Back to History &amp; Power
            </button>
          </div>
        </div>
      </div>

      <div className={`pg inner ${currentPage === 'dynasties' ? 'act' : ''}`} id="pg-dynasties">
        <div className="pg-hdr">
          <div className="pg-eye">The Chronicles of Bharat</div>
          <div className="pg-ttl">Dynasties of India</div>
          <div className="pg-sub">Filter by era and region, save favorites, and drill into each chronology.</div>
        </div>
        <div className="shloka">
          <div className="shl-tx">&quot;यदा यदा हि धर्मस्य ग्लानिर्भवति भारत…&quot;</div>
          <div className="shl-at">— Bhagavad Gita 4.7</div>
        </div>
        <div className="filter-toolbar">
          <div className="filter-group">
            {ERA_FILTERS.map((era) => (
              <button
                key={era}
                className={`filter-chip ${selectedEraFilter === era ? 'active' : ''}`}
                onClick={() => setSelectedEraFilter(era)}
              >
                {era === 'all' ? 'All Eras' : ERA_LABELS[era]}
              </button>
            ))}
          </div>
          <div className="filter-group">
            {REGION_FILTERS.map((region) => (
              <button
                key={region}
                className={`filter-chip ${selectedRegionFilter === region ? 'active' : ''}`}
                onClick={() => setSelectedRegionFilter(region)}
              >
                {region}
              </button>
            ))}
          </div>
          <div className="filter-summary">
            <span>{filteredDynasties.length} dynasties visible</span>
            <span>{favorites.length} bookmarked</span>
          </div>
        </div>

        {favoriteDynasties.length > 0 && (
          <section className="favorites-panel">
            <div className="favorites-panel__head">
              <div>
                <div className="pg-eye">Quick Access</div>
                <h2>Bookmarked Dynasties</h2>
              </div>
            </div>
            <div className="favorites-grid">
              {favoriteDynasties.map((dynasty) => (
                <button key={dynasty.id} className="favorite-card" onClick={() => handleDynastyClick(dynasty.id)}>
                  <span>{dynasty.name}</span>
                  <small>
                    {dynasty.period} · {dynasty.region}
                  </small>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="era-wrap">
          {ERA_KEYS.map((era) => (
            <section key={era}>
              <div className="era-div">
                <div className="era-ln r"></div>
                <div className="era-lbl">{ERA_LABELS[era]} India</div>
                <div className="era-ln"></div>
              </div>
              <div className="d-grid">
                {dynastiesByEra[era].slice(0, visibleDynasties[era]).map(renderDynastyCard)}
              </div>
              {visibleDynasties[era] < dynastiesByEra[era].length && (
                <div
                  className="dynasty-load-trigger"
                  data-era={era}
                  ref={(node) => {
                    loadMoreRefs.current[era] = node;
                  }}
                >
                  Loading more chronologies…
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      <div className={`pg inner ${currentPage === 'chronology' ? 'act' : ''}`} id="pg-chronology">
        <div className="chr-banner">
          <div className="chr-bc">
            <div id="chr-eye">Chronology of Rulers</div>
            <div id="chr-ttl">{selectedDynasty?.name || allDynasties[0]?.name || 'Mauryan Empire'}</div>
            <div id="chr-per">{selectedDynasty?.period || allDynasties[0]?.period || '322 – 185 BCE'}</div>
            {selectedDynasty && (
              <div className="chronology-meta-row">
                <span>{selectedDynasty.region}</span>
                <span>{selectedDynasty.founder}</span>
                <Link className="text-link" href={getDynastyHref(selectedDynasty.id)}>
                  Open dedicated dynasty page
                </Link>
              </div>
            )}
          </div>
        </div>
        <button className="bk-btn" onClick={() => navigateTo('dynasties')}>
          ← Back to Dynasties
        </button>
        <div className="tl-wrap">
          <div className="tl-spine"></div>
          <div id="tl-ents">
            {(selectedDynasty?.rulers || allDynasties[0]?.rulers || []).map((ruler, index) => (
              <div key={`${ruler.name}-${index}`} className="tl-e" style={{ transitionDelay: `${(index * 0.07).toFixed(2)}s` }}>
                <div className="tl-dot"></div>
                <div className="tl-c">
                  <div className="tl-nm">{ruler.name}</div>
                  <div className="tl-rn">{ruler.reign}</div>
                  <div className="tl-dc">{ruler.desc}</div>
                </div>
                <div className="tl-sp"></div>
              </div>
            ))}
          </div>
        </div>
        <div id="other-dynasties-wrap">
          <div className="other-dyn-head">Explore Other Dynasties</div>
          <div className="other-dyn-sub">Continue your journey through the chronicles of Bharat</div>
          <div className="other-dyn-grid">
            {allDynasties
              .filter((dynasty) => dynasty.id !== selectedDynasty?.id)
              .map((dynasty) => (
                <div key={dynasty.id} className="other-dyn-card" onClick={() => handleDynastyClick(dynasty.id)}>
                  <div className="odc-per">{dynasty.period}</div>
                  <div className="odc-nm">{dynasty.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div
        className={`pg inner ${currentPage === 'timeline' ? 'act' : ''}`}
        id="pg-timeline"
        ref={timelinePageRef}
        onScroll={(event) => syncTimelineFocusFromScroll(event.currentTarget)}
      >
        <div className="pg-hdr">
          <div className="pg-eye">Chronological Overview</div>
          <div className="pg-ttl">Dynasty Timeline</div>
          <div className="pg-sub">A continuous visual ordering of the dynasties currently in the archive.</div>
        </div>
        {focusedTimelineDynasty && (
          <section className="timeline-scrubber">
            <div className="timeline-scrubber-copy">
              <div className="timeline-scrubber-eye">Scroll Through Time</div>
              <h2>{focusedTimelineDynasty.name}</h2>
              <p>{focusedTimelineDynasty.summary}</p>
              <div className="timeline-scrubber-meta">
                <span>{focusedTimelineDynasty.period}</span>
                <span>{ERA_LABELS[focusedTimelineDynasty.era]}</span>
                <span>{focusedTimelineDynasty.region}</span>
              </div>
            </div>
            <div className="timeline-scrubber-track">
              <input
                className="timeline-scrubber-range"
                type="range"
                min="0"
                max={String(Math.max(0, timelineDynasties.length - 1))}
                step="1"
                value={timelineFocusIndex}
                onChange={(event) => {
                  const nextIndex = Number(event.target.value);
                  updateTimelineFocus(nextIndex);
                  scrollTimelineToIndex(nextIndex);
                }}
                aria-label="Timeline scrollbar"
              />
              <div className="timeline-scrubber-labels">
                <span>{timelineDynasties[0]?.period || ''}</span>
                <span>{focusedTimelineDynasty.period}</span>
                <span>{timelineDynasties[timelineDynasties.length - 1]?.period || ''}</span>
              </div>
              <div className="timeline-scrubber-eras">
                {['ancient', 'medieval', 'modern']
                  .filter((era) => timelineDynasties.some((dynasty) => dynasty.era === era))
                  .map((era) => (
                    <button
                      key={era}
                      className={`timeline-era-chip ${focusedTimelineDynasty.era === era ? 'active' : ''}`}
                      onClick={() => {
                        const eraIndex = timelineDynasties.findIndex((dynasty) => dynasty.era === era);
                        const nextIndex = eraIndex === -1 ? 0 : eraIndex;
      updateTimelineFocus(nextIndex, true);
                        scrollTimelineToIndex(nextIndex);
                      }}
                    >
                      {ERA_LABELS[era]}
                    </button>
                  ))}
              </div>
            </div>
          </section>
        )}
        <div className="timeline-overview">
          {timelineDynasties.map((dynasty, index) => (
            <article
              key={dynasty.id}
              data-timeline-index={index}
              className={`timeline-overview-card ${dynasty.id === focusedTimelineDynasty?.id ? 'focus' : ''} ${focusedTimelineDynasty?.era === dynasty.era ? 'era-focus' : ''}`}
              style={{ transitionDelay: `${(index * 0.04).toFixed(2)}s` }}
            >
              <div className="timeline-overview-year">{dynasty.period}</div>
              <div className="timeline-overview-body">
                <div className="timeline-overview-tags">
                  <span>{ERA_LABELS[dynasty.era]}</span>
                  <span>{dynasty.region}</span>
                </div>
                <h2>{dynasty.name}</h2>
                <p>{dynasty.summary}</p>
                <div className="timeline-overview-actions">
                  <button className="text-link" onClick={() => handleDynastyClick(dynasty.id)}>
                    Open chronology
                  </button>
                  <Link className="text-link" href={getDynastyHref(dynasty.id)}>
                    Open page
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={`pg inner ${currentPage === 'maps' ? 'act' : ''}`} id="pg-maps">
        <div className="pg-hdr">
          <div className="pg-eye">Historical Cartography</div>
          <div className="pg-ttl">Map Atlas of India</div>
          <div className="pg-sub">
            Curated era snapshots based on publicly available historical reconstructions. These are not literal
            year-by-year border claims.
          </div>
        </div>
        <div className="filter-toolbar">
          <div className="filter-group">
            {MAP_FILTERS.map((era) => (
              <button
                key={era}
                className={`filter-chip ${selectedMapFilter === era ? 'active' : ''}`}
                onClick={() => setSelectedMapFilter(era)}
              >
                {era === 'all' ? 'All Eras' : ERA_LABELS[era]}
              </button>
            ))}
          </div>
        </div>
        <div className="map-grid">
          {filteredMaps.map((map, index) => (
            <article key={map.id} className="map-card" style={{ transitionDelay: `${(index * 0.05).toFixed(2)}s` }}>
              <div className="map-card-media">
                <Image
                  src={map.image}
                  alt={map.title}
                  width={map.width}
                  height={map.height}
                  sizes="(max-width: 900px) 100vw, 48vw"
                />
              </div>
              <div className="map-card-copy">
                <div className="map-card-year">
                  {map.yearLabel} · {ERA_LABELS[map.era]}
                </div>
                <h2>{map.title}</h2>
                <p>{map.description}</p>
                <p className="map-card-note">{map.sourceNote}</p>
                <div className="map-card-actions">
                  <a className="text-link" href={map.sourceUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                  {map.dynastyId && (
                    <button className="text-link" onClick={() => handleDynastyClick(map.dynastyId)}>
                      Open chronology
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className={`pg inner ${currentPage === 'quiz' ? 'act' : ''}`} id="pg-quiz">
        <div className="pg-hdr">
          <div className="pg-eye">Engagement</div>
          <div className="pg-ttl">History Quiz</div>
          <div className="pg-sub">Test recall with quick questions, then reorder rulers in a chronology challenge.</div>
        </div>

        <div className="quiz-layout">
          <section className="quiz-card">
            <div className="quiz-card-eye">Quick Quiz</div>
            {!currentQuiz ? (
              <div className="quiz-feedback">
                <p>No quick quiz questions are loaded right now. Add some from the admin panel.</p>
              </div>
            ) : !quizComplete ? (
              <>
                <div className="quiz-progress">
                  Question {quizIndex + 1} of {quizQuestions.length}
                </div>
                <h2>{currentQuiz.question}</h2>
                <div className="quiz-options">
                  {currentQuiz.options.map((option) => (
                    <button
                      key={option}
                      className={`quiz-option ${
                        quizChoice
                          ? option === currentQuiz.answer
                            ? 'correct'
                            : option === quizChoice
                              ? 'wrong'
                              : ''
                          : ''
                      }`}
                      onClick={() => submitQuizChoice(option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {quizChoice && (
                  <div className="quiz-feedback">
                    <p>{currentQuiz.explanation}</p>
                    <button className="dc-bt" onClick={nextQuizQuestion}>
                      {quizIndex === quizQuestions.length - 1 ? 'Finish quiz' : 'Next question'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="quiz-feedback">
                <h2>
                  Score: {quizScore}/{quizQuestions.length}
                </h2>
                <p>Use the chronology challenge below to test ordering, not just recall.</p>
                <button className="dc-bt" onClick={restartQuiz}>
                  Restart quiz
                </button>
              </div>
            )}
          </section>

          <section className="quiz-card">
            <div className="quiz-card-eye">Timeline Quiz</div>
            {timelineQuizId ? (
              <>
                <div className="quiz-progress">
                  Drag the rulers into correct order for{' '}
                  <strong>{timelineQuizPool.find((dynasty) => dynasty.id === timelineQuizId)?.name}</strong>
                </div>
                <div className="timeline-quiz-actions">
                  <button className="text-link" onClick={() => selectTimelineQuiz(selectedDynasty?.id)}>
                    Use current dynasty
                  </button>
                  <button
                    className="text-link"
                    onClick={() =>
                      selectTimelineQuiz(
                        timelineQuizPool.find((dynasty) => dynasty.id !== timelineQuizId)?.id || timelineQuizId,
                      )
                    }
                  >
                    Switch dynasty
                  </button>
                </div>
                <div className="timeline-draggable-list">
                  {timelineQuizOrder.map((ruler, index) => (
                    <div
                      key={`${ruler.name}-${index}`}
                      className="timeline-draggable"
                      draggable
                      onDragStart={() => {
                        draggedRulerIndex.current = index;
                      }}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => {
                        if (draggedRulerIndex.current === null) return;
                        moveTimelineRuler(draggedRulerIndex.current, index);
                        draggedRulerIndex.current = null;
                      }}
                    >
                      <span className="timeline-draggable-handle">⋮⋮</span>
                      <div>
                        <strong>{ruler.name}</strong>
                        <small>{ruler.reign}</small>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="timeline-quiz-actions">
                  <button className="dc-bt" onClick={checkTimelineQuiz}>
                    Check order
                  </button>
                  <button className="text-link" onClick={() => selectTimelineQuiz(timelineQuizId)}>
                    Shuffle again
                  </button>
                </div>
                {timelineQuizResult && (
                  <div className={`timeline-quiz-result ${timelineQuizResult}`}>
                    {timelineQuizResult === 'correct'
                      ? 'Correct order.'
                      : 'Not quite. Use the chronology view if you want to study the ruler sequence again.'}
                  </div>
                )}
              </>
            ) : (
              <p>No dynasty has enough rulers loaded yet for the drag-and-drop challenge.</p>
            )}
          </section>
        </div>
      </div>

      <div className={`pg inner ${currentPage === 'battles' ? 'act' : ''}`} id="pg-battles">
        <div className="pg-hdr">
          <div className="pg-eye">Warfare &amp; Honor</div>
          <div className="pg-ttl">Battles of Bharat</div>
          <div className="pg-sub">The clash of iron that shaped the destiny of a civilization</div>
        </div>
        <div className="shloka">
          <div className="shl-tx">&quot;क्लैब्यं मा स्म गमः पार्थ… उत्तिष्ठ परंतप&quot;</div>
          <div className="shl-at">— Bhagavad Gita 2.3</div>
        </div>
        <div className="bt-grid" id="bt-grid">
          {(siteData.BATTLES || []).map(renderBattleCard)}
        </div>
      </div>

      <div className={`pg ${currentPage === 'bdetail' ? 'act' : ''}`} id="pg-bdetail">
        <div className="bd-lay">
          <div className="bd-vis" id="bd-vis-panel">
            <Image
              className="bd-battle-img"
              src={BATTLE_IMAGES[selectedBattle?.id || 'tenKings']}
              alt={selectedBattle?.name || siteData.BATTLES?.[0]?.name}
              fill
              sizes="(max-width: 700px) 100vw, 50vw"
              priority={currentPage === 'bdetail'}
            />
            <div className="bd-vis-overlay">
              <div className="bd-ico" id="bd-ico">
                {selectedBattle?.icon || siteData.BATTLES?.[0]?.icon}
              </div>
              <div className="bd-vnm" id="bd-vnm">
                {selectedBattle?.name || siteData.BATTLES?.[0]?.name}
              </div>
              <div className="bd-vyr" id="bd-vyr">
                {selectedBattle?.year || siteData.BATTLES?.[0]?.year}
              </div>
            </div>
          </div>
          <div className="bd-info" id="bd-info">
            <button className="bk-btn" onClick={() => navigateTo('battles')}>
              ← Back to Battles
            </button>
            <div className="bd-ttl">{selectedBattle?.name || siteData.BATTLES?.[0]?.name}</div>
            <div className="bd-yl">{selectedBattle?.year || siteData.BATTLES?.[0]?.year}</div>
            <div className="bd-meta">
              <div className="bmi">
                <div className="bmi-lb">Date</div>
                <div className="bmi-vl">{selectedBattle?.d?.date || siteData.BATTLES?.[0]?.d?.date}</div>
              </div>
              <div className="bmi">
                <div className="bmi-lb">Location</div>
                <div className="bmi-vl">{selectedBattle?.d?.loc || siteData.BATTLES?.[0]?.d?.loc}</div>
              </div>
              <div className="bmi">
                <div className="bmi-lb">Outcome</div>
                <div className="bmi-vl">{selectedBattle?.d?.out || siteData.BATTLES?.[0]?.d?.out}</div>
              </div>
            </div>
            <div className="bd-sh">Commanders</div>
            <div className="bd-sb">{selectedBattle?.d?.cmd || siteData.BATTLES?.[0]?.d?.cmd}</div>
            <div className="bd-sh">Forces Engaged</div>
            <div className="bd-sb">{selectedBattle?.d?.str || siteData.BATTLES?.[0]?.d?.str}</div>
            <div className="bd-sh">Strategy</div>
            <div className="bd-sb">{selectedBattle?.d?.strat || siteData.BATTLES?.[0]?.d?.strat}</div>
            <div className="bd-sh">Turning Point</div>
            <div className="bd-sb">{selectedBattle?.d?.turn || siteData.BATTLES?.[0]?.d?.turn}</div>
            <div className="bd-sh">Casualties</div>
            <div className="bd-sb">{selectedBattle?.d?.cas || siteData.BATTLES?.[0]?.d?.cas}</div>
            <div className="bd-sh">Historical Significance</div>
            <div className="bd-sb">{selectedBattle?.d?.sig || siteData.BATTLES?.[0]?.d?.sig}</div>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div id="search-overlay">
          <div id="search-backdrop" onClick={() => setSearchOpen(false)}></div>
          <div id="search-modal">
            <div id="search-box-wrap">
              <span id="search-icon">⌕</span>
              <input
                type="text"
                id="search-input"
                placeholder="Search dynasties, battles, history…"
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              <button id="search-close" onClick={() => setSearchOpen(false)}>
                ✕
              </button>
            </div>
            <div id="search-results">
              {searchResults.length > 0 ? (
                searchResults.map((match, index) => (
                  <div key={`${match.name}-${index}`} className="sr-item" onClick={match.action}>
                    <div>
                      <div className="sr-tag">{match.tag}</div>
                    </div>
                    <div>
                      <div className="sr-name">{match.name}</div>
                      <div className="sr-desc">{match.desc.substring(0, 90)}…</div>
                    </div>
                  </div>
                ))
              ) : searchQuery ? (
                <div className="sr-empty">
                  No results for &quot;
                  {searchQuery}
                  &quot;
                </div>
              ) : null}
            </div>
            <div id="search-hint">Press <kbd>Esc</kbd> to close · Try “Maurya”, “Panipat”, “Alexander”</div>
          </div>
        </div>
      )}
    </>
  );
}