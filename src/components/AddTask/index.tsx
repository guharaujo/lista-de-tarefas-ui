import * as G from "./styles";
import {
  useState,
  useCallback,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { Button, Input } from "antd";
import api from "../../api";
import { Item } from "../../types/Item";
import { PlusOutlined } from "@ant-design/icons";

export const Task: FC<{
  setTasks: Dispatch<SetStateAction<Item[]>>;
}> = ({ setTasks }) => {
  const [task, setTask] = useState("");

  const addTask = useCallback(async () => {
    await api.post(`/store`, { tasklist: task });
    const { data } = await api.get<Item[]>("/index");
    setTasks(data);
  }, [task, setTasks]);

  return (
    <>
      <G.Container>
        <Input
          type="text"
          autoComplete="off"
          placeholder="Adicione uma tarefa"
          name="task"
          className="input"
          value={task}
          onChange={({ target: { value } }) => {
            setTask(value);
          }}
        ></Input>
        <Button
          type="primary"
          onClick={() => {
            addTask();
            setTask("");
          }}
        >
          {" "}
          <PlusOutlined />{" "}
        </Button>
      </G.Container>
    </>
  );
};
