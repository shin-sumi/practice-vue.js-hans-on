<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="6" class="text-center">
      <v-row class="py-12" align="center" justify="center">
        <span class="font-weight-thin title" v-text="`${today.year}/`" />
        <span class="pl-2 display-1" v-text="`${today.month}/${today.day}`" />
        <v-chip
          class="ml-2 pt-0 title"
          color="pink"
          text-color="white"
          v-text="displayWeekday"
        />
      </v-row>
      <div v-for="(event, index) in filteredEvents" :key="index">
        <v-chip
          class="mt-2"
          :color="getEventColor(event)"
          text-color="white"
          label
          v-text="event.name"
        />
      </div>
      <v-divider class="my-4" />
      <v-timeline v-if="displayTimeline" class="mb-12">
        <v-timelineItem
          v-for="(event, index) in filteredEventsHasTime"
          :key="index"
          class="text-left"
          right
          :color="getEventColor(event)"
        >
          <template v-slot:opposite>
            <span v-text="event.startTime" />
          </template>
          <span class="pl-4" v-text="event.name" />
        </v-timelineItem>
      </v-timeline>
      <v-row align="center" justify="center">
        <v-switch
          v-for="(sharedUser, index) in sharedUsers"
          :key="index"
          v-model="sharedUser.display"
          class="ml-4 pt-0"
          :color="sharedUser.themeColor"
          :label="sharedUser.nickname"
          hide-details
        />
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import {
  defineComponent,
  reactive,
  computed,
  toRefs,
} from '@vue/composition-api';
import { parseDate } from 'vuetify/lib/components/VCalendar/util/timestamp';
import { todayCalendarEventMockData } from '@/store/calendar-event';
import { sharedUserStore, getThemeColor } from '@/store/shared-user';

export default defineComponent({
  setup() {
    const state = reactive({
      // 本日の日付
      today: parseDate(new Date()),
      // カレンダーを共有しているユーザー
      sharedUsers: sharedUserStore.sharedUsers,
      // 本日の曜日
      displayWeekday: computed(() => {
        return ['日', '月', '火', '水', '木', '金', '土'][state.today.weekday];
      }),
      /**
       * 時間指定無しイベント
       * スイッチによってフィルタリング
       */
      filteredEvents: computed(() => {
        const displayUserIds = state.sharedUsers
          .filter((user) => user.display)
          .map((user) => user.userId);

        return todayCalendarEventMockData.filter(
          (event) => displayUserIds.includes(event.userId) && !event.startTime,
        );
      }),
      /**
       * 時間指定ありイベント
       * スイッチによってフィルタリング
       */
      filteredEventsHasTime: computed(() => {
        const displayUserIds = state.sharedUsers
          .filter((user) => user.display)
          .map((user) => user.userId);

        return todayCalendarEventMockData.filter(
          (event) => displayUserIds.includes(event.userId) && event.startTime,
        );
      }),
      // タイムラインを示すかどうかの値
      displayTimeline: computed(() => {
        return state.filteredEventsHasTime.length > 0;
      }),
    });

    /**
     * イベントの色を取得
     */
    const getEventColor = (event) => {
      if (!event) {
        return;
      }

      return getThemeColor(event.userId);
    };

    return {
      ...toRefs(state),
      getEventColor,
    };
  },
});
</script>
