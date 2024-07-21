import { Button } from '../ui/button'

function Header() {
  return (
      <header className="py-6 bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="container  px-4 flex items-center gap-36 ">
        <img className=' w-32' src="src\assets\RateMaster_Transparent_Logo_Corrected.png"/>
        <nav className="flex gap-10">
            <Button variant="ghost" asChild><a href="/">Home</a></Button>
            <Button variant="ghost" asChild><a href="/about">About</a></Button>
            <Button variant="ghost" asChild><a href="/contact">Contact</a></Button>

          </nav>
        </div>
      </header>
  )
}

export default Header