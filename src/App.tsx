import { Stack } from "@mantine/core";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppContent from "./components/app/AppContent";
import { selectAreLiveUpdatesEnabled } from "./data/selectors/UiSelectors";
import { ScorekeeperActions } from "./data/store/ScorekeeperSlice";
import { LOCAL_STORAGE_KEY } from "./utils/consts/storageConsts";

function App() {
  const dispatch = useDispatch();
  const areLiveUpdatesEnabled = useSelector(selectAreLiveUpdatesEnabled);

  useEffect(() => {
    if (!areLiveUpdatesEnabled) {
      return;
    }

    const handleStorageChange = (event: StorageEvent) => {
      if (event.storageArea !== globalThis.localStorage) {
        return;
      }

      if (event.key !== LOCAL_STORAGE_KEY) {
        return;
      }

      dispatch(ScorekeeperActions.ReloadPlayersFromLocalStorage());
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [dispatch, areLiveUpdatesEnabled]);

  return (
    <Stack>
      <AppContent />
    </Stack>
  );
}

export default App;
