import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Wiki',
  tagline: 'Ressources informatique',
  favicon: 'img/logo.svg',
  url: 'https://github.com',
  baseUrl: '/wiki/',
  organizationName: 'j7d15',
  projectName: 'wiki',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          routeBasePath: '/memento'
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          routeBasePath: '/billets',
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.jpg',
      navbar: {
        title: 'Wiki',
        logo: {
          alt: 'Logo du wiki',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Mémento',
          },
          {
            to: '/billets',
            label: 'Billets',
            position: 'left'
          },
          {
            href: 'https://github.com/j7d15',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Ressources',
            items: [
              {
                label: 'Billets',
                to: '/billets',
              },
              {
                label: 'Mémento',
                to: '/memento/intro',
              },
            ],
          },
          {
            title: 'Projets',
            items: [
              {
                label: 'Prochainement',
                href: 'https://github.com/j7d15',
              }
            ],
          },
          {
            title: 'Plus',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/j7d15',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Wiki`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['php']
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false
      }
    }),
};

export default config;
