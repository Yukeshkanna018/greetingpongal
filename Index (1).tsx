import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Redirect to the static Pongal page
    window.location.href = "/pongal/index.html";
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-amber-50">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-amber-900">🌞 Happy Pongal! 🌞</h1>
        <p className="text-xl text-amber-700">Redirecting to the festival greeting...</p>
      </div>
    </div>
  );
};

export default Index;
