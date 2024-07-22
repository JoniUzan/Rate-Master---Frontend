// pages/SignIn.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { useNavigate } from "react-router-dom";
import { LoginCredentials, useAuth } from "../context/UserProvider";

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [logInData, setLogInData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  function inputChangeHendler(e: React.ChangeEvent<HTMLInputElement>) {
    setLogInData((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign in logic here
    console.log(
      "Sign in attempted with:",
      logInData.username,
      logInData.password
    );
    try {
      login(logInData);

      // navigate("/");
    } catch (error) {
      console.log("login error", error);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary to-primary-foreground flex items-center justify-center p-4">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Sign In to RateMaster
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants}>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  value={logInData.username}
                  onChange={inputChangeHendler}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  value={logInData.password}
                  onChange={inputChangeHendler}
                  required
                />
              </motion.div>
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button type="submit" className="w-full">
                  Sign In
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground"
            >
              Don't have an account?{" "}
              <Button variant="ghost" onClick={() => navigate("/auth/SignUp")}>
                Sign up
              </Button>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default SignIn;
