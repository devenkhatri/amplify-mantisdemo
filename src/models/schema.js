export const schema = {
    "models": {
        "Orders": {
            "name": "Orders",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "TrackingNo": {
                    "name": "TrackingNo",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "ProductName": {
                    "name": "ProductName",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "Quantity": {
                    "name": "Quantity",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "Status": {
                    "name": "Status",
                    "isArray": false,
                    "type": {
                        "enum": "Statuses"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "TotalAmount": {
                    "name": "TotalAmount",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "Orders",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "Statuses": {
            "name": "Statuses",
            "values": [
                "PENDING",
                "APPROVED",
                "REJECTED"
            ]
        }
    },
    "nonModels": {},
    "version": "e0cf606c274037f2b6be7ad104c91470"
};