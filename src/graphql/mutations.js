/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createOrders = /* GraphQL */ `
  mutation CreateOrders(
    $input: CreateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    createOrders(input: $input, condition: $condition) {
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
export const updateOrders = /* GraphQL */ `
  mutation UpdateOrders(
    $input: UpdateOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    updateOrders(input: $input, condition: $condition) {
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
export const deleteOrders = /* GraphQL */ `
  mutation DeleteOrders(
    $input: DeleteOrdersInput!
    $condition: ModelOrdersConditionInput
  ) {
    deleteOrders(input: $input, condition: $condition) {
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
