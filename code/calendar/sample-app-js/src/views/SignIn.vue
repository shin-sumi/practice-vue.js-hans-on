<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <p class="display-1 py-12">サンプルアプリケーションにサインインする</p>
      <div>
        <v-btn
          width="300"
          large
          color="#1DA1F2"
          class="white--text text-none"
          @click="signIn"
          >Sign in with SNS1</v-btn
        >
      </div>
      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#DD2A7B"
          class="white--text text-none"
          @click="signIn"
          >Sign in with SNS2</v-btn
        >
      </div>
      <div class="mt-3">
        <v-btn
          width="300"
          large
          color="#3B5998"
          class="white--text text-none"
          @click="signIn"
          >Sign in with SNS3</v-btn
        >
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import { profileStore, profileMockData } from '@/store/profile';

export default defineComponent({
  setup(prop, context) {
    /*
     * サインイン
     */
    const signIn = () => {
      profileStore.profile = profileMockData;
      context.root.$router.push('/');
    };

    return {
      signIn,
    };
  },
});
</script>
