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
import { login } from "../../api/auth";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  }

  return (
    <Container>
      <Box p={3} display="flex" justifyContent="center">
        <Paper sx={{ p: 2, mb: 2, maxWidth: 500 }}>
          <Typography variant="h4">Login</Typography>
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
            onClick={handleLogin}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}
