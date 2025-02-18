import { cn } from '@/lib/utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />;
}

export { Skeleton };

// import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonLoader = ({ background }: { background: string }) => {
  return (
    <div className="space-y-4 rounded-lg p-6 border border-[#DFE0E1] shadow-md" style={{ backgroundColor: background }}>
      {/* Top Bar Skeleton */}
      <Skeleton className="h-6 w-16 rounded-md mx-auto" />

      {/* Main Content Skeleton */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Section */}
        <div className="space-y-3 col-span-2 ">
          <Skeleton className="h-52 w-full  rounded-sm" />

          <Skeleton className="h-4  rounded-sm" />
          <Skeleton className="h-4  rounded-sm" />
          <Skeleton className="h-4  rounded-sm" />
        </div>

        <Skeleton className="h-full w-full col-span-1 rounded-sm" />
      </div>
    </div>
  );
};

export default SkeletonLoader;
