import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";

function Header() {

    return(<>
    <Navbar className="rounded-full ">
      <NavbarBrand>
        <p className="font-bold text-inherit">TASK ONE</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link className="font-bold text-inherit" color="foreground" href="#">
            React To Do List
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} isExternal showAnchorIcon href="https://github.com/LittleMoreInteresting/Web3-Frontend-Bootcamp/tree/main/members/Horace" variant="flat">
            GitHub
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    </>)
}

export default Header