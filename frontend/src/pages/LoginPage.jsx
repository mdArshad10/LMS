import Login from "@/components/Login";
import Signup from "@/components/Signup";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

const LoginPage = () => {
  const location = useLocation();
  const route = location.state ? location.state : "login";
  console.log(route);

  return (
    <>
      <PageHeader
        title={route}
        description="There user login or register this self"
      />
      <div className="grid place-content-center max-h-screen h-[100vh]">
        <Tabs defaultValue={route} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="signup">
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default LoginPage;
