import {selector} from "recoil";
import {courseState} from "../atoms/course.js";
export const isCourseLoading = selector({
    key: 'isCourseLoading',
    get: ({get})=>{
        const state = get(courseState)
        return state.isLoading
    }
})

export const courseDetails = selector({
    key: 'courseDetailState',
    get: ({get})=>{
        const state = get(courseState)
        return state.course
    }
})

export const courseTitle = selector({
    key: 'courseTitleState',
    get: ({get}) => {
        const state = get(courseState)
        if(state.course) return state.course.title
        return ""
    }
})

export const coursePrice = selector({
    key: 'coursePriceState',
    get: ({get}) =>{
        const state = get(courseState)
        if(state.course) return state.course.price
    }
})

export const courseImage = selector({
    key: 'courseImageState',
    get: ({get}) => {
        const state = get(courseState)
        if(state.course) return state.course.image
        return ""
    }
})