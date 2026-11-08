import { useState, type ReactNode } from 'react';

interface CounterProps {
  label: string;
  initial: number;
  min: number;
  max: number;
  step?: number;
  onChange?: (value: number) => void;
  children?: (value: number) => ReactNode;
}

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const Counter = ({ label, initial, min, max, step = 1, onChange, children }: CounterProps) => {
  const [value, setValue] = useState(initial);

  const commit = (next: number) => {
    const clamped = clamp(next, min, max);
    setValue(clamped);
    onChange?.(clamped);
  };

  const shift = (delta: number) => {
    commit(value + delta);
  };

  const reset = () => {
    commit(initial);
  };

  return (
    <div className="counter">
      <span className="counter__label">{label}</span>
      <div className="counter__controls">
        <button type="button" className="counter__btn" onClick={() => shift(-step)} disabled={value <= min}>
          −
        </button>
        <output className="counter__value">{value}</output>
        <button type="button" className="counter__btn" onClick={() => shift(step)} disabled={value >= max}>
          +
        </button>
        <button type="button" className="counter__btn" onClick={() => reset()} style={{ fontSize: '12px', width: '60px' }}>
          Reset
        </button>
      </div>
      <div className="counter__progress" aria-hidden="true">
        <div className="counter__progress-fill" style={{ width: `${((value - min) / (max - min)) * 100}%` }} />
      </div>
      {children ? <div className="counter__preview">{children(value)}</div> : null}
    </div>
  );
};