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
  { type: "string", name: "label", label: "Texto visible del enlace" },
  { type: "string", name: "href", label: "Destino del enlace" },
] as any[];

const sectionHeaderFields = [
  { type: "string", name: "tagline", label: "Texto pequeño encima del título" },
  { type: "string", name: "headline", label: "Título de la sección" },
  {
    type: "string",
    name: "description",
    label: "Texto descriptivo de la sección",
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
        label: "Páginas de la web",
        path: "content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Título para Google",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Descripción para Google",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "badge",
            label: "Texto pequeño sobre el título principal",
          },
          {
            type: "string",
            name: "headlinePrefix",
            label: "Primera parte del título principal",
          },
          {
            type: "string",
            name: "headlineAccent",
            label: "Parte destacada del título principal",
          },
          {
            type: "string",
            name: "subheadline",
            label: "Texto debajo del título principal",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "object",
            name: "ctaPrimary",
            label: "Botón principal para pedir presupuesto",
            fields: [
              { type: "string", name: "label", label: "Texto del botón" },
              { type: "string", name: "href", label: "Destino al hacer clic" },
            ],
          },
          {
            type: "object",
            name: "ctaSecondary",
            label: "Botón secundario para ver proyectos",
            fields: [
              { type: "string", name: "label", label: "Texto del botón" },
              { type: "string", name: "href", label: "Destino al hacer clic" },
            ],
          },
          {
            type: "object",
            name: "backgroundImages",
            label: "Imágenes de fondo de la portada",
            list: true,
            fields: [
              { type: "image", name: "image", label: "Imagen" },
              { type: "string", name: "alt", label: "Descripción de la imagen" },
            ],
          },
          {
            type: "object",
            name: "stats",
            label: "Datos destacados de la portada",
            list: true,
            fields: [
              { type: "string", name: "value", label: "Número o dato grande" },
              { type: "string", name: "label", label: "Texto que explica el dato" },
            ],
          },
          {
            type: "object",
            name: "navbar",
            label: "Menú superior",
            fields: [
              { type: "image", name: "logoImage", label: "Logo" },
              { type: "string", name: "logoAlt", label: "Descripción del logo" },
              {
                type: "object",
                name: "navLinks",
                label: "Enlaces del menú",
                list: true,
                fields: linkFields,
              },
              {
                type: "object",
                name: "ctaButton",
                label: "Botón destacado del menú",
                fields: linkFields,
              },
            ],
          },
          {
            type: "object",
            name: "servicesSection",
            label: "Bloque de servicios",
            fields: [
              ...sectionHeaderFields,
              {
                type: "object",
                name: "items",
                label: "Tarjetas de servicios",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Nombre del servicio" },
                  {
                    type: "string",
                    name: "shortDescription",
                    label: "Descripción corta del servicio",
                    ui: {
                      component: "textarea",
                    },
                  },
                  {
                    type: "string",
                    name: "icon",
                    label: "Icono del servicio",
                    options: ["garden", "pergola", "facade", "interior"],
                  },
                  { type: "string", name: "href", label: "Destino al hacer clic en la tarjeta" },
                  { type: "string", name: "linkLabel", label: "Texto del enlace de la tarjeta" },
                  {
                    type: "string",
                    name: "features",
                    label: "Puntos destacados del servicio",
                    list: true,
                  },
                ],
              },
              {
                type: "string",
                name: "ctaText",
                label: "Texto de llamada a la acción",
              },
              {
                type: "object",
                name: "ctaLink",
                label: "Enlace de la llamada a la acción",
                fields: linkFields,
              },
            ],
          },
          {
            type: "object",
            name: "gallerySection",
            label: "Bloque de proyectos",
            fields: [
              ...sectionHeaderFields,
              {
                type: "object",
                name: "projects",
                label: "Proyectos mostrados",
                list: true,
                fields: [
                  { type: "string", name: "title", label: "Nombre del proyecto" },
                  { type: "string", name: "category", label: "Tipo de proyecto" },
                  { type: "string", name: "location", label: "Ubicación del proyecto" },
                  { type: "image", name: "image", label: "Imagen del proyecto" },
                  {
                    type: "string",
                    name: "size",
                    label: "Tamaño de la tarjeta",
                    options: ["large", "medium", "small"],
                  },
                  { type: "string", name: "objectPosition", label: "Posición de la imagen dentro de la tarjeta" },
                ],
              },
              {
                type: "object",
                name: "ctaLink",
                label: "Enlace para ver más proyectos",
                fields: linkFields,
              },
            ],
          },
          {
            type: "object",
            name: "contactSection",
            label: "Bloque de contacto",
            fields: [
              ...sectionHeaderFields,
              {
                type: "object",
                name: "contactInfo",
                label: "Datos de contacto visibles",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "icon",
                    label: "Icono del dato de contacto",
                    options: ["phone", "email", "instagram", "location"],
                  },
                  { type: "string", name: "label", label: "Nombre del dato" },
                  { type: "string", name: "value", label: "Texto que se muestra" },
                  { type: "string", name: "href", label: "Destino al hacer clic" },
                ],
              },
              { type: "string", name: "formTitle", label: "Título del formulario" },
              { type: "string", name: "nameLabel", label: "Etiqueta del campo nombre" },
              { type: "string", name: "namePlaceholder", label: "Ejemplo dentro del campo nombre" },
              { type: "string", name: "emailLabel", label: "Etiqueta del campo email" },
              { type: "string", name: "emailPlaceholder", label: "Ejemplo dentro del campo email" },
              { type: "string", name: "phoneLabel", label: "Etiqueta del campo teléfono" },
              { type: "string", name: "phonePlaceholder", label: "Ejemplo dentro del campo teléfono" },
              { type: "string", name: "serviceLabel", label: "Etiqueta del desplegable de servicio" },
              { type: "string", name: "servicePlaceholder", label: "Texto inicial del desplegable de servicio" },
              {
                type: "object",
                name: "serviceOptions",
                label: "Opciones del desplegable de servicio",
                list: true,
                fields: [
                  { type: "string", name: "label", label: "Texto visible de la opción" },
                  { type: "string", name: "value", label: "Valor interno de la opción" },
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
