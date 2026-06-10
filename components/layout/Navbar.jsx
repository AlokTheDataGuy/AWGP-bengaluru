'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '../../lib/i18n/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import './Navbar.css';

const JOIN_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSenAHsGkgiiYVh4GkGFiV6XAFFEFqTk4LNEA0U20KiBAnHoFA/viewform?fbzx=-8132684196568383509';

const aboutMenu = [
  { href: '/about',         en: 'About Us',        hi: 'हमारे बारे में',  kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
  { href: '/initiatives',  en: 'Our Initiatives', hi: 'हमारी पहल',        kn: 'ನಮ್ಮ ಉಪಕ್ರಮಗಳು' },
  { href: '/chetna-kendra',en: 'Chetna Kendra',   hi: 'चेतना केंद्र',     kn: 'ಚೇತನ ಕೇಂದ್ರ' },
];

const eventsMenu = [
  { href: '/events/festivals',    en: 'Festival Celebrations',  hi: 'पर्व उत्सव',             kn: 'ಹಬ್ಬದ ಆಚರಣೆಗಳು' },
  { href: '/events/yagya-events', en: 'Yagya Events',           hi: 'यज्ञ आयोजन',             kn: 'ಯಜ್ಞ ಕಾರ್ಯಕ್ರಮಗಳು' },
  { href: '/events/workshops',    en: 'Workshops & Shivirs',    hi: 'कार्यशालाएं एवं शिविर',   kn: 'ಕಾರ್ಯಾಗಾರಗಳು' },
  { href: '/events/anusthan',     en: 'Anusthan',               hi: 'अनुष्ठान',                kn: 'ಅನುಷ್ಠಾನ' },
  { href: '/events/akhand-jap',   en: 'Akhand Jap',             hi: 'अखंड जप',                kn: 'ಅಖಂಡ ಜಪ' },
];

// isLabel items render as non-link group headings in the dropdown
const activitiesMenu = [
  { isLabel: true,                                   en: 'Practice',         hi: 'साधना',         kn: 'ಅಭ್ಯಾಸ' },
  { href: '/activities/yoga',                        en: 'Yoga Sessions',    hi: 'योग सत्र',       kn: 'ಯೋಗ ಸತ್ರ' },
  { href: '/activities/meditation',                  en: 'Meditation',       hi: 'ध्यान',          kn: 'ಧ್ಯಾನ' },
  { href: '/activities/jap',                         en: 'Jap',              hi: 'जप',             kn: 'ಜಪ' },
  { href: '/activities/bal-sanskar-shala',           en: 'Bal Sanskar Shala',hi: 'बाल संस्कार शाला',kn: 'ಬಾಲ ಸಂಸ್ಕಾರ ಶಾಲೆ' },
  { isLabel: true,                                   en: 'Seva',             hi: 'सेवा',           kn: 'ಸೇವೆ' },
  { href: '/activities/community-seva',              en: 'Community Seva',   hi: 'सामुदायिक सेवा', kn: 'ಸಾಮುದಾಯಿಕ ಸೇವೆ' },
  { href: '/activities/gau-seva',                    en: 'Gau Seva',         hi: 'गौ सेवा',        kn: 'ಗೌ ಸೇವಾ' },
  { href: '/activities/hospital-volunteering',       en: 'Hospital Volunteering',hi: 'अस्पताल सेवा',kn: 'ಆಸ್ಪತ್ರೆ ಸೇವೆ' },
  { href: '/activities/blood-donation',              en: 'Blood Donation',   hi: 'रक्तदान',        kn: 'ರಕ್ತದಾನ' },
  { href: '/activities/food-cloth-distribution',     en: 'Food & Cloth Distribution',hi: 'अन्न-वस्त्र वितरण',kn: 'ಅನ್ನ-ವಸ್ತ್ರ ವಿತರಣೆ' },
  { href: '/activities/tree-plantation',             en: 'Tree Plantation',  hi: 'वृक्षारोपण',     kn: 'ವೃಕ್ಷಾರೋಪಣ' },
  { href: '/activities/book-fair',                   en: 'Book Fair',        hi: 'पुस्तक मेला',    kn: 'ಪುಸ್ತಕ ಮೇಳ' },
];

const sanskarsMenu = [
  { href: '/sanskars/punsavan',    en: 'Punsavan',             hi: 'पुंसवन',                kn: 'ಪುಂಸವನ' },
  { href: '/sanskars/annaprashan', en: 'Annaprashan',          hi: 'अन्नप्राशन',            kn: 'ಅನ್ನಪ್ರಾಶನ' },
  { href: '/sanskars/naamkaran',   en: 'Naamkaran',            hi: 'नामकरण',                kn: 'ನಾಮಕರಣ' },
  { href: '/sanskars/mundan',      en: 'Mundan',               hi: 'मुंडन',                 kn: 'ಮುಂಡನ' },
  { href: '/sanskars/vidyarambh',  en: 'Vidyarambh',           hi: 'विद्यारंभ',             kn: 'ವಿದ್ಯಾರಂಭ' },
  { href: '/sanskars/vivah-divas', en: 'Vivah Divas Sanskar',  hi: 'विवाह दिवस संस्कार',   kn: 'ವಿವಾಹ ದಿವಸ ಸಂಸ್ಕಾರ' },
  { href: '/sanskars/janm-divas',  en: 'Janm Divas Sanskar',   hi: 'जन्म दिवस संस्कार',    kn: 'ಜನ್ಮ ದಿವಸ ಸಂಸ್ಕಾರ' },
  { href: '/sanskars/yagyopaveet', en: 'Yagyopaveet',          hi: 'यज्ञोपवीत',             kn: 'ಯಜ್ಞೋಪವೀತ' },
  { href: '/sanskars/deeksha',     en: 'Gayatri Deeksha',      hi: 'गायत्री दीक्षा',        kn: 'ಗಾಯತ್ರಿ ದೀಕ್ಷೆ' },
  { href: '/sanskars/tarpan',      en: 'Tarpan',               hi: 'पितृ तर्पण',             kn: 'ಪಿತೃ ತರ್ಪಣ' },
  { href: '/sanskars/anteysti',    en: 'Anteysti',             hi: 'अंत्येष्टि',             kn: 'ಅಂತ್ಯೇಷ್ಟಿ' },
];

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'hi', label: 'हि' },
  { code: 'kn', label: 'ಕ' },
];

export default function Navbar() {
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close everything on route change
  useEffect(() => {
    setOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [pathname]);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const label = (item) => item[locale] || item.en;
  const transparent = !scrolled;
  const switchLocale = (newLocale) => router.replace(pathname, { locale: newLocale });

  const renderDropdownItem = (item, onClick) => {
    if (item.isLabel) {
      return (
        <span key={`label-${item.en}`} className="navbar__dropdown-label">
          {label(item)}
        </span>
      );
    }
    return (
      <Link key={item.href} href={item.href} className="navbar__dropdown-item" onClick={onClick}>
        {label(item)}
      </Link>
    );
  };

  return (
    <nav className={`navbar${!transparent ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__inner" ref={dropdownRef}>

        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <Image
            src={transparent ? '/assets/logo-dark.png' : '/assets/logo-light.png'}
            alt="AWGP Bengaluru"
            width={160}
            height={40}
            priority
            style={{ objectFit: 'contain', width: 'auto', height: '48px' }}
          />
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li><Link href="/">{t('nav_home')}</Link></li>

          <li className="navbar__dropdown-wrap">
            <button
              className="navbar__dropdown-trigger"
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
            >
              {t('nav_about')}
              <ChevronDown size={14} className={activeDropdown === 'about' ? 'rotated' : ''} />
            </button>
            {activeDropdown === 'about' && (
              <div className="navbar__dropdown">
                {aboutMenu.map((item) => (
                  <Link key={item.href} href={item.href} className="navbar__dropdown-item">{label(item)}</Link>
                ))}
              </div>
            )}
          </li>

          <li className="navbar__dropdown-wrap">
            <button
              className="navbar__dropdown-trigger"
              onClick={() => setActiveDropdown(activeDropdown === 'sanskars' ? null : 'sanskars')}
            >
              {t('nav_sanskars')}
              <ChevronDown size={14} className={activeDropdown === 'sanskars' ? 'rotated' : ''} />
            </button>
            {activeDropdown === 'sanskars' && (
              <div className="navbar__dropdown navbar__dropdown--right">
                {sanskarsMenu.map((item) => (
                  <Link key={item.href} href={item.href} className="navbar__dropdown-item">{label(item)}</Link>
                ))}
              </div>
            )}
          </li>

          <li className="navbar__dropdown-wrap">
            <button
              className="navbar__dropdown-trigger"
              onClick={() => setActiveDropdown(activeDropdown === 'events' ? null : 'events')}
            >
              {t('nav_events')}
              <ChevronDown size={14} className={activeDropdown === 'events' ? 'rotated' : ''} />
            </button>
            {activeDropdown === 'events' && (
              <div className="navbar__dropdown">
                {eventsMenu.map((item) => (
                  <Link key={item.href} href={item.href} className="navbar__dropdown-item">{label(item)}</Link>
                ))}
              </div>
            )}
          </li>

          <li className="navbar__dropdown-wrap">
            <button
              className="navbar__dropdown-trigger"
              onClick={() => setActiveDropdown(activeDropdown === 'activities' ? null : 'activities')}
            >
              {t('nav_activities')}
              <ChevronDown size={14} className={activeDropdown === 'activities' ? 'rotated' : ''} />
            </button>
            {activeDropdown === 'activities' && (
              <div className="navbar__dropdown">
                {activitiesMenu.map((item) => renderDropdownItem(item, undefined))}
              </div>
            )}
          </li>

          <li><Link href="/literature">{t('nav_literature')}</Link></li>

          <li><Link href="/contact">{t('nav_contact')}</Link></li>
        </ul>

        {/* Right: lang toggle + Join Us + hamburger */}
        <div className="navbar__right">
          <div className="lang-toggle">
            {LANGS.map(({ code, label: lbl }) => (
              <button
                key={code}
                className={`lang-btn${locale === code ? ' lang-btn--active' : ''}`}
                onClick={() => switchLocale(code)}
              >
                {lbl}
              </button>
            ))}
          </div>

          <a
            href={JOIN_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__join-btn"
          >
            {locale === 'hi' ? 'जुड़ें' : locale === 'kn' ? 'ಸೇರಿ' : 'Join Us'}
          </a>

          <button
            className="navbar__hamburger"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`navbar__backdrop${open ? ' navbar__backdrop--show' : ''}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile panel — slides from right */}
      <div className={`navbar__mobile${open ? ' navbar__mobile--open' : ''}`}>

        {/* Panel header */}
        <div className="navbar__mobile-header">
          <Link href="/" className="navbar__mobile-logo" onClick={() => setOpen(false)}>
            <Image
              src="/assets/logo-light.png"
              alt="AWGP Bengaluru"
              width={140}
              height={36}
              style={{ objectFit: 'contain', width: 'auto', height: '40px' }}
            />
          </Link>
          <button className="navbar__mobile-close" onClick={() => setOpen(false)} aria-label="Close">
            <X size={24} />
          </button>
        </div>

        {/* Links */}
        <ul className="navbar__mobile-links">
          <li><Link href="/" onClick={() => setOpen(false)}>{t('nav_home')}</Link></li>

          <li className="navbar__mobile-accordion">
            <button onClick={() => setMobileExpanded(mobileExpanded === 'about' ? null : 'about')}>
              {t('nav_about')}
              <ChevronDown size={14} className={mobileExpanded === 'about' ? 'rotated' : ''} />
            </button>
            {mobileExpanded === 'about' && (
              <ul className="navbar__mobile-sub">
                {aboutMenu.map((item) => (
                  <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{label(item)}</Link></li>
                ))}
              </ul>
            )}
          </li>

          <li className="navbar__mobile-accordion">
            <button onClick={() => setMobileExpanded(mobileExpanded === 'sanskars' ? null : 'sanskars')}>
              {t('nav_sanskars')}
              <ChevronDown size={14} className={mobileExpanded === 'sanskars' ? 'rotated' : ''} />
            </button>
            {mobileExpanded === 'sanskars' && (
              <ul className="navbar__mobile-sub">
                {sanskarsMenu.map((item) => (
                  <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{label(item)}</Link></li>
                ))}
              </ul>
            )}
          </li>

          <li className="navbar__mobile-accordion">
            <button onClick={() => setMobileExpanded(mobileExpanded === 'events' ? null : 'events')}>
              {t('nav_events')}
              <ChevronDown size={14} className={mobileExpanded === 'events' ? 'rotated' : ''} />
            </button>
            {mobileExpanded === 'events' && (
              <ul className="navbar__mobile-sub">
                {eventsMenu.map((item) => (
                  <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{label(item)}</Link></li>
                ))}
              </ul>
            )}
          </li>

          <li className="navbar__mobile-accordion">
            <button onClick={() => setMobileExpanded(mobileExpanded === 'activities' ? null : 'activities')}>
              {t('nav_activities')}
              <ChevronDown size={14} className={mobileExpanded === 'activities' ? 'rotated' : ''} />
            </button>
            {mobileExpanded === 'activities' && (
              <ul className="navbar__mobile-sub">
                {activitiesMenu.map((item) =>
                  item.isLabel
                    ? <li key={`label-${item.en}`} className="navbar__mobile-sub-label">{label(item)}</li>
                    : <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{label(item)}</Link></li>
                )}
              </ul>
            )}
          </li>

          <li><Link href="/literature" onClick={() => setOpen(false)}>{t('nav_literature')}</Link></li>

          <li><Link href="/contact" onClick={() => setOpen(false)}>{t('nav_contact')}</Link></li>
        </ul>

        {/* Panel footer */}
        <div className="navbar__mobile-footer">
          <div className="lang-toggle">
            {LANGS.map(({ code, label: lbl }) => (
              <button
                key={code}
                className={`lang-btn${locale === code ? ' lang-btn--active' : ''}`}
                onClick={() => switchLocale(code)}
              >
                {lbl}
              </button>
            ))}
          </div>
          <a
            href={JOIN_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__join-btn navbar__join-btn--mobile"
            onClick={() => setOpen(false)}
          >
            {locale === 'hi' ? 'परिवार से जुड़ें' : locale === 'kn' ? 'ಪರಿವಾರ ಸೇರಿ' : 'Join the Pariwar'}
          </a>
        </div>
      </div>
    </nav>
  );
}
