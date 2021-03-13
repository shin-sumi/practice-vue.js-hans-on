<template>
  <div>
    <div :class="$style.inputContainer">
      <form :class="$style.inputArea" action="">
        <p>ユーザー登録</p>
        <label for="">ニックネーム</label>
        <input v-model="nickname" type="text" />
        <label for="">メールアドレス</label>
        <input v-model="email" type="email" />
      </form>
      <div :class="$style.previewArea">
        <p>プレビュー</p>
        <label for="">ニックネーム</label>
        <input :value="nickname" type="text" readonly />
        <label for="">メールアドレス</label>
        <input :value="email" type="email" readonly />
      </div>
      <div :class="$style.buttonArea">
        <button @click="saveUser">ユーザーを登録する</button>
      </div>
    </div>
    <div :class="$style.filterArea">
      <label for="">リストをニックネームで絞り込む</label>
      <input v-model="nicknameFilter" type="text" />
    </div>
    <div>
      <table>
        <thead>
          <tr>
            <th>ニックネーム</th>
            <th>メールアドレス</th>
          </tr>
        </thead>
        <tbody>
          <tr
            is="user-row"
            v-for="(user, index) in filteredUsers"
            :key="index"
            :user="user"
          ></tr>
        </tbody>
      </table>
      <div :class="$style.buttonWrapper">
        <button @click="displayUsers">ユーザーを表示する</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import userRowComponent, { User } from '@/components/UserRow.vue';

@Component({
  components: {
    'user-row': userRowComponent,
  },
})
export default class EditComponent extends Vue {
  private users: User[] = [];
  private nickname = '';
  private email = '';
  private nicknameFilter = '';

  private get filteredUsers() {
    return this.users.filter(user =>
      user.nickname.includes(this.nicknameFilter),
    );
  }

  private saveUser() {
    if (!this.nickname || !this.email) {
      alert('ニックネームとメールアドレスを両方入力してください。');
      return false;
    }
    const user: User = {
      nickname: this.nickname,
      email: this.email,
    };
    this.users.push(user);

    alert(
      'ニックネーム: ' +
        this.nickname +
        '、 メールアドレス: ' +
        this.email +
        'で登録しました。',
    );
  }

  private displayUsers() {
    let message = this.users.length + '人のユーザーが登録されています。';
    for (const user of this.users) {
      message += '\n' + user.nickname;
    }
    alert(message);
  }
}
</script>

<style module lang="scss">
.inputContainer {
  display: grid;
  grid-template-rows: 200px 50px;
  grid-template-columns: 300px 300px;
  grid-template-areas:
    'inputArea previewArea'
    'buttonArea buttonArea';
  grid-gap: 10px;
}
.inputArea {
  grid-area: inputArea;
  display: grid;
}
.previewArea {
  grid-area: previewArea;
  display: grid;
}
.buttonArea {
  grid-area: buttonArea;
  display: grid;
  justify-items: center;
  align-items: center;
}
.filterArea {
  display: grid;
  grid-template-columns: 300px 300px;
  grid-gap: 10px;
}
table {
  margin-top: 10px;
  width: 610px;
  border-collapse: collapse;
}
th,
td {
  width: 50%;
  padding-left: 5px;
  word-break: break-all;
}
.buttonWrapper {
  width: 610px;
  height: 50px;
  display: grid;
  justify-content: center;
  align-items: center;
}
</style>
