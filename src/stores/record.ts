import { ref } from 'vue'
import type { Bookself, HistoryType, Search_title,Login } from "@/typing"
import { defineStore } from 'pinia'
export const useRecordStore = defineStore("record", () => {
    const bookself = ref<Bookself[]>(JSON.parse(localStorage.getItem('BOOKSELF') || '0') || [])
    const already = ref<number[]>(JSON.parse(localStorage.getItem('ALREADY') || '0') || [])
    const historyComic = ref<HistoryType[]>(JSON.parse(localStorage.getItem('HISTORYCOMIC') || '0') || [])
    const searchTitle = ref<Search_title[]>(JSON.parse(localStorage.getItem('SEARCHTITLE') || '0') || [])
    const loginInfo=ref(JSON.parse(localStorage.getItem('token') || '0') || {})

    function setBookself(newBook: Bookself) {
        let b = bookself.value.findIndex((t: { id: string; }) => t.id == newBook.id)
        if (b == -1) {
            bookself.value.unshift(newBook)
        } else {
            bookself.value = bookself.value.filter((t: { id: string; }) => t.id != newBook.id)
        }
        localStorage.setItem("BOOKSELF", JSON.stringify(bookself.value));
    };

    function updateBook(a: Bookself) {
        let b = bookself.value.findIndex((t: { id: string; }) => t.id == a.id)
        if (b != -1) {
            let c = bookself.value.filter((t: { id: string; }) => t.id == a.id)
            bookself.value = bookself.value.filter((t: { id: string; }) => t.id != a.id)
            c = c.map((t: any) => {
                return {
                    ...t,
                    comic_id: a.comic_id,
                    lookTitle: a.lookTitle,
                    timeId: a.timeId
                }
            })
            bookself.value.unshift(...c)
            localStorage.setItem("BOOKSELF", JSON.stringify(bookself.value));
        }

    }
    function isConcern(a: string) {
        let b = bookself.value.findIndex((t: { id: string; }) => t.id == a);
        return b
    }
    function setAlready(id: number) {
        let b = already.value.findIndex(t => t == id)
        if (b == -1) {
            already.value.unshift(id)
            localStorage.setItem("ALREADY", JSON.stringify(already.value));
        }
    }
    function alread(a: number) {
        // console.log(a);
        let b = already.value.findIndex(t => t == a)
        if (b != -1) {
            return true
        } else {
            return false
        }
    }
    function setHistory(newHistory: HistoryType) {
        let b = historyComic.value.findIndex(t => t.id == newHistory.id)
        if (b != -1) {
            historyComic.value = historyComic.value.filter(t => t.id != newHistory.id)
        }
        historyComic.value.unshift(newHistory)
        localStorage.setItem("HISTORYCOMIC", JSON.stringify(historyComic.value));
    }
    function setSearchText(newText: Search_title) {
        searchTitle.value = searchTitle.value.filter(s => s.text != newText.text)
        searchTitle.value.unshift(newText)
        localStorage.setItem("SEARCHTITLE", JSON.stringify(searchTitle.value));
    }
    function delSearchText(id: number) {
        searchTitle.value = searchTitle.value.filter(s => s.id != id)
        localStorage.setItem("SEARCHTITLE", JSON.stringify(searchTitle.value));
    }
    function removeSearchText() {
        searchTitle.value = []
        localStorage.removeItem('SEARCHTITLE')
    }
    function cancellation(){
        
        loginInfo.value={}
        localStorage.removeItem('token')
        console.log(loginInfo.value);
    }
    function addUserName(info:Login){
        loginInfo.value=info
        localStorage.setItem("token", JSON.stringify(loginInfo.value));
    }
    return {
        bookself,
        historyComic,
        searchTitle,
        loginInfo,
        setBookself,
        setHistory,
        updateBook,
        isConcern,
        setAlready,
        alread,
        setSearchText,
        delSearchText,
        removeSearchText,
        cancellation,
        addUserName
    };
});
