import React from 'react';

interface AuroraProps {
  colorStops: string[];
  amplitude?: number;
  blend?: number;
}

declare const Aurora: React.FC<AuroraProps>;
export default Aurora;
