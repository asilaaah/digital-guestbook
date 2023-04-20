<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'
import { useUserStore } from "../stores/user";
import { storage } from '@/firebase/init';
import { ref as FirebaseStorageRef, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useMessage } from 'naive-ui';

const handleBack = () => {
    router.push({name: 'gallery'})
}

const storeUser = useUserStore();
const formValue = ref({ 
    name: '',
    avatar: []
})

const submitForm = () => {
    storeUser.saveUser(formValue.value.name, avatarUrl.value);
    setTimeout(() => router.push({name: 'form'}), 1000)
}

const message = useMessage()
const avatarUrl = ref('');
const uploadAvatar = () => {
    const file = formValue.value.avatar[0]
    const storageRef = FirebaseStorageRef(storage, `avatar/${file['name']}`)
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
                avatarUrl.value = downloadURL
            })
        }
    )
}
</script>

<template>
    <NPageHeader @back="handleBack" subtitle="User Details"></NPageHeader>

    <NForm
        ref="formRef"
        label-placement="top"
    >
    <NH4 class="signin-form">
        <NText type="primary">
            To send message, tell us who you are.
        </NText>
    </NH4>
        <NFormItem label="Name">
            <NInput v-model:value="formValue.name" placeholder="Enter your name" />
        </NFormItem>
        <NFormItem label="Your avatar (Optional)">
            <NUpload
                v-model:file-list="formValue.avatar"
                :show-file-list="true"
                :custom-request="uploadAvatar"
            >
                <NButton v-model:value="formValue.avatar" type="primary">Upload File</NButton>
            </NUpload>
        </NFormItem>
        
        <NButton @click="submitForm" type="primary" class="submit-button">
            Save
        </NButton>
    </NForm>
</template>

<style scoped>
.signin-form {
    margin-top: 1rem;
}
.submit-button{
    width: 100%;
}
</style>