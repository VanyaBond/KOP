import { Controller, type Control, type FieldErrors } from 'react-hook-form';
import { LIMIT_OPTIONS, TYPE_OPTIONS, PAGE_SIZE_OPTIONS } from '@/lib/filters';
import { QUERY_RULES, TYPE_RULES, MIN_HP_RULES, LIMIT_RULES, PAGE_SIZE_RULES } from '@/lib/filterValidation';
import type { PokemonFilters } from '@/types/pokemon';

interface PokemonFilterFormProps {
  control: Control<PokemonFilters>;
  errors: FieldErrors<PokemonFilters>;
  isDirty: boolean;
  onReset: () => void;
}

export const PokemonFilterForm = ({ control, errors, isDirty, onReset }: PokemonFilterFormProps) => (
  <form
    className="filter-form"
    aria-label="Pokémon filters"
    noValidate
    onSubmit={(event) => event.preventDefault()}
  >
    <h3 className="filter-form__title">🔍 Filter Pokémon</h3>

    <div className="filter-form__grid">
      {/* Row 1: Search + Type */}
      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="filter-query">Search by name</label>
        <Controller
          name="query"
          control={control}
          rules={QUERY_RULES}
          render={({ field }) => (
            <input
              id="filter-query"
              className={`filter-form__input ${errors.query ? 'is-invalid' : ''}`}
              type="search"
              placeholder="Pikachu, Charizard..."
              name={field.name}
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-invalid={errors.query ? true : undefined}
              aria-describedby={errors.query ? 'filter-query-error' : undefined}
            />
          )}
        />
        {errors.query ? (
          <p id="filter-query-error" className="filter-form__error" role="alert">
            {errors.query.message}
          </p>
        ) : null}
      </div>

      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="filter-type">Type</label>
        <Controller
          name="type"
          control={control}
          rules={TYPE_RULES}
          render={({ field }) => (
            <select
              id="filter-type"
              className={`filter-form__select ${errors.type ? 'is-invalid' : ''}`}
              name={field.name}
              ref={field.ref}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              aria-describedby={errors.type ? 'filter-type-error' : undefined}
            >
              {TYPE_OPTIONS.map((type) => (
                <option key={type} value={type}>
                  {type === 'all' ? 'All types' : type}
                </option>
              ))}
            </select>
          )}
        />
        {errors.type ? (
          <p id="filter-type-error" className="filter-form__error" role="alert">
            {errors.type.message}
          </p>
        ) : null}
      </div>

      {/* Row 2: Min HP + Load limit */}
      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="filter-minHp">Minimum HP</label>
        <Controller
          name="minHp"
          control={control}
          rules={MIN_HP_RULES}
          render={({ field }) => (
            <input
              id="filter-minHp"
              className={`filter-form__input ${errors.minHp ? 'is-invalid' : ''}`}
              type="number"
              min={0}
              max={255}
              placeholder="0"
              name={field.name}
              ref={field.ref}
              value={field.value}
              onChange={(event) => field.onChange(Number(event.target.value))}
              onBlur={field.onBlur}
              aria-describedby={errors.minHp ? 'filter-minHp-error' : undefined}
            />
          )}
        />
        {errors.minHp ? (
          <p id="filter-minHp-error" className="filter-form__error" role="alert">
            {errors.minHp.message}
          </p>
        ) : null}
      </div>

      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="filter-limit">Load limit</label>
        <Controller
          name="limit"
          control={control}
          rules={LIMIT_RULES}
          render={({ field }) => (
            <select
              id="filter-limit"
              className={`filter-form__select ${errors.limit ? 'is-invalid' : ''}`}
              name={field.name}
              ref={field.ref}
              value={String(field.value)}
              onChange={(event) => field.onChange(Number(event.target.value))}
              onBlur={field.onBlur}
              aria-describedby={errors.limit ? 'filter-limit-error' : undefined}
            >
              {LIMIT_OPTIONS.map((limit) => (
                <option key={limit} value={String(limit)}>
                  {limit === 151 ? 'All (151)' : `Top ${limit}`}
                </option>
              ))}
            </select>
          )}
        />
        {errors.limit ? (
          <p id="filter-limit-error" className="filter-form__error" role="alert">
            {errors.limit.message}
          </p>
        ) : null}
      </div>

      {/* Row 3: Page size + Reset button */}
      <div className="filter-form__group">
        <label className="filter-form__label" htmlFor="filter-pageSize">Page size</label>
        <Controller
          name="pageSize"
          control={control}
          rules={PAGE_SIZE_RULES}
          render={({ field }) => (
            <select
              id="filter-pageSize"
              className={`filter-form__select ${errors.pageSize ? 'is-invalid' : ''}`}
              name={field.name}
              ref={field.ref}
              value={String(field.value)}
              onChange={(event) => field.onChange(Number(event.target.value))}
              onBlur={field.onBlur}
              aria-describedby={errors.pageSize ? 'filter-pageSize-error' : undefined}
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={String(size)}>
                  {size} per page
                </option>
              ))}
            </select>
          )}
        />
        {errors.pageSize ? (
          <p id="filter-pageSize-error" className="filter-form__error" role="alert">
            {errors.pageSize.message}
          </p>
        ) : null}
      </div>

      <div className="filter-form__group filter-form__group--button">
        <button
          type="button"
          className="filter-form__reset"
          onClick={onReset}
          disabled={!isDirty}
        >
          Reset filters
        </button>
      </div>
    </div>
  </form>
);