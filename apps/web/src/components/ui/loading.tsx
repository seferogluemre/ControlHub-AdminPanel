import { cn } from "#/lib/utils";
import { IconLoader } from "@tabler/icons-react";
import * as React from "react";

/**
 * Loading Component - Responsive loading indicators for the application
 *
 * Usage Examples:
 *
 * Basic usage:
 * <Loading />
 * <Loading variant="dots" size="lg" text="Loading..." />
 *
 * Centered loading:
 * <Loading variant="spinner" text="Please wait..." centered />
 *
 * Fullscreen loading:
 * <Loading variant="fullscreen" text="Loading application..." />
 *
 * Loading button:
 * <LoadingButton isLoading={isSubmitting}>Submit</LoadingButton>
 *
 * Loading card wrapper:
 * <LoadingCard isLoading={isLoading} text="Loading data...">
 *   <YourContent />
 * </LoadingCard>
 *
 * Page-level loading:
 * <LoadingPage text="Loading dashboard..." />
 */

export interface LoadingProps {
  /** Size variant of the loading component */
  size?: "sm" | "md" | "lg" | "xl";
  /** Visual variant of the loading component */
  variant?: "spinner" | "dots" | "pulse" | "skeleton" | "fullscreen";
  /** Text to display alongside the loading indicator */
  text?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to center the loading component */
  centered?: boolean;
}

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

const textSizeClasses = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
  xl: "text-lg",
};

function LoadingSpinner({
  size = "md",
  className,
}: {
  size: keyof typeof sizeClasses;
  className?: string;
}) {
  return <IconLoader className={cn("animate-spin", sizeClasses[size], className)} />;
}

function LoadingDots({
  size = "md",
  className,
}: {
  size: keyof typeof sizeClasses;
  className?: string;
}) {
  const dotSize =
    size === "sm"
      ? "h-1.5 w-1.5"
      : size === "md"
        ? "h-2 w-2"
        : size === "lg"
          ? "h-2.5 w-2.5"
          : "h-3 w-3";

  return (
    <div className={cn("flex items-center space-x-1", className)}>
      <div
        className={cn("bg-current rounded-full animate-bounce", dotSize)}
        style={{ animationDelay: "0ms" }}
      />
      <div
        className={cn("bg-current rounded-full animate-bounce", dotSize)}
        style={{ animationDelay: "150ms" }}
      />
      <div
        className={cn("bg-current rounded-full animate-bounce", dotSize)}
        style={{ animationDelay: "300ms" }}
      />
    </div>
  );
}

function LoadingPulse({
  size = "md",
  className,
}: {
  size: keyof typeof sizeClasses;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <div className={cn("bg-current rounded-full animate-pulse", sizeClasses[size])} />
      <div
        className={cn("bg-current/70 rounded-full animate-pulse", sizeClasses[size])}
        style={{ animationDelay: "200ms" }}
      />
      <div
        className={cn("bg-current/50 rounded-full animate-pulse", sizeClasses[size])}
        style={{ animationDelay: "400ms" }}
      />
    </div>
  );
}

function LoadingSkeleton({
  size = "md",
  className,
}: {
  size: keyof typeof sizeClasses;
  className?: string;
}) {
  const height = size === "sm" ? "h-16" : size === "md" ? "h-20" : size === "lg" ? "h-24" : "h-32";

  return (
    <div className={cn("space-y-3", className)}>
      <div className={cn("bg-accent animate-pulse rounded-lg w-full", height)} />
      <div className="space-y-2">
        <div className="bg-accent animate-pulse h-4 rounded w-3/4" />
        <div className="bg-accent animate-pulse h-4 rounded w-1/2" />
      </div>
    </div>
  );
}

function LoadingFullscreen({ text }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-muted animate-spin border-t-current" />
        </div>
        {text && <p className="text-muted-foreground text-lg font-medium">{text}</p>}
      </div>
    </div>
  );
}

export function Loading({
  size = "md",
  variant = "spinner",
  text,
  className,
  centered = false,
}: LoadingProps) {
  const containerClasses = cn(
    "flex items-center",
    centered && "justify-center min-h-32",
    text ? "space-x-3" : "",
    className,
  );

  if (variant === "fullscreen") {
    return <LoadingFullscreen text={text} />;
  }

  const LoadingComponent = () => {
    switch (variant) {
      case "dots":
        return <LoadingDots size={size} />;
      case "pulse":
        return <LoadingPulse size={size} />;
      case "skeleton":
        return <LoadingSkeleton size={size} />;
      default:
        return <LoadingSpinner size={size} />;
    }
  };

  return (
    <div className={containerClasses}>
      <LoadingComponent />
      {text && (
        <span className={cn("text-muted-foreground font-medium", textSizeClasses[size])}>
          {text}
        </span>
      )}
    </div>
  );
}

// Additional convenient wrapper components
export function LoadingButton({
  children,
  isLoading,
  size = "sm",
  ...props
}: {
  children: React.ReactNode;
  isLoading: boolean;
  size?: keyof typeof sizeClasses;
} & React.ComponentProps<"button">) {
  return (
    <button
      disabled={isLoading}
      className={cn("inline-flex items-center space-x-2", props.className)}
      {...props}
    >
      {isLoading && <LoadingSpinner size={size} />}
      <span>{children}</span>
    </button>
  );
}

export function LoadingCard({
  isLoading,
  children,
  text = "Loading...",
  className,
}: {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
  className?: string;
}) {
  if (isLoading) {
    return (
      <div
        className={cn("bg-card text-card-foreground rounded-xl border p-6 shadow-sm", className)}
      >
        <Loading variant="skeleton" text={text} centered />
      </div>
    );
  }

  return <>{children}</>;
}

export function LoadingPage({ text = "Loading page..." }: { text?: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-muted animate-spin border-t-current" />
        </div>
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">{text}</h2>
          <p className="text-sm text-muted-foreground">Please wait while we load the content</p>
        </div>
      </div>
    </div>
  );
}

// Export individual components for direct use
export { LoadingDots, LoadingFullscreen, LoadingPulse, LoadingSkeleton, LoadingSpinner };
