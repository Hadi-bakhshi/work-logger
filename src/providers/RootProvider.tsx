'use client';

import type { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';

export default function RootProvider({ children }: { children: ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
