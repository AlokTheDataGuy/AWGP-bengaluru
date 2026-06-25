'use client';

import { useState, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname, Link } from '../../lib/i18n/navigation';
import { Menu, X, ChevronDown, Facebook, Instagram, Youtube, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import './Navbar.css';

const JOIN_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSenAHsGkgiiYVh4GkGFiV6XAFFEFqTk4LNEA0U20KiBAnHoFA/viewform?fbzx=-8132684196568383509';

const SOCIALS = [
  { href: 'https://www.facebook.com/awgp',  label: 'Facebook',  Icon: Facebook },
  { href: 'https://wa.me/919243755613',     label: 'WhatsApp',  Icon: MessageCircle },
  { href: 'https://www.instagram.com/awgp', label: 'Instagram', Icon: Instagram },
  { href: 'https://www.youtube.com/awgp',   label: 'YouTube',   Icon: Youtube },
];

const aboutMenu = [
  { href: '/about',         en: 'About Us',        hi: 'हमारे बारे में',  kn: 'ನಮ್ಮ ಬಗ್ಗೆ' },
  { href: '/initiatives',  en: 'Our Initiatives', hi: 'हमारी पहल',        kn: 'ನಮ್ಮ ಉಪಕ್ರಮಗಳು' },
  { href: '/chetna-kendra',en: 'Chetna Kendra',   hi: 'चेतना केंद्र',     kn: 'ಚೇತನ ಕೇಂದ್ರ' },
];

const eventsMenu = [
  { href: '/events/festivals',       en: 'Festival Celebrations',  hi: 'पर्व उत्सव',             kn: 'ಹಬ್ಬದ ಆಚರಣೆಗಳು' },
  { href: '/events/yagya-events',    en: 'Yagya Events',           hi: 'यज्ञ आयोजन',             kn: 'ಯಜ್ಞ ಕಾರ್ಯಕ್ರಮಗಳು' },
  { href: '/events/book-fair',       en: 'Book Fair',              hi: 'पुस्तक मेला',            kn: 'ಪುಸ್ತಕ ಮೇಳ' },
  { href: '/events/tree-plantation', en: 'Tree Plantation',        hi: 'वृक्षारोपण',             kn: 'ವೃಕ್ಷಾರೋಪಣ' },
];

const activitiesMenu = [
  { href: '/activities/yoga',           en: 'Yoga',             hi: 'योग',            kn: 'ಯೋಗ' },
  { href: '/activities/meditation',     en: 'Meditation',       hi: 'ध्यान',          kn: 'ಧ್ಯಾನ' },
  { href: '/activities/sadhana',        en: 'Sadhana',          hi: 'साधना',          kn: 'ಸಾಧನೆ' },
  { href: '/activities/community-seva', en: 'Community Seva',     hi: 'सामुदायिक सेवा', kn: 'ಸಾಮುದಾಯಿಕ ಸೇವೆ' },
  { href: '/activities/gau-seva',       en: 'Gau Seva',           hi: 'गौ सेवा',        kn: 'ಗೌ ಸೇವಾ' },
  { href: '/activities/workshops',      en: 'Workshops & Shivirs', hi: 'कार्यशालाएं एवं शिविर', kn: 'ಕಾರ್ಯಾಗಾರಗಳು ಮತ್ತು ಶಿಬಿರಗಳು' },
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
  { href: '/sanskars/anteysti',    en: 'Marnottar',            hi: 'मरणोत्तर',              kn: 'ಮರಣೋತ್ತರ' },
];

const mediaMenu = [
  { href: '/media/gallery', en: 'Gallery',            hi: 'गैलरी',              kn: 'ಗ್ಯಾಲರಿ' },
  { href: '/media/news',    en: 'Press & Highlights', hi: 'समाचार एवं झलकियाँ', kn: 'ಸುದ್ದಿ ಮತ್ತು ಮುಖ್ಯಾಂಶಗಳು' },
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
  const [mobileExpanded, setMobileExpanded] = useState(null);

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
    setMobileExpanded(null);
  }, [pathname]);

  const label = (item) => item[locale] || item.en;
  // Pages without a full hero banner need the navbar to render solid from the top
  const noHeroRoutes = ['/blog', '/media'];
  const forceSolid = noHeroRoutes.some((r) => pathname === r || pathname.startsWith(r + '/'));
  const transparent = !scrolled && !forceSolid;
  const switchLocale = (newLocale) => router.replace(pathname, { locale: newLocale });

  // Active when the current route matches a section root or any of its subpages
  const isActive = (...roots) =>
    roots.some((r) => (r === '/' ? pathname === '/' : pathname === r || pathname.startsWith(r + '/')));

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

  const L = (en, hi, kn) => (locale === 'hi' ? hi : locale === 'kn' ? kn : en);

  return (
    <nav className={`navbar${!transparent ? ' navbar--scrolled' : ''}`}>

      <div className="navbar__inner">

        {/* Logo */}
        <Link href="/" className="navbar__logo">
          <Image
            src={transparent ? '/assets/logos/final_logo_light.png' : '/assets/logos/final_logo_dark.png'}
            alt="AWGP Bengaluru"
            width={300}
            height={84}
            priority
            style={{ objectFit: 'contain', width: 'auto', height: '84px' }}
          />
        </Link>

        {/* Desktop links */}
        <ul className="navbar__links">
          <li><Link href="/" className={isActive('/') ? 'is-active' : undefined}>{t('nav_home')}</Link></li>

          <li className="navbar__dropdown-wrap">
            <button className={`navbar__dropdown-trigger${isActive('/about', '/initiatives', '/chetna-kendra') ? ' is-active' : ''}`}>{t('nav_about')}</button>
            <div className="navbar__dropdown">
              {aboutMenu.map((item) => (
                <Link key={item.href} href={item.href} className="navbar__dropdown-item">{label(item)}</Link>
              ))}
            </div>
          </li>

          <li className="navbar__dropdown-wrap">
            <Link href="/sanskars" className={`navbar__dropdown-trigger${isActive('/sanskars') ? ' is-active' : ''}`}>{t('nav_sanskars')}</Link>
            <div className="navbar__dropdown navbar__dropdown--right">
              {sanskarsMenu.map((item) => (
                <Link key={item.href} href={item.href} className="navbar__dropdown-item">{label(item)}</Link>
              ))}
            </div>
          </li>

          <li className="navbar__dropdown-wrap">
            <Link href="/events" className={`navbar__dropdown-trigger${isActive('/events') ? ' is-active' : ''}`}>{t('nav_events')}</Link>
            <div className="navbar__dropdown">
              {eventsMenu.map((item) => (
                <Link key={item.href} href={item.href} className="navbar__dropdown-item">{label(item)}</Link>
              ))}
            </div>
          </li>

          <li className="navbar__dropdown-wrap">
            <Link href="/activities" className={`navbar__dropdown-trigger${isActive('/activities') ? ' is-active' : ''}`}>{t('nav_activities')}</Link>
            <div className="navbar__dropdown">
              {activitiesMenu.map((item) => renderDropdownItem(item, undefined))}
            </div>
          </li>

          <li className="navbar__dropdown-wrap">
            <button className={`navbar__dropdown-trigger${isActive('/media') ? ' is-active' : ''}`}>{t('nav_media')}</button>
            <div className="navbar__dropdown navbar__dropdown--right">
              {mediaMenu.map((item) => (
                <Link key={item.href} href={item.href} className="navbar__dropdown-item">{label(item)}</Link>
              ))}
            </div>
          </li>

          <li><Link href="/blog" className={isActive('/blog') ? 'is-active' : undefined}>{t('nav_blog')}</Link></li>

          <li><Link href="/literature" className={isActive('/literature') ? 'is-active' : undefined}>{t('nav_literature')}</Link></li>

          <li><Link href="/contact" className={isActive('/contact') ? 'is-active' : undefined}>{t('nav_contact')}</Link></li>
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
              src="/assets/logos/final_logo_dark.png"
              alt="AWGP Bengaluru"
              width={140}
              height={36}
              style={{ objectFit: 'contain', width: 'auto', height: '60px' }}
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
            <div className="navbar__mobile-accordion-head">
              <Link href="/sanskars" onClick={() => setOpen(false)}>{t('nav_sanskars')}</Link>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'sanskars' ? null : 'sanskars')}
                aria-label={t('nav_sanskars')}
                aria-expanded={mobileExpanded === 'sanskars'}
              >
                <ChevronDown size={16} className={mobileExpanded === 'sanskars' ? 'rotated' : ''} />
              </button>
            </div>
            {mobileExpanded === 'sanskars' && (
              <ul className="navbar__mobile-sub">
                {sanskarsMenu.map((item) => (
                  <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{label(item)}</Link></li>
                ))}
              </ul>
            )}
          </li>

          <li className="navbar__mobile-accordion">
            <div className="navbar__mobile-accordion-head">
              <Link href="/events" onClick={() => setOpen(false)}>{t('nav_events')}</Link>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'events' ? null : 'events')}
                aria-label={t('nav_events')}
                aria-expanded={mobileExpanded === 'events'}
              >
                <ChevronDown size={16} className={mobileExpanded === 'events' ? 'rotated' : ''} />
              </button>
            </div>
            {mobileExpanded === 'events' && (
              <ul className="navbar__mobile-sub">
                {eventsMenu.map((item) => (
                  <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{label(item)}</Link></li>
                ))}
              </ul>
            )}
          </li>

          <li className="navbar__mobile-accordion">
            <div className="navbar__mobile-accordion-head">
              <Link href="/activities" onClick={() => setOpen(false)}>{t('nav_activities')}</Link>
              <button
                onClick={() => setMobileExpanded(mobileExpanded === 'activities' ? null : 'activities')}
                aria-label={t('nav_activities')}
                aria-expanded={mobileExpanded === 'activities'}
              >
                <ChevronDown size={16} className={mobileExpanded === 'activities' ? 'rotated' : ''} />
              </button>
            </div>
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

          <li className="navbar__mobile-accordion">
            <button onClick={() => setMobileExpanded(mobileExpanded === 'media' ? null : 'media')}>
              {t('nav_media')}
              <ChevronDown size={14} className={mobileExpanded === 'media' ? 'rotated' : ''} />
            </button>
            {mobileExpanded === 'media' && (
              <ul className="navbar__mobile-sub">
                {mediaMenu.map((item) => (
                  <li key={item.href}><Link href={item.href} onClick={() => setOpen(false)}>{label(item)}</Link></li>
                ))}
              </ul>
            )}
          </li>

          <li><Link href="/blog" onClick={() => setOpen(false)}>{t('nav_blog')}</Link></li>

          <li><Link href="/literature" onClick={() => setOpen(false)}>{t('nav_literature')}</Link></li>

          <li><Link href="/contact" onClick={() => setOpen(false)}>{t('nav_contact')}</Link></li>
        </ul>

        {/* Panel footer */}
        <div className="navbar__mobile-footer">
          <a
            href={JOIN_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__join-btn navbar__join-btn--mobile"
            onClick={() => setOpen(false)}
          >
            {locale === 'hi' ? 'परिवार से जुड़ें' : locale === 'kn' ? 'ಪರಿವಾರ ಸೇರಿ' : 'Join the Pariwar'}
          </a>
          <div className="navbar__mobile-social">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="navbar__mobile-social-btn"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
