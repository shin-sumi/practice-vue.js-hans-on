<template>
  <tr>
    <td>
      <span v-if="!editable" @click="edit()">{{ user.nickname }}</span>
      <input
        v-show="editable"
        ref="editNickname"
        v-model="user.nickname"
        @blur="editable = false"
      />
    </td>
    <td>{{ user.email }}</td>
  </tr>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

export interface User {
  nickname: string;
  email: string;
}

const userValidator = (user: User) => {
  if (!user || !user.nickname || !user.email) {
    return false;
  }
  return true;
};

@Component
export default class UserRowComponent extends Vue {
  @Prop({ required: true, validator: userValidator })
  private user!: User;

  private editable = false;

  private edit() {
    this.editable = true;
    this.$nextTick(() => {
      (this.$refs.editNickname as HTMLFormElement).focus();
    });
  }
}
</script>

<style module>
td input {
  width: 95%;
}
</style>
