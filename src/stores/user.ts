import type { UserDetail } from "@/types/user";
import { defineStore } from "pinia";

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
        saveUser(name: string, avatar?: string) {
            const user: UserDetail = {
                token: (Math.random() + 1).toString(36).substring(7),
                name,
                avatar
            };
            this.user = user;
        },
        removeUser() {
            this.user = {} as UserDetail
        }
    },
    persist: {
        enabled: true
    }
})