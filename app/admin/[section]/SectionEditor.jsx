'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const LOCALES = ['en', 'hi', 'kn'];
const LOCALE_LABELS = { en: 'English', hi: 'हिंदी', kn: 'ಕನ್ನಡ' };

// ── Helpers ────────────────────────────────────────────────────────────────

function LocalizedField({ label, value, onChange, multiline = false }) {
  return (
    <div style={{ marginBottom: '1.2rem' }}>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        {label}
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {LOCALES.map((loc) => (
          <div className="form-group" key={loc}>
            <label>{LOCALE_LABELS[loc]}</label>
            {multiline ? (
              <textarea
                value={value?.[loc] || ''}
                onChange={(e) => onChange({ ...value, [loc]: e.target.value })}
                rows={3}
              />
            ) : (
              <input
                type="text"
                value={value?.[loc] || ''}
                onChange={(e) => onChange({ ...value, [loc]: e.target.value })}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PointsEditor({ points, onChange }) {
  const addPoint = () => onChange([...points, { en: '', hi: '', kn: '' }]);
  const removePoint = (i) => onChange(points.filter((_, idx) => idx !== i));
  const updatePoint = (i, val) => onChange(points.map((p, idx) => (idx === i ? val : p)));

  return (
    <div>
      <p style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
        Key Points
      </p>
      {points.map((pt, i) => (
        <div key={i} style={{ background: 'var(--cream)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '0.75rem', border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--saffron)' }}>Point {i + 1}</span>
            <button onClick={() => removePoint(i)} style={{ background: 'none', border: 'none', color: 'var(--maroon)', cursor: 'pointer', fontSize: '0.8rem' }}>✕ Remove</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            {LOCALES.map((loc) => (
              <div className="form-group" key={loc}>
                <label>{LOCALE_LABELS[loc]}</label>
                <input type="text" value={pt[loc] || ''} onChange={(e) => updatePoint(i, { ...pt, [loc]: e.target.value })} />
              </div>
            ))}
          </div>
        </div>
      ))}
      <button onClick={addPoint} className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '8px 18px' }}>+ Add Point</button>
    </div>
  );
}

// ── Item editor — renders fields based on what keys the item has ────────────

function ItemEditor({ item, onChange, onDelete, index }) {
  const [collapsed, setCollapsed] = useState(true);

  const titleLabel = item.title?.en || item.activity?.en || `Item ${index + 1}`;

  return (
    <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', marginBottom: '1rem', overflow: 'hidden' }}>
      {/* Accordion header */}
      <div
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', cursor: 'pointer', background: collapsed ? 'var(--cream)' : 'var(--white)' }}
        onClick={() => setCollapsed(!collapsed)}
      >
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--maroon)' }}>{titleLabel}</span>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            style={{ background: 'none', border: '1px solid var(--maroon-lt)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', fontSize: '0.78rem', color: 'var(--maroon)', cursor: 'pointer' }}
          >
            Delete
          </button>
          <span style={{ color: 'var(--saffron)', fontSize: '1.1rem' }}>{collapsed ? '▸' : '▾'}</span>
        </div>
      </div>

      {!collapsed && (
        <div style={{ padding: '1.5rem' }}>
          {/* id / slug / img */}
          {item.id !== undefined && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>ID (slug-style, no spaces)</label>
              <input type="text" value={item.id || ''} onChange={(e) => onChange({ ...item, id: e.target.value })} />
            </div>
          )}
          {item.slug !== undefined && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Slug (URL path)</label>
              <input type="text" value={item.slug || ''} onChange={(e) => onChange({ ...item, slug: e.target.value })} />
            </div>
          )}
          {item.img !== undefined && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Image path (e.g. /assets/activities/blood-camp.jpg)</label>
              <input type="text" value={item.img || ''} onChange={(e) => onChange({ ...item, img: e.target.value })} />
            </div>
          )}
          {item.date !== undefined && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Date (YYYY-MM-DD)</label>
              <input type="date" value={item.date || ''} onChange={(e) => onChange({ ...item, date: e.target.value })} />
            </div>
          )}
          {item.time !== undefined && (
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Time</label>
              <input type="text" value={item.time || ''} onChange={(e) => onChange({ ...item, time: e.target.value })} />
            </div>
          )}

          {/* Localized fields */}
          {item.title    && <LocalizedField label="Title"    value={item.title}    onChange={(v) => onChange({ ...item, title: v })} />}
          {item.subtitle && <LocalizedField label="Subtitle" value={item.subtitle} onChange={(v) => onChange({ ...item, subtitle: v })} />}
          {item.activity && <LocalizedField label="Activity" value={item.activity} onChange={(v) => onChange({ ...item, activity: v })} />}
          {item.desc     && <LocalizedField label="Description" value={item.desc}  onChange={(v) => onChange({ ...item, desc: v })} multiline />}
          {item.intro    && <LocalizedField label="Intro paragraph" value={item.intro} onChange={(v) => onChange({ ...item, intro: v })} multiline />}
          {item.schedule && <LocalizedField label="Schedule / Frequency" value={item.schedule} onChange={(v) => onChange({ ...item, schedule: v })} />}

          {/* Points array */}
          {Array.isArray(item.points) && (
            <PointsEditor points={item.points} onChange={(pts) => onChange({ ...item, points: pts })} />
          )}
        </div>
      )}
    </div>
  );
}

// ── Schedule special editor (object with morning/evening/sunday arrays) ─────

function ScheduleEditor({ data, onChange }) {
  const sections = ['morning', 'evening', 'sunday'];

  const updateSlot = (section, index, val) => {
    const updated = { ...data, [section]: data[section].map((s, i) => (i === index ? val : s)) };
    onChange(updated);
  };
  const addSlot = (section) => {
    onChange({ ...data, [section]: [...(data[section] || []), { time: '', activity: { en: '', hi: '', kn: '' } }] });
  };
  const removeSlot = (section, index) => {
    onChange({ ...data, [section]: data[section].filter((_, i) => i !== index) });
  };

  return (
    <div>
      {sections.map((sec) => (
        <div key={sec} style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--maroon)', textTransform: 'capitalize', marginBottom: '1rem', fontSize: '1.2rem' }}>{sec}</h3>
          {(data[sec] || []).map((slot, i) => (
            <div key={i} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--saffron)' }}>Slot {i + 1}</span>
                <button onClick={() => removeSlot(sec, i)} style={{ background: 'none', border: 'none', color: 'var(--maroon)', cursor: 'pointer', fontSize: '0.8rem' }}>✕</button>
              </div>
              <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                <label>Time</label>
                <input type="text" value={slot.time || ''} onChange={(e) => updateSlot(sec, i, { ...slot, time: e.target.value })} />
              </div>
              <LocalizedField label="Activity" value={slot.activity} onChange={(v) => updateSlot(sec, i, { ...slot, activity: v })} />
            </div>
          ))}
          <button onClick={() => addSlot(sec)} className="btn btn-outline" style={{ fontSize: '0.82rem', padding: '8px 18px' }}>+ Add Slot</button>
        </div>
      ))}
    </div>
  );
}

// ── Main SectionEditor ─────────────────────────────────────────────────────

export default function SectionEditor({ section }) {
  const [data, setData]       = useState(null);
  const [status, setStatus]   = useState('idle'); // idle | saving | saved | error
  const isArray = Array.isArray(data);

  useEffect(() => {
    fetch(`/api/content/${section}`)
      .then((r) => r.json())
      .then(setData)
      .catch(() => setData(null));
  }, [section]);

  const updateItem = (index, val) => {
    setData((prev) => prev.map((item, i) => (i === index ? val : item)));
  };
  const deleteItem = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };
  const addItem = () => {
    // Clone the first item structure as a template, empty the values
    const template = data[0] ? JSON.parse(JSON.stringify(data[0])) : {};
    const blank = Object.fromEntries(
      Object.entries(template).map(([k, v]) => {
        if (typeof v === 'string')  return [k, ''];
        if (Array.isArray(v))       return [k, []];
        if (typeof v === 'object' && v !== null) {
          return [k, Object.fromEntries(Object.keys(v).map((l) => [l, '']))];
        }
        return [k, ''];
      })
    );
    setData((prev) => [...prev, blank]);
  };

  const save = async () => {
    setStatus('saving');
    const res = await fetch(`/api/content/${section}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setStatus(res.ok ? 'saved' : 'error');
    if (res.ok) setTimeout(() => setStatus('idle'), 2500);
  };

  const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <div className="admin-wrap">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/admin" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', textDecoration: 'none' }}>
              ← Dashboard
            </Link>
            <h1 className="admin-title">Edit: {sectionLabel}</h1>
          </div>
          <button
            onClick={save}
            className="btn btn-primary"
            disabled={status === 'saving'}
            style={{ minWidth: 130 }}
          >
            {status === 'saving' ? 'Saving…' : status === 'saved' ? '✓ Saved!' : status === 'error' ? '✗ Error' : 'Save Changes'}
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 clamp(20px, 5vw, 60px) 4rem' }}>
        {data === null && <p style={{ color: 'var(--text-muted)' }}>Loading…</p>}

        {/* Array sections: activities, programs, sanskars, events */}
        {isArray && (
          <>
            {data.map((item, i) => (
              <ItemEditor
                key={i}
                index={i}
                item={item}
                onChange={(val) => updateItem(i, val)}
                onDelete={() => deleteItem(i)}
              />
            ))}
            <div style={{ marginTop: '1.5rem' }}>
              <button onClick={addItem} className="btn btn-outline">+ Add New Item</button>
            </div>
          </>
        )}

        {/* Schedule: special object shape */}
        {!isArray && data !== null && section === 'schedule' && (
          <ScheduleEditor data={data} onChange={setData} />
        )}

        {/* Site / other flat objects: render key-value inputs */}
        {!isArray && data !== null && section !== 'schedule' && (
          <div>
            {Object.entries(data).map(([key, val]) => (
              <div className="form-group" key={key} style={{ marginBottom: '1rem' }}>
                <label>{key}</label>
                {typeof val === 'string' && val.length > 80 ? (
                  <textarea value={val} onChange={(e) => setData({ ...data, [key]: e.target.value })} />
                ) : (
                  <input type="text" value={val || ''} onChange={(e) => setData({ ...data, [key]: e.target.value })} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .admin-wrap { min-height: 100vh; background: var(--cream); padding-bottom: 4rem; }
        .admin-header { background: var(--brown-dk); padding: 1.5rem 0; margin-bottom: 2.5rem; }
        .admin-header-inner {
          max-width: 1100px; margin: 0 auto;
          padding: 0 clamp(20px, 5vw, 60px);
          display: flex; align-items: center; justify-content: space-between; gap: 1rem;
        }
        .admin-title { font-family: var(--font-serif); font-size: 1.4rem; color: #fff; }
      `}</style>
    </div>
  );
}
