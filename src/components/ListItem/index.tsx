import { Button, Input, Modal } from "antd";
import { useState, useEffect, useCallback, FC } from "react";
import * as G from "./styles";
import { Item } from "../../types/Item";
import api from "../../api";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";

interface Tasks {
  tasks: Item[];
}

export const List: FC<Tasks> = ({ tasks }) => {
  const [lista, setListas] = useState<Item[]>([]);
  const [listaCache, setListasCache] = useState<Item[]>([]);
  const [isEditDisabled, setIsEditDisabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const GetData = useCallback(async () => {
    const { data } = await api.get<Item[]>("/index");
    setListas(data);
    setListasCache(data);
  }, []);

  useEffect(() => {
    GetData();
  }, [GetData]);

  useEffect(() => {
    if (tasks) {
      setListas(tasks);
      setListasCache(tasks);
    }
  }, [tasks]);

  const Delete = (id: number) => {
    api.delete(`/destroy/${id}`);
    setListasCache(lista.filter((lista) => lista.id !== id));
    setListas(lista.filter((lista) => lista.id !== id));
    setIsModalOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const Edit = (item: Item) => {
    api.put(`/update/${item.id}`, {
      tasklist: item.tasklist,
    });
    setListasCache(lista);
  };

  return (
    <>
      {lista.map((val, index) => (
        <G.Container>
          <Input
            type="text"
            id="listTasks"
            disabled={isEditDisabled}
            value={val.tasklist}
            onChange={({ target: { value } }) => {
              setListas((prev) => {
                return prev.map((v, ind) => {
                  if (index === ind) {
                    v.tasklist = value;
                  }
                  return v;
                });
              });
            }}
          ></Input>
          {isEditDisabled ? (
            <Button type="primary" onClick={() => setIsEditDisabled(false)}>
              {" "}
              <EditOutlined />{" "}
            </Button>
          ) : (
            <>
              <Button
                type="primary"
                onClick={() => {
                  Edit(val);
                  setIsEditDisabled(true);
                }}
              >
                {" "}
                <CheckOutlined />{" "}
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setIsEditDisabled(true);
                  setListas(listaCache);
                }}
              >
                <CloseOutlined />
              </Button>
            </>
          )}
          <Button type="primary" onClick={showModal}>
            <DeleteOutlined />{" "}
          </Button>

          <Modal
            title="Deseja excluir?"
            open={isModalOpen}
            onOk={() => Delete(val.id)}
            onCancel={handleCancel}
          ></Modal>
        </G.Container>
      ))}
    </>
  );
};
