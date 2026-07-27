// @ts-nocheck (generated types/client appear after your first tinacms dev run)
import { requestWithMetadata } from '@tinacms/astro/data';
import client from '../../../tina/__generated__/client';

export const getPost = (slug: string) =>
  requestWithMetadata(client.queries.post({ relativePath: slug + '.md' }), {
    priority: 'primary',
  });

export const getPage = (slug: string) =>
  requestWithMetadata(client.queries.page({ relativePath: slug + '.md' }), {
    priority: 'primary',
  });

export const getDivisionDocument = (slug: string) =>
  requestWithMetadata(client.queries.division({ relativePath: slug + '.md' }), {
    priority: 'primary',
  });

export const getProjectDocument = (slug: string) =>
  requestWithMetadata(client.queries.project({ relativePath: slug + '.md' }), {
    priority: 'primary',
  });

export const getSiteSettings = () =>
  requestWithMetadata(client.queries.siteSettings({ relativePath: 'site.md' }), {
    priority: 'primary',
  });

export const getLegalDocument = (slug: string) =>
  requestWithMetadata(client.queries.legalPage({ relativePath: slug + '.md' }), {
    priority: 'primary',
  });
