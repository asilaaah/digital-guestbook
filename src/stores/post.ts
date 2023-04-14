import type { Post } from "@/types/post";
import { defineStore } from "pinia";

export const usePostStore = defineStore({
    id: "postState",
    state: () => ({
        posts: [] as Post[]
    }),
    getters: {
        getPosts: (state) => state.posts
    },
    actions: {
        addPost(poster_name: string, message: string, photo?: string, poster_avatar?: string) {
            const post: Post = {
                id: Math.floor(Math.random() * 10000),
                poster: {
                    name: poster_name,
                    avatar: poster_avatar
                },
                message,
                photo
            }
            this.posts = [post, ...this.posts];
        },
        deletePost(id: number) {
            this.posts = this.posts.filter((post) => post.id !== id)
        } 
    },
    persist: {
        enabled: true
    }
}) 
