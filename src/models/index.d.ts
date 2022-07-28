import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Statuses {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED"
}



type OrdersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Orders {
  readonly id: string;
  readonly TrackingNo?: string | null;
  readonly ProductName?: string | null;
  readonly Quantity?: number | null;
  readonly Status?: Statuses | keyof typeof Statuses | null;
  readonly TotalAmount?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Orders, OrdersMetaData>);
  static copyOf(source: Orders, mutator: (draft: MutableModel<Orders, OrdersMetaData>) => MutableModel<Orders, OrdersMetaData> | void): Orders;
}