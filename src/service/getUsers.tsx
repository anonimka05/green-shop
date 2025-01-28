/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance } from "../hooks/instance";
import { Context } from "../context/Context";
import { DeleteOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { UsersType } from "../types/UsersType";
import toast from "react-hot-toast";

const getUsers = () => {
  const { token } = useContext(Context);
  const params = { page: 1, limit: 1000 };
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation({
    mutationFn: (id: string) =>
      instance().delete(`/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const { data: Users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      instance()
        .get("/users", {
          headers: { Authorization: `Bearer ${token}` },
          params,
        })
        .then((res) => {
          return res.data?.user.map((item: UsersType, index: number) => {
            item.key = index + 1;
            item.phone_number = item.phone_number ? item.phone_number : "-";
            item.action = (
              <div>
                <button>
                  <DeleteOutlined
                    onClick={() => deleteUserMutation.mutate(item.id)}
                    className="scale-[1.5] text-red-500"
                  />
                </button>
              </div>
            );
            return item;
          });
        }),
  });
  return Users;
};

export default getUsers;
