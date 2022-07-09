import { Home, Padding } from '@mui/icons-material';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useSearchParams } from 'react-router-dom';
import { setScrip } from '../redux/features/searchSlice';
import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks/search';

import styles from './Header.module.css';
import Select from './Select';

export function Header() {
    const { user } = useAppSelector((state) => state.userSlice);

    const [search, setSearch] = useState("");
    const dispatch = useAppDispatch()

    const handleOnSubmit = () => {
        dispatch(setScrip(search))

        console.log("onclick: ", search);
    };

    const handleSearch = (arg: string) => {
        setSearch(arg);
    }

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Link to="/">
                    <Home sx={{ fontSize: 55 }} />

                </Link>

                {/* <Select
                    onChange={(e) => {
                        search.set('sort', e.target.value);
                        setSearch(search, {
                            replace: true,
                        });
                    }}
                    label="Sort by"
                    name="sort"
                // options={[
                //     {
                //         label: 'Name',
                //         value: 'name',
                //     },
                //     {
                //         label: 'Price High',
                //         value: 'priceDesc',
                //     },
                //     {
                //         label: 'Price Low',
                //         value: 'priceAsc',
                //     },
                // ]}
                /> */}

                <TextField
                    id='search-basic'
                    label="Search"
                    variant='outlined'
                    style={{ width: "60%" }}
                    value={search}
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                />

                <Button onClick={handleOnSubmit} variant="contained" sx={{ mr: 25 }}>
                    <Link to="/stock" >
                        <p><b>Search</b></p>
                    </Link>
                </Button>

                {/* <form className={styles.form} onSubmit={handleOnSubmit}>
                    <input
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search"
                        className={styles.input}
                        onChange={(e) => {
                            search.set('sort', e.target.value);
                            setSearch(search, {
                                replace: true,
                            });
                        }}
                    />
                    <button type="submit" className={styles.search} tabIndex={-1}>
                        <AiOutlineSearch size={20} />
                    </button>
                </form> */}
            </div>
            <div className={styles.buttons}>
                <Link to="/signin" className={styles.signin}>
                    <p>
                        <span>{user ? user.username : 'Sign in'}</span>
                    </p>
                    <p>
                        <b> Accounts</b>
                    </p>
                </Link>
                <Link to="/portfolio" className={styles.order}>
                    <p><b>Portfolio</b></p>
                </Link>
            </div>
        </header>
    );
}


const stockname = [
    { label: "NABIL", value: "AAPL" },
    { label: "ADBL", value: "ADBL" },
    { label: "NRIC", value: "NRIC" },
    { label: "NTC", value: "NTC" },

]