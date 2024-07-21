import { Button } from '../ui/button'
import { ModeToggle } from './DarkMode'

function Header() {
  return (
      <header className="py-2 bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="container  px-4 flex items-center ">
        <img className=' w-32' src="src\assets\RateMaster_Transparent_Logo_Corrected.png"/>
        <nav className="flex gap-6">
            <Button variant="ghost" asChild><a href="/">Home</a></Button>
            <Button variant="ghost" asChild><a href="/about">About</a></Button>
            <Button variant="ghost" asChild><a href="/contact">Contact</a></Button>
            
      <div className=' '>
            <ModeToggle />
            </div>
          </nav>
      </div>
      </header>
  )
}

export default Header