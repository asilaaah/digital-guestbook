<script setup lang="ts">
import router from '@/router';
import { usePostStore } from '@/stores/post';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { useMessage } from 'naive-ui';
import { storage } from '@/firebase/init'
import { ref as FirebaseStorageRef, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const storePost = usePostStore();
const storeUser = useUserStore();

const postForm = ref({
    message: '',
    photo: []
})
const rules: FormRules = {
    message: {
        required: true,
        message: 'Message is required',
        trigger: ['input', 'blur']
    },
}
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const savePost = (e: MouseEvent) => {
    e.preventDefault()
    formRef.value?.validate((errors) => {
        if (!errors) {
            storePost.addPost(storeUser.getUserDetail.name, postForm.value.message, photoUrl.value, storeUser.getUserDetail.avatar)
            setTimeout(() => router.push({name: 'gallery'}), 1000)
        } else {
            message.error('Please enter message field.', {closable: true})
        }
    })
}

const handleBack = () => {
    router.push({name: 'gallery'})
}

const photoUrl = ref('');
const onUpload = () => {
    const file = postForm.value.photo[0]
    const storageRef = FirebaseStorageRef(storage, `${file['name']}`)
    const metadata = {
        contentType: `${file['type']}`,
    };
    const uploadTask = uploadBytesResumable(storageRef, file['file'], metadata)
    uploadTask.on("state_changed",
        (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            console.log(progress)
        },
        (error) => {
            message.error(`${error}`)
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                photoUrl.value = downloadURL
            })
        }
    )
}
</script>

<template>
    <NPageHeader @back="handleBack" subtitle="Cancel"></NPageHeader>

    <NForm
        class="post-form"
        ref="formRef"
        label-placement="top"
        :model="postForm"
        :rules="rules"
    >
        <NFormItem label="Add Photo">
            <NUpload
                v-model:file-list="postForm.photo"
                :show-file-list="true"
                :custom-request="onUpload"
            >
                <NButton type="primary">Upload File</NButton>
            </NUpload>
        </NFormItem>

        <NFormItem label="Message" path="message">
            <NInput
                v-model:value="postForm.message"
                placeholder="Write your message"
                type="textarea"
                :autosize="{
                    minRows: 3,
                    maxRows: 5
                }"
            />
        </NFormItem>
        
        <NButton @click="savePost" type="primary" class="submit-button">
            Send
        </NButton>
    </NForm>
</template>

<style scoped>
.submit-button{
    width: 100%;
    margin-top: 1rem;
}
.post-form {
    margin-top: 1rem;
}
</style>