import { defineConfig } from "tinacms";

const branch =
  process.env.NEXT_PUBLIC_TINA_BRANCH ||
  process.env.GITHUB_BRANCH ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;

const linkFields = [
  { type: "string", name: "label", label: "Label" },
  { type: "string", name: "href", label: "Link" },
] as any[];

const sectionHeaderFields = [
  { type: "string", name: "tagline", label: "Tagline" },
  { type: "string", name: "headline", label: "Headline" },
  {
    type: "string",
    name: "description",
    label: "Description",
    ui: {
      component: "textarea",
    },
  },
] as any[];

export default defineConfig({
  ...(clientId ? { clientId } : {}),
  ...(token ? { token } : {}),
  branch,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Uncomment to allow cross-origin requests from non-localhost origins
  // during local development (e.g. GitHub Codespaces, Gitpod, Docker).
  // Use 'private' to allow all private-network IPs (WSL2, Docker, etc.)
  // server: {
  //   allowedOrigins: ['https://your-codespace.github.dev'],
  // },
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "siteSettings",
        label: "Ajustes globales",
        path: "content/settings",
        format: "md",
        match: { include: "site" },
        fields: [
          {
            type: "object",
            name: "branding",
            label: "Marca y metadatos",
            fields: [
              { type: "string", name: "siteName", label: "Nombre del sitio" },
              { type: "string", name: "defaultTitle", label: "Título predeterminado" },
              { type: "string", name: "defaultDescription", label: "Descripción predeterminada", ui: { component: "textarea" } },
              { type: "string", name: "twitterHandle", label: "Usuario de X/Twitter" },
            ],
          },
          {
            type: "object",
            name: "projectCard",
            label: "Tarjetas de proyectos",
            fields: [
              { type: "string", name: "brandLabel", label: "Marca" },
              { type: "string", name: "viewLabel", label: "Enlace para ver proyecto" },
            ],
          },
          {
            type: "object",
            name: "projectsPage",
            label: "Página de proyectos",
            fields: [
              { type: "string", name: "seoTitle", label: "Título SEO" },
              { type: "string", name: "seoDescription", label: "Descripción SEO", ui: { component: "textarea" } },
              { type: "string", name: "eyebrow", label: "Antetítulo" },
              { type: "string", name: "headlinePrefix", label: "Titular inicial" },
              { type: "string", name: "headlineAccent", label: "Titular destacado" },
              { type: "string", name: "description", label: "Descripción", ui: { component: "textarea" } },
              { type: "string", name: "filterAriaLabel", label: "Etiqueta accesible de filtros" },
              { type: "string", name: "filterAll", label: "Filtro Todos" },
              { type: "string", name: "filterWood", label: "Filtro Madera" },
              { type: "string", name: "filterReforms", label: "Filtro Reformas" },
              { type: "string", name: "emptyMessage", label: "Mensaje sin resultados" },
            ],
          },
          {
            type: "object",
            name: "projectDetail",
            label: "Ficha de proyecto",
            fields: [
              { type: "string", name: "brandLabel", label: "Marca antes de la división" },
              { type: "string", name: "seoSuffix", label: "Sufijo del título SEO" },
              { type: "string", name: "sectionLabel", label: "Título de descripción" },
              { type: "string", name: "galleryAltLabel", label: "Texto de imágenes de galería" },
              { type: "string", name: "relatedPrefix", label: "Título de proyectos relacionados" },
            ],
          },
          {
            type: "object",
            name: "cookies",
            label: "Banner de cookies",
            fields: [
              { type: "string", name: "title", label: "Título" },
              { type: "string", name: "description", label: "Descripción", ui: { component: "textarea" } },
              { type: "string", name: "moreInfoLabel", label: "Más información" },
              { type: "string", name: "settingsLabel", label: "Configurar" },
              { type: "string", name: "rejectLabel", label: "Rechazar" },
              { type: "string", name: "acceptLabel", label: "Aceptar todas" },
              { type: "string", name: "modalTitle", label: "Título del modal" },
              { type: "string", name: "closeLabel", label: "Cerrar" },
              { type: "string", name: "necessaryTitle", label: "Cookies necesarias" },
              { type: "string", name: "necessaryDescription", label: "Descripción necesarias", ui: { component: "textarea" } },
              { type: "string", name: "alwaysActiveLabel", label: "Siempre activas" },
              { type: "string", name: "analyticsTitle", label: "Cookies analíticas" },
              { type: "string", name: "analyticsDescription", label: "Descripción analíticas", ui: { component: "textarea" } },
              { type: "string", name: "saveLabel", label: "Guardar preferencias" },
            ],
          },
        ],
        ui: {
          allowedActions: { create: false, delete: false },
        },
      },
      {
        name: "legalPage",
        label: "Páginas legales",
        path: "content/legal",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", isTitle: true, required: true },
          { type: "string", name: "updatedAt", label: "Fecha de actualización" },
          { type: "string", name: "seoTitle", label: "Título SEO" },
          { type: "string", name: "seoDescription", label: "Descripción SEO", ui: { component: "textarea" } },
          { type: "string", name: "backLabel", label: "Enlace de vuelta" },
          { type: "rich-text", name: "body", label: "Contenido", isBody: true },
        ],
        ui: {
          allowedActions: { create: false, delete: false },
          router: ({ document }) => `/${document._sys.filename}`,
        },
      },
      {
        name: "division",
        label: "Divisiones",
        path: "content/divisions",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Nombre", isTitle: true, required: true },
          {
            type: "string",
            name: "slug",
            label: "URL",
            required: true,
            options: ["madera", "reformas"],
          },
          { type: "string", name: "eyebrow", label: "Antetítulo" },
          { type: "string", name: "headline", label: "Titular" },
          {
            type: "string",
            name: "description",
            label: "Descripción",
            ui: { component: "textarea" },
          },
          { type: "image", name: "heroImage", label: "Imagen principal" },
          { type: "string", name: "heroAlt", label: "Texto alternativo" },
          {
            type: "object",
            name: "services",
            label: "Servicios",
            list: true,
            fields: [
              { type: "string", name: "title", label: "Servicio" },
              {
                type: "string",
                name: "description",
                label: "Descripción",
                ui: { component: "textarea" },
              },
            ],
          },
          { type: "string", name: "ctaLabel", label: "Texto del botón" },
          { type: "string", name: "showcaseBrand", label: "Marca en portada" },
          { type: "string", name: "showcaseName", label: "Nombre destacado en portada" },
          { type: "string", name: "showcaseLinkLabel", label: "Enlace desde portada" },
          { type: "string", name: "countLabel", label: "Etiqueta del número de proyectos" },
          { type: "string", name: "specialtiesEyebrow", label: "Antetítulo de especialidades" },
          { type: "string", name: "specialtiesTitle", label: "Título de especialidades" },
          { type: "string", name: "specialtiesAccent", label: "Título destacado de especialidades" },
          { type: "string", name: "projectsEyebrow", label: "Antetítulo de proyectos" },
          { type: "string", name: "projectsTitle", label: "Título de proyectos" },
          { type: "string", name: "allProjectsLabel", label: "Enlace a todos los proyectos" },
          { type: "string", name: "ctaEyebrow", label: "Antetítulo de llamada a la acción" },
          { type: "string", name: "ctaHeadline", label: "Título de llamada a la acción" },
          { type: "string", name: "seoTitle", label: "Título SEO" },
          {
            type: "string",
            name: "seoDescription",
            label: "Descripción SEO",
            ui: { component: "textarea" },
          },
        ],
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
          allowedActions: {
            create: false,
            delete: false,
          },
        },
      },
      {
        name: "project",
        label: "Proyectos",
        path: "content/projects",
        format: "md",
        fields: [
          { type: "string", name: "title", label: "Título", isTitle: true, required: true },
          {
            type: "string",
            name: "division",
            label: "División",
            required: true,
            options: [
              { value: "madera", label: "AZento Madera" },
              { value: "reformas", label: "AZento Reformas" },
            ],
          },
          { type: "string", name: "category", label: "Categoría", required: true },
          { type: "string", name: "location", label: "Ubicación" },
          { type: "string", name: "year", label: "Año" },
          { type: "number", name: "order", label: "Orden" },
          { type: "boolean", name: "featured", label: "Destacado en portada" },
          { type: "image", name: "coverImage", label: "Imagen principal", required: true },
          { type: "string", name: "coverAlt", label: "Texto alternativo" },
          {
            type: "string",
            name: "summary",
            label: "Resumen",
            ui: { component: "textarea" },
          },
          {
            type: "rich-text",
            name: "body",
            label: "Descripción del proyecto",
            isBody: true,
          },
          {
            type: "image",
            name: "gallery",
            label: "Galería",
            list: true,
          },
        ],
        ui: {
          filename: {
            slugify: (values) =>
              String(values?.title || "proyecto")
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, ""),
          },
          router: ({ document }) => `/proyectos/${document._sys.filename}`,
        },
      },
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "SEO Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "SEO Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "badge",
            label: "Hero Badge",
          },
          {
            type: "string",
            name: "headlinePrefix",
            label: "Hero Headline Prefix",
          },
          {
            type: "string",
            name: "headlineAccent",
            label: "Hero Headline Accent",
          },
          {
            type: "string",
            name: "subheadline",
            label: "Hero Subheadline",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "ctaPrimary",
            label: "Primary Button",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
          {
            type: "object",
            name: "ctaSecondary",
            label: "Secondary Button",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
          {
            type: "object",
            name: "backgroundImages",
            label: "Background Images",
            list: true,
            fields: [
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "alt", label: "Alt Text" },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Stats",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Value" },
              { type: "string", name: "label", label: "Label" },
            ],
          },
          {
            type: "object",
            name: "navbar",
            label: "Navbar",
            fields: [
              { type: "image", name: "logoImage", label: "Logo" },
              { type: "string", name: "logoAlt", label: "Logo Alt Text" },
              { type: "string", name: "mobileMenuLabel", label: "Etiqueta del menú móvil" },
              {
                type: "object",
                name: "navLinks",
                label: "Navigation Links",
                list: true,
                fields: linkFields,
              },
              {
                type: "object",
                name: "ctaButton",
                label: "CTA Button",
                fields: linkFields,
              },
            ],
          },
          {
            type: "object",
            name: "servicesSection",
            label: "Services Section",
            fields: [
              ...sectionHeaderFields,
              {
                type: "object",
                name: "items",
                label: "Service Cards",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  {
                    type: "string",
                    name: "shortDescription",
                    label: "Short Description",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon",
                    options: ["garden", "pergola", "facade", "interior"],
                  },
                  { type: "string", name: "href", label: "Card Link" },
                  { type: "string", name: "linkLabel", label: "Link Label" },
                  {
                    type: "string",
                    name: "features",
                    label: "Features",
                    list: true,
                  },
                ],
              },
              {
                type: "string",
                name: "ctaText",
                label: "CTA Text",
              },
              {
                type: "object",
                name: "ctaLink",
                label: "CTA Link",
                fields: linkFields,
              },
            ],
          },
          {
            type: "object",
            name: "gallerySection",
            label: "Gallery Section",
            fields: [
              ...sectionHeaderFields,
              {
                type: "object",
                name: "projects",
                label: "Projects",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Title" },
                  { type: "string", name: "category", label: "Category" },
                  { type: "string", name: "location", label: "Location" },
                  { type: "image", name: "image", label: "Image" },
                  {
                    type: "string",
                    name: "size",
                    label: "Grid Size",
                    options: ["large", "medium", "small"],
                  },
                  { type: "string", name: "objectPosition", label: "Object Position" },
                ],
              },
              {
                type: "object",
                name: "ctaLink",
                label: "CTA Link",
                fields: linkFields,
              },
            ],
          },
          {
            type: "object",
            name: "contactSection",
            label: "Contact Section",
            fields: [
              ...sectionHeaderFields,
              {
                type: "object",
                name: "contactInfo",
                label: "Contact Info",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon",
                    options: ["phone", "email", "instagram", "location"],
                  },
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "value", label: "Value" },
                  { type: "string", name: "href", label: "Link" },
                ],
              },
              { type: "string", name: "formTitle", label: "Form Title" },
              { type: "string", name: "nameLabel", label: "Name Label" },
              { type: "string", name: "namePlaceholder", label: "Name Placeholder" },
              { type: "string", name: "emailLabel", label: "Email Label" },
              { type: "string", name: "emailPlaceholder", label: "Email Placeholder" },
              { type: "string", name: "phoneLabel", label: "Phone Label" },
              { type: "string", name: "phonePlaceholder", label: "Phone Placeholder" },
              { type: "string", name: "serviceLabel", label: "Service Label" },
              { type: "string", name: "servicePlaceholder", label: "Service Placeholder" },
              {
                type: "object",
                name: "serviceOptions",
                label: "Service Options",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Label" },
                  { type: "string", name: "value", label: "Value" },
                ],
              },
              { type: "string", name: "messageLabel", label: "Message Label" },
              { type: "string", name: "messagePlaceholder", label: "Message Placeholder" },
              {
                type: "string",
                name: "consentText",
                label: "Consent Text",
                ui: {
                  component: "textarea",
                },
              },
              { type: "string", name: "submitLabel", label: "Submit Label" },
              { type: "string", name: "submittingLabel", label: "Submitting Label" },
              { type: "string", name: "successTitle", label: "Success Title" },
              { type: "string", name: "successMessage", label: "Success Message" },
              { type: "string", name: "errorTitle", label: "Error Title" },
              { type: "string", name: "errorMessage", label: "Default Error Message" },
              {
                type: "string",
                name: "localErrorMessage",
                label: "Local Error Message",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "privacyNote",
                label: "Privacy Note",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Footer",
            fields: [
              { type: "image", name: "logoImage", label: "Logo" },
              { type: "string", name: "logoAlt", label: "Logo Alt Text" },
              {
                type: "string",
                name: "tagline",
                label: "Tagline",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "social",
                label: "Social Links",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Name" },
                  { type: "string", name: "href", label: "Link" },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icon",
                    options: ["instagram", "pinterest", "linkedin"],
                  },
                ],
              },
              {
                type: "object",
                name: "navigation",
                label: "Navigation Columns",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Column Title" },
                  {
                    type: "object",
                    name: "links",
                    label: "Links",
                    list: true,
                    fields: [
                      ...linkFields,
                      { type: "string", name: "id", label: "HTML ID" },
                    ],
                  },
                ],
              },
              { type: "string", name: "copyright", label: "Copyright" },
              { type: "string", name: "backToTopLabel", label: "Back To Top Label" },
            ],
          },
          {
            type: "object",
            name: "editorialHome",
            label: "Nueva portada editorial",
            fields: [
              { type: "string", name: "heroEyebrow", label: "Antetítulo del hero" },
              { type: "string", name: "heroPrefix", label: "Titular inicial" },
              { type: "string", name: "heroAccent", label: "Titular destacado" },
              { type: "string", name: "heroSuffix", label: "Titular final" },
              { type: "string", name: "heroDescription", label: "Descripción", ui: { component: "textarea" } },
              { type: "string", name: "divisionsButton", label: "Botón divisiones" },
              { type: "string", name: "projectsButton", label: "Botón proyectos" },
              { type: "string", name: "heroImageAlt", label: "Texto alternativo de imagen" },
              { type: "string", name: "structureEyebrow", label: "Antetítulo de estructura" },
              { type: "string", name: "structurePrefix", label: "Título inicial de estructura" },
              { type: "string", name: "structureAccent", label: "Título destacado de estructura" },
              { type: "string", name: "structureSuffix", label: "Título final de estructura" },
              { type: "string", name: "structureDescription", label: "Descripción de estructura", ui: { component: "textarea" } },
              { type: "string", name: "portfolioEyebrow", label: "Antetítulo de portafolio" },
              { type: "string", name: "portfolioPrefix", label: "Título inicial del portafolio" },
              { type: "string", name: "portfolioAccent", label: "Título destacado del portafolio" },
              { type: "string", name: "allProjectsLabel", label: "Enlace a todos los proyectos" },
            ],
          },
        ],
        ui: {
          router: () => "/",
        },
      },
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "eyebrow",
            label: "Eyebrow",
          },
          {
            type: "string",
            name: "title",
            label: "Headline",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Tagline",
            isBody: true,
          },
          {
            type: "object",
            name: "ctaPrimary",
            label: "Primary button",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
          {
            type: "object",
            name: "ctaSecondary",
            label: "Secondary button",
            fields: [
              { type: "string", name: "label", label: "Label" },
              { type: "string", name: "href", label: "Link" },
            ],
          },
        ],
        ui: {
          // Opens the /tinacms-demo page for visual editing. Change or remove to fit your site.
          router: () => "/tinacms-demo",
        },
      },
    ],
  },
});
