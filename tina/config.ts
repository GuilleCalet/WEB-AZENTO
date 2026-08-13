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
