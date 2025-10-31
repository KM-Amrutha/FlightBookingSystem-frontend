
import React from "react";

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-black mb-4">
           Welcome!
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          You have successfully signed in to AirTicket
        </p>
        <div className="text-green-600 text-xl font-semibold">
          Authentication Complete
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
