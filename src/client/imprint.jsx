import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const Container = styled.div`
  padding: 10px 20px;
`;

export default () => (
  <Container>
    <FormattedMessage id="FOOTER.IMPRINT">
      {message => (<Helmet><title>{message}</title></Helmet>)}
    </FormattedMessage>
    <h3>Impressum</h3>

    <p>
      Kontaktadresse<br />
      geekplanet GmbH<br />
      Wührestrasse 2<br />
      5724 Dürrenäsch<br />
      Schweiz<br />
      <a href="mailto:info@geekplanet.ch">info@geekplanet.ch</a>
    </p>

    <p>
      Vertretungsberechtigte Personen<br />
      Tobias Gloor<br />
      Patrick Walther<br />
    </p>

    <p>
      Handelsregistereintrag<br />
      Eingetragener Firmenname: geekplanet GmbH<br />
      Nummer: CHE-398.083.175<br />
      Gerichtsstand: Kulm AG
    </p>

    <p>
      Copyright<br />
      Alle Texte, Bilder und Grafiken unterliegen dem Urheberrecht und anderen Gesetzen zum Schutz
      geistigen Eigentums. Sie dürfen ohne ausdrückliche Erlaubnis durch geekplanet GmbH oder den
      Eigentümer weder für Handelszwecke oder zur Weitergabe kopiert, verändert und/oder auf anderen
      Websites verwendet werden.
      Wir sind eine unabhängige Handelsunternehmung und in keiner Weise mit einem anderen Händler
      und/oder Hersteller oder einer anderen Firma verbunden. Sämtliche Rechte liegen bei den
      jeweiligen Copyrightinhabern.
      geekplanet, GTC, sämtliche Inhalte, Bilder und das geekplanet Logo sind Copyright von
      geekplanet GmbH. Alle Rechte vorbehalten.
    </p>

    <p>
      Haftungsausschluss<br />
      geekplanet GmbH übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit,
      Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der Informationen.
      Haftungsansprüche gegen geekplanet GmbH wegen Schäden materieller oder immaterieller Art,
      welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen,
      durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden
      ausgeschlossen.
      Alle Angebote sind unverbindlich. geekplanet GmbH behält es sich ausdrücklich vor, Teile der
      Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu
      löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
      Wir verweisen hier auch auf unsere AGB.
    </p>

    <p>
      Haftung für Links<br />
      Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs Es
      wird jegliche Verantwortung für solche Webseiten abgelehnt. Der Zugriff und die Nutzung
      solcher Webseiten erfolgen auf eigene Gefahr des Nutzers oder der Nutzerin.
      Wir verweisen hier auch auf unsere AGB.
    </p>

    <p>
      Urheberrechte<br />
      Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf der
      Website gehören ausschliesslich der Firma geekplanet GmbH oder den speziell genannten
      Rechtsinhabern. Für die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung der
      Urheberrechtsträger im Voraus einzuholen.
      Wir verweisen hier auch auf unsere AGB.
    </p>

    <p>
      Datenschutz<br />
      Gestützt auf Artikel 13 der schweizerischen Bundesverfassung und die datenschutzrechtlichen
      Bestimmungen des Bundes (Datenschutzgesetz, DSG) hat jede Person Anspruch auf Schutz ihrer
      Privatsphäre sowie auf Schutz vor Missbrauch ihrer persönlichen Daten. Wir halten diese
      Bestimmungen ein. Persönliche Daten werden streng vertraulich behandelt und weder an Dritte
      verkauft noch weitergegeben. Wir verweisen hier auch auf unsere AGB.
      In enger Zusammenarbeit mit unseren Hosting-Providern bemühen wir uns, die Datenbanken so gut
      wie möglich vor fremden Zugriffen, Verlusten, Missbrauch oder vor Fälschung zu schützen.
      Beim Login auf unserer Webseite werden folgende Daten in Logfiles gespeichert: IP-Adresse,
      Datum, Uhrzeit, Browser-Anfrage und allg. übertragene Informationen zum Betriebssystem resp.
      Browser. Diese Nutzungsdaten bilden die Basis für statistische, anonyme Auswertungen, so dass
      Trends erkennbar sind, anhand derer wir unsere Angebote entsprechend verbessern können.
    </p>

    <p>
      Erstellt durch geekplanet GmbH am 15. September 2017 in CH-5724 Dürrenäsch
    </p>
  </Container>
);
