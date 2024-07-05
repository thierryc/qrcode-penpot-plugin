export interface InitPluginEvent {
    type: 'init';
    content: {
      theme: string;
    };
  }
  
  export interface InsertSvgEvent {
    type: 'insert-svg';
    content: {
      svg: string;
      name: string;
    };
  }
  
  export interface InitPluginUIEvent {
    type: 'ready';
  }
  
  export type PluginUIEvent = InitPluginUIEvent | InsertSvgEvent;
  
  export interface ThemePluginEvent {
    type: 'theme';
    content: string;
  }
  
  export type PluginMessageEvent = InitPluginEvent | ThemePluginEvent;