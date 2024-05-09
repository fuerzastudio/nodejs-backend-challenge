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

export interface ICreateLoginDto {
  email: string;
  password: string;
}

export interface ILoginDto {
  email: string;
  password: string;
}
