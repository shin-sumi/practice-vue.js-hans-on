import '@/plugins/composition-api';
import { reactive } from '@vue/composition-api';
import { update } from '@/store/shared-user';

export const profileMockData = {
  userId: '66006b29-727e-4ed8-a3c8-95d4438f66d4',
  userName: 'naminami',
  nickname: '波平',
  themeColor: '#4caf50',
  hasAvatar: false,
  mailAddress: 'namihei@example.com',
};

export const profileStore = reactive({ profile: null });

/**
 * ユーザー名を更新
 * @param userName ユーザー名
 */
export const upadateUserName = (userName) => {
  profileStore.profile.userName = userName;
  update(profileStore.profile);
};

/**
 * ニックネームを更新
 * @param nickname ニックネーム
 */
export const upadateNickname = (nickname) => {
  profileStore.profile.nickname = nickname;
  update(profileStore.profile);
};

/**
 * テーマカラーを更新
 * @param themeColor テーマカラー
 */
export const updateThemeColor = (themeColor) => {
  profileStore.profile.themeColor = themeColor;
  update(profileStore.profile);
};
