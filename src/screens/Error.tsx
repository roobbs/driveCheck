import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../components/auth/AuthContext";

function Error() {
  const navigate = useNavigate();
  const { user, language } = useContext(AuthContext);

  const goHome = () => {
    if (user === null) {
      navigate("/");
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-950 text-white">
      <h1 className="m-4 text-5xl font-bold">
        404 - {language === "esp" ? "Página no encontrada" : "Page not found"}
      </h1>
      <p className="mb-8 text-lg">
        {language === "esp"
          ? "Lo sentimos, la página que estás buscando no existe."
          : "Sorry, this page does not exist"}
      </p>
      <button
        onClick={goHome}
        className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-white transition duration-300 hover:bg-green-700"
      >
        {language === "esp"
          ? "Volver a la página principal"
          : "Go back to Home page"}
      </button>
    </div>
  );
}

export default Error;
