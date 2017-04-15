import React from 'react';
import { blueGrey100, grey800 } from 'material-ui/styles/colors';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '24px',
    backgroundColor: blueGrey100,
  },
  logo: {
    flex: 'none',
    maxWidth: '60px',
    maxHeight: '60px',
  },
  textContainer: {
    flex: 1,
    textAlign: 'center',
  },
  textTitle: {
    marginTop: 0,
    fontWeight: '300',
    marginBottom: '5px',
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: grey800,
  },
  emailIcon: {
    height: '12px',
    width: '12px',
    marginRight: '5px',
  },
};

const Footer = () => (
  <div style={styles.container}>
    <img src="/assets/images/logo.svg" alt="geekplanet Logo" style={styles.logo} />
    <div style={styles.textContainer}>
      <h5 style={styles.textTitle}>
        <FormattedMessage id="FOOTER.CONTACT" />
      </h5>
      <a style={styles.links} href="mailto:info@geekplanet.ch">
        <EmailIcon style={styles.emailIcon} /> info@geekplanet.ch
      </a>
    </div>
    <div style={styles.textContainer}>
      <h5 style={styles.textTitle}>
        <FormattedMessage id="FOOTER.ABOUT_US" />
      </h5>
      <Link to="/imprint" style={styles.links}>
        <FormattedMessage id="FOOTER.IMPRINT" />
      </Link>
      <Link to="/privacy" style={styles.links}>
        <FormattedMessage id="FOOTER.PRIVACY_POLICY" />
      </Link>
    </div>
    <div style={styles.textContainer}>
      <h5 style={styles.textTitle}>
        <FormattedMessage id="FOOTER.SOCIAL_MEDIA" />
      </h5>
      <a href="http://www.youtube.com/geekplanet.ch/" target="_blank" rel="noopener noreferrer" style={styles.links}>
        You Tube
      </a>
      <a href="https://www.facebook.com/geekplanet.ch/" target="_blank" rel="noopener noreferrer" style={styles.links}>
        Facebook
      </a>
    </div>
  </div>
);

Footer.propTypes = {};

export default Footer;
