import {UserType} from "./user";

/**
 * 队伍类型
 */
export type TeamType = {
    id : number;
    name: string;
    userId: string;
    avatarUrl: string;
    description: string;
    maxNum: number;
    expireTime: Date;
    category: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin?:boolean;
    hasJoinNum?:number;
};