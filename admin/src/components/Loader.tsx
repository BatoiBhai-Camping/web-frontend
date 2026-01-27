import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-8 h-8 border-2",
    md: "w-12 h-12 border-3",
    lg: "w-16 h-16 border-4",
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-background/20 backdrop-blur-sm",
        className
      )}
    >
      <div className="relative">
        {/* Circular spinner */}
        <div
          className={cn(
            "animate-spin rounded-full border-primary border-t-transparent",
            sizeClasses[size]
          )}
        />
        {/* Optional inner glow effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-secondary/20 blur-sm animate-pulse",
            sizeClasses[size]
          )}
        />
      </div>
    </div>
  );
}

// Inline loader without backdrop
export function InlineLoader({ size = "sm", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3",
  };

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-primary border-t-transparent",
        sizeClasses[size],
        className
      )}
    />
  );
}
