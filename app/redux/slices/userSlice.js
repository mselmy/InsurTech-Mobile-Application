import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for user login
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, thunkAPI) => {
        try {
            // Make API call to login user
            const response = await fetch('https://insurtechapis.azurewebsites.net/api/Account/Login', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // Handle response
            if (!response.ok) {
                throw new Error('Email or password is incorrect');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, thunkAPI) => {
        try {
            // Make API call to register user
            const response = await fetch('https://insurtechapis.azurewebsites.net/api/Acount/RegisterCustomer', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Handle response
            if (!response.ok) {
                throw new Error('Registration failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

//initial state
const initialState = {
    id: 0,
    user: "",
    userName: "",
    emailAddress: "",
    password: "",
    nationalId: "",
    birthDate: "",
    phoneNumber: "",
    token: "",
    userType: 0,
    loading: false,
    error: null
};

// User slice
const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Reducer for login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Reducer for registration
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default userSlice.reducer;