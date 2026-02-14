'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../store';
import {
  fetchSubscriptions,
  addSubscription,
  cancelSubscription,
} from '../store/subscriptionsSlice';
import { RootState } from '../store';
import { Subscription } from '../store/types';

export const SubscriptionsTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, activeCount } = useSelector(
    (state: RootState) => state.subscriptions
  );

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const list: Subscription[] = data ?? [];

  return (
    <>
      <h3>Active subscriptions: {activeCount}</h3>
      <p>
        <button
          type="button"
          onClick={() => dispatch(addSubscription())}
          disabled={loading}
        >
          Add subscription
        </button>
        {' '}
        <button
          type="button"
          onClick={() => dispatch(cancelSubscription())}
          disabled={loading || activeCount === 0}
        >
          Cancel (first active only)
        </button>
        {' '}
        <button
          type="button"
          onClick={() => dispatch(fetchSubscriptions())}
          disabled={loading}
        >
          Refresh
        </button>
        {loading && <span style={{ marginLeft: 8 }} aria-busy>Updating…</span>}
      </p>
      <p className="text-sm opacity-80">
        API limitation: cancel always removes the first active subscription, specific subscription cannot be cancelled.
      </p>
      <ul>
        {list.length === 0 && loading ? (
          <li>Loading…</li>
        ) : (
          list.map((row) => (
            <li key={row.id}>{row.status}</li>
          ))
        )}
      </ul>
    </>
  );
};
