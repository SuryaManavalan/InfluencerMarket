export default function selectedCategoryId (state=null, action) {
    // console.log("action***** :" , action.payload);
    switch(action.type) {
        case 'select_category':
            return action.payload;
        default:
            return state;
    }
};