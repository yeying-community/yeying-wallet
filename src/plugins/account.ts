import {IdentityManager, ServiceManager,} from '@yeying-community/yeying-next'
import {ServiceCodeEnum} from '@yeying-community/yeying-client-ts'
import {IdentityCodeEnum, IdentityTemplate, NetworkTypeEnum} from '@yeying-community/yeying-web3'
import type {MainConfig} from './types'

let configInfo:MainConfig = {}

interface SelectOptions {
  label: string;
  value: IdentityCodeEnum | string | null | number;
}
export const setConfig = (config:any) => {
  configInfo = config
}
class $account {
  public codeList: SelectOptions[];
  public networkList: SelectOptions[];
  public manager: IdentityManager;
  constructor() {
    this.manager = new IdentityManager()
    this.codeList = [
      {label:'请选择',value: null },
      {label:"个人",value:IdentityCodeEnum.IDENTITY_CODE_PERSONAL,},
      {label:"组织",value:IdentityCodeEnum.IDENTITY_CODE_ORGANIZATION,},
      {label:"服务",value:IdentityCodeEnum.IDENTITY_CODE_SERVICE,},
      {label:"应用",value:IdentityCodeEnum.IDENTITY_CODE_APPLICATION,},
      {label:"资产",value:IdentityCodeEnum.IDENTITY_CODE_ASSET,},
    ]
    this.networkList = [
      {value: null,label: '请选择' },
      {label:"夜莺网络",value:NetworkTypeEnum.NETWORK_TYPE_YEYING,}
    ]
    // this.mail = new MailProvider()
    console.log("account:",this.manager)
  }

  // 获取指定 DID 对应的区块链地址。
  public async getBlockAddress(did: string) {
    return await this.manager.getBlockAddress(did)
  }

  // 导出身份信息。
  public async exportIdentity(did:string){
    const identity = await this.manager.exportIdentity(did);
    return identity
  }

  // 获取代理信息
  /**
   * @param code 代理服务类型
   *
   */
  public async getServicesByCode(code: ServiceCodeEnum){
    const did = this.getActiveDid()||''
    const address = await this.getBlockAddress(did)
    const serviceManager = new ServiceManager(address);
    return await serviceManager.listServiceByCode(code)
  }

  // 登录
  public async login(did: string,password: string){
    const account = await this.manager.login(did,password)
    if(configInfo.onLoginSuccess){
      configInfo.onLoginSuccess(account)
    }
    return account
  }

  // 注册:创建一个新的身份，并在区块链上生成地址。
  public async createIdentity(password:string, pamras:any){
    const template = {
      network: pamras.network,
      name: pamras.name,
      avatar: pamras.avatar,
      code: pamras.code,}
    const newIdentity = await this.manager.createIdentity(password, template as IdentityTemplate);
    if(configInfo.onCreateSuccess){
      configInfo.onCreateSuccess(newIdentity)
    }
    return newIdentity
  }
  // 修改用户信息
  public async updateIdentity(template: Partial<IdentityTemplate>, password?: string){
    const info = await this.getActiveIdentity()
    if(info){
      const did = this.getActiveDid() || ''
      return this.manager.updateIdentity(did, template, password||'')
    }
    console.log("userinfo--->", info)
  }
  // 登录导入身份信息。
  public async importIdentity(code:string, pwd:string){
    const Identity = await this.manager.importIdentity(code, pwd)
    return Identity
  }
  // 获取当前激活的账号信息。
  public async getActiveIdentity(){
    const activeAccount = await this.manager.getActiveIdentity()
    return activeAccount
  }
  // 获取当前激活的账号信息。
  public getActiveDid(){
    const did = this.manager.getActiveDid()
    return did
  }
  // 根据did判断是否登录
  public isLogin(did: string) {
    const check = this.manager.isLogin(did)
    return !!check
  }
  // 有did判断用户信息,再判断登录过期
  public checkLogin() {
    const did = this.getActiveDid()
    let isLogin = false
    if(did){
      try{
        // await $account.login(did)
        isLogin = this.isLogin(did)
      }catch(e){
        console.error('login failed:',e)
      }
      if(isLogin){
        return true
      }
    }
    return false
  }
  public async logout(){
    const account = await this.manager.logout()
    return account
  }
}
export default new $account()
