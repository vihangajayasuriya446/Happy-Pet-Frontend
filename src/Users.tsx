import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { Box } from "@mui/material";
import Axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface User {
  id: number;
  name: string;
  type: string;
  age: string; // Age is a string
  gender: string;
  breed: string;
  location: string;
  photo?: string | File | null; // Allow string, File, or null
}

const Users: React.FC = () => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const { data: users = [], refetch } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      Axios.get("http://localhost:8080/api/v1/getusers").then((res) => res.data),
  });

  const addUserMutation = useMutation({
    mutationFn: (data: FormData) =>
      Axios.post("http://localhost:8080/api/v1/adduser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
      resetForm(); // Reset the form after successful addition
      setSubmitted(true); // Trigger form reset
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data: FormData) =>
      Axios.put("http://localhost:8080/api/v1/updateuser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
      resetForm(); // Reset the form after successful update
      setSubmitted(true); // Trigger form reset
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) =>
      Axios.delete(`http://localhost:8080/api/v1/deleteuser/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
    },
  });

  const addUser = (data: User) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    addUserMutation.mutate(formData);
  };

  const updateUser = (data: User) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    updateUserMutation.mutate(formData);
  };

  const deleteUser = (user: User) => {
    deleteUserMutation.mutate(user.id);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsEdit(true);
  };

  const resetForm = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setSubmitted(false); // Reset the submitted state
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          margin: "auto",
          marginTop: "80px",
          paddingBottom: "50px",
        }}
      >
        <UserForm
          addUser={addUser}
          updateUser={updateUser}
          submitted={submitted}
          data={selectedUser || undefined} // Pass undefined if no user is selected
          isEdit={isEdit}
          resetForm={resetForm}
          users={users} // Pass the users array to UserForm
        />
        <Box
          sx={{
            marginTop: "40px",
            width: "97%",
            overflowX: "auto",
            paddingLeft: 2,
            paddingRight: 2,
          }}
        >
          <UserTable
            rows={users}
            selectedUser={handleSelectUser}
            deleteUser={deleteUser}
          />
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}></Box>
    </>
  );
};

export default Users;