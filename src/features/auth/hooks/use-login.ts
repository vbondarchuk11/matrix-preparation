import { useToast } from "@/hooks/use-toast";
import { authService } from "@/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { push } = useToast();
  const setSession = useAuthStore((state) => state.setSession);

  return useMutation({
    mutationFn: authService.login,
    onSuccess: ({ token, user }) => {
      setSession(token, user);
      push({
        title: "Welcome back",
        description: "Your workspace is ready.",
        variant: "success",
      });
      navigate("/", { replace: true });
    },
    onError: () => {
      push({
        title: "Authentication failed",
        description: "Check your credentials and try again.",
        variant: "danger",
      });
    },
  });
}
