import React, { useState, useEffect, type MouseEvent } from 'react';
import { 
  motion, 
  useMotionValue, 
  useMotionTemplate, 
  type MotionStyle, 
  type MotionValue
} from 'framer-motion';
import clsx from 'clsx';

type WrapperStyle = MotionStyle & {
  '--x': MotionValue<string>;
  '--y': MotionValue<string>;
};

interface CardProps {
  title?: string;
  description?: string;
}

export default function Card({ title, description, children } : CardProps & {children: React.ReactNode}) {
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      className="card relative w-full h-full drop-shadow-[0_0_15px_rgba(49,49,49,0.2)]"
      onMouseMove={handleMouseMove}
      style={
        {
          '--x': useMotionTemplate`${mouseX}px`,
          '--y': useMotionTemplate`${mouseY}px`,
        } as WrapperStyle
      }
    >
      <div
        className={clsx(
          'group relative w-full h-full overflow-hidden rounded-3xl border border-slate-600 bg-gradient-to-b transition duration-300 from-neutral-950/90 to-neutral-800/90',
          'md:hover:border-transparent',
          "md:bg-gradient-to-br",
        )}
      >
        <div className="p-5 h-full w-full">
          <div className="flex w-full flex-col gap-1">
            {title && <h2 className="text-xl font-bold text-zinc-200 tracking-tight md:text-xl">{title}</h2>}
            {description && (
            <p className="text-sm leading-5 text-zinc-400 sm:text-base sm:leading-7">
              {description}
            </p>)}
          </div>
          {mounted ? children : null}
        </div>
      </div>
    </motion.div>
  );
};