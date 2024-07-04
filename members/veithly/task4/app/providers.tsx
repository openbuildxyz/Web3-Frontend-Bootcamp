'use client';
import {NextUIProvider} from '@nextui-org/react';
import { NotificationProvider } from './components/Notification';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
    </NextUIProvider>
  )
}
