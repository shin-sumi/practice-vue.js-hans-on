<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="4" class="text-center">
      <p class="display-1 py-12">プロフィール</p>
      <v-row>
        <v-col cols="12" md="4">
          <v-avatar :color="profile.themeColor" size="72">
            <span class="white--text body-2" v-text="profile.nickname" />
          </v-avatar>
        </v-col>
        <v-col>
          <v-file-input
            accept="image/png, image/jpg, image/bmp"
            placeholder="画像を選択してください"
            prepend-icon="photo_camera"
            label="アバター"
            @change="saveFileContent"
          />
        </v-col>
      </v-row>
      <label class="v-label theme--light">テーマカラー*</label>
      <v-color-picker
        v-model="newThemeColor"
        class="mx-auto mb-4 mt-2"
        hide-canvas
        show-swatches
        swatches-max-height="120px"
      />
      <v-btn small rounded color="primary" @click="saveThemeColor">
        テーマカラーを決定する
      </v-btn>
      <v-text-field
        v-model="profile.userName"
        readonly
        label="ユーザー名*"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editUserName"
      />
      <v-dialog
        v-model="isOpenEditUserNameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field v-model="newUserName" label="ユーザー名*" />
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeEditUserNameDialog">
              キャンセル
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveUserName">
              保存する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.nickname"
        readonly
        label="ニックネーム*"
        append-outer-icon="edit"
        class="mt-4"
        @click:append-outer.stop="editNickname"
      />
      <v-dialog
        v-model="isOpenEditNicknameDialog"
        max-width="600"
        open-on-hover
      >
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-text-field v-model="newNickname" label="ニックネーム*" />
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="blue darken-1" text @click="closeEditNicknameDialog">
              キャンセル
            </v-btn>
            <v-btn color="blue darken-1" text @click="saveNickname">
              保存する
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-text-field
        v-model="profile.mailAddress"
        readonly
        label="メールアドレス"
      />
      <small class="float-left">*必須フィールドを示します</small>
    </v-col>
  </v-row>
</template>

<script>
import { defineComponent, reactive, toRefs } from '@vue/composition-api';
import {
  profileStore,
  updateThemeColor,
  upadateUserName,
  upadateNickname,
} from '@/store/profile';

export default defineComponent({
  setup() {
    const state = reactive({
      // プロフィール
      profile: profileStore.profile,
      // 新しいユーザー名
      newUserName: null,
      // 新しいニックネーム
      newNickname: null,
      // 新しいテーマカラー
      newThemeColor: profileStore.profile.themeColor,
      // ユーザー名編集ダイアログをオープンするかどうかを示す値
      isOpenEditUserNameDialog: false,
      // ニックネーム編集ダイアログをオープンするかどうかを示す値
      isOpenEditNicknameDialog: false,
    });
    /**
     * アバターを保存します。
     * @param file アバターの画像ファイル
     */
    // eslint-disable-next-line no-unused-vars
    const saveFileContent = (file) => {};
    /**
     * テーマカラーを保存します。
     */
    const saveThemeColor = () => {
      updateThemeColor(state.newThemeColor);
    };
    /**
     * ユーザー名の編集を開始します。
     */
    const editUserName = () => {
      state.newUserName = state.profile.userName;
      state.isOpenEditUserNameDialog = true;
    };
    /**
     * ユーザー名の編集を終了します。
     */
    const closeEditUserNameDialog = () => {
      state.isOpenEditUserNameDialog = false;
    };
    /**
     * ユーザー名を保存します。
     */
    const saveUserName = () => {
      if (state.newUserName) {
        upadateUserName(state.newUserName);
      }
      state.isOpenEditUserNameDialog = false;
    };
    /**
     * ニックネームの編集を開始します。
     */
    const editNickname = () => {
      state.newNickname = state.profile.nickname;
      state.isOpenEditNicknameDialog = true;
    };
    /**
     * ニックネームの編集を終了します。
     */
    const closeEditNicknameDialog = () => {
      state.isOpenEditNicknameDialog = false;
    };
    /**
     * ニックネームを保存します。
     */
    const saveNickname = () => {
      if (state.newNickname) {
        upadateNickname(state.newNickname);
      }
      state.isOpenEditNicknameDialog = false;
    };

    return {
      ...toRefs(state),
      saveFileContent,
      saveThemeColor,
      editUserName,
      closeEditUserNameDialog,
      saveUserName,
      editNickname,
      closeEditNicknameDialog,
      saveNickname,
    };
  },
});
</script>
