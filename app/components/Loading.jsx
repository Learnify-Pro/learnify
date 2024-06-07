'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loading() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Hide the loading screen after 5 seconds
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    showLoading && (
      <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50 transition-opacity duration-500">
        <Image src='/loading.png' alt="Loading..." width={200} height={200} className="animate-pulse" />
      </div>
    )
  );
}