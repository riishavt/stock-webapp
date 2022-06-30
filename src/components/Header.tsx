import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

import styles from './Header.module.css';
import Select from './Select';

export function Header() {
    const { user } = useAppSelector((state) => state.userSlice);
    const [search, setSearch] = useSearchParams();

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Not yet implemented');
        console.log(search);
    };

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Link to="/">
                    <img
                        // src="../../src/assets/amazon-logo.svg"
                        alt="Asset Placeholder"
                        className={styles.logo}
                    />
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

                <form className={styles.form} onSubmit={handleOnSubmit}>
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
                </form>
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
