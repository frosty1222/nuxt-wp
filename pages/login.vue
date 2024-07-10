<script setup>
import { NButton, NForm, NFormItem, NIcon, NInput, useMessage } from "naive-ui";

const { restAPI } = useApi();
const userStore = useUserStore();
const message = useMessage();
const formRef = ref(null);
const formValue = reactive({
  username: "",
  password: "",
});

const rules = {
  username: {
    required: true,
    message: "Trường dữ liệu bắt buộc!",
    trigger: ["input", "blur"],
  },
  password: {
    required: true,
    message: "Trường dữ liệu bắt buộc!",
    trigger: ["input", "blur"],
  },
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const body = {
    username: formValue.username.trim(),
    password: formValue.password.trim(),
  };
  formRef.value.validate(async (errors) => {
    if (!errors) {
      const { data: resLogin, error } = await restAPI.user.login({
        body,
      });
      if (error.value) return;
      if (resLogin && Object.keys(resLogin._rawValue).length > 0) {
        const data = resLogin.value.user || {};
        const userInfo = { accessToken: resLogin._rawValue.jwt_token };
        localStorage.setItem('jwt_token',resLogin._rawValue.jwt_token)
        message.success(resLogin?.value.message || "Đăng  nhập thành công");
        userStore.setUserInfo(userInfo);
        await navigateTo('/posts');
      } else message.error("Đăng nhập thất bại!");
    }
  });
};

definePageMeta({
  layout: false,
});
</script>

<template>
  <div class="container">
    <div
      class="login"
    >
      <NForm
        ref="formRef"
        :model="formValue"
        :rules="rules"
        @keyup.enter="handleSubmit"
        size="large"
        class="px-4 py-6"
      >
        <NFormItem
          ><h1 id="heading">
            Đăng nhập CMS
          </h1>
        </NFormItem>

        <NFormItem path="username">
          <NInput v-model:value="formValue.username" placeholder="Tên tài khoản">
          </NInput>
        </NFormItem>
        <NFormItem path="password" class="-mt-6">
          <NInput
            v-model:value="formValue.password"
            show-password-on="click"
            type="password"
            placeholder="Mật khẩu"
          >
          </NInput>
        </NFormItem>
        <NFormItem>
          <NButton @click="handleSubmit" class="w-full">
            <span class="font-500">Đăng nhập</span>
          </NButton>
        </NFormItem>
      </NForm>
    </div>
  </div>
</template>
<style lang="scss" scoped>
   .container{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      .login{
        width: 400px;
        box-shadow: 0.1px 0.1px 10px 1px #000;
        padding:50px 10px;
        border-radius: 10px;
        #heading{
          text-align: center;
          width: 100%;
        }
      }
   }
</style>