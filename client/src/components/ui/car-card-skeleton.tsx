import React from 'react';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const CarCardSkeleton: React.FC = () => {
  return (
    <Card className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-64">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-6 w-2/3 rounded" />
          <Skeleton className="h-5 w-12 rounded" />
        </div>
        <Skeleton className="h-4 w-full mt-2 mb-4 rounded" />
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center">
            <Skeleton className="h-4 w-6 mb-1 rounded-full" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-4 w-6 mb-1 rounded-full" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
          <div className="flex flex-col items-center">
            <Skeleton className="h-4 w-6 mb-1 rounded-full" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-28 rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </div>
      </div>
    </Card>
  );
};

export default CarCardSkeleton;
