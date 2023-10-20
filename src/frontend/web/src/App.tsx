import { useErrorsContext } from 'Controller/provider';
import { useEffect, useState } from 'react';
import { Toast } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AppNavigation } from './AppNavigation';

const App = () => {
  const { t } = useTranslation();

  const { message, setMessage } = useErrorsContext();

  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!!message);
  }, [message]);

  return (
    <>
      <AppNavigation />

      <Toast
        autohide
        bg="danger"
        onClose={() => {
          setShow(false);
          setMessage('');
        }}
        show={show}
        delay={5000}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 99999,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{t('api.err.title')}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </>
  );
};

export default App;
