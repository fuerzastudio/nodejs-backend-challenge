export interface ICreatePostDto {
  title: string;
  body: string;
  tags: string[];
}

export interface IUpdatePostDto {
  title?: string;
  body?: string;
  tags?: string[];
}

export interface IFilterPostDto {
  page: number;
  limit: number;
}
