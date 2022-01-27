import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

import SearchIcon from '@mui/icons-material/Search';

import useStyles from '../styles';

import axios from 'axios';

const baseURL = "http://f137-105-163-223-5.ngrok.io/api/v1/customers";

export default function CustomerList() {

    const classes = useStyles();

    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)
    const [customers, setCustomers] = React.useState(null);
    const [searchCode, setSearchCode] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [phoneNumberState, setPhoneNumberState] = React.useState("");

    const requestParams = (page, pageSize) => {
        let params = {}

        if (page) {
            params["page"] = page - 1
        }

        if (pageSize) {
            params["size"] = pageSize
        }

        return params
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const fetchUsers = () => {
        let params = requestParams(page, pageSize);

        axios
            .get(
                baseURL,
                {
                    params
                }
            )
            .then((response) => {
                setCustomers(response.data.response);
                setPageSize(response.data.pagination.size);
                setCount(response.data.pagination.pages)
            })
            .catch(err => console.log(err));
    };

    React.useEffect(() => {
        fetchUsers();
    }, [page]);

    return (
        <>
            <div
                className={classes.searchBar}
            >
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Country Code</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={searchCode}
                        onChange={setSearchCode}
                        label="Country Code"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Phone Number</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={phoneNumber}
                        onChange={setPhoneNumber}
                        label="Phone Number"
                    />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">State</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        value={phoneNumberState}
                        onChange={setPhoneNumberState}
                        label="State"
                    />
                </FormControl>
                <SearchIcon fontSize='large' className={classes.searchIcon}/>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Country</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers && customers.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.phone}</TableCell>
                                <TableCell align="right">{row.valid}</TableCell>
                                <TableCell align="right">{row.country}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                className={classes.pagination}
                count={count}
                color="primary"
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
            />
        </>
    );
}
