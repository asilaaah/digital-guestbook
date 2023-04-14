<script setup lang="ts">
import { Add } from '@vicons/carbon';
import { usePostStore } from '@/stores/post';
import { useUserStore } from '@/stores/user';
import router from '@/router';
import { Logout } from '@vicons/carbon';

const storePost = usePostStore();
const storeUser = useUserStore();

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
                IZATI & IZZAT
            </NText>
        </NH1>
        <NH3 class="title-text">
            <NText type="primary">
                Gallery
            </NText>
        </NH3>
    </NSpace>
    
    <NGrid x-gap="12" y-gap="12" cols="1" class="create-button">
        <NGridItem v-for="post in storePost.posts" :key="post.photo">
            <NCard>
                {{ post.message }}
                <template #footer>
                    <NSpace justify="space-between">
                        <NSpace>
                            <NAvatar
                                v-if="post.poster.avatar"
                                round
                                size="small"
                                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
                            />
                            <NText>
                                {{ post.poster.name }}
                            </NText>
                        </NSpace>
                        <NText>
                            21 Mar 03:04
                        </NText>
                    </NSpace>
                </template>
            </NCard>
        </NGridItem>
    </NGrid>

    <NEmpty description="No post yet." v-if="storePost.posts.length < 1">
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
</style>