import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDispatch } from "react-redux";
import { ScorekeeperActions } from "../../data/store/ScorekeeperSlice";
import styles from "./NewPlayerForm.module.scss";

function NewPlayerForm() {
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      name: "",
    },
    validate: {
      name: (value) => (value.length > 0 ? null : "Player name is required"),
    },
  });

  const handleSubmit = ({ name }: typeof form.values) => {
    dispatch(ScorekeeperActions.AddPlayer(name));
    form.setValues({ name: "" });
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group align="top">
        <TextInput
          autoFocus
          className={styles.nameInput}
          placeholder="Add a player..."
          {...form.getInputProps("name")}
        />
        <Button type="submit" variant="outline">
          Add Player
        </Button>
      </Group>
    </form>
  );
}

export default NewPlayerForm;
