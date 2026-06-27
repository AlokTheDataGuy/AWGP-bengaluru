'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, Link } from '../../lib/i18n/navigation';
import { Home, Sparkles, CalendarDays, Activity } from 'lucide-react';
import './BottomNav.css';

const LINKS = [
  { href: '/',           key: 'nav_home',       icon: Home },
  { href: '/sanskars',   key: 'nav_sanskars',   icon: Sparkles },
  { href: '/programs',   key: 'nav_programs',   icon: CalendarDays },
  { href: '/activities', key: 'nav_activities', icon: Activity },
];

export default function BottomNav() {
  const t = useTranslations();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/');

  return (
    <nav className={`bottom-nav${visible ? ' bottom-nav--visible' : ''}`} aria-label="Mobile navigation">
      <ul className="bottom-nav__list">
        {LINKS.map(({ href, key, icon: Icon }) => {
          const active = isActive(href);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`bottom-nav__link${active ? ' is-active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <Icon className="bottom-nav__icon" size={22} strokeWidth={1.8} aria-hidden="true" />
                <span className="bottom-nav__label">{t(key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
