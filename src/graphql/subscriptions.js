/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateOrders = /* GraphQL */ `
  subscription OnCreateOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onCreateOrders(filter: $filter) {
      id
      TrackingNo
      ProductName
      Quantity
      Status
      TotalAmount
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateOrders = /* GraphQL */ `
  subscription OnUpdateOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onUpdateOrders(filter: $filter) {
      id
      TrackingNo
      ProductName
      Quantity
      Status
      TotalAmount
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteOrders = /* GraphQL */ `
  subscription OnDeleteOrders($filter: ModelSubscriptionOrdersFilterInput) {
    onDeleteOrders(filter: $filter) {
      id
      TrackingNo
      ProductName
      Quantity
      Status
      TotalAmount
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
