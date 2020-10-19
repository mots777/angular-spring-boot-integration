export interface UserProfile {
    userId: string;
	userName: string;
	userPassword: string;
	userMobile: string;
	userAddedDate: Date;
	
// 	constructor () {
//         this.userId = '';
//         this.userName = '';
//         this.userPassword = '';
//         this.userMobile = '';
//         this.userAddedDate = null;
// 	}
}

export interface User extends UserProfile {
    firstName: string;
    lastName: string;
    userRole: string;
}