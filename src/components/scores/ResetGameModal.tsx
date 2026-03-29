import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";

interface ResetGameModalProps {
  opened: boolean;
  onClose: () => void;
}

function ResetGameModal({ opened, onClose }: ResetGameModalProps) {
  const dispatch = useDispatch();

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<Text fw={700}>Reset game?</Text>}
    >
      <Stack>
        <Text>This will clear all players and scores.</Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            color="red"
            onClick={() => {
              dispatch(ScorekeeperActions.ResetGame());
              onClose();
            }}
          >
            Reset game
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default ResetGameModal;
