import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
    Box,
    Link,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Button,
    CircularProgress,
    Grid
} from '@mui/material';
import { DiffFilled } from '@ant-design/icons';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

//AWS imports
import { Amplify, API, graphqlOperation, Analytics } from 'aws-amplify';
import * as subscriptions from '../../graphql/subscriptions';
import { listOrders } from '../../graphql/queries';
import { DataStore } from '@aws-amplify/datastore';
import { Orders } from '../../models';

import awsExports from '../../aws-exports';

Amplify.configure(awsExports);

async function fetchOrders() {
    try {
        const orderData = await API.graphql(graphqlOperation(listOrders));
        const orders = orderData.data.listOrders.items;
        console.log('***** orders ', orders);
        return orders;
    } catch (err) {
        console.log('error fetching orders', err);
    }
}

function createData(trackingNo, name, fat, carbs, protein) {
    if (carbs == 'APPROVED') carbs = 1;
    else if (carbs == 'PENDING') carbs = 0;
    else if (carbs == 'REJECTED') carbs = 2;
    return { trackingNo, name, fat, carbs, protein };
}

// Subscribe to updation of Orders
// const subscription = API.graphql(graphqlOperation(subscriptions.onUpdateOrders)).subscribe({
//     next: ({ provider, value }) => console.log({ provider, value }),
//     error: (error) => console.warn(error)
// });

// // Stop receiving data updates from the subscription
// subscription.unsubscribe();

// Hub.listen('api', (data) => {
//     const { payload } = data;
//     if (payload.event === CONNECTION_STATE_CHANGE) {
//         const connectionState = payload.data.connectionState;
//         console.log(connectionState);
//     }
// });

// 1 - Approved, 0 - Pending, 2 - Rejected

// const rows1 = [
//     createData(84564564, 'Camera Lens', 40, 2, 40570),
//     createData(98764564, 'Laptop', 300, 0, 180139),
//     createData(98756325, 'Mobile', 355, 1, 90989),
//     createData(98652366, 'Handset', 50, 1, 10239),
//     createData(13286564, 'Computer Accessories', 100, 1, 83348),
//     createData(86739658, 'TV', 99, 0, 410780),
//     createData(13256498, 'Keyboard', 125, 2, 70999),
//     createData(98753263, 'Mouse', 89, 2, 10570),
//     createData(98753275, 'Desktop', 185, 1, 98063),
//     createData(98753291, 'Chair', 100, 0, 14001)
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
    {
        id: 'trackingNo',
        align: 'left',
        disablePadding: false,
        label: 'Tracking No.'
    },
    {
        id: 'name',
        align: 'left',
        disablePadding: true,
        label: 'Name'
    },
    {
        id: 'fat',
        align: 'right',
        disablePadding: false,
        label: 'Total Order'
    },
    {
        id: 'carbs',
        align: 'left',
        disablePadding: false,
        label: 'Status'
    },
    {
        id: 'protein',
        align: 'right',
        disablePadding: false,
        label: 'Total Amount'
    }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

OrderTableHead.propTypes = {
    order: PropTypes.string,
    orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
    let color;
    let title;

    switch (status) {
        case 0:
            color = 'warning';
            title = 'Pending';
            break;
        case 1:
            color = 'success';
            title = 'Approved';
            break;
        case 2:
            color = 'error';
            title = 'Rejected';
            break;
        default:
            color = 'primary';
            title = 'None';
    }

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Dot color={color} />
            <Typography>{title}</Typography>
        </Stack>
    );
};

OrderStatus.propTypes = {
    status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
    const [order] = useState('asc');
    const [orderBy] = useState('trackingNo');
    const [selected] = useState([]);

    const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchData() {
        const orders = [];
        const orderData = await fetchOrders();
        console.log('**** orderData', orderData);
        orderData &&
            orderData.map((order) => {
                if (!order._deleted) {
                    const processedOrder = createData(order.TrackingNo, order.ProductName, order.Quantity, order.Status, order.TotalAmount);
                    orders.push(processedOrder);
                }
            });
        setRows(orders);
        setLoading(false);
    }

    function performAnalytics() {
        //Session Tracking
        Analytics.autoTrack('session', {
            // REQUIRED, turn on/off the auto tracking
            enable: true
        });
        //Page View Tracking
        Analytics.autoTrack('pageView', {
            // REQUIRED, turn on/off the auto tracking
            enable: true,
            eventName: 'pageView'
            // OPTIONAL, to get the current page url
            // getUrl: () => {
            //     return window.location.origin + window.location.pathname;
            // }
        });
        //Custom Event Tracking
        Analytics.record({ name: 'dashboardVisit' });
    }

    useEffect(() => {
        performAnalytics();
        fetchData();
        // Subscribe to creation of Orders
        const subscriptionCreate = API.graphql(graphqlOperation(subscriptions.onCreateOrders)).subscribe({
            next: ({ provider, value }) => {
                console.log('********* subscription onCREATE', provider, value);
                fetchData();
            },
            error: (error) => console.error('********* create subscription error', error)
        });
        // Subscribe to updation of Orders
        const subscriptionUpdate = API.graphql(graphqlOperation(subscriptions.onUpdateOrders)).subscribe({
            next: ({ provider, value }) => {
                console.log('********* subscription onUPDATE', provider, value);
                fetchData();
            },
            error: (error) => console.error('********* updatedsubscription error', error)
        });
        return () => {
            subscriptionCreate.unsubscribe();
            subscriptionUpdate.unsubscribe();
        };
    }, []);

    async function createDummyOrders(count) {
        if (!count) count = 2;
        const { uniqueNamesGenerator, NumberDictionary, names } = require('unique-names-generator');
        setLoading(true);
        const orders = rows;
        for (var i = 0; i < count; i++) {
            //trackingno
            const randomTrackingno = NumberDictionary.generate({ length: 10 });
            //name
            const randomName = uniqueNamesGenerator({
                dictionaries: [names, names],
                style: 'capital',
                separator: ' '
            });
            //quantity
            const randomQuantity = NumberDictionary.generate({ max: 999 });
            //status
            const allStatus = ['APPROVED', 'REJECTED', 'PENDING'];
            const randomStatus = uniqueNamesGenerator({
                dictionaries: [allStatus]
            });
            //amount
            const randomAmount = NumberDictionary.generate({ max: 9999 });
            const newOrder = {
                TrackingNo: '' + randomTrackingno,
                ProductName: randomName,
                Quantity: parseInt(randomQuantity[0]),
                Status: randomStatus,
                TotalAmount: parseInt(randomAmount[0])
            };

            console.log('Random Order: ', newOrder);
            await DataStore.save(new Orders(newOrder));
            const processedOrder = createData(
                newOrder.TrackingNo,
                newOrder.ProductName,
                newOrder.Quantity,
                newOrder.Status,
                newOrder.TotalAmount
            );
            orders.push(processedOrder);
            console.log('Order created successfully......');
        }
        setRows(orders);
        setLoading(false);
    }

    return (
        <div>
            <Grid container direction="row" padding="0.5rem">
                <Button variant="contained" color="primary" startIcon={<DiffFilled />} onClick={() => createDummyOrders(2)}>
                    Create Dummy Orders
                </Button>
                {loading && <CircularProgress />}
            </Grid>
            <Box style={{ border: `0.3rem dashed red` }}>
                <TableContainer
                    sx={{
                        width: '100%',
                        overflowX: 'auto',
                        position: 'relative',
                        display: 'block',
                        maxWidth: '100%',
                        '& td, & th': { whiteSpace: 'nowrap' }
                    }}
                >
                    <Table
                        aria-labelledby="tableTitle"
                        sx={{
                            '& .MuiTableCell-root:first-child': {
                                pl: 2
                            },
                            '& .MuiTableCell-root:last-child': {
                                pr: 3
                            }
                        }}
                    >
                        <OrderTableHead order={order} orderBy={orderBy} />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
                                const isItemSelected = isSelected(row.trackingNo);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.trackingNo}
                                        selected={isItemSelected}
                                    >
                                        <TableCell component="th" id={labelId} scope="row" align="left">
                                            <Link color="secondary" component={RouterLink} to="">
                                                {row.trackingNo}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="left">
                                            <OrderStatus status={row.carbs} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <NumberFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}
