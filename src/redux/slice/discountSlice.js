import { createSlice } from "@reduxjs/toolkit";

const res = [
    {
        "id": 3,
        "name": "BBBBB",
        "price": 185,
        "description": "2023-12-17 10:11:00\n2023-12-17 10:11:00",
        "categoryId": 4,
        "isDeleted": false,
        "createdAt": "2024-09-04T09:06:05.000Z",
        "updatedAt": "2024-11-07T16:20:52.000Z",
        "category": {
            "id": 4,
            "name": "Dresses"
        },
        "productImages": [
            {
                "image": "https://d30yhz7wp8chcb.cloudfront.net/61hKiAI3GKL._AC_SY741__35f0c927-bb23-4a6b-9f95-acedbd0f26c6.jpg"
            }
        ]
    },
    {
        "id": 19,
        "name": "Flowering Pixiemoss",
        "price": 65,
        "description": "2024-10-06 04:44:08",
        "categoryId": 1,
        "isDeleted": false,
        "createdAt": "2023-12-15T17:30:20.000Z",
        "updatedAt": "2024-09-03T00:15:38.000Z",
        "category": {
            "id": 1,
            "name": "Armwear"
        },
        "productImages": [
            {
                "image": "https://d30yhz7wp8chcb.cloudfront.net/352521847_804797474537064_3499556289340528869_n_82191580-6e94-4d35-927b-1919c2e35fdc.jpg"
            }
        ]
    },
    {
        "id": 21,
        "name": "Sierra Cryptantha",
        "price": 51,
        "description": "2024-06-30 23:39:37",
        "categoryId": 4,
        "isDeleted": false,
        "createdAt": "2024-02-20T05:58:28.000Z",
        "updatedAt": "2024-06-15T15:33:02.000Z",
        "category": {
            "id": 4,
            "name": "Dresses"
        },
        "productImages": [
            {
                "image": "http://dummyimage.com/157x100.png/cc0000/ffffff"
            }
        ]
    },
]

const initialState = {
  listDataSelect: res,
  productSelected: null,
  pageShow: 0,
  pageSelected: 0,
  orderApply: {
    orderBy: "",
    orderDirection: "",
  },
  activeDiscount: null,
};
export const discountSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setListDataSelect: (state, action) => {
        state.listDataSelect = action.payload;
    },
    setProductSelected: (state, action) => {
        state.productSelected = action.payload;
    },
    setCurrentPageShow: (state, action) => {
        state.pageShow = action.payload;
    },
    setCurrentPageSelected: (state, action) => {
        state.pageSelected = action.payload;
    },
    setActiveDiscount: (state, action) => {
        state.activeDiscount = action.payload;
    },
    setOrderApply: (state, action) => {
        return {
            ...state,
            orderApply: action.payload,
            pageShow: 0,
        }
    }
  },
  extraReducers: () => {},
});

// Export the reducer
export default discountSlice;

export const { setListDataSelect, setProductSelected, setCurrentPageShow, setCurrentPageSelected, setOrderApply, setActiveDiscount } = discountSlice.actions;
