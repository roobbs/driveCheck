import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/auth/AuthContext";
import { useContext } from "react";

function AuthError() {
  const navigate = useNavigate();
  const { language } = useContext(AuthContext);

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="background flex h-screen flex-col items-center justify-center bg-gray-800 p-4 text-white">
      <h1 className="372p:text-4xl m-4 text-center text-5xl font-bold">
        {language === "esp" ? "Error de autenticación" : "Authentication error"}
      </h1>
      <p className="mb-8 text-center text-lg">
        {language === "esp"
          ? "Lo sentimos, para ver esta página debes ingresar a tu cuenta"
          : "Sorry, you need to sign in to see this page"}
      </p>
      <button
        onClick={goHome}
        className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-green-700"
      >
        {language === "esp"
          ? "Volver a la página principal"
          : "Go back to Home page"}
      </button>
      {/* <button
        onClick={() => {
          navigate("/ingresar");
        }}
        className="mt-8 rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-green-700"
      >
        Inicia sesion
      </button> */}
    </div>
  );
}

export default AuthError;
