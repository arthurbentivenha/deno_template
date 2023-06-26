export interface RouterInterface {
  path?: string;
  roles?: string;
  requestMethod: 'get' | 'post' | 'delete' | 'options' | 'put';
  methodName: string;
}