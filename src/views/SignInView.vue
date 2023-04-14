<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue'
import { useUserStore } from "../stores/user";
const storeUser = useUserStore();

const formValue = ref({ 
    name: storeUser.getUserDetail.name,
    avatar: storeUser.getUserDetail.avatar
})

const handleBack = () => {
    router.push({name: 'gallery'})
}

const submitForm = () => {
    storeUser.saveUser(formValue.value.name, formValue.value.avatar);
    router.push({name: 'form'})
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
                :headers="{
                    'naive-info': 'hello!'
                }"
                :data="{
                    'naive-data': 'cool! naive!'
                }"
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