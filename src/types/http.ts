export interface Error<T = any> {
  message: string;
  statusCode: string;
  timestamp: string;
  path: string;
  data: T;
}

export interface MutateSuccess {
  success: boolean;
  message: string;
}

export interface List<T> {
  results: T[];
  pagination: {
    currentPage: number;
    currentSize: number;
    totalCount: number;
    totalPage: number;
  };
}

export interface Data<T> {
  data: T;
  success: boolean;
}
