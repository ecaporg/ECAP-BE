import { StudentLPEnrollmentEntity } from '@/enrollment/entities/student-enrollment.entity';

import { BaseFilterDto } from '../dto/base-filter.dto';

/* eslint-disable @typescript-eslint/no-unused-vars */
export type NestedObjectToDotNotation<
  T,
  Depth extends number[] = [0, 1, 2, 3, 4],
> = Depth['length'] extends 0
  ? never
  : T extends Date
    ? never
    : T extends Array<infer U>
      ? {
          [K in keyof U]: K extends string
            ? K | `${K}.${NestedObjectToDotNotation<U[K], Tail<Depth>>}`
            : never;
        }[keyof U]
      : T extends object
        ? {
            [K in keyof T]: K extends string
              ? K | `${K}.${NestedObjectToDotNotation<T[K], Tail<Depth>>}`
              : never;
          }[keyof T]
        : never;

type Tail<T extends any[]> = T extends [infer _, ...infer Rest] ? Rest : never;

export type RecordDotNotationAndString<T extends object> = Partial<
  Record<NestedObjectToDotNotation<T>, any>
>;

export type RecordStringAndDotNotation<T extends object> = Record<
  string,
  NestedObjectToDotNotation<T>
>;

type Split<
  S extends string,
  D extends string,
> = S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];

type NestedObjectFromPath<T extends string[], V = any> = T extends [
  infer First extends string,
  ...infer Rest extends string[],
]
  ? { [K in First]: NestedObjectFromPath<Rest, V> }
  : any;

export type NestedObjectFromDotNotation<
  T extends string,
  V = any,
> = NestedObjectFromPath<Split<T, '.'>, V>;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

export type UnnestObjectFromDotNotation<T extends Record<string, any>> =
  UnionToIntersection<
    {
      [K in keyof T]: K extends string
        ? NestedObjectFromDotNotation<K, T[K]>
        : never;
    }[keyof T]
  >;

// Example usage:
type Test = UnnestObjectFromDotNotation<{
  'key.key.key': number;
  'key2.key3': number;
}>; // { key: { key: { key: number } }; key2: { key3: number } }
