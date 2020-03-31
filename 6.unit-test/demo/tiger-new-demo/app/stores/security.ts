import { observable, action, computed } from 'mobx';

interface IUser {
    channel: 'B' | 'C'; // 来源渠道
    level: 1 | 2 | 3; // 等级
    token: string; // token凭证
}

export class Security {
    @observable.shallow
    user: IUser | null = null; // 用户状态

    @computed
    get isLogin() {
        return !!this.user?.token;
    }

    @action
    setUser(user: IUser | null) {
        this.user = user;
    }
}

export default new Security();
