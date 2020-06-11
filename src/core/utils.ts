import { IDom, TState } from '@/interface';

export const range = (start: number, end: number): number[] => {
  if (start > end) [end, start] = [start, end];
  return new Array(end - start + 1).fill('').map((_, ind) => start + ind);
};

export const getStorage = (key: string): TState | null => {
  const obj: string | null = localStorage.getItem(key);
  return obj ? JSON.parse(obj) : obj;
};

export const isState = (state: TState | unknown): state is TState => {
  return (
    (<TState>state).lastModifiedDate !== undefined &&
    (<TState>state).currentStyle !== undefined
  );
};

export const setStorage = (key: string, data: unknown): void => {
  if (isState(data)) localStorage.setItem(key, JSON.stringify(data));
};

export const storageName = (param: string): string => `excel:${param}`;

export const isEqual = <T, U>(a: T, b: U): boolean => {
  return JSON.stringify(a) === JSON.stringify(b);
};

export const camelCaseToDash = (str: string): string => {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
};

export const toInlineStyles = (style: Record<string, string>): string => {
  return Object.keys(style)
    .map((key) => `${camelCaseToDash(key)}: ${style[key]}`)
    .join(';');
};

export const debounce = (
  fn: (...args: unknown[]) => void,
  ms: number
): (() => void) => {
  let timeout: NodeJS.Timeout;

  return (...args): void => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, ms);
  };
};

// Плохой вариант, много ошибок которые нельзя исправить
export const parse = (value: string | undefined): string => {
  if (!value) return '';
  if (value.startsWith('=')) {
    return eval(value.slice(1));
  }
  return value;
};

// Проверяет является ли переменная undefined или null
export const isDefined = <T>(value: T | undefined | null): value is T => {
  return <T>value !== undefined && <T>value !== null;
};

// Возвращает массив ключей объекта, сохраняя их тип
export const keys = <O extends Record<string, unknown>>(
  obj: O
): Array<keyof O> => {
  return Object.keys(obj) as Array<keyof O>;
};

// Функция для вычисления размеров при Ресайзе
export const matrix = ($target: IDom, $current: IDom): string[] => {
  const target = $target.idCell();
  const current = $current.idCell();

  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc: string[], col: number): string[] => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
};
