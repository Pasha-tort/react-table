import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeBordList } from '../../data/dataCell';
import { getRequest } from '../../hooks/useFetch';

type InitialState = {
	data: TypeBordList,
}

const initialState: InitialState = {
	data: [],
};

type ResponseDataBord = {
	items: TypeBordList,
}

export const getDataBord = createAsyncThunk(
	"/bord/getDataBord",
	async () => {
		const {request} = getRequest();
		return await request("/getAllData");
	}
);

const sliceBord = createSlice({
	name: "bord",
	initialState,
	reducers: {
		setDataBord: (state, action: PayloadAction<TypeBordList>) => {
			state.data = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(getDataBord.fulfilled, (state, action: PayloadAction<ResponseDataBord>) => 
				{state.data = action.payload.items}
			)
	}
});

const {reducer, actions: {setDataBord}} = sliceBord;
export {reducer, setDataBord};

// export const reducerBord = createReducer(initialState, builder => {
// 	builder
// 		.addCase(TypeReducerBorb.setData, (state, action: SetDataBordType) => {
// 			state.data = action.payload
// 		})
// 		.addDefaultCase(() => {})
// });