import { toast } from "@/hooks/use-toast";
import { useUser } from "@/provider/UserProvider";
import { getUserInfo } from "@/services/lib/user";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  employee?: boolean;
}

const ProtectedRoute = ({ employee }: ProtectedRouteProps) => {
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user && localStorage.getItem("token")) {
        try {
          const res = await getUserInfo();
          setUser(res.data);
        } catch {
          toast({
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
            variant: "destructive",
          });
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [user, setUser]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (employee && !user.employee) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
