import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card";
import emailjs from "@emailjs/browser";
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

function ContactUs() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    emailjs.sendForm('service_6fokoqi', 'template_stqu7h3', form, 'K6UnYIQvr_mNfteek')
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        // You might want to clear the form or show a success message here
          toast({
        description: "Form sent successfully",
            variant: "success",
            style: { "background":"green","color":"white", }
          });
        setTimeout(() => { navigate("/") },1200)
      }, (error) => {
        console.error('Failed to send email:', error.text);
        // You might want to show an error message to the user here
          toast({
        description: "Error while submitting the form",
            variant: "destructive",
        
      });
      });
    console.log('Contact form submitted with:', name, email, message);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        damping: 20,
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'spring',
        damping: 25,
        stiffness: 120
      }
    }
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
            <CardTitle className="text-2xl font-bold text-center">Contact Us</CardTitle>
            <CardDescription className="text-center">We'd love to hear from you!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants}>
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  name="name"
                  type="text" 
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  name="message"
                  placeholder="Enter your message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[100px]"
                />
              </motion.div>
              <motion.div 
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button type="submit" className="w-full">Send Message</Button>
              </motion.div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <motion.p
              variants={itemVariants}
              className="text-sm text-muted-foreground"
            >
              We'll get back to you as soon as possible.
            </motion.p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}

export default ContactUs;