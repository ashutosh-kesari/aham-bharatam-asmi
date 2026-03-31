'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { DYN, BATTLES, ARTICLES, DYKS } from '../../lib/data';
import { HISTORICAL_MAPS } from '../../lib/historicalMaps';
import { DEFAULT_QUIZ_QUESTIONS } from '../../lib/quizData';
import { getSiteData, saveToSupabase } from '../../lib/supabaseData';
import { supabase } from '../../lib/supabase';

const STORAGE_KEY = 'bharatam_data';
const ARTICLE_IMAGE_BUCKET = 'article-images';
const TABS = ['dynasties', 'battles', 'articles', 'dyks', 'maps', 'quizzes'];

const defaultData = {
  dynasties: [...DYN.ancient, ...DYN.medieval, ...DYN.modern],
  battles: BATTLES,
  articles: ARTICLES,
  dyks: DYKS,
  maps: HISTORICAL_MAPS,
  quizzes: DEFAULT_QUIZ_QUESTIONS,
};

const emptyItemByTab = {
  dynasties: {
    id: '',
    name: '',
    period: '',
    founder: '',
    era: 'ancient',
    region: 'Pan-Indian',
    sig: '',
    summary: '',
    rulersJson: '[]',
  },
  battles: {
    id: '',
    name: '',
    year: '',
    icon: '⚔️',
    between: '',
    summary: '',
    detailsJson:
      '{\n  "date": "",\n  "loc": "",\n  "out": "",\n  "cmd": "",\n  "str": "",\n  "strat": "",\n  "turn": "",\n  "cas": "",\n  "sig": "",\n  "rel": []\n}',
  },
  articles: {
    id: '',
    title: '',
    cat: 'History & Power',
    subtitle: '',
    img: '',
    imgAlt: '',
    excerpt: '',
    body: [
      { type: 'p', text: '' },
      { type: 'img', src: '', alt: '', caption: '' },
      { type: 'p', text: '' },
    ],
  },
  dyks: {
    text: '',
  },
  maps: {
    id: '',
    dynastyId: '',
    era: 'ancient',
    yearLabel: '',
    title: '',
    description: '',
    image: '',
    width: '960',
    height: '640',
    sourceUrl: '',
    sourceLabel: 'Wikimedia Commons',
    sourceNote: '',
  },
  quizzes: {
    id: '',
    question: '',
    optionsJson: '["Option 1", "Option 2", "Option 3", "Option 4"]',
    answer: '',
    explanation: '',
  },
};

function toStorageData(siteData) {
  return {
    dynasties: [
      ...(siteData.DYN?.ancient || []),
      ...(siteData.DYN?.medieval || []),
      ...(siteData.DYN?.modern || []),
    ],
    battles: siteData.BATTLES || [],
    articles: siteData.ARTICLES || [],
    dyks: siteData.DYKS || [],
    maps: siteData.MAPS || [],
    quizzes: siteData.QUIZZES || [],
  };
}

function makeNewArticle() {
  return {
    id: `article-${Date.now()}`,
    title: 'Untitled Article',
    cat: 'History & Power',
    subtitle: '',
    img: '',
    imgAlt: '',
    excerpt: '',
    body: [{ type: 'p', text: '' }],
  };
}

function createBlock(type) {
  if (type === 'img') {
    return { type: 'img', src: '', alt: '', caption: '' };
  }
  if (type === 'h3') {
    return { type: 'h3', text: 'Section Heading' };
  }
  if (type === 'quote') {
    return { type: 'quote', text: 'Quote text' };
  }
  if (type === 'list') {
    return { type: 'list', items: ['Point 1', 'Point 2'] };
  }
  return { type: 'p', text: '' };
}

export default function Admin() {
  const [data, setData] = useState(defaultData);
  const [activeTab, setActiveTab] = useState('dynasties');
  const [saved, setSaved] = useState(false);
  const [newItem, setNewItem] = useState(emptyItemByTab.dynasties);
  const [syncStatus, setSyncStatus] = useState('');
  const [formError, setFormError] = useState('');
  const [articleIndex, setArticleIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState(null);
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authBusy, setAuthBusy] = useState(false);
  const [authStatus, setAuthStatus] = useState('');
  const [uploadingTarget, setUploadingTarget] = useState('');
  const lastSavedRef = useRef('');
  const suppressAutosaveRef = useRef(true);
  const canWriteToSupabase = Boolean(supabase && session?.user);

  useEffect(() => {
    let active = true;

    getSiteData().then((siteData) => {
      if (!active) return;
      const initialData = toStorageData(siteData);
      setData(initialData);
      setArticleIndex(0);
      lastSavedRef.current = JSON.stringify(initialData);
      suppressAutosaveRef.current = true;
      setReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!supabase) return undefined;

    let mounted = true;

    supabase.auth.getSession().then(({ data: sessionData }) => {
      if (!mounted) return;
      setSession(sessionData.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setNewItem(activeTab === 'articles' ? emptyItemByTab.articles : emptyItemByTab[activeTab]);
    setFormError('');
  }, [activeTab]);

  useEffect(() => {
    if (!ready) return;

    if (suppressAutosaveRef.current) {
      suppressAutosaveRef.current = false;
      return;
    }

    const serialized = JSON.stringify(data);
    if (serialized === lastSavedRef.current) return;

    const timeoutId = setTimeout(async () => {
      localStorage.setItem(STORAGE_KEY, serialized);

      if (canWriteToSupabase) {
        setSyncStatus('Auto-saving to database...');
        const result = await saveToSupabase(data);
        setSyncStatus(result.success ? 'Auto-saved to database.' : `Autosave failed: ${result.error}`);
      } else if (supabase) {
        setSyncStatus('Saved locally. Sign in as admin to sync with Supabase.');
      } else {
        setSyncStatus('Saved locally.');
      }

      lastSavedRef.current = serialized;
    }, 1200);

    return () => clearTimeout(timeoutId);
  }, [canWriteToSupabase, data, ready]);

  const currentItems = data[activeTab] || [];
  const selectedArticle = data.articles?.[articleIndex] || null;

  const itemPreview = useMemo(
    () =>
      currentItems.map((item) => ({
        title: item.name || item.title || item.question || item.yearLabel || item,
        subtitle: item.period || item.year || item.cat || item.era || item.answer || '',
      })),
    [currentItems],
  );

  const saveNow = async () => {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
    lastSavedRef.current = serialized;

    if (canWriteToSupabase) {
      setSyncStatus('Saving to database...');
      const result = await saveToSupabase(data);
      setSyncStatus(result.success ? 'Saved to database.' : `Error: ${result.error}`);
    } else if (supabase) {
      setSyncStatus('Saved locally. Sign in as admin to push changes to Supabase.');
    } else {
      setSyncStatus('Saved locally.');
    }

    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateArticle = (patch) => {
    setData((current) => ({
      ...current,
      articles: current.articles.map((article, index) =>
        index === articleIndex ? { ...article, ...patch } : article,
      ),
    }));
  };

  const updateArticleBlock = (blockIndex, updater) => {
    setData((current) => ({
      ...current,
      articles: current.articles.map((article, index) => {
        if (index !== articleIndex) return article;
        const nextBody = article.body.map((block, innerIndex) =>
          innerIndex === blockIndex ? updater(block) : block,
        );
        return { ...article, body: nextBody };
      }),
    }));
  };

  const handleAdminSignIn = async () => {
    if (!supabase) {
      setAuthStatus('Supabase is not configured.');
      return;
    }

    if (!authEmail.trim() || !authPassword) {
      setAuthStatus('Enter your admin email and password.');
      return;
    }

    setAuthBusy(true);
    setAuthStatus('Signing in...');

    const { error } = await supabase.auth.signInWithPassword({
      email: authEmail.trim(),
      password: authPassword,
    });

    setAuthBusy(false);
    setAuthStatus(error ? error.message : 'Signed in. Database write access is enabled.');
  };

  const handleAdminSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setAuthStatus('Signed out. Edits now stay local until you sign in again.');
  };

  const uploadArticleImage = async (file, target) => {
    if (!file) return;

    if (!canWriteToSupabase) {
      setAuthStatus('Sign in as admin before uploading images.');
      return;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-');
    const filePath = `${session.user.id}/${Date.now()}-${safeName}`;

    setUploadingTarget(target);
    setAuthStatus('Uploading image to Supabase Storage...');

    const { error } = await supabase.storage.from(ARTICLE_IMAGE_BUCKET).upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      setUploadingTarget('');
      setAuthStatus(`Upload failed: ${error.message}`);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from(ARTICLE_IMAGE_BUCKET).getPublicUrl(filePath);
    const publicUrl = publicUrlData?.publicUrl || '';

    if (!publicUrl) {
      setUploadingTarget('');
      setAuthStatus('Upload completed, but no public URL was returned.');
      return;
    }

    if (target === 'hero') {
      updateArticle({ img: publicUrl });
    } else if (target.startsWith('block-')) {
      const blockIndex = Number(target.replace('block-', ''));
      updateArticleBlock(blockIndex, (current) => ({ ...current, src: publicUrl }));
    }

    setUploadingTarget('');
    setAuthStatus('Image uploaded successfully.');
  };

  const addArticleBlock = (type) => {
    setData((current) => ({
      ...current,
      articles: current.articles.map((article, index) =>
        index === articleIndex
          ? { ...article, body: [...article.body, createBlock(type)] }
          : article,
      ),
    }));
  };

  const moveArticleBlock = (blockIndex, direction) => {
    setData((current) => ({
      ...current,
      articles: current.articles.map((article, index) => {
        if (index !== articleIndex) return article;
        const nextBody = [...article.body];
        const targetIndex = direction === 'up' ? blockIndex - 1 : blockIndex + 1;
        if (targetIndex < 0 || targetIndex >= nextBody.length) return article;
        [nextBody[blockIndex], nextBody[targetIndex]] = [nextBody[targetIndex], nextBody[blockIndex]];
        return { ...article, body: nextBody };
      }),
    }));
  };

  const deleteArticleBlock = (blockIndex) => {
    setData((current) => ({
      ...current,
      articles: current.articles.map((article, index) =>
        index === articleIndex
          ? { ...article, body: article.body.filter((_, innerIndex) => innerIndex !== blockIndex) }
          : article,
      ),
    }));
  };

  const addItem = () => {
    setFormError('');

    try {
      let builtItem;

      if (activeTab === 'dynasties') {
        builtItem = {
          id: newItem.id || `dynasty-${Date.now()}`,
          name: newItem.name || 'Dynasty Name',
          period: newItem.period || 'Period',
          founder: newItem.founder || 'Founder',
          era: newItem.era || 'ancient',
          region: newItem.region || 'Pan-Indian',
          sig: newItem.sig || 'Description',
          summary: newItem.summary || newItem.sig || 'Description',
          rulers: JSON.parse(newItem.rulersJson || '[]'),
        };
      }

      if (activeTab === 'battles') {
        builtItem = {
          id: newItem.id || `battle-${Date.now()}`,
          name: newItem.name || 'Battle Name',
          year: newItem.year || 'Year',
          icon: newItem.icon || '⚔️',
          between: newItem.between || 'Between',
          summary: newItem.summary || 'Summary',
          d: JSON.parse(newItem.detailsJson || '{}'),
        };
      }

      if (activeTab === 'articles') {
        builtItem = {
          id: newItem.id || `article-${Date.now()}`,
          title: newItem.title || 'Untitled Article',
          cat: newItem.cat || 'History & Power',
          subtitle: newItem.subtitle || '',
          img: newItem.img || '',
          imgAlt: newItem.imgAlt || '',
          excerpt: newItem.excerpt || '',
          body: newItem.body || [{ type: 'p', text: '' }],
        };
      }

      if (activeTab === 'dyks') {
        builtItem = newItem.text || 'New did-you-know fact';
      }

      if (activeTab === 'maps') {
        builtItem = {
          id: newItem.id || `map-${Date.now()}`,
          dynastyId: newItem.dynastyId || '',
          era: newItem.era || 'ancient',
          yearLabel: newItem.yearLabel || 'Year',
          title: newItem.title || 'Map title',
          description: newItem.description || 'Map description',
          image: newItem.image || '',
          width: Number(newItem.width) || 960,
          height: Number(newItem.height) || 640,
          sourceUrl: newItem.sourceUrl || '',
          sourceLabel: newItem.sourceLabel || 'Source',
          sourceNote: newItem.sourceNote || '',
        };
      }

      if (activeTab === 'quizzes') {
        builtItem = {
          id: newItem.id || `quiz-${Date.now()}`,
          question: newItem.question || 'Quiz question',
          options: JSON.parse(newItem.optionsJson || '[]'),
          answer: newItem.answer || '',
          explanation: newItem.explanation || '',
        };
      }

      setData((current) => ({
        ...current,
        [activeTab]: [...current[activeTab], builtItem],
      }));

      if (activeTab === 'articles') {
        setArticleIndex(data.articles.length);
      }

      setNewItem(activeTab === 'articles' ? emptyItemByTab.articles : emptyItemByTab[activeTab]);
    } catch (error) {
      setFormError(`Invalid JSON in form: ${error.message}`);
    }
  };

  const deleteItem = (index) => {
    setData((current) => ({
      ...current,
      [activeTab]: current[activeTab].filter((_, itemIndex) => itemIndex !== index),
    }));

    if (activeTab === 'articles') {
      setArticleIndex((current) => Math.max(0, Math.min(current, data.articles.length - 2)));
    }
  };

  const createBlankArticle = () => {
    const article = makeNewArticle();
    setData((current) => ({
      ...current,
      articles: [...current.articles, article],
    }));
    setArticleIndex(data.articles.length);
    setActiveTab('articles');
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'bharatam-data.json';
    anchor.click();
  };

  const importData = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      try {
        const imported = JSON.parse(loadEvent.target.result);
        const nextData = {
          dynasties: imported.dynasties || defaultData.dynasties,
          battles: imported.battles || defaultData.battles,
          articles: imported.articles || defaultData.articles,
          dyks: imported.dyks || defaultData.dyks,
          maps: imported.maps || defaultData.maps,
          quizzes: imported.quizzes || defaultData.quizzes,
        };
        setData(nextData);
        setArticleIndex(0);
      } catch {
        alert('Invalid JSON file');
      }
    };
    reader.readAsText(file);
  };

  const renderBasicForm = () => {
    if (activeTab === 'dynasties') {
      return (
        <>
          <input placeholder="ID" value={newItem.id} onChange={(e) => setNewItem({ ...newItem, id: e.target.value })} style={inputStyle} />
          <input placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} style={inputStyle} />
          <input placeholder="Period" value={newItem.period} onChange={(e) => setNewItem({ ...newItem, period: e.target.value })} style={inputStyle} />
          <input placeholder="Founder" value={newItem.founder} onChange={(e) => setNewItem({ ...newItem, founder: e.target.value })} style={inputStyle} />
          <select value={newItem.era} onChange={(e) => setNewItem({ ...newItem, era: e.target.value })} style={inputStyle}>
            <option value="ancient">Ancient</option>
            <option value="medieval">Medieval</option>
            <option value="modern">Modern</option>
          </select>
          <input placeholder="Region" value={newItem.region} onChange={(e) => setNewItem({ ...newItem, region: e.target.value })} style={inputStyle} />
          <textarea placeholder="Short card description" value={newItem.sig} onChange={(e) => setNewItem({ ...newItem, sig: e.target.value })} style={{ ...inputStyle, minHeight: 80 }} />
          <textarea placeholder="Longer summary" value={newItem.summary} onChange={(e) => setNewItem({ ...newItem, summary: e.target.value })} style={{ ...inputStyle, minHeight: 80 }} />
          <textarea placeholder='Rulers JSON, e.g. [{"name":"Ruler","reign":"100 CE","desc":"...","stars":4}]' value={newItem.rulersJson} onChange={(e) => setNewItem({ ...newItem, rulersJson: e.target.value })} style={{ ...inputStyle, minHeight: 160, fontFamily: 'monospace' }} />
        </>
      );
    }

    if (activeTab === 'battles') {
      return (
        <>
          <input placeholder="ID" value={newItem.id} onChange={(e) => setNewItem({ ...newItem, id: e.target.value })} style={inputStyle} />
          <input placeholder="Name" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} style={inputStyle} />
          <input placeholder="Year" value={newItem.year} onChange={(e) => setNewItem({ ...newItem, year: e.target.value })} style={inputStyle} />
          <input placeholder="Icon" value={newItem.icon} onChange={(e) => setNewItem({ ...newItem, icon: e.target.value })} style={inputStyle} />
          <input placeholder="Between" value={newItem.between} onChange={(e) => setNewItem({ ...newItem, between: e.target.value })} style={inputStyle} />
          <textarea placeholder="Summary" value={newItem.summary} onChange={(e) => setNewItem({ ...newItem, summary: e.target.value })} style={{ ...inputStyle, minHeight: 80 }} />
          <textarea placeholder="Battle details JSON" value={newItem.detailsJson} onChange={(e) => setNewItem({ ...newItem, detailsJson: e.target.value })} style={{ ...inputStyle, minHeight: 180, fontFamily: 'monospace' }} />
        </>
      );
    }

    if (activeTab === 'dyks') {
      return (
        <textarea placeholder="Did you know fact..." value={newItem.text} onChange={(e) => setNewItem({ ...newItem, text: e.target.value })} style={{ ...inputStyle, minHeight: 100 }} />
      );
    }

    if (activeTab === 'maps') {
      return (
        <>
          <input placeholder="ID" value={newItem.id} onChange={(e) => setNewItem({ ...newItem, id: e.target.value })} style={inputStyle} />
          <input placeholder="Dynasty ID" value={newItem.dynastyId} onChange={(e) => setNewItem({ ...newItem, dynastyId: e.target.value })} style={inputStyle} />
          <select value={newItem.era} onChange={(e) => setNewItem({ ...newItem, era: e.target.value })} style={inputStyle}>
            <option value="ancient">Ancient</option>
            <option value="medieval">Medieval</option>
            <option value="modern">Modern</option>
          </select>
          <input placeholder="Year label" value={newItem.yearLabel} onChange={(e) => setNewItem({ ...newItem, yearLabel: e.target.value })} style={inputStyle} />
          <input placeholder="Title" value={newItem.title} onChange={(e) => setNewItem({ ...newItem, title: e.target.value })} style={inputStyle} />
          <textarea placeholder="Description" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} style={{ ...inputStyle, minHeight: 80 }} />
          <input placeholder="Image URL" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} style={inputStyle} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input placeholder="Width" value={newItem.width} onChange={(e) => setNewItem({ ...newItem, width: e.target.value })} style={inputStyle} />
            <input placeholder="Height" value={newItem.height} onChange={(e) => setNewItem({ ...newItem, height: e.target.value })} style={inputStyle} />
          </div>
          <input placeholder="Source URL" value={newItem.sourceUrl} onChange={(e) => setNewItem({ ...newItem, sourceUrl: e.target.value })} style={inputStyle} />
          <input placeholder="Source label" value={newItem.sourceLabel} onChange={(e) => setNewItem({ ...newItem, sourceLabel: e.target.value })} style={inputStyle} />
          <textarea placeholder="Source note" value={newItem.sourceNote} onChange={(e) => setNewItem({ ...newItem, sourceNote: e.target.value })} style={{ ...inputStyle, minHeight: 80 }} />
        </>
      );
    }

    if (activeTab === 'quizzes') {
      return (
        <>
          <input placeholder="ID" value={newItem.id} onChange={(e) => setNewItem({ ...newItem, id: e.target.value })} style={inputStyle} />
          <textarea placeholder="Question" value={newItem.question} onChange={(e) => setNewItem({ ...newItem, question: e.target.value })} style={{ ...inputStyle, minHeight: 80 }} />
          <textarea placeholder='Options JSON, e.g. ["A","B","C","D"]' value={newItem.optionsJson} onChange={(e) => setNewItem({ ...newItem, optionsJson: e.target.value })} style={{ ...inputStyle, minHeight: 120, fontFamily: 'monospace' }} />
          <input placeholder="Correct answer" value={newItem.answer} onChange={(e) => setNewItem({ ...newItem, answer: e.target.value })} style={inputStyle} />
          <textarea placeholder="Explanation" value={newItem.explanation} onChange={(e) => setNewItem({ ...newItem, explanation: e.target.value })} style={{ ...inputStyle, minHeight: 100 }} />
        </>
      );
    }

    return null;
  };

  const renderArticleEditor = () => (
    <div style={articleStudioStyle}>
      <div style={articleSidebarStyle}>
        <div style={articleSidebarHeadStyle}>
          <h3 style={sectionTitleStyle}>History &amp; Power Studio</h3>
          <button onClick={createBlankArticle} style={buttonStyle}>
            New Article
          </button>
        </div>
        <p style={noteStyle}>
          Autosaves locally for everyone. Supabase writes and image uploads require admin sign-in.
        </p>
        <div style={{ display: 'grid', gap: 10 }}>
          {data.articles.map((article, index) => (
            <button
              key={article.id}
              onClick={() => setArticleIndex(index)}
              style={{
                ...articleCardStyle,
                borderColor: index === articleIndex ? '#c8942a' : 'rgba(200,148,42,0.2)',
              }}
            >
              <strong style={{ color: '#e8b84b', textAlign: 'left' }}>{article.title || 'Untitled Article'}</strong>
              <small style={{ color: '#6a5840', textAlign: 'left' }}>{article.subtitle || article.cat || 'History & Power'}</small>
            </button>
          ))}
        </div>
      </div>

      <div style={articleEditorStyle}>
        {selectedArticle ? (
          <>
            <div style={editorPanelStyle}>
              <div style={editorHeaderRowStyle}>
                <h3 style={sectionTitleStyle}>Article Editor</h3>
                <button onClick={() => deleteItem(articleIndex)} style={deleteStyle}>
                  Delete Article
                </button>
              </div>
              <input placeholder="Article ID" value={selectedArticle.id || ''} onChange={(e) => updateArticle({ id: e.target.value })} style={inputStyle} />
              <input placeholder="Title" value={selectedArticle.title || ''} onChange={(e) => updateArticle({ title: e.target.value })} style={inputStyle} />
              <input placeholder="Category" value={selectedArticle.cat || ''} onChange={(e) => updateArticle({ cat: e.target.value })} style={inputStyle} />
              <input placeholder="Subtitle" value={selectedArticle.subtitle || ''} onChange={(e) => updateArticle({ subtitle: e.target.value })} style={inputStyle} />
              <input placeholder="Hero image URL" value={selectedArticle.img || ''} onChange={(e) => updateArticle({ img: e.target.value })} style={inputStyle} />
              <label style={uploadLabelStyle}>
                {uploadingTarget === 'hero' ? 'Uploading hero image...' : 'Upload hero image'}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    uploadArticleImage(file, 'hero');
                    event.target.value = '';
                  }}
                />
              </label>
              <input placeholder="Hero image alt text" value={selectedArticle.imgAlt || ''} onChange={(e) => updateArticle({ imgAlt: e.target.value })} style={inputStyle} />
              <textarea placeholder="Excerpt" value={selectedArticle.excerpt || ''} onChange={(e) => updateArticle({ excerpt: e.target.value })} style={{ ...inputStyle, minHeight: 80 }} />

              <div style={blockToolbarStyle}>
                {['p', 'h3', 'quote', 'img', 'list'].map((type) => (
                  <button key={type} onClick={() => addArticleBlock(type)} style={smallButtonStyle}>
                    Add {type === 'p' ? 'paragraph' : type === 'h3' ? 'heading' : type}
                  </button>
                ))}
              </div>

              <div style={{ display: 'grid', gap: 14 }}>
                {selectedArticle.body?.map((block, blockIndex) => (
                  <div key={`${block.type}-${blockIndex}`} style={blockEditorCardStyle}>
                    <div style={blockEditorHeadStyle}>
                      <strong style={{ color: '#e8b84b', textTransform: 'uppercase', letterSpacing: '1px', fontSize: 12 }}>
                        {block.type}
                      </strong>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                        <button onClick={() => moveArticleBlock(blockIndex, 'up')} style={tinyButtonStyle}>
                          Up
                        </button>
                        <button onClick={() => moveArticleBlock(blockIndex, 'down')} style={tinyButtonStyle}>
                          Down
                        </button>
                        <button onClick={() => deleteArticleBlock(blockIndex)} style={tinyDeleteStyle}>
                          Delete
                        </button>
                      </div>
                    </div>

                    {(block.type === 'p' || block.type === 'h3' || block.type === 'quote') && (
                      <textarea
                        value={block.text || ''}
                        onChange={(e) => updateArticleBlock(blockIndex, (current) => ({ ...current, text: e.target.value }))}
                        style={{ ...inputStyle, minHeight: block.type === 'h3' ? 60 : 120, marginBottom: 0 }}
                      />
                    )}

                    {block.type === 'img' && (
                      <>
                        <input placeholder="Image URL" value={block.src || ''} onChange={(e) => updateArticleBlock(blockIndex, (current) => ({ ...current, src: e.target.value }))} style={inputStyle} />
                        <label style={uploadLabelStyle}>
                          {uploadingTarget === `block-${blockIndex}` ? 'Uploading block image...' : 'Upload block image'}
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(event) => {
                              const file = event.target.files?.[0];
                              uploadArticleImage(file, `block-${blockIndex}`);
                              event.target.value = '';
                            }}
                          />
                        </label>
                        <input placeholder="Alt text" value={block.alt || ''} onChange={(e) => updateArticleBlock(blockIndex, (current) => ({ ...current, alt: e.target.value }))} style={inputStyle} />
                        <input placeholder="Caption" value={block.caption || ''} onChange={(e) => updateArticleBlock(blockIndex, (current) => ({ ...current, caption: e.target.value }))} style={{ ...inputStyle, marginBottom: 0 }} />
                      </>
                    )}

                    {block.type === 'list' && (
                      <textarea
                        value={(block.items || []).join('\n')}
                        onChange={(e) =>
                          updateArticleBlock(blockIndex, (current) => ({
                            ...current,
                            items: e.target.value.split('\n').filter(Boolean),
                          }))
                        }
                        style={{ ...inputStyle, minHeight: 120, marginBottom: 0 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div style={editorPanelStyle}>
              <h3 style={sectionTitleStyle}>Live Preview</h3>
              <div style={previewCardStyle}>
                {selectedArticle.cat && <div style={previewCatStyle}>{selectedArticle.cat}</div>}
                <h1 style={previewTitleStyle}>{selectedArticle.title || 'Untitled Article'}</h1>
                {selectedArticle.subtitle && <div style={previewSubtitleStyle}>{selectedArticle.subtitle}</div>}
                {selectedArticle.img && (
                  <img
                    src={selectedArticle.img}
                    alt={selectedArticle.imgAlt || selectedArticle.title}
                    style={{ width: '100%', display: 'block', border: '1px solid rgba(200,148,42,0.2)', marginBottom: 20 }}
                  />
                )}
                <div style={{ color: '#a89070', marginBottom: 20 }}>{selectedArticle.excerpt}</div>
                <div style={{ display: 'grid', gap: 18 }}>
                  {selectedArticle.body?.map((block, blockIndex) => {
                    if (block.type === 'p') {
                      return (
                        <p key={blockIndex} style={previewParagraphStyle}>
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === 'h3') {
                      return (
                        <h3 key={blockIndex} style={previewHeadingStyle}>
                          {block.text}
                        </h3>
                      );
                    }
                    if (block.type === 'quote') {
                      return (
                        <blockquote key={blockIndex} style={previewQuoteStyle}>
                          {block.text}
                        </blockquote>
                      );
                    }
                    if (block.type === 'img') {
                      return (
                        <div key={blockIndex}>
                          {block.src && (
                            <img src={block.src} alt={block.alt || ''} style={{ width: '100%', display: 'block', border: '1px solid rgba(200,148,42,0.2)' }} />
                          )}
                          {block.caption && <div style={previewCaptionStyle}>{block.caption}</div>}
                        </div>
                      );
                    }
                    if (block.type === 'list') {
                      return (
                        <ul key={blockIndex} style={previewListStyle}>
                          {(block.items || []).map((item, itemIndex) => (
                            <li key={`${item}-${itemIndex}`}>{item}</li>
                          ))}
                        </ul>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div style={editorPanelStyle}>
            <p style={noteStyle}>No article selected.</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>BHARATAM Admin Panel</h1>

      <div style={authPanelStyle}>
        <div>
          <h3 style={{ ...sectionTitleStyle, marginBottom: 8 }}>Admin Access</h3>
          <p style={{ ...noteStyle, marginBottom: 0 }}>
            Public visitors can read data. Only signed-in admins should write to Supabase or upload article images.
          </p>
        </div>
        {supabase ? (
          session?.user ? (
            <div style={authControlsStyle}>
              <div style={{ color: '#e8b84b', fontSize: 14 }}>{session.user.email}</div>
              <button onClick={handleAdminSignOut} style={buttonStyle}>
                Sign Out
              </button>
            </div>
          ) : (
            <div style={authFormStyle}>
              <input
                placeholder="Admin email"
                value={authEmail}
                onChange={(event) => setAuthEmail(event.target.value)}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
              <input
                type="password"
                placeholder="Password"
                value={authPassword}
                onChange={(event) => setAuthPassword(event.target.value)}
                style={{ ...inputStyle, marginBottom: 0 }}
              />
              <button onClick={handleAdminSignIn} style={buttonStyle} disabled={authBusy}>
                {authBusy ? 'Signing In...' : 'Admin Sign In'}
              </button>
            </div>
          )
        ) : (
          <p style={{ color: '#c04020', margin: 0 }}>Supabase is not configured locally.</p>
        )}
      </div>

      <div style={tabWrapStyle}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              ...tabStyle,
              background: activeTab === tab ? '#c8942a' : 'transparent',
              color: activeTab === tab ? '#070604' : '#c8942a',
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'articles' ? (
        renderArticleEditor()
      ) : (
        <>
          <div style={panelStyle}>
            <h3 style={sectionTitleStyle}>Add New {activeTab.slice(0, -1)}</h3>
            {renderBasicForm()}
            {formError && <p style={{ color: '#d15b5b', marginBottom: 12 }}>{formError}</p>}
            <button onClick={addItem} style={buttonStyle}>
              Add {activeTab.slice(0, -1)}
            </button>
          </div>

          <div style={panelStyle}>
            <h3 style={sectionTitleStyle}>
              Current {activeTab} ({currentItems.length})
            </h3>
            {itemPreview.map((item, index) => (
              <div key={`${item.title}-${index}`} style={itemRowStyle}>
                <div>
                  <strong style={{ color: '#e8b84b' }}>{item.title}</strong>
                  <div style={{ fontSize: 12, color: '#6a5840' }}>{item.subtitle}</div>
                </div>
                <button onClick={() => deleteItem(index)} style={deleteStyle}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      <div style={actionWrapStyle}>
        <button onClick={saveNow} style={{ ...buttonStyle, background: '#c8942a', color: '#070604' }}>
          {saved ? '✓ Saved!' : 'Save Now'}
        </button>
        <button onClick={exportData} style={buttonStyle}>
          Export JSON
        </button>
        <label style={buttonStyle}>
          Import JSON
          <input type="file" accept=".json" onChange={importData} hidden />
        </label>
      </div>

      {syncStatus && <p style={{ textAlign: 'center', color: '#c8942a', fontSize: 14 }}>{syncStatus}</p>}
      {authStatus && <p style={{ textAlign: 'center', color: '#e8b84b', fontSize: 14 }}>{authStatus}</p>}
      <p style={{ textAlign: 'center', color: '#6a5840', fontSize: 12, marginTop: 10 }}>
        {canWriteToSupabase
          ? '✓ Admin session active - autosave, manual save, and article image uploads sync to Supabase'
          : supabase
          ? '✓ Database connected for reads - sign in as admin to sync writes and uploads'
          : '⚠ Database not connected - edits stay local until Supabase is configured'}
      </p>
    </div>
  );
}

const pageStyle = {
  minHeight: '100vh',
  background: '#070604',
  color: '#d8c8a0',
  padding: '20px',
  fontFamily: 'Crimson Pro, serif',
};

const titleStyle = {
  fontFamily: 'Cinzel Decorative, serif',
  color: '#c8942a',
  textAlign: 'center',
  marginBottom: '30px',
};

const tabWrapStyle = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  marginBottom: '30px',
  flexWrap: 'wrap',
};

const tabStyle = {
  padding: '12px 24px',
  border: '1px solid #c8942a',
  cursor: 'pointer',
  fontFamily: 'Cinzel, serif',
  fontSize: '14px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
};

const panelStyle = {
  maxWidth: '860px',
  margin: '0 auto 30px',
  padding: '20px',
  border: '1px solid rgba(200,148,42,0.3)',
  background: 'rgba(13,10,5,0.8)',
};

const authPanelStyle = {
  maxWidth: '1100px',
  margin: '0 auto 30px',
  padding: '20px',
  border: '1px solid rgba(200,148,42,0.3)',
  background: 'rgba(13,10,5,0.8)',
  display: 'grid',
  gridTemplateColumns: '1.3fr 1fr',
  gap: '16px',
  alignItems: 'center',
};

const authFormStyle = {
  display: 'grid',
  gap: '10px',
};

const authControlsStyle = {
  display: 'grid',
  gap: '10px',
  justifyItems: 'start',
};

const sectionTitleStyle = {
  color: '#c8942a',
  marginBottom: '20px',
  fontFamily: 'Cinzel, serif',
};

const inputStyle = {
  width: '100%',
  padding: '12px',
  marginBottom: '10px',
  background: 'rgba(7,6,4,0.8)',
  border: '1px solid rgba(200,148,42,0.3)',
  color: '#d8c8a0',
  fontSize: '14px',
  fontFamily: 'Crimson Pro, serif',
};

const buttonStyle = {
  padding: '12px 24px',
  background: 'transparent',
  border: '1px solid #c8942a',
  color: '#c8942a',
  cursor: 'pointer',
  fontFamily: 'Cinzel, serif',
  fontSize: '14px',
  textTransform: 'uppercase',
  letterSpacing: '2px',
};

const itemRowStyle = {
  padding: '15px',
  marginBottom: '10px',
  border: '1px solid rgba(200,148,42,0.2)',
  background: 'rgba(13,10,5,0.5)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
};

const deleteStyle = {
  background: 'transparent',
  border: '1px solid #c04020',
  color: '#c04020',
  padding: '5px 10px',
  cursor: 'pointer',
};

const actionWrapStyle = {
  maxWidth: '1100px',
  margin: '40px auto',
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  flexWrap: 'wrap',
};

const articleStudioStyle = {
  maxWidth: '1280px',
  margin: '0 auto 30px',
  display: 'grid',
  gridTemplateColumns: '300px 1fr',
  gap: '20px',
};

const articleSidebarStyle = {
  padding: '20px',
  border: '1px solid rgba(200,148,42,0.3)',
  background: 'rgba(13,10,5,0.8)',
  alignSelf: 'start',
};

const articleSidebarHeadStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '14px',
};

const articleCardStyle = {
  width: '100%',
  padding: '12px',
  background: 'rgba(7,6,4,0.8)',
  border: '1px solid rgba(200,148,42,0.2)',
  cursor: 'pointer',
  display: 'grid',
  gap: '4px',
};

const articleEditorStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
};

const editorPanelStyle = {
  padding: '20px',
  border: '1px solid rgba(200,148,42,0.3)',
  background: 'rgba(13,10,5,0.8)',
  minHeight: '400px',
};

const editorHeaderRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
};

const blockToolbarStyle = {
  display: 'flex',
  gap: '8px',
  flexWrap: 'wrap',
  margin: '12px 0 18px',
};

const smallButtonStyle = {
  padding: '8px 10px',
  background: 'transparent',
  border: '1px solid rgba(200,148,42,0.3)',
  color: '#c8942a',
  cursor: 'pointer',
  fontSize: '12px',
};

const uploadLabelStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 12px',
  marginBottom: '10px',
  background: 'rgba(200,148,42,0.08)',
  border: '1px solid rgba(200,148,42,0.3)',
  color: '#c8942a',
  cursor: 'pointer',
  fontSize: '12px',
};

const tinyButtonStyle = {
  padding: '6px 8px',
  background: 'transparent',
  border: '1px solid rgba(200,148,42,0.3)',
  color: '#c8942a',
  cursor: 'pointer',
  fontSize: '11px',
};

const tinyDeleteStyle = {
  padding: '6px 8px',
  background: 'transparent',
  border: '1px solid #c04020',
  color: '#c04020',
  cursor: 'pointer',
  fontSize: '11px',
};

const blockEditorCardStyle = {
  border: '1px solid rgba(200,148,42,0.2)',
  background: 'rgba(7,6,4,0.55)',
  padding: '14px',
};

const blockEditorHeadStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '12px',
};

const previewCardStyle = {
  border: '1px solid rgba(200,148,42,0.18)',
  background: 'rgba(7,6,4,0.55)',
  padding: '20px',
};

const previewCatStyle = {
  fontFamily: 'Cinzel, serif',
  fontSize: '12px',
  letterSpacing: '0.25em',
  textTransform: 'uppercase',
  color: '#e07318',
  marginBottom: '10px',
};

const previewTitleStyle = {
  fontFamily: 'Cinzel Decorative, serif',
  color: '#e8b84b',
  marginBottom: '12px',
  lineHeight: 1.15,
};

const previewSubtitleStyle = {
  color: '#6a5840',
  marginBottom: '18px',
};

const previewParagraphStyle = {
  color: '#d8c8a0',
  lineHeight: 1.85,
  margin: 0,
};

const previewHeadingStyle = {
  fontFamily: 'Cinzel, serif',
  color: '#c8942a',
  margin: 0,
};

const previewQuoteStyle = {
  margin: 0,
  borderLeft: '2px solid #c8942a',
  paddingLeft: '14px',
  color: '#a89070',
  fontStyle: 'italic',
  lineHeight: 1.8,
};

const previewCaptionStyle = {
  fontSize: '12px',
  color: '#6a5840',
  marginTop: '8px',
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
};

const previewListStyle = {
  color: '#d8c8a0',
  lineHeight: 1.8,
  paddingLeft: '22px',
  margin: 0,
};

const noteStyle = {
  marginBottom: '12px',
  color: '#a89070',
  lineHeight: 1.7,
};
