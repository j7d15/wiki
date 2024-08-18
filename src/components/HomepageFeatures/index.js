import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'git',
    slug: '/wiki/memento/category/git',
    Svg: require('@site/static/img/computer-icon.svg').default,
    description: (
      <>
        Git est un logiciel de gestion de versions.
      </>
    )
  },
  {
    title: 'SQL',
    slug: '/wiki/memento/category/sql',
    Svg: require('@site/static/img/computer-icon.svg').default,
    description: (
      <>
        Le SQL est un langage permettant de communiquer avec une base de données.
      </>
    )
  },
  {
    title: 'Linux',
    slug: '/wiki/memento/category/linux',
    Svg: require('@site/static/img/computer-icon.svg').default,
    description: (
      <>
        Linux est un système d'exploitation Open Source et gratuit, distribué sous licence publique générale GNU. 
      </>
    )
  },
  {
    title: 'PHP',
    slug: '/wiki/memento/category/php',
    Svg: require('@site/static/img/computer-icon.svg').default,
    description: (
      <>
        PHP (officiellement, ce sigle est un acronyme récursif pour PHP Hypertext Preprocessor) est un langage de scripts généraliste et Open Source, spécialement conçu pour le développement d'applications web.
      </>
    )
  },
  {
    title: 'JavaScript',
    slug: '/wiki/memento/category/javascript',
    Svg: require('@site/static/img/computer-icon.svg').default,
    description: (
      <>
        JavaScript (souvent abrégé en « JS ») est un langage de script léger, orienté objet, principalement connu comme le langage de script des pages web.
      </>
    )
  }
];

function Feature({Svg, title, slug, description}) {
  return (
    <a href={slug} className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </a>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
