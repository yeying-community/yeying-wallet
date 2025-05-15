// import {ContentTypeEnum} from '@yeying-community/yeying-next'
import {LinkTypeEnum, ProviderCodeEnum, QuotaTypeEnum} from '@yeying-community/yeying-client-ts'
// import {ContentTypeEnum} from '@yeying-community/yeying-web3'
export interface session_create_param {
  name: string,
  templateId?: string,
  description?: string,
  uid?: string,
}
export interface SessionInfo {
  config: string;
  createdAt: string;
  description: string;
  name: string;
  owner: string;
  signature: string;
  uid: string;
  updatedAt: string;
}
export interface FactoryInfo {
    code?: ProviderCodeEnum;
    config?: string;
    createdAt?: string;
    name?: string;
    owner?: string;
    quotaLimit?: bigint;
    quotaType: QuotaTypeEnum;
    signature?: string;
    uid?: string;
    updatedAt?: string;
}
export interface LinkParam {
  namespaceId: string,
  name: string,
  hash: string,
  duration: number,
  type: LinkTypeEnum,
  visitors?: string[],
  description?: string,
}
export interface SendContent {
  data: string,
  type: any
  // type: ContentTypeEnum
}
export interface Index {
  // 索引名称
  name: string
  // 列名
  keyPath: string
  // 是否唯一
  unique: boolean
}
export interface CacheTable {
  // 表名
  name: string
  // 主键
  key: string
  // 主键是否自增
  autoIncrement?: boolean
  // 索引列
  indexes: Index[]
}
export interface MainConfig{
  onLoginSuccess?: Function,
  onRegisterSuccess?: Function,
}
