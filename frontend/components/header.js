"use client";

import { useAuth } from "@/contexts/auth";
import React from "react";

const Header = () => {
  const { user, signOut } = useAuth();
  const handleWithSignout = () => {
    signOut();
  };

  return (
    <div className="fixed top-1 right-1 font-mono font-semibold text-sm">
      [{user?.name} - {user?.email}]{" "}
      <button onClick={handleWithSignout}>[sign out]</button>
    </div>
  );
};

export default Header;
