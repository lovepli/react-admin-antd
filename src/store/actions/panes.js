// panes - actions
import * as types from '../constants/ActionTypes'

// export const addPane = panes => (dispatch, getState) => {
//     dispatch({
//         type: types.ADD_PANE
//     })
// }

export const addPane = addObj => ({
    type: types.ADD_PANE,
    addObj
})

// export const removePane = panes => (dispatch, getState) => {
//     dispatch({
//         type: types.REMOVE_PANE
//     })
// }

// 参数: 当前激活 tabs面板的 Key, 目标 tabs面板的 Key
export const removePane = (activeKey, targetKey) => ({
    type: types.REMOVE_PANE,
    activeKey,
    targetKey
})