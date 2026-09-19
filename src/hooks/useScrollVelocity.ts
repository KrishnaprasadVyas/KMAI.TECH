import { useState, useEffect } from 'react';
import type Lenis from 'lenis';

let globalLenisInstance: Lenis | null = null;
let currentVelocity = 0;
let currentDirection = 1;
const listeners = new Set<(state: { velocity: number; direction: number }) => void>();

export function registerLenisInstance(instance: Lenis | null) {
  globalLenisInstance = instance;
  if (instance) {
    instance.on('scroll', (e: { velocity: number; direction: number }) => {
      currentVelocity = e.velocity;
      currentDirection = e.direction;
      listeners.forEach((fn) => fn({ velocity: currentVelocity, direction: currentDirection }));
    });
  }
}

export function getLenisInstance(): Lenis | null {
  return globalLenisInstance;
}

export function pauseLenis() {
  globalLenisInstance?.stop();
}

export function resumeLenis() {
  globalLenisInstance?.start();
}

export function getScrollVelocity(): number {
  return currentVelocity;
}

export function useScrollVelocity() {
  const [state, setState] = useState({ velocity: currentVelocity, direction: currentDirection });

  useEffect(() => {
    const handleUpdate = (updated: { velocity: number; direction: number }) => {
      setState(updated);
    };
    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  return state;
}
