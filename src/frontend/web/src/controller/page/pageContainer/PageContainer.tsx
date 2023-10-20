import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Logo from '../../../assets/logo.svg';
import { usePageContainer } from './usePageContainer';

export const PageContainer = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { language, onLanguageChange } = usePageContainer();

  return (
    <>
      <Navbar
        sticky="top"
        className="bg-body-tertiary"
        style={{
          boxShadow: '0px 5px 8px -9px black',
        }}
      >
        <Container fluid>
          <Navbar.Brand href="#home">
            <img alt="" src={Logo} width="30" height="30" className="d-inline-block align-top" />{' '}
            {t('app.title')}
          </Navbar.Brand>

          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll></Nav>
            <Form className="d-flex">
              <Button
                variant="outline "
                style={{
                  textTransform: 'uppercase',
                  textDecoration: 'underline',
                  fontWeight: '500',
                }}
                onClick={() => {
                  navigate('/');
                }}
              >
                {t('app.user')}
              </Button>

              <Button
                variant="outline "
                style={{
                  textTransform: 'uppercase',
                  textDecoration: 'underline',
                  fontWeight: '500',
                }}
                onClick={() => {
                  navigate('admin');
                }}
              >
                {t('app.admin')}
              </Button>

              <div
                style={{
                  borderLeft: '1px solid grey',
                  borderRadius: 0,
                }}
              >
                <Button
                  variant="outline "
                  style={{
                    textTransform: 'uppercase',
                    textDecoration: 'underline',
                    fontWeight: '500',
                  }}
                  onClick={onLanguageChange}
                >
                  {language}
                </Button>
              </div>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
};
