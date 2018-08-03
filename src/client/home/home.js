import React from 'react';
import { Helmet } from 'react-helmet';
import YouTubeFeed from './youTubeFeed';

export default () => (
  <div>
    <Helmet>
      <title>
        geekplanet - Tabletop Miniatures
      </title>
      <meta
        name="Description"
        content="Tauche ein in das Universum der Tabletop-Spiele. Bestelle Miniaturen, Farben, Bastelmaterialien und Zubehör und erfahre Wissenswertes aus der Welt des Wargaming."
      />
    </Helmet>
    <YouTubeFeed />
  </div>
);
