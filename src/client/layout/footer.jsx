import { blueGrey100, grey800 } from 'material-ui/styles/colors';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 24px;
  background-color: ${blueGrey100};
`;

const TextContainer = styled.div`
  flex: 1;
  text-align: center;
`;

const TextTitle = styled.h5`
  margin-top: 0;
  font-weight: 300;
  margin-bottom: 5px;
`;

const Logo = styled.img`
  flex: none;
  max-width: 60px;
  max-height: 60px;
`;

const SocialLink = styled.a`
  text-decoration: none;
`;

const SocialLinks = styled.div`
  flex: none;
`;

const SocialIcon = styled.img`
  width: 20px;
  margin-left: 5px;
`;

const StyledEmailIcon = styled(EmailIcon)`
  height: 12px !important;
  width: 12px !important;
  margin-right: 5px;
`;

const styles = {
  links: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    color: grey800,
  },
};

const Footer = () => (
  <Container>
    <Logo src="/assets/images/logo.svg" alt="geekplanet Logo" />
    <TextContainer>
      <TextTitle>
        <FormattedMessage id="FOOTER.CONTACT" />
      </TextTitle>
      <a style={styles.links} href="mailto:info@geekplanet.ch">
        <StyledEmailIcon />info@geekplanet.ch
      </a>
    </TextContainer>
    <TextContainer>
      <TextTitle>
        <FormattedMessage id="FOOTER.ABOUT_US" />
      </TextTitle>
      <Link to="/imprint" style={styles.links}>
        <FormattedMessage id="FOOTER.IMPRINT" />
      </Link>
      <Link to="/privacy" style={styles.links}>
        <FormattedMessage id="FOOTER.PRIVACY_POLICY" />
      </Link>
    </TextContainer>
    <SocialLinks>
      <SocialLink href="http://www.youtube.com/geekplanet.ch/" target="_blank" rel="noopener noreferrer">
        <SocialIcon
          alt="Youtube"
          src="/assets/images/youtube.png"
        />
      </SocialLink>
      <SocialLink href="https://www.facebook.com/geekplanet.ch/" target="_blank" rel="noopener noreferrer">
        <SocialIcon
          alt="Facebook"
          src="/assets/images/facebook.png"
        />
      </SocialLink>
    </SocialLinks>
  </Container>
);

export default Footer;
