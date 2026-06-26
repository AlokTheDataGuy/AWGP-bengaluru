import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

function readJSON(filename) {
  const filePath = path.join(dataDir, filename);
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function writeJSON(filename, data) {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ── Public read helpers ────────────────────────────────────────────────────

export function getActivities() {
  return readJSON('activities.json');
}

export function getActivityBySlug(slug) {
  const all = getActivities();
  return all.find((a) => a.slug === slug) || null;
}

export function getSanskars() {
  return readJSON('sanskars.json');
}

export function getSanskarBySlug(slug) {
  const all = getSanskars();
  return all.find((s) => s.slug === slug) || null;
}

export function getSchedule() {
  return readJSON('schedule.json');
}

export function getPrograms() {
  return readJSON('programs.json');
}

export function getBlogPosts() {
  return readJSON('blog.json');
}

export function getSiteContent() {
  return readJSON('site.json');
}

// ── Admin write helpers ────────────────────────────────────────────────────
// These are only called from API routes (server-side).

export function saveActivities(data) {
  writeJSON('activities.json', data);
}

export function saveSanskars(data) {
  writeJSON('sanskars.json', data);
}

export function saveSchedule(data) {
  writeJSON('schedule.json', data);
}

export function savePrograms(data) {
  writeJSON('programs.json', data);
}

export function saveSiteContent(data) {
  writeJSON('site.json', data);
}

// ── Generic helpers used by admin API routes ───────────────────────────────

const sectionMap = {
  activities: { read: getActivities, write: saveActivities },
  sanskars:   { read: getSanskars,   write: saveSanskars   },
  programs:   { read: getPrograms,   write: savePrograms   },
  schedule:   { read: getSchedule,   write: saveSchedule   },
  site:       { read: getSiteContent,write: saveSiteContent },
};

export function readSection(section) {
  if (!sectionMap[section]) throw new Error(`Unknown section: ${section}`);
  return sectionMap[section].read();
}

export function writeSection(section, data) {
  if (!sectionMap[section]) throw new Error(`Unknown section: ${section}`);
  sectionMap[section].write(data);
}
