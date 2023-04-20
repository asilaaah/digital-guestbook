import type { Post } from "@/types/post";
import { defineStore } from "pinia";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase/init";

const colRefPosts = collection(db, "posts");

export const usePostStore = defineStore({
    id: "postState",
    state: () => ({
        posts: [] as Post[]
    }),
    getters: {
        getPosts: (state) => state.posts
    },
    actions: {
        async addPost(poster_name: string, message: string, photo?: string, poster_avatar?: string) {
            const post: Post = {
                poster: {
                    name: poster_name,
                    avatar: poster_avatar ?? ''
                },
                message,
                photo: photo ?? '',
                create: serverTimestamp()
            }
            this.posts = [post, ...this.posts];
            await addDoc(colRefPosts, post);
        }
    },
    persist: {
        enabled: true
    }
}) 
