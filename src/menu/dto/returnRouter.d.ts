interface RouteMeta {
  title: string;
  icon?: string | null;
  rank: number | null;
}

export interface ReturnRoute {
  path: string | null;
  meta: RouteMeta;
  children?: ReturnRoute[];
}
