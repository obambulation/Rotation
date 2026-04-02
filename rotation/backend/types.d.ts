// Source - https://stackoverflow.com/a/62631740
// Posted by Bruno Bastos, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-02, License - CC BY-SA 4.0

declare namespace Express {
  export interface Request {
      user: any;
  }
  export interface Response {
      user: any;
  }
}
