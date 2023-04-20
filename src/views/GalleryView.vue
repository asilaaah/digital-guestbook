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
                <NGrid x-gap="12" :cols="post.photo ? 2 : 1">
                    <NGi>
                      <div>{{ post.message }}</div>
                    </NGi>
                    <NGi>
                      <div class="post-photo">
                        <NImage
                            width="100"
                            :src="post.photo"
                        />
                        </div>
                    </NGi>
                </NGrid>
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

.post-photo {
    float: right;
}

.post-details {
    font-size: smaller;
}
</style>