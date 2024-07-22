// pages/SignUp.tsx
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
import { RegisterCredentials, useAuth } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const { register } = useAuth();

  const [registerData, serRegisterData] = useState<RegisterCredentials>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const navigate = useNavigate();
  function inputChangeHendler(e: React.ChangeEvent<HTMLInputElement>) {
    serRegisterData((prev) => {
      const { name, value } = e.target;
      return { ...prev, [name]: value };
    });
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log(
      "Sign up attempted with:",
      registerData.username,
      registerData.password,
      registerData.email,
      registerData.firstName,
      registerData.lastName
    );
    try {
      register(registerData);
    } catch (error) {
      console.error("error while register", error);
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
        when: "beforeChildren",
        staggerChildren: 0.1,
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
              Create Your RateMaster Account
            </CardTitle>
            <CardDescription className="text-center">
              Join our community of reviewers today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants}>
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your First name"
                  value={registerData.firstName}
                  onChange={inputChangeHendler}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your Last name"
                  value={registerData.lastName}
                  onChange={inputChangeHendler}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={inputChangeHendler}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="username"
                  placeholder="Enter your Username"
                  value={registerData.username}
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
                  placeholder="Create a password"
                  value={registerData.password}
                  onChange={inputChangeHendler}
                  required
                />
              </motion.div>
              {/* <motion.div variants={itemVariants}>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={inputChangeHendler}
                  required
                />
              </motion.div> */}
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground"
            >
              Already have an account?{" "}
              <Button onClick={() => navigate("/auth/SignIn")} variant="ghost">
                Sign in
              </Button>
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default SignUp;
