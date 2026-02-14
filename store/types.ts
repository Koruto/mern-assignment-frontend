export type Subscription = {
  id: string;
  status: 'active' | 'cancelled';
};

export type SubscriptionsState = {
  data: Subscription[];
  loading: boolean;
  activeCount: number;
};
