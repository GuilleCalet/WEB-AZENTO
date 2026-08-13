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
              { type: "string", name: "messageLabel", label: "Etiqueta del mensaje" },
              { type: "string", name: "messagePlaceholder", label: "Texto de ayuda del mensaje" },
              {
                type: "string",
                name: "consentText",
                label: "Texto de consentimiento",
                ui: {
                  component: "textarea",
                },
              },
              { type: "string", name: "submitLabel", label: "Texto del botón de envío" },
              { type: "string", name: "submittingLabel", label: "Texto al enviar" },
              { type: "string", name: "successTitle", label: "Título de éxito" },
              { type: "string", name: "successMessage", label: "Mensaje de éxito" },
              { type: "string", name: "errorTitle", label: "Título de error" },
              { type: "string", name: "errorMessage", label: "Mensaje de error por defecto" },
              {
                type: "string",
                name: "localErrorMessage",
                label: "Mensaje de error local",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "string",
                name: "privacyNote",
                label: "Nota de privacidad",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
          {
            type: "object",
            name: "footer",
            label: "Pie de página",
            fields: [
              { type: "image", name: "logoImage", label: "Logo" },
              { type: "string", name: "logoAlt", label: "Texto alternativo del logo" },
              {
                type: "string",
                name: "tagline",
                label: "Texto descriptivo",
                ui: {
                  component: "textarea",
                },
              },
              {
                type: "object",
                name: "social",
                label: "Enlaces sociales",
                list: true,
                fields: [
                  { type: "string", name: "name", label: "Nombre" },
                  { type: "string", name: "href", label: "Enlace" },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icono",
                    options: ["instagram", "pinterest", "linkedin"],
                  },
                ],
              },
              {
                type: "object",
                name: "navigation",
                label: "Columnas de navegación",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Título de la columna" },
                  {
                    type: "object",
                    name: "links",
                    label: "Enlaces",
                    list: true,
                    fields: [
                      ...linkFields,
                      { type: "string", name: "id", label: "ID HTML" },
                    ],
                  },
                ],
              },
              { type: "string", name: "copyright", label: "Texto legal" },
              { type: "string", name: "backToTopLabel", label: "Texto volver arriba" },
            ],
          },
        ],
        ui: {
          router: () => "/",
        },
      },
      {
        name: "post",
        label: "Entradas",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "eyebrow",
            label: "Antetítulo",
          },
          {
            type: "string",
            name: "title",
            label: "Título principal",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Contenido",
            isBody: true,
          },
          {
            type: "object",
            name: "ctaPrimary",
            label: "Botón principal",
            fields: [
              { type: "string", name: "label", label: "Texto del botón" },
              { type: "string", name: "href", label: "Enlace" },
            ],
          },
          {
            type: "object",
            name: "ctaSecondary",
            label: "Botón secundario",
            fields: [
              { type: "string", name: "label", label: "Texto del botón" },
              { type: "string", name: "href", label: "Enlace" },
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
