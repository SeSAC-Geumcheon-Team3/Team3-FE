import React from "react";
import { Container, Row, Col, Nav, NavItem, NavLink } from "reactstrap";

const Footer = ({ hideFooter }) => {
  if (hideFooter) {
    return null; // hideFooter가 true일 경우 footer를 렌더링하지 않음
  }

  return (
    <footer className="footer">
      <Container fluid>
        <Row className="align-items-center justify-content-xl-between">
          <Col xl="6">
            <div className="copyright text-center text-xl-left text-muted">
              © {new Date().getFullYear()}{" "}
              <a
                className="font-weight-bold ml-1"
                href="https://www.creative-tim.com?ref=adr-admin-footer"
                rel="noopener noreferrer"
                target="_blank"
              >
                Creative Tim
              </a>
              <span className="ml-1">·</span>
              <a
                className="font-weight-bold ml-1"
                href="https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md"
                rel="noopener noreferrer"
                target="_blank"
              >
                MIT 라이센스
              </a>
            </div>
          </Col>

          <Col xl="6">
            <Nav className="nav-footer justify-content-center justify-content-xl-end">
              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Creative Tim
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://www.creative-tim.com/presentation?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  회사 소개
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="http://blog.creative-tim.com?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  블로그
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md?ref=adr-admin-footer"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MIT 라이센스
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
