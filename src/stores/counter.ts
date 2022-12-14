import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Categories } from "@/typing"
export const useCounterStore = defineStore("counter", () => {
  const week_days = ref<string[]>([]);
  const categories = ref<Categories[]>([]);
  const theme = ref<Categories[]>([]);
  const myTheme = ref<Categories[]>(JSON.parse(localStorage.getItem('MY_THEME') || '0') || []);

  function getWeekdays(week: Array<string>) {
    week_days.value = week
  }
  function getTags(tags: Categories[]) {
    categories.value = tags
  }
  function moreTheme() {
    theme.value = categories.value.filter(c => !myTheme.value.some(f => f.tagId == c.tagId))
  }
  function removeTheme(a: Categories) {
    myTheme.value = myTheme.value.filter(({ tagId }) => tagId != a.tagId)
    theme.value.push(a)
    localStorage.setItem("BOOKSELF", JSON.stringify(myTheme.value));
  }
  function addTheme(a: Categories) {
    myTheme.value.push(a)
    theme.value = theme.value.filter(t => a.tagId != t.tagId);
    localStorage.setItem("MY_THEME", JSON.stringify(myTheme.value));
  }


  return { week_days, categories, theme, myTheme, getWeekdays, getTags, moreTheme, removeTheme ,addTheme};
});
