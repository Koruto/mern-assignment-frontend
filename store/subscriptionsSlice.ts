import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Subscription, SubscriptionsState } from "./types";

export const fetchSubscriptions = createAsyncThunk(
  "subscriptions/fetch",
  async () => {
    const res = await fetch('/api/subscriptions');
    return res.json();
  }
);

export const addSubscription = createAsyncThunk(
  "subscriptions/add",
  async (_, { dispatch }) => {
    await fetch('/api/subscriptions', { method: 'POST' });
    await dispatch(fetchSubscriptions());
  }
);

export const cancelSubscription = createAsyncThunk(
  "subscriptions/cancel",
  async (_, { dispatch }) => {
    await fetch('/api/subscriptions', { method: 'PATCH' });
    await dispatch(fetchSubscriptions());
  }
);

const initialState: SubscriptionsState = {
  data: [],
  loading: false,
  activeCount: 0
};

const subscriptionsSlice = createSlice({
  name: 'subscriptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.data = action.payload;
        state.activeCount = action.payload.filter((sub: Subscription) => sub.status === 'active').length;
      })
      .addMatcher(
        (action) => action.type?.startsWith('subscriptions/') && action.type?.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => {
          const type = action.type ?? '';
          return type.startsWith('subscriptions/') && (type.endsWith('/fulfilled') || type.endsWith('/rejected'));
        },
        (state) => {
          state.loading = false;
        }
      );
  }
});

export default subscriptionsSlice.reducer;
