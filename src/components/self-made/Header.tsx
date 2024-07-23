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

function Header() {
  const { loggedInUser, logout } = useAuth();
  return (
    <header className="py-2  text-secondary-foreground sticky top-0 z-50 shadow-md backdrop-blur-lg">
      <nav className="flex justify-between px-8">
        <div className="flex gap-6">
          <img className=" w-32" src="src\assets\Logo.png" />
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

        <div className="flex gap-8 ">
          <ModeToggle />
          {loggedInUser && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                {" "}
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
                  {loggedInUser.firstName}
                  {loggedInUser.lastName}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
