import { ReactNode } from 'react';
import { Modal } from 'react-bootstrap';
import { SimpleButton } from '../simpleButton';

export interface AppModalProps {
  children?: ReactNode;
  isOpen: boolean;
  modalTitle: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  primaryButtonLabel: string;
  onPrimaryButtonClick: () => void;
  onSecondaryButtonClick: () => void;
}

export const AppModal = ({
  children,
  isOpen,
  isLoading,
  isDisabled,
  modalTitle,
  primaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
}: AppModalProps) => {
  return (
    <Modal backdrop="static" show={isOpen} onHide={onSecondaryButtonClick}>
      <Modal.Header closeButton={!isLoading}>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <SimpleButton
          label={primaryButtonLabel}
          variant="primary"
          isLoading={isLoading}
          isDisabled={isDisabled}
          onClick={onPrimaryButtonClick}
        />
      </Modal.Footer>
    </Modal>
  );
};
