import { useEffect } from "react";
import { Menu, School } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import DarkMode from "./DarkMode";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/features/api/authApiSlice";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);

  const [logout, { isSuccess, data }] = useLogoutMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User logged Out");
      navigate("/login", { state: "login" });
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* for Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <Link to={"/"} className="flex items-center gap-2">
          <School size={30} />
          <h1 className="hidden md:block font-extrabold text-2xl">
            E-Learning
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          {/* {user icons and dark mode icon} */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src={user?.photoUrl?.url || "https://github.com/shadcn.png"}
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to={"my-learning"}>My Learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to={"edit-profile"}>Edit Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem>
                  <Link to={"admin"}>Dashboard</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("login", { state: "login" })}
              >
                Login
              </Button>
              <Button onClick={() => navigate("login", { state: "signup" })}>
                Signup
              </Button>
            </div>
          )}
          <DarkMode />
        </div>
      </div>

      {/* for mobile */}
      {/* <MobileNavbar /> */}
    </div>
  );
};

const MobileNavbar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>
            {" "}
            <Link to="/">E-Learning</Link>
          </SheetTitle>
          <DarkMode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <Link to="/my-learning">My Learning</Link>
          <Link to="/profile">Edit Profile</Link>
          <p>Log out</p>
        </nav>
        {/* {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )} */}
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
