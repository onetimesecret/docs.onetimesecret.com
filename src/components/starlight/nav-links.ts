// src/components/starlight/nav-links.ts
//
// The four section links rendered in the header on wide screens and in the
// mobile drawer's section card below Starlight's 50rem breakpoint. One source
// so the two never drift.

import { getRelativeLocaleUrl } from 'astro:i18n';

export interface NavLink {
	href: string;
	/** Translation key for the visible label. */
	labelKey: string;
	/** Translation key for the aria-label. */
	ariaKey: string;
	/** Starlight icon name, used by the mobile section card only. */
	icon: 'open-book' | 'seti:json' | 'rocket' | 'pencil';
	/** Opens in a new tab with rel="noopener noreferrer". */
	external?: boolean;
}

/**
 * Phase 2 retired introduction/guides; "Start here" is the orientation entry
 * point now. The label key stays nav.label.guides so the 16 non-EN bundles keep
 * resolving — only the destination moved.
 */
export function getNavLinks(locale: string | undefined): NavLink[] {
	const current = locale ?? 'en';
	return [
		{
			href: getRelativeLocaleUrl(current, 'start'),
			labelKey: 'nav.label.guides',
			ariaKey: 'nav.ariaLabel.guides',
			icon: 'open-book',
		},
		{
			href: 'https://api.onetimesecret.com',
			labelKey: 'nav.label.rest-api',
			ariaKey: 'nav.ariaLabel.apiReference',
			icon: 'seti:json',
			external: true,
		},
		{
			href: getRelativeLocaleUrl(current, 'self-hosting'),
			labelKey: 'nav.label.self-hosting',
			ariaKey: 'nav.ariaLabel.selfHosting',
			icon: 'rocket',
		},
		{
			href: 'https://blog.onetimesecret.com/',
			labelKey: 'nav.label.blog',
			ariaKey: 'nav.ariaLabel.blog',
			icon: 'pencil',
			external: true,
		},
	];
}

/**
 * True when `pathname` is the link's page or one of its descendants. External
 * links are never current. Used for aria-current on the mobile section card.
 */
export function isCurrentSection(link: NavLink, pathname: string): boolean {
	if (link.external) return false;
	const base = link.href.replace(/\/+$/, '');
	const path = pathname.replace(/\/+$/, '');
	return path === base || path.startsWith(base + '/');
}
