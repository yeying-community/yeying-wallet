import 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $t: (key: string, ...args: any[]) => string;
  }
}