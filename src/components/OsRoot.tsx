'use client';

import React, { useEffect, useSyncExternalStore } from 'react';
import Desktop from '@/components/Desktop/Desktop';
import { BootScreen, LoginScreen, OffScreen, ShuttingDownScreen, TurnOffDialog } from '@/components/System/Screens';
import { useSessionStore } from '@/lib/store/sessionStore';

const subscribeNothing = () => () => {};

/** The whole interactive OS. Client-only: it depends on window size, storage and the pointer type. */
export default function OsRoot() {
  const phase = useSessionStore((s) => s.phase);
  const returnTo = useSessionStore((s) => s.returnTo);
  const start = useSessionStore((s) => s.start);
  // false during server render and hydration, true once running in the browser.
  const mounted = useSyncExternalStore(subscribeNothing, () => true, () => false);

  useEffect(() => {
    start();
  }, [start]);

  if (!mounted) return <div className="fixed inset-0 bg-black" aria-hidden />;

  switch (phase) {
    case 'boot':
      return <BootScreen />;
    case 'login':
      return <LoginScreen />;
    case 'shuttingDown':
      return <ShuttingDownScreen />;
    case 'off':
      return <OffScreen />;
    default:
      return (
        <>
          {/* The desktop (and every open window) stays mounted under the Turn Off dialog. */}
          {phase === 'turnOff' && returnTo === 'login' ? <LoginScreen /> : <Desktop />}
          {phase === 'turnOff' && <TurnOffDialog from={returnTo} />}
        </>
      );
  }
}
