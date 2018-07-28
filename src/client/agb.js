import React from 'react';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10px 20px;
`;

const StyledList = styled.ul`
  margin: 5px 0;
`;

export default () => (
  <Container>
    <FormattedMessage id="FOOTER.AGB">
      {message => (
        <Helmet>
          <title>
            {message}
          </title>
        </Helmet>
      )}
    </FormattedMessage>
    <h3>
      Allgemeine Geschäftsbedingungen (AGB)
    </h3>
    <p>
      Geltung
      <br />
      Mit der Bestätigung der Bestellung oder durch das Ausführen eines Downloads erklärt sich der
      Kunde ausdrücklich mit den AGB von geekplanet GmbH einverstanden. Abweichungen von den AGB
      sind nur wirksam, wenn geekplanet GmbH sie schriftlich bestätigt.
    </p>
    <p>
      Datenschutz
      <br />
      Sämtliche Kundendaten werden vertraulich behandelt. geekplanet GmbH nimmt beim Bestellvorgang
      nur die zwingend benötigten Daten auf und benutzt diese im Rahmen der Abwicklung der
      Bestellung sowie mit dem Zweck, dem wiederkehrenden Kunden das Einkaufen so einfach wie
      möglich zu gestalten. geekplanet GmbH wird diese Daten in keiner Weise veröffentlichen, an
      Dritte weitergeben oder zu Werbezwecken verwenden.
    </p>
    <p>
      Bestellung
      <br />
      Durch das Abschicken und Bestätigen einer Bestellung ist der Kauf endgültig. Ein Rücktritt vom
      Kauf ist nicht möglich. Alle offenen Forderungen sind innert 14 Tagen zu begleichen (auch wenn
      nicht alle Artikel an Lager sind), ansonsten wird die Bestellung komplett oder teilweise
      storniert. Im Wiederholungsfall behält sich geekplanet GmbH eine Sperrung des Accounts und
      eventuelle rechtliche Schritte vor.
      geekplanet GmbH behält es sich vor, nur gegen Vorkasse zu liefern.
      Durch Vollenden des Bestellvorgangs bestätigt der Käufer, dass er volljährig (18 Jahre alt)
      ist oder das Einverständnis seiner Eltern hat, die Bestellung vorzunehmen.
    </p>
    <p>
      Preise
      <br />
      Für Bestellungen gelten die zum Zeitpunkt der Bestellung im Angebot aufgeführten Preise. Alle
      angegebenen Preise sind Brutto-Endpreise. Rabatte und Sonderkonditonen werden separat
      ausgewiesen. Irrtümer und Preisänderungen vorbehalten.
      Sämtliche Preise sind in Schweizer Franken (CHF) inklusive MwSt. angegeben.
    </p>
    <p>
      Produkte
      <br />
      Bei den angebotenen Produkten handelt es sich um Modellbauartikel und nicht um Spielzeug.
      Generell sind die Produkte, wo nicht explizit erwähnt, im Rohzustand, d.h. sie müssen teils
      aus ihrem Gussrahmen gelöst werden, sind noch unbemalt und noch nicht zusammengebaut.
      geekplanet GmbH übernimmt keinerlei Gewähr hinsichtlich der inhaltlichen Richtigkeit,
      Genauigkeit, Aktualität und Vollständigkeit der Produktbeschreibungen und Produktabbildungen.
      Entsprechend kann geekplanet GmbH dafür keine Haftung übernehmen. Abgebildetes Zubehör ist, wo
      nicht anders erwähnt, nicht im Lieferumfang enthalten.
      Geistiges Eigentum wie Logos, Marken, Bezeichnungen und Bilder sind, wo nicht anders erwähnt,
      Eigentum der jeweiligen Hersteller.
    </p>
    <p>
      Lieferung
      <br />
      Wir liefern in die gesamte Schweiz und ins Fürstentum Liechtenstein. Lieferungen beschränken
      sich entsprechend nur auf Lieferadressen innerhalb der Schweiz oder dem Fürstentum
      Liechtenstein. Lieferungen ins Ausland werden nur auf Anfrage durchgeführt und können von
      geekplanet GmbH abgelehnt werden.
      Sofern vorrätig, werden Artikel innert 2 Arbeitstagen ab Bestellungseingang verschickt.
      Die Versandkosten betragen pauschal CHF 9.-. Bei Bestellungen über CHF 50.- liefern wir
      versandkostenfrei.
      Bestellungen werden bearbeitet und verschickt, wenn der Bestellvorgang abgeschlossen und die
      Zahlung, im Fall von Vorkasse oder Kreditkartenzahlung, eingetroffen ist.
      Die Angaben der Lieferzeiten sind Richtlinien und nicht verbindlich. Ein Lieferverzug führt
      nie zu einer Reduktion des Verkaufspreises.
    </p>
    <p>
      Gewährleistung
      <br />
      Ein Rücktritt vom Vertrag ist nicht möglich. Defekte oder fehlerhafte Ware wird innert
      angemessener/möglicher Frist ausgetauscht.
      Reklamationen sind schriftlich und mit Bildern der Ware innert 14 Tagen ab Lieferdatum
      vorzubringen.
      Bilder zu den entsprechenden Produkten im Shop sind nicht verbindlich und können von den
      tatsächlichen Originalartikeln abweichen.
      Die Lieferzeitangabe von 2 Tagen bezieht sich auf Artikel, die wir explizit an Lager haben und
      sofort verschicken können.
      Angaben über Lagerbestände auf unserer Website sind nicht bindend.
      Sofern nicht vorrätig, müssen Artikel erst beim Hersteller bezogen werden. Der Käufer nimmt in
      solchen Fällen zur Kenntnis, dass er a) längere Lieferzeiten in Kauf nehmen muss, und b)
      keinen Anspruch auf Artikel hat, die beim Hersteller nicht mehr erhältlich sind.
      Sind bestellte Artikel nicht mehr verfügbar und nicht mehr beim Lieferanten zu bestellen,
      behält sich geekplanet GmbH vor, die Leistung nicht zu erbringen. Bereits bezahlte Beträge
      werden zurückerstattet.
    </p>
    <p>
      Zahlungsmethoden/-bedingungen
      <br />
      Rechnungen sind innert 10 Tagen netto nach Rechnungsdatum zu begleichen. Folgende
      Zahlungsmethoden werden akzeptiert:
    </p>
    <StyledList>
      <li>
Vorkasse durch Überweisung (oranger Einzahlungsschein)
      </li>
      <li>
Kreditkarte (online) während dem Bestellvorgang
      </li>
    </StyledList>
    <p>
      Lieferung gegen Rechnung wird nach Ermessen von geekplanet GmbH je nach Kundenaccount als
      Zahlungsmethode freigeschaltet und ermöglicht.
      Ab der zweiten Zahlungsaufforderung und dem damit verbundenen erhöhten manuellen Aufwand kann
      eine Umtriebsentschädigung verrechnet werden.
    </p>
    <p>
      Rücknahme/Umtausch
      <br />
      Umtausch/Rückgabe bei Irrtum oder Nichtgefallens ist ausgeschlossen.
      Fehllieferungen und/oder falsche oder fehlende Teile sind umgehend und mit Foto zu melden. Für
      Ersatz wird, falls bei geekplanet GmbH oder beim Lieferanten weiterhin an Lager, gesorgt.
      Die Artikel werden vor dem Versand auf den einwandfreien Zustand geprüft und gepolstert
      verpackt. Für Beschädigungen die auf dem Transportweg entstehen übernehmen wir keine Haftung.
    </p>
    <p>
      Transportschäden
      <br />
      Bei Transportschäden ist die Ware in ihrem Zustand zu belassen und der Schaden umgehend oder
      innerhalb einer zweitägigen Frist mit Foto zu reklamieren.
    </p>
    <p>
      Restposten
      <br />
      Artikel, die als &quot;Restposten&quot; gekennzeichnet sind, sind explizit von Umtausch-,
      Rückgabe- und Reklamationsmöglichkeiten ausgeschlossen. Dies gilt auch, wenn ein Artikel
      fehlerhaft ist. Es kann kein Anspruch auf Ersatz, Umtausch, Rückgabe oder Ansprüche in sonst
      einer Form erhoben werden.
    </p>
    <p>
      Eigentumsvorbehalt
      <br />
      Die gelieferte Ware bleibt bis zur vollständigen Bezahlung Eigentum von geekplanet GmbH.
    </p>
    <p>
      Annahmeverweigerung
      <br />
      Bei unberechtigter Annahmeverweigerung der von uns gelieferten Ware, sind wir berechtigt, die
      uns entstandenen Kosten zu berechnen. Bei wiederholter Annahmeverweigerung wird die
      Kundennummer gesperrt.
    </p>
    <p>
      Haftungsbeschränkung
      <br />
      geekplanet GmbH schliesst im Rahmen des gesetzlich Zulässigen jede Haftung für die gelieferten
      und verkauften Produkte aus. geekplanet GmbH übernimmt keinerlei Gewähr hinsichtlich der
      inhaltlichen Richtigkeit, Genauigkeit, Aktualität, Zuverlässigkeit und Vollständigkeit der
      Informationen.
      Haftungsansprüche gegen geekplanet GmbH wegen Schäden materieller oder immaterieller Art,
      welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der veröffentlichten Informationen,
      durch Missbrauch der Verbindung oder durch technische Störungen entstanden sind, werden
      ausgeschlossen.
      Alle Angebote sind unverbindlich. geekplanet GmbH behält es sich ausdrücklich vor, Teile der
      Seiten oder das gesamte Angebot ohne gesonderte Ankündigung zu verändern, zu ergänzen, zu
      löschen oder die Veröffentlichung zeitweise oder endgültig einzustellen.
    </p>
    <p>
      Gerichtsstand
      <br />
      Die Rechtsverhältnisse unterstehen schweizerischem Recht. Ausschliesslicher Gerichtsstand für
      sämtliche Streitigkeiten ist Kulm AG.
    </p>
    <p>
      Salvatorische Klausel
      <br />
      Sollten einzelne Bestimmungen dieser Nutzungsbedingungen ganz oder teilweise nichtig und /
      oder unwirksam sein, bleibt die Gültigkeit und / oder Wirksamkeit der übrigen Bestimmungen
      oder Teile solcher Bestimmungen unberührt. Die ungültigen und / oder unwirksamen Bestimmungen
      werden durch solche ersetzt, die dem Sinn und Zweck der ungültigen und / oder unwirksamen
      Bestimmungen in rechtwirksamer Weise wirtschaftlich am nächsten kommt. Das gleiche gilt bei
      eventuellen Lücken der Regelung.
    </p>
    <p>
      Erstellt durch geekplanet GmbH am 15. September 2017 in CH-5724 Dürrenäsch
    </p>
  </Container>
);
