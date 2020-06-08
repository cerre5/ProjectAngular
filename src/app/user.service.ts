import { Injectable } from '@angular/core';

interface user {
    username: string,
    uid: string
}

@Injectable()
export class UserService{
    private user: user

    constructor(){

    }

    setUser(user: user){
        this.user = user
    }

    getUID(){
        if(this.user){
        return this.user.uid
        } else{
            return false
        }
    }

    getUsername(){
        if(this.user){
            return this.user.username
        } else {
            return false
        }
    }
    
}