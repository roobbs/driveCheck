import { AuthContext } from "./AuthContext";
import { useSignIn } from "../../hooks/useSignIn";
import { useContext } from "react";
import { FcGoogle } from "react-icons/fc";

export default function SignInButton() {
  const { signInUser } = useSignIn();
  const { language } = useContext(AuthContext);

  return (
    <div
      onClick={signInUser}
      className="flex items-center gap-2 rounded-lg border border-white bg-white p-1 px-3 text-blue-950 transition hover:cursor-pointer hover:bg-transparent hover:text-white"
    >
      <FcGoogle size={25} />{" "}
      {language === "esp" ? "Ingresar Con Google" : "Sign In With Google"}
    </div>
  );
}
