"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Desktop from "@/components/Desktop/Desktop";
import Spinner from "@/components/ui/spinner"; 

// Dynamically import WelcomeAnimation with SSR disabled
const WelcomeAnimation = dynamic(
  () => import("@/components/WelcomeAnimation"),
  { ssr: false }
);

export default function Home() {
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // This useEffect ensures the animation only *starts* after hydration on the client
    setIsClient(true);
  }, []);

  if (!isClient) {

    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#3A6FCD] text-white">
        <Spinner size={60} className="mb-4" />
        <p className="text-sm font-['Tahoma',_sans-serif]">Loading XP...</p>
      </div>
    );
  }

  return (
    <>
      {showWelcomeAnimation ? (
        <WelcomeAnimation onComplete={() => setShowWelcomeAnimation(false)} />
      ) : (
        <Desktop />
      )}
    </>
  );
}