import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  indicatorClassName?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, indicatorClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-3 w-full overflow-hidden rounded-full bg-secondary/10",
          className
        )}
        {...props}
      >
        <motion.div
          className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
          initial={{ x: "100%" }} // Start from right in RTL
          animate={{ x: `${100 - (value || 0)}%` }} // Move towards left
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ transformOrigin: "right" }}
        />
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
