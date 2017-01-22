import React from 'react';
import { blueGrey100, grey800 } from 'material-ui/styles/colors';
import EmailIcon from 'material-ui/svg-icons/communication/email';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '24px',
    backgroundColor: blueGrey100,
  },
  logo: {
    flex: 'none',
    maxWidth: '80px',
    maxHeight: '80px',
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
  emailLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '14px',
    color: grey800,
  },
  emailIcon: {
    height: '16px',
    width: '16px',
    marginRight: '5px',
  },
};

const Footer = () => (
  <div style={styles.container}>
    <img src="/assets/images/logo.svg" alt="geekplanet Logo" style={styles.logo} />
    <div style={styles.textContainer}>
      <h5 style={styles.textTitle}>Kontakt</h5>
      <a
        style={styles.emailLink}
        href="mailto:info@geekplanet.ch"
      >
        <EmailIcon style={styles.emailIcon} /> info@geekplanet.ch
      </a>
    </div>
    <div style={styles.textContainer}>
      <h5 style={styles.textTitle}>Über uns</h5>
    </div>
    <div style={styles.textContainer}>
      <h5 style={styles.textTitle}>Social Media</h5>
    </div>
  </div>
);

Footer.propTypes = {};

export default Footer;
