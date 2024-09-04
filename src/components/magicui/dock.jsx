"use client";
import React, { useRef } from "react";
import { cva } from "class-variance-authority";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Tooltip } from "flowbite-react";
import {
  HiOutlineHeart,
  HiOutlineShoppingCart,
  HiOutlineUser,
  HiOutlineSearch,
} from "react-icons/hi";
import { cn } from "@/lib/utils";

const DEFAULT_MAGNIFICATION = 60;
const DEFAULT_DISTANCE = 140;

const dockVariants = cva(
  "h-max w-auto mt-8 p-2 flex flex-col gap-8 items-center rounded-full supports-backdrop-blur:bg-white/10 supports-backdrop-blur:dark:bg-black/10 backdrop-blur-md"
);

const Dock = React.forwardRef(
  (
    {
      className,
      children,
      magnification = DEFAULT_MAGNIFICATION,
      distance = DEFAULT_DISTANCE,
      direction = "middle",
      ...props
    },
    ref
  ) => {
    const mouseY = useMotionValue(Infinity);

    const renderChildren = () => {
      return React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          mouseY: mouseY,
          magnification: magnification,
          distance: distance,
        });
      });
    };

    return (
      <motion.div
        ref={ref}
        onMouseMove={(e) => mouseY.set(e.pageY)}
        onMouseLeave={() => mouseY.set(Infinity)}
        {...props}
        className={cn(dockVariants({ className }), {
          "items-start": direction === "top",
          "items-center": direction === "middle",
          "items-end": direction === "bottom",
        })}
      >
        {renderChildren()}
      </motion.div>
    );
  }
);

Dock.displayName = "Dock";

const DockIcon = ({
  size = 40, // Default size if not provided
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  mouseY,
  className,
  children,
  ...props
}) => {
  const ref = useRef(null);

  const distanceCalc = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  let heightSync = useTransform(
    distanceCalc,
    [-distance, 0, distance],
    [size, magnification, size]
  );

  let height = useSpring(heightSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Tooltip content={props.tooltipContent}>
      <motion.div
        ref={ref}
        style={{ height, width: height }}
        className={cn(
          "flex flex-col cursor-pointer items-center justify-center rounded-full",
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    </Tooltip>
  );
};

DockIcon.displayName = "DockIcon";

export { Dock, DockIcon, dockVariants };
