// deno-lint-ignore-file no-explicit-any
import { TMethodHTTP } from '../type/server.type.ts';

interface IRouterFile {
    prefix?: string;
    subdomain?: string;
    path: string;
}

interface IGroupConfig extends IGroup {
    routes: Array<IRouteConfig>;
}

interface IRouteConfig extends IRoute {
    group?: IGroupConfig
}

export interface IRouterConfig {
    strict: boolean;
    files: Array<IRouterFile>;
    routes?: Array<IRouteConfig>;
}

export interface IGroup {
    [key: string]: any[];
}
export interface IRoute {
    uri: string,
    name?: string,
    method?: TMethodHTTP | Array<TMethodHTTP>;
    middleware?: Array<any> | any;
    regexp?: string | string[];
    dependencies?: Array<string>;
    redirect?: boolean;
    domain?: string;
    action: any;
}

export interface IHistoryRoute {
    uri: string,
    name?: string,
    meta?: any;
}

export interface ISettingRoute {
    uri?: string;
    method?: TMethodHTTP | Array<TMethodHTTP>;
    middleware?: any | Array<any>;
    regexp?: string | string[];
    name?: string;
    redirect?: boolean;
}

export interface IHistory {
    previousRoutes: Array<IHistoryRoute>;
    currentRoute: Array<IHistoryRoute>;
    nextRoutes: Array<IHistoryRoute>;
}