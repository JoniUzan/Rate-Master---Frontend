import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RegisterCredentials, useAuth } from '@/context/userProvider';

function SignUp() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterCredentials>({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const { username, email, password, firstName, lastName } = registerData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (username.trim() === '' || email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      alert('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/auth/register", { username, email, password, firstName, lastName });
      console.log('Sign up successful with:', username, email, password);
      navigate('/');
    } catch (error) {
      console.error('Error during sign up:', error);
      alert('Sign up failed. Please try again.');
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
<<<<<<< HEAD
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  type="text" 
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={handleChange}
=======
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your First name"
                  value={registerData.firstName}
                  onChange={inputChangeHendler}
>>>>>>> 66583859e0e9f6d903f0074891effec718d97f41
                  required
                />
              </motion.div >
    <motion.div variants={itemVariants}>
      <Label htmlFor="lastName">Last Name</Label>
<<<<<<< HEAD
  <Input
    id="lastName"
    type="text"
    placeholder="Enter your last name"
    value={lastName}
    onChange={handleChange}
    required
  />
              </motion.div >
              <motion.div variants={itemVariants}>
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  type="text" 
                  placeholder="Enter your username"
                  value={username}
                  onChange={handleChange}
=======
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your Last name"
                  value={registerData.lastName}
                  onChange={inputChangeHendler}
>>>>>>> 66583859e0e9f6d903f0074891effec718d97f41
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
<<<<<<< HEAD
                  value={email}
                  onChange={handleChange}
=======
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
>>>>>>> 66583859e0e9f6d903f0074891effec718d97f41
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
<<<<<<< HEAD
                  value={password}
                  onChange={handleChange}
=======
                  value={registerData.password}
                  onChange={inputChangeHendler}
>>>>>>> 66583859e0e9f6d903f0074891effec718d97f41
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
            </form >
          </CardContent >
    <CardFooter className="flex justify-center">
      <motion.p
        variants={itemVariants}
        className="text-sm text-muted-foreground"
      >
<<<<<<< HEAD
              Already have an account ? <Button variant="ghost" onClick={() => navigate("/auth/SignIn")}>Sign in</Button>
=======
              Already have an account? <Button variant="ghost">Sign in</Button>
>>>>>>> 66583859e0e9f6d903f0074891effec718d97f41
            </motion.p >
          </CardFooter >
        </Card >
      </motion.div >
    </div >
  );
}

export default SignUp;
