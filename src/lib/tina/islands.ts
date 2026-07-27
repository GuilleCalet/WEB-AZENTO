// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import type { IslandRegistry } from '@tinacms/astro/experimental';
import type { QueryResult } from '@tinacms/astro/data';
import type { DivisionQuery, LegalPageQuery, PageQuery, PostQuery, ProjectQuery, SiteSettingsQuery } from '../../../tina/__generated__/types';
import Contact from '../../components/Contact.astro';
import CookieBanner from '../../components/CookieBanner.astro';
import DivisionShowcase from '../../components/DivisionShowcase.astro';
import DivisionPageContent from '../../components/DivisionPageContent.astro';
import EditorialHero from '../../components/EditorialHero.astro';
import Footer from '../../components/Footer.astro';
import Gallery from '../../components/Gallery.astro';
import Hero from '../../components/Hero.astro';
import HomePortfolioHeader from '../../components/HomePortfolioHeader.astro';
import HomeStructure from '../../components/HomeStructure.astro';
import LegalContent from '../../components/LegalContent.astro';
import Navbar from '../../components/Navbar.astro';
import ProjectCard from '../../components/ProjectCard.astro';
import ProjectDetailContent from '../../components/ProjectDetailContent.astro';
import ProjectsPageText from '../../components/ProjectsPageText.astro';
import Services from '../../components/Services.astro';
import SiteText from '../../components/SiteText.astro';
import PostBody from '../../components/tina/PostBody.astro';
import { projects, siteSettings } from '../../data/editorial';
import { getDivisionDocument, getLegalDocument, getPage, getPost, getProjectDocument, getSiteSettings } from './data';

const homePageIsland = (component: unknown) => ({
  fetch: () => getPage('home'),
  component,
  wrapper: { tag: 'div' },
  propsFromData: (data: unknown) => ({
    data: (data as QueryResult<PageQuery>).data?.page,
  }),
});

export const islands: IslandRegistry = {
  homeNavbar: homePageIsland(Navbar),
  homeHero: homePageIsland(Hero),
  homeServices: homePageIsland(Services),
  homeGallery: homePageIsland(Gallery),
  homeContact: homePageIsland(Contact),
  homeFooter: homePageIsland(Footer),
  homeEditorialHero: homePageIsland(EditorialHero),
  homeStructure: homePageIsland(HomeStructure),
  homePortfolioHeader: homePageIsland(HomePortfolioHeader),
  divisionShowcase: {
    fetch: (_request, params) => getDivisionDocument(params.get('slug') ?? 'madera'),
    component: DivisionShowcase,
    wrapper: { tag: 'div' },
    propsFromData: (data, params) => {
      const division = (data as QueryResult<DivisionQuery>).data?.division;
      return {
        division,
        projects: projects.filter((project) => project.division === division?.slug),
        reverse: params.get('reverse') === 'true',
      };
    },
  },
  divisionPage: {
    fetch: (_request, params) => getDivisionDocument(params.get('slug') ?? 'madera'),
    component: DivisionPageContent,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      division: (data as QueryResult<DivisionQuery>).data?.division,
    }),
  },
  projectCard: {
    fetch: (_request, params) => getProjectDocument(params.get('slug') ?? ''),
    component: ProjectCard,
    wrapper: { tag: 'div' },
    propsFromData: (data, params) => ({
      project: (data as QueryResult<ProjectQuery>).data?.project,
      labels: siteSettings.projectCard,
      featured: params.get('featured') === 'true',
    }),
  },
  projectDetail: {
    fetch: (_request, params) => getProjectDocument(params.get('slug') ?? ''),
    component: ProjectDetailContent,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      project: (data as QueryResult<ProjectQuery>).data?.project,
    }),
  },
  projectsPageText: {
    fetch: () => getSiteSettings(),
    component: ProjectsPageText,
    wrapper: { tag: 'div' },
    propsFromData: (data, params) => ({
      data: (data as QueryResult<SiteSettingsQuery>).data?.siteSettings,
      mode: params.get('mode') === 'empty' ? 'empty' : 'intro',
    }),
  },
  siteCookies: {
    fetch: () => getSiteSettings(),
    component: CookieBanner,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      data: (data as QueryResult<SiteSettingsQuery>).data?.siteSettings?.cookies,
    }),
  },
  siteText: {
    fetch: () => getSiteSettings(),
    component: SiteText,
    wrapper: { tag: 'span' },
    propsFromData: (data, params) => {
      const settings = (data as QueryResult<SiteSettingsQuery>).data?.siteSettings as any;
      const group = params.get('group') ?? 'projectCard';
      return {
        data: settings?.[group],
        field: params.get('field') ?? '',
      };
    },
  },
  legalPage: {
    fetch: (_request, params) => getLegalDocument(params.get('slug') ?? 'aviso-legal'),
    component: LegalContent,
    wrapper: { tag: 'div' },
    propsFromData: (data) => ({
      page: (data as QueryResult<LegalPageQuery>).data?.legalPage,
    }),
  },
  post: {
    fetch: (_request, params) => getPost(params.get('slug') ?? 'hello-world'),
    component: PostBody,
    wrapper: { tag: 'article' },
    propsFromData: (data) => ({
      data: (data as QueryResult<PostQuery>).data?.post,
    }),
  },
};
