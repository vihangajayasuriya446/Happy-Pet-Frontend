import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { Box, Button, Drawer, IconButton } from "@mui/material";
import Axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CloseIcon from "@mui/icons-material/Close";

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
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const { data: users = [], refetch } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => Axios.get("http://localhost:8080/api/v1/getusers").then((res) => res.data),
  });

  const addUserMutation = useMutation({
    mutationFn: (data: FormData) =>
      Axios.post("http://localhost:8080/api/v1/adduser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
      resetForm();
      setSubmitted(true);
      setIsDrawerOpen(false);
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
      resetForm();
      setSubmitted(true);
      setIsDrawerOpen(false);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => Axios.delete(`http://localhost:8080/api/v1/deleteuser/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      refetch();
    },
  });

  const createFormData = (data: User) => {
    const formData = new FormData();
    formData.append("id", data.id.toString()); // Ensure ID is included
    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "photo" && typeof value === "string") {
          return; // Skip appending photo if it's just a string (URL)
        }
        formData.append(key, value as string | Blob);
      }
    });
    return formData;
  };

  const addUser = (data: User) => {
    addUserMutation.mutate(createFormData(data));
  };

  const updateUser = (data: User) => {
    updateUserMutation.mutate(createFormData(data));
  };

  const deleteUser = (user: User) => {
    deleteUserMutation.mutate(user.id);
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    setIsEdit(true);
    setIsDrawerOpen(true);
  };

  const resetForm = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setSubmitted(false);
  };

  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
    if (!open) {
      resetForm();
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", margin: "auto", marginTop: "150px", paddingBottom: "50px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={toggleDrawer(true)}
          sx={{ position: "absolute", right: 20, top: 80, zIndex: 1000 }}
        >
          Add New Pet
        </Button>

        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
          <Box sx={{ width: 400, padding: 2 }}>
            <IconButton onClick={toggleDrawer(false)} sx={{ position: "absolute", right: 8, top: 8 }}>
              <CloseIcon />
            </IconButton>
            <UserForm
              addUser={addUser}
              updateUser={updateUser}
              submitted={submitted}
              data={selectedUser || undefined}
              isEdit={isEdit}
              resetForm={resetForm}
              users={users}
            />
          </Box>
        </Drawer>

        <Box sx={{ marginTop: "40px", width: "97%", overflowX: "auto", paddingLeft: 2, paddingRight: 2 }}>
          <UserTable rows={users} selectedUser={handleSelectUser} deleteUser={deleteUser} />
        </Box>
      </Box>
    </>
  );
};

export default Users;
