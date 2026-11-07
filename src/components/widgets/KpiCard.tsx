import { DeltaBadge } from '@/components/ui/DeltaBadge';
import type { KpiData } from '@/types/pokemon';

interface KpiCardProps {
  kpi: KpiData;
  side?: 'team1' | 'team2';
}

export const KpiCard = ({ kpi, side }: KpiCardProps) => {
  const bgColor = side === 'team2' 
    ? 'linear-gradient(135deg, #00D9FF 0%, #0099CC 100%)'
    : 'linear-gradient(135deg, #FFD700 0%, #FFEC47 100%)';
    
  return (
    <article 
      className="kpi-card" 
      style={{ background: bgColor }}
    >
      <h3 className="kpi-card__title">{kpi.title}</h3>
      <p className="kpi-card__value">{kpi.value}</p>
      <DeltaBadge percent={kpi.deltaPercent} absolute={kpi.deltaAbsolute} />
      <p className="kpi-card__hint">{kpi.hint}</p>
    </article>
  );
};