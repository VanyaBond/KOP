import { formatSignedPercent } from '@/lib/format';

interface DeltaBadgeProps {
  percent: number;
  absolute?: string;
}

export const DeltaBadge = ({ percent, absolute }: DeltaBadgeProps) => {
  const isPositive = percent >= 0;
  return (
    <span className={`delta ${isPositive ? 'delta--up' : 'delta--down'}`}>
      <span aria-hidden="true">{isPositive ? '▲' : '▼'}</span>
      <span>{formatSignedPercent(percent)}</span>
      {absolute ? <span className="delta__absolute">{absolute}</span> : null}
    </span>
  );
};