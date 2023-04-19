import type { UserDetail } from "@/types/user";
import { defineStore } from "pinia";
import { collection, addDoc } from "firebase/firestore"
import db from '@/firebase/init'

const colRefUsers = collection(db, "users");

export const useUserStore = defineStore({
    id: "userState",
    state: () => ({
        user: {} as UserDetail
    }),
    getters: {
        getUserDetail: (state) => state.user,
        getUserToken: (state) => state.user.token
    },
    actions: {
        async saveUser(name: string, avatar?: string) {
            const user: UserDetail = {
                token: (Math.random() + 1).toString(36).substring(7),
                name,
                avatar: avatar ?? ''
            };
            this.user = user;
            await addDoc(colRefUsers, this.user)
        },
        removeUser() {
            this.user = {} as UserDetail
        }
    },
    persist: {
        enabled: true
    }
})