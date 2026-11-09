import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsDark } from '@/store/selectors';
import { toggleTheme } from '@/store/slices/uiSlice';

export const ThemeToggle = () => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector(selectIsDark);
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      className={`toggle ${isDark ? 'toggle--dark' : 'toggle--light'}`}
      onClick={() => dispatch(toggleTheme())}
    >
      <span className="toggle__icon" aria-hidden="true">
        {isDark ? '🌙' : '☀️'}
      </span>
      <span className="toggle__track">
        <span className="toggle__thumb" />
      </span>
      <span className="toggle__label">{isDark ? 'Dark' : 'Light'}</span>
    </button>
  );
};
