import * as React from 'react';

type CustomContext = React.Context<unknown>;

export type createCustomContext = () => CustomContext;

export type ProviderProps<S, D> = {
  useValue: () => [S, D];
  customContext?: CustomContext;
};

export type ProviderType<S = unknown, D = unknown>
  = React.ComponentType<ProviderProps<S, D>>;

export const Provider: ProviderType;

type Opts = {
  customContext?: CustomContext;
};

export const useTrackedState: <S>(opts?: Opts) => S;

export const useTracked: <S, D>(opts?: Opts) => [S, D];

export const useDispatch: <D>(opts?: Opts) => D;

export const useSelector: <S, V>(
  selector: (state: S) => V,
  equalityFn?: (a: V, b: V) => boolean | Opts & { equalityFn?: (a: V, b: V) => boolean },
  opts?: Opts,
) => V;

export const createContainer: <S, D>(useValue: () => [S, D]) => {
  Provider: React.ComponentType;
  useTrackedState: () => S;
  useTracked: () => [S, D];
  useDispatch: () => D;
  useSelector: <V>(
    selector: (state: S) => V,
    equalityFn?: (a: V, b: V) => boolean,
  ) => V;
};
