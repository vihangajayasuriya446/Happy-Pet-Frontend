import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UsersTable";
import { Box } from "@mui/material";
import Axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Users = () => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      Axios.get("http://localhost:8080/api/v1/getusers").then((res) => res.data),
  });

  const addUserMutation = useMutation({
    mutationFn: (data) =>
      Axios.post("http://localhost:8080/api/v1/adduser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const updateUserMutation = useMutation({
    mutationFn: (data) =>
      Axios.put("http://localhost:8080/api/v1/updateuser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) =>
      Axios.delete(`http://localhost:8080/api/v1/deleteuser/${id}`), // ✅ Fixed
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
  

  const addUser = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    addUserMutation.mutate(formData);
  };

  const updateUser = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => formData.append(key, value));
    updateUserMutation.mutate(formData);
  };

  const deleteUser = (data) => {
    deleteUserMutation.mutate(data.id);
  };

  return (
    <Box sx={{ width: 'calc(100% - 100px)', margin: 'auto', marginTop: '100px' }}>
      <h1>Users Page</h1>
      <UserForm
        addUser={addUser}
        updateUser={updateUser}
        submitted={false}
        data={selectedUser}
        isEdit={isEdit}
      />
      <UserTable
        rows={users}
        selectedUser={(data) => {
          setSelectedUser(data);
          setIsEdit(true);
        }}
        deleteUser={deleteUser}
      />
    </Box>
  );
};

export default Users;
