import * as G from "./styles";
import { useState, useCallback, useEffect } from "react";
import { Button, Input } from "antd";
import api from "../../api";


export const Task = () => {
  const [task, setTask] = useState("");

  const addTask = useCallback(async () => {
    console.log(task);
    const {
      data: { Item },
    } = await api.post(`/store`, { tasklist: task });
  }, [task]);

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
          }}>
        </Input>
        <Button
          type="primary"
          onClick={() => {
            addTask();
            setTask("");
          }}
        >
          {" "}
          ➕{" "}
        </Button>
      </G.Container>
    </>
  );
};
