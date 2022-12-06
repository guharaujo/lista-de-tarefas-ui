import * as G from "./styles";
import { useState, useCallback } from "react";
import { Button } from "antd";
import api from '../../api';

export const Task = () => {
  const [task, setTask] = useState("");

  
  const addTask = useCallback(async () => {
    console.log(task);
    const {
      data: { items },
    } = await api.post(`/todolist`, { name: task });
  }, [task]);

  return (
    <>
      <G.Container>
        <input
          type="text"
          autoComplete="off"
          placeholder="Adicione uma tarefa"
          name="task"
          className="input"
          value={task}
          onChange={({ target: { value } }) => {
            setTask(value);
          }}
        />
        <Button
          type="primary"
          onClick={() => {addTask(); setTask("");}}> ➕ </Button>
      </G.Container>
    </>
  );
};