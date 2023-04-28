<script setup lang="ts">
import { Add } from '@vicons/carbon';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { Logout } from '@vicons/carbon';
import { useCollection } from 'vuefire'
import { collection } from '@firebase/firestore';
import { db } from '@/firebase/init';
import type { Post } from '@/types/post';

const storeUser = useUserStore();

const allPosts = useCollection<Post>(collection(db, 'posts'));

const redirectFormPage = () => {
    router.push({name: 'form'})
}

const logout = () => {
    storeUser.removeUser();
}

const generateRandomNumber = () => {
    let x = Math.floor((Math.random() * 2) + 1);
    return x
}
</script>

<template>
    <NPageHeader v-if="storeUser.getUserToken">
        <template #extra>
            <NSpace>
                <NButton text circle @click="logout">
                    <NIcon color="black"><Logout /></NIcon>
                </NButton>
            </NSpace>
        </template>
    </NPageHeader>
    <NSpace align="center" vertical class="create-button">
        <NH1 class="title-text">
            <NText type="primary" :italic="true">
                Guestbook
            </NText>
        </NH1>
        <NH3 class="title-text">
            <NText type="primary">
                Gallery
            </NText>
        </NH3>
    </NSpace>
    
    <NGrid x-gap="12" y-gap="12" cols="1" class="create-button">
        <NGridItem v-for="post in allPosts.sort((a, b) => b.create - a.create)" :key="post.create">
            <NCard>
                <div v-if="generateRandomNumber() === 1">
                    <NGrid x-gap="12" :cols="post.photo ? 2 : 1">
                        <NGi>
                            <div :class="post.photo ? 'post-left' : ''">{{ post.message }}</div>
                        </NGi>
                        <NGi v-if="post.photo">
                            <div class="post-right">
                                <NImage
                                    width="100"
                                    :src="post.photo"
                                />
                            </div>
                        </NGi>
                    </NGrid>
                </div>

                <div v-else>
                    <NGrid x-gap="12" :cols="post.photo ? 2 : 1">
                        <NGi v-if="post.photo">
                            <div class="post-left">
                                <NImage
                                    width="100"
                                    :src="post.photo"
                                />
                            </div>
                        </NGi>
                        <NGi>
                            <div :class="post.photo ? 'post-right' : ''">{{ post.message }}</div>
                        </NGi>
                    </NGrid>
                </div>

                <template #footer>
                    <NSpace justify="space-between">
                        <NSpace>
                            <NAvatar
                                v-if="post.poster.avatar"
                                round
                                size="small"
                                :src="post.poster.avatar"
                            />
                            <NText class="post-details">
                                {{ post.poster.name }}
                            </NText>
                        </NSpace> 
                        <NText class="post-details">
                            {{ post.create.toDate().toLocaleTimeString([], {
                                month: "long",
                                day: "numeric",
                                hour: "2-digit", 
                                minute: "2-digit"}) 
                            }}
                        </NText>
                    </NSpace>
                </template>
            </NCard>
        </NGridItem>
    </NGrid>

    <NEmpty description="No post yet." v-if="allPosts.length < 1">
        <template #extra>
            <NButton @click="redirectFormPage" type="primary" secondary size="small">
                Say congratulations now. 
            </NButton>
        </template>
    </NEmpty>

    <NButton class="fab" @click="redirectFormPage" type="primary" circle size="large">
        <template #icon>
            <n-icon><Add /></n-icon>
        </template>
    </NButton>
    
</template>

<style scoped>
.title-text{
    margin-bottom: 0;
}
.create-button{
    margin-bottom: 1rem;
}

.fab {
    bottom: 15px;
    position: fixed;
    right: 15px;
}

.post-right {
    float: right;
}

.post-left {
    float: left;
}

.post-details {
    font-size: smaller;
}
</style>