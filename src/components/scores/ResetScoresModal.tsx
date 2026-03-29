import { Text } from "@mantine/core";
import { useDispatch } from "react-redux";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import ConfirmationModal from "../common/ConfirmationModal";

interface ResetScoresModalProps {
  opened: boolean;
  onClose: () => void;
}

function ResetScoresModal({ opened, onClose }: ResetScoresModalProps) {
  const dispatch = useDispatch();

  return (
    <ConfirmationModal
      isOpen={opened}
      onClose={onClose}
      title={<Text fw={700}>Reset scores?</Text>}
      confirmLabel="Reset scores"
      onConfirm={() => {
        dispatch(ScorekeeperActions.ResetScores());
      }}
    >
      This will set every player's score back to zero.
    </ConfirmationModal>
  );
}

export default ResetScoresModal;
