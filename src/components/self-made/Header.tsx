import { useState } from "react";
import { useAuth } from "@/context/UserProvider";
import { Button } from "../ui/button";
import { ModeToggle } from "./DarkMode";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

import logo from "../../assets/Logo.png";

function Header() {
  const { loggedInUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="py-2 text-secondary-foreground sticky top-0 z-50 shadow-md backdrop-blur-lg">
      <nav className="flex justify-between items-center px-4 md:px-8">
        <Link to={"/"}>
          <img className="w-32 md:w-40" src={logo} alt="Logo" />
        </Link>

        <div className="hidden md:flex md:gap-6">
          <Button variant="ghost" asChild>
            <a href="/">Home</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="/#about">About</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="/contact">Contact</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="/Business">Business</a>
          </Button>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <ModeToggle />
          {loggedInUser && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  {loggedInUser.image && (
                    <AvatarImage src={loggedInUser.image} />
                  )}

                  <AvatarFallback>
                    {loggedInUser.firstName[0].toUpperCase()}
                    {loggedInUser.lastName[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {loggedInUser.firstName} {loggedInUser.lastName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          <Button variant="ghost" className="md:hidden" onClick={toggleMenu}>
            <Menu />
          </Button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden">
          <Button variant="ghost" asChild className="w-full text-left">
            <a href="/">Home</a>
          </Button>
          <Button variant="ghost" asChild className="w-full text-left">
            <a href="/#about">About</a>
          </Button>
          <Button variant="ghost" asChild className="w-full text-left">
            <a href="/contact">Contact</a>
          </Button>
          <Button variant="ghost" asChild className="w-full text-left">
            <a href="/Business">Business</a>
          </Button>
        </div>
      )}
    </header>
  );
}

export default Header;
