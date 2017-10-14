import Actions from "../Actions";
import Store from "../Store";

const actionsMap = {};
let todoListStore = new Store('todolist');


const defaultState = {

    list: todoListStore.find()

};


actionsMap[Actions.UPDATE_ITEM_STATUS] = (state, action) =>
{
    // const id = action.itemID;
    // const list = state.list.map( item =>
    //     (item.id === id)
    //         ? {...item, done: !item.done}
    //         : item
    // );
    //
    // return {
    //     ...state,
    //     list
    // };
    const id = action.itemID;
    let elementToUpdate = todoListStore.find(id);
    if (elementToUpdate) {
        elementToUpdate.done = !elementToUpdate.done;
        todoListStore.update(id, elementToUpdate);

        return {
            ...state,
            list : todoListStore.find()
        };
    }

    return state;
};

actionsMap[Actions.ADD_NEW_TASK] = (state, action) =>
{
    let newTask =
    {
        text : action.text,
        done : false,
    };

    newTask = todoListStore.save(newTask);

    const list = [...state.list, newTask];

    return {
        ...state,
        list
    };
};

actionsMap[Actions.REMOVE_ITEM] = (state, action) =>
{
    const id = action.itemID;
    let elementToRemove = todoListStore.find(id);
    if (elementToRemove) {
        const removedItemID = todoListStore.remove(id);
        if (removedItemID !== -1) {
            return {
                ...state,
                list: todoListStore.find()
            };
        }
    }

    return state;
};

export default function todolistReducer(state = defaultState, action)
{
    let result = state;
    if (actionsMap[action.type]) {
        result = actionsMap[action.type](state, action);
    }

    return result;
}