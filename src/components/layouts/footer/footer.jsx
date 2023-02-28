import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import FooterAddress from '../footerAddress/footerAddress';
import FooterNavlink from '../footerNavlink/footerNavlink';
import FooterNewsletter from '../footerNewsletter/footerNewsletter';

const Footer = () => {
    return (  
        <footer>
            <Container>
                <Row>
                    <Col lg={4}>
                        <FooterAddress/>
                    </Col>
                    <Col lg={4}>
                        <FooterNavlink/>
                    </Col>
                    <Col lg={4}>
                        <FooterNewsletter/>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
 
export default Footer;