import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import type { ReactNode } from "react";

interface ConfirmationModalProps {
  children: ReactNode;
  confirmLabel: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: ReactNode;
}

function ConfirmationModal({
  children,
  confirmLabel,
  isOpen,
  onClose,
  onConfirm,
  title,
}: ConfirmationModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title={title}>
      <Stack>
        <Text>{children}</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default ConfirmationModal;
