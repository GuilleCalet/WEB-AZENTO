export interface DivisionService {
	title: string;
	description: string;
}

export interface Division {
	slug: 'madera' | 'reformas';
	title: string;
	eyebrow: string;
	headline: string;
	description: string;
	heroImage: string;
	heroAlt: string;
	services: DivisionService[];
	ctaLabel: string;
	showcaseBrand: string;
	showcaseName: string;
	showcaseLinkLabel: string;
	countLabel: string;
	specialtiesEyebrow: string;
	specialtiesTitle: string;
	specialtiesAccent: string;
	projectsEyebrow: string;
	projectsTitle: string;
	allProjectsLabel: string;
	ctaEyebrow: string;
	ctaHeadline: string;
	seoTitle: string;
	seoDescription: string;
}

export interface Project {
	slug: string;
	title: string;
	division: Division['slug'];
	category: string;
	location: string;
	year: string;
	order: number;
	featured: boolean;
	coverImage: string;
	coverAlt: string;
	summary: string;
	gallery: string[];
	Content?: unknown;
}

export interface SiteSettings {
	branding: {
		siteName: string;
		defaultTitle: string;
		defaultDescription: string;
		twitterHandle: string;
	};
	projectCard: {
		brandLabel: string;
		viewLabel: string;
	};
	projectsPage: {
		seoTitle: string;
		seoDescription: string;
		eyebrow: string;
		headlinePrefix: string;
		headlineAccent: string;
		description: string;
		filterAriaLabel: string;
		filterAll: string;
		filterWood: string;
		filterReforms: string;
		emptyMessage: string;
	};
	projectDetail: {
		brandLabel: string;
		seoSuffix: string;
		sectionLabel: string;
		galleryAltLabel: string;
		relatedPrefix: string;
	};
	cookies: {
		title: string;
		description: string;
		moreInfoLabel: string;
		settingsLabel: string;
		rejectLabel: string;
		acceptLabel: string;
		modalTitle: string;
		closeLabel: string;
		necessaryTitle: string;
		necessaryDescription: string;
		alwaysActiveLabel: string;
		analyticsTitle: string;
		analyticsDescription: string;
		saveLabel: string;
	};
}

export interface LegalPage {
	slug: string;
	title: string;
	updatedAt: string;
	seoTitle: string;
	seoDescription: string;
	backLabel: string;
	Content?: unknown;
}

type MarkdownModule = {
	frontmatter: Record<string, unknown>;
	Content?: unknown;
};

const divisionModules = import.meta.glob<MarkdownModule>('/content/divisions/*.md', {
	eager: true,
});
const projectModules = import.meta.glob<MarkdownModule>('/content/projects/*.md', {
	eager: true,
});
const settingsModules = import.meta.glob<MarkdownModule>('/content/settings/site.md', {
	eager: true,
});
const legalModules = import.meta.glob<MarkdownModule>('/content/legal/*.md', {
	eager: true,
});

const filenameFromPath = (path: string) => path.split('/').pop()?.replace(/\.md$/, '') ?? '';

export const divisions: Division[] = Object.entries(divisionModules).map(([path, module]) => ({
	slug: filenameFromPath(path) as Division['slug'],
	...(module.frontmatter as unknown as Omit<Division, 'slug'>),
}));

export const projects: Project[] = Object.entries(projectModules)
	.map(([path, module]) => ({
		slug: filenameFromPath(path),
		...(module.frontmatter as unknown as Omit<Project, 'slug' | 'Content'>),
		Content: module.Content,
	}))
	.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

export const siteSettings = Object.values(settingsModules)[0]?.frontmatter as unknown as SiteSettings;

export const legalPages: LegalPage[] = Object.entries(legalModules).map(([path, module]) => ({
	slug: filenameFromPath(path),
	...(module.frontmatter as unknown as Omit<LegalPage, 'slug' | 'Content'>),
	Content: module.Content,
}));

export const getDivision = (slug: string) => divisions.find((division) => division.slug === slug);
export const getProject = (slug: string) => projects.find((project) => project.slug === slug);
export const getLegalPage = (slug: string) => legalPages.find((page) => page.slug === slug);
export const getProjectsByDivision = (division: Division['slug']) =>
	projects.filter((project) => project.division === division);
