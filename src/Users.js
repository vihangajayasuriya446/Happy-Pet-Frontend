import React, { useState } from "react";
import UserForm from "./UserForm";
import UserTable from "./UsersTable";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { Box } from "@mui/material";
import Axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const Users = () => {
  const queryClient = useQueryClient();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      Axios.get("http://localhost:8080/api/v1/getusers").then((res) => res.data),
  });

  const addUserMutation = useMutation({
    mutationFn: (data) =>
      Axios.post("http://localhost:8080/api/v1/adduser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      refetch();
      resetForm(); // Reset the form after successful addition
      setSubmitted(true); // Trigger form reset
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (data) =>
      Axios.put("http://localhost:8080/api/v1/updateuser", data, {
        headers: { "Content-Type": "multipart/form-data" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      refetch();
      resetForm(); // Reset the form after successful update
      setSubmitted(true); // Trigger form reset
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id) =>
      Axios.delete(`http://localhost:8080/api/v1/deleteuser/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      refetch();
    },
  });

  const addUser = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value)
    );
    addUserMutation.mutate(formData);
  };

  const updateUser = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value)
    );
    updateUserMutation.mutate(formData);
  };

  const deleteUser = (data) => {
    deleteUserMutation.mutate(data.id);
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setIsEdit(true);
  };

  const resetForm = () => {
    setSelectedUser({});
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
          bgcolor: "#002855",
          paddingBottom: "50px",
        }}
      >
        <Navbar />
        
        <UserForm
          addUser={addUser}
          updateUser={updateUser}
          submitted={submitted}
          data={selectedUser}
          isEdit={isEdit}
          resetForm={resetForm}
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
      <Box sx={{ width: "100%" }}>
        <Footer />
      </Box>
    </>
  );
};


export default Users;

