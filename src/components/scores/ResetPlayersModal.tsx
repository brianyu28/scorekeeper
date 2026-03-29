import { Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import ConfirmationModal from "../common/ConfirmationModal";

interface ResetPlayersModalProps {
  opened: boolean;
  onClose: () => void;
}

function ResetPlayersModal({ opened, onClose }: ResetPlayersModalProps) {
  const dispatch = useDispatch();

  return (
    <ConfirmationModal
      isOpen={opened}
      onClose={onClose}
      title={<Text fw={700}>Reset players?</Text>}
      confirmLabel="Reset players"
      onConfirm={() => {
        dispatch(ScorekeeperActions.ResetPlayers());
      }}
    >
      This will clear all players, scores, and game settings.
    </ConfirmationModal>
  );
}

export default ResetPlayersModal;
