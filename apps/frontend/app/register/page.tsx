"use client";

import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { register } from "../../api/auth"; // Fungsi untuk registrasi

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleRegister() {
    try {
      await register({ email, password, name });
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed", error);
    }
  }

  return (
    <Container>
      <Box p={3} display="flex" justifyContent="center">
        <Paper sx={{ p: 2, mb: 2, maxWidth: 500 }}>
          <Typography variant="h4">Register</Typography>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
