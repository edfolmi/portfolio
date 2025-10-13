import React from "react";

const About: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-3xl font-semibold mb-3 text-gray-800">
        About Our Company
      </h1>
      <p className="text-gray-600 max-w-xl">
        This application demonstrates a scalable React + TypeScript setup built
        for professional teams. It uses Vite, Tailwind, Zustand, and React Router v7.
      </p>
    </section>
  );
};

export default About;
