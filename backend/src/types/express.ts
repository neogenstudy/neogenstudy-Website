import 'express';

// extending the global Request interface to include a new property called validated. This property will contain the validated data for each part of the request (body, query, params, headers).
declare module 'express' {
  interface Request {
    validated?: {
      body?: any;
      query?: any;
      params?: any;
      headers?: any;
      cookies?: any;
    };
  }
}
