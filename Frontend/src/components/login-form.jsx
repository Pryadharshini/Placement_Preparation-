import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/auth",
        {
          email: email.trim(),
          password: password.trim(),
        }
      );

      console.log("Login success:", res.data);

      const backendUser = res.data.user;

      // 🔥 CHECK IF USER ALREADY EXISTS (edited profile)
      const existingUser = JSON.parse(localStorage.getItem("user"));

      let finalUser;

      if (existingUser && existingUser.email === backendUser.email) {
        // ✅ KEEP OLD PROFILE DETAILS (skills, role, goal)
        finalUser = {
          ...backendUser,
          role: existingUser.role || "",
          goal: existingUser.goal || "",
          skills: existingUser.skills || "",
        };
      } else {
        // 🆕 NEW USER LOGIN
        finalUser = {
          ...backendUser,
          role: "",
          goal: "",
          skills: "",
        };
      }

      // ✅ SAVE FINAL USER (WITH OLD DATA PRESERVED)
      localStorage.setItem("user", JSON.stringify(finalUser));

      // ✅ LOGIN SESSION
      localStorage.setItem("isLoggedIn", "true");

      // 🔁 REDIRECT BACK
      const redirectPath = localStorage.getItem("redirectAfterLogin");

      if (redirectPath) {
        localStorage.removeItem("redirectAfterLogin");
        navigate(redirectPath);
      } else {
        navigate("/app/career-tracks");
      }

    } catch (err) {
      console.error(err);

      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else {
        setError("Login failed. Try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <Card className="w-[400px] bg-black text-white border border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Enter email and password to login
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-black border-gray-600"
              />
            </div>

            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border-gray-600"
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>

            <div className="text-center text-sm">
              Don’t have an account?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Sign up
              </span>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  );
}
