import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';

import SearchIcon from '@mui/icons-material/Search';

import useStyles from '../styles';

import axios from 'axios';

const baseURL = "http://f137-105-163-223-5.ngrok.io/api/v1/";

export default function CustomerList() {

    const classes = useStyles();

    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState(0)
    const [pageSize, setPageSize] = React.useState(10)
    const [customers, setCustomers] = React.useState(null);
    const [phoneNumber, setPhoneNumber] = React.useState(null);
    const [phoneNumberState, setPhoneNumberState] = React.useState(null);
    const [country, setCountry] = React.useState(null);
    const [filterFlag, setFilterFlag] = React.useState(false);

    const requestParams = (page, pageSize, filterFlag) => {
        let params = {}

        if (page) {
            params["page"] = page - 1
        }

        if (pageSize) {
            params["size"] = pageSize
        }

        if (filterFlag) {
            if (params["page"] < 0) params["page"] = 0
            params["country"] = country
            params["state"] = phoneNumberState
            params["phone"] = phoneNumber
        }

        return params
    }

    const handlePageChange = (event, value) => {
        setPage(value);
    }

    const fetchUsers = (to_filter = false) => {
        let params = requestParams(page, pageSize, filterFlag);
        const url = filterFlag ? "customer/filters" : "customers";

        console.log(url);
        console.log(params);

        axios
            .get(
                baseURL + url,
                {
                    params
                }
            )
            .then((response) => {
                console.log(response);
                setFilterFlag(false);
                setCustomers(response.data.response);
                setPageSize(response.data.pagination.size);
                setCount(response.data.pagination.pages)

                setPhoneNumber(null);
                setPhoneNumberState(null);
                setCountry(null);
            })
            .catch(err => console.log(err));
    };

    React.useEffect(() => {
        console.log("breakpoint 4");
        if (page < 0) {
            console.log("breakpoint 5");
            setPage(1);
        }
    }, [filterFlag]);

    React.useEffect(() => {
        console.log("breakpoint 2");
        if (page > 0) {
            fetchUsers();
        } else if (page < 0) {
            console.log("breakpoint 3");
            setFilterFlag(true);
        }
    }, [page]);

    return (
        <>
            <div
                className={classes.searchBar}
            >
                <FormControl
                    size='small'
                >
                    <InputLabel htmlFor="component-outlined">Phone Number</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        onChange={(e) => { 
                            e.target.value === '' ? setPhoneNumber(null) : setPhoneNumber(e.target.value) 
                        }}
                        label="Phone Number"
                    />
                </FormControl>
                <FormControl
                    size='small'
                >
                    <InputLabel htmlFor="component-outlined">Valid</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        onChange={(e) => { 
                            e.target.value === '' ? setPhoneNumberState(null) : setPhoneNumberState(e.target.value)
                        }}
                        label="State"
                    />
                </FormControl>
                <FormControl
                    size='small'
                >
                    <InputLabel htmlFor="component-outlined">Country</InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        onChange={(e) => { 
                            e.target.value === '' ? setCountry(null) : setCountry(e.target.value)
                        }}
                        label="Country"
                    />
                </FormControl>
                <Button 
                    variant="outlined"
                    onClick={(e) => { 
                        console.log("breakpoint 1");
                        setPage(-1)
                    }}
                >
                    <SearchIcon 
                        fontSize='small'
                    />
                </Button>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size='small' aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Country</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers && customers.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {row.name}
                                </TableCell>
                                <TableCell>{row.phone}</TableCell>
                                <TableCell>{row.valid}</TableCell>
                                <TableCell>{row.country}</TableCell>
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
