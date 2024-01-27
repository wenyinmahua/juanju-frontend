/**
 * 用户类型
 */
export type UserType = {
    id : number;
    username: string;
    userAccount: string;
    avatarUrl: string;
    profile: string;
    gender: number;
    phone: string;
    email: string;
    major: string;
    userStatus: number;
    createTime: Date;
    userRole: number
    stuId: number;
    tags: string[];
};