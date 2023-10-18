import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import { SimpleButton } from '../simpleButton';

export interface AppModalProps {
  children: ReactNode;
  isOpen: boolean;
  modalTitle: string;
  isLoading?: boolean;
  primaryButtonLabel: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}

export const AppModal = ({
  children,
  isOpen,
  isLoading,
  modalTitle,
  primaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: AppModalProps) => {
  return (
    <Modal show={isOpen} onHide={onSecondaryButtonClick} backdrop="static">
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <SimpleButton label={primaryButtonLabel} variant="primary" isLoading={isLoading} onClick={onPrimaryButtonClick} />
      </Modal.Footer>
    </Modal>
  );
};
