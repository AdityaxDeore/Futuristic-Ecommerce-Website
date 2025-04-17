"use client";

import React from "react";
import { CSSProperties } from "react";

interface ClientBodyProps {
  children: React.ReactNode;
}

const bodyStyle: CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  padding: '20px',
  backgroundColor: '#f5f5f5'
};

export function ClientBody({ children }: ClientBodyProps) {
  if (!children) {
    return null;
  }

  return (
    <div style={bodyStyle}>
      {children}
    </div>
  );
}
