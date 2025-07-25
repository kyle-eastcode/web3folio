export interface NetWorth {
  total: number;
  breakdown: {
    [key: string]: number;
  };
}