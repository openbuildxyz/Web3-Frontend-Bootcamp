import React from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';



export default function Page() {
  return (
    <div className="h-screen grid place-items-center">
      <div className="grid gap-8">
        <h3 className="text-2xl font-semibold tracking-tight text-center">
          not found
        </h3>
        <Button asChild>
          <Link href='/'>home</Link>
        </Button>
      </div>
    </div>
  );
}
