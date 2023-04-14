<script setup lang="ts">
import router from '@/router';
import { usePostStore } from '@/stores/post';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import type { FormInst, FormRules } from 'naive-ui';
import { useMessage } from 'naive-ui';

const storePost = usePostStore();
const storeUser = useUserStore();
const message = useMessage()

const formRef = ref<FormInst | null>(null)

const postForm = ref({
    message: '',
    photo: ''
})

const rules: FormRules = {
    message: {
        required: true,
        message: 'Message is required',
        trigger: ['input', 'blur']
    },
}

const handleBack = () => {
    router.push({name: 'gallery'})
}

function savePost (e: MouseEvent) {
    e.preventDefault()
    formRef.value?.validate((errors) => {
        if (!errors) {
            storePost.addPost(storeUser.getUserDetail.name, postForm.value.message)
            router.push({name: 'gallery'})
        } else {
            message.error('Please enter message field.', {closable: true})
        }
    })
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
                action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
                :headers="{
                    'naive-info': 'hello!'
                }"
                :data="{
                    'naive-data': 'cool! naive!'
                }"
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