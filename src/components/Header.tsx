import { Autocomplete, Button, createTheme, CssBaseline, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText, styled, TextField, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import MuiDrawer from '@mui/material/Drawer';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { setScrip } from '../redux/features/searchSlice';
import { useAppSelector } from '../redux/hooks';
import { useAppDispatch } from '../redux/hooks/search';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';

import styles from './Header.module.css';
import React from 'react';

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();



export function Header() {
    const { user } = useAppSelector((state) => state.userSlice);

    const [search, setSearch] = useState("");
    const dispatch = useAppDispatch()
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleOnSubmit = (e: any) => {
        e.preventDefault();
        dispatch(setScrip(search))

        console.log("onclick: ", search);
    };

    const handleSearch = (arg: string) => {
        setSearch(arg);
    }

    return (

        <div >
            <CssBaseline />
            <div>
                <AppBar position="absolute" open={open} sx={{ backgroundColor: '#78909c' }}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            NEPSE WEBAPP
                        </Typography>
                        <Autocomplete
                            id="combo-box-demo"
                            options={stockNameData}
                            getOptionLabel={(option) => option.label}
                            style={{ width: 300 }}
                            onChange={(e, value: any) => {
                                handleSearch(value.label)
                            }
                            }
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Search"
                                    variant="outlined"
                                    InputProps={{
                                        ...params.InputProps,
                                    }}
                                />
                            )}
                        />

                        <Button onClick={handleOnSubmit} variant="contained" sx={{ mr: 25 }}>
                            <Link to="/stock" >
                                <p><b>Search</b></p>
                            </Link>
                        </Button>

                        <IconButton color="inherit">
                            <Link to="/signin" className={styles.signin}>
                                <Typography variant="h6" color="inherit">
                                    {user ? user.username : 'Sign in'}
                                </Typography>
                            </Link>
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
            <div>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav" sx={{ backgroundColor: '#90caf9', }}>
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {/* Secondary Items*/}
                    </List>
                </Drawer>
            </div>
        </div>
    );
}
const mainListItems = (
    <React.Fragment>
        <Link to="/">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>
        <Link to="/portfolio">
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Portfolio" />
            </ListItemButton>
        </Link>
        <Link to="/profile">
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
            </ListItemButton>
        </Link>
        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Predictions" />
        </ListItemButton>
    </React.Fragment>
);


const stockNameData = [
    {
        label: "NICAD8283",
        value: 1
    },
    {
        label: "NBLD85",
        value: 2
    },
    {
        label: "ACLBSL",
        value: 3
    },
    {
        label: "ALBSL",
        value: 4
    },
    {
        label: "CBBL",
        value: 5
    },
    {
        label: "CLBSL",
        value: 6
    },
    {
        label: "DDBL",
        value: 7
    },
    {
        label: "FMDBL",
        value: 8
    },
    {
        label: "FOWAD",
        value: 9
    },
    {
        label: "GMFBS",
        value: 10
    },
    {
        label: "GILB",
        value: 11
    },
    {
        label: "GBLBS",
        value: 12
    },
    {
        label: "GLBSL",
        value: 13
    },
    {
        label: "ILBS",
        value: 14
    },
    {
        label: "JALPA",
        value: 15
    },
    {
        label: "JSLBB",
        value: 16
    },
    {
        label: "JBLB",
        value: 17
    },
    {
        label: "KMCDB",
        value: 18
    },
    {
        label: "KLBSL",
        value: 19
    },
    {
        label: "LLBS",
        value: 20
    },
    {
        label: "MLBSL",
        value: 21
    },
    {
        label: "MSLB",
        value: 22
    },
    {
        label: "MKLB",
        value: 23
    },
    {
        label: "MLBS",
        value: 24
    },
    {
        label: "MERO",
        value: 25
    },
    {
        label: "MMFDB",
        value: 26
    },
    {
        label: "MLBBL",
        value: 27
    },
    {
        label: "NSLB",
        value: 28
    },
    {
        label: "NLBBL",
        value: 29
    },
    {
        label: "NESDO",
        value: 30
    },
    {
        label: "NICLBSL",
        value: 31
    },
    {
        label: "NUBL",
        value: 32
    },
    {
        label: "RULB",
        value: 33
    },
    {
        label: "RMDC",
        value: 34
    },
    {
        label: "RSDC",
        value: 35
    },
    {
        label: "SABSL",
        value: 36
    },
    {
        label: "SDLBSL",
        value: 37
    },
    {
        label: "SMATA",
        value: 38
    },
    {
        label: "SLBSL",
        value: 39
    },
    {
        label: "SKBBL",
        value: 40
    },
    {
        label: "SMFDB",
        value: 41
    },
    {
        label: "SMB",
        value: 42
    },
    {
        label: "SWBBL",
        value: 43
    },
    {
        label: "SMFBS",
        value: 44
    },
    {
        label: "SLBBL",
        value: 45
    },
    {
        label: "USLB",
        value: 46
    },
    {
        label: "VLBS",
        value: 47
    },
    {
        label: "WNLB",
        value: 48
    },
    {
        label: "ADBL",
        value: 49
    },
    {
        label: "BOKL",
        value: 50
    },
    {
        label: "CCBL",
        value: 51
    },
    {
        label: "CZBIL",
        value: 52
    },
    {
        label: "CBL",
        value: 53
    },
    {
        label: "EBL",
        value: 54
    },
    {
        label: "GBIME",
        value: 55
    },
    {
        label: "KBL",
        value: 56
    },
    {
        label: "LBL",
        value: 57
    },
    {
        label: "MBL",
        value: 58
    },
    {
        label: "MEGA",
        value: 59
    },
    {
        label: "NABIL",
        value: 60
    },
    {
        label: "NBL",
        value: 61
    },
    {
        label: "NCCB",
        value: 62
    },
    {
        label: "SBI",
        value: 63
    },
    {
        label: "NICA",
        value: 64
    },
    {
        label: "NMB",
        value: 65
    },
    {
        label: "PRVU",
        value: 66
    },
    {
        label: "PCBL",
        value: 67
    },
    {
        label: "SANIMA",
        value: 68
    },
    {
        label: "SBL",
        value: 69
    },
    {
        label: "SCB",
        value: 70
    },
    {
        label: "SRBL",
        value: 71
    },
    {
        label: "AIL",
        value: 72
    },
    {
        label: "EIC",
        value: 73
    },
    {
        label: "GIC",
        value: 74
    },
    {
        label: "HGI",
        value: 75
    },
    {
        label: "IGI",
        value: 76
    },
    {
        label: "LGIL",
        value: 77
    },
    {
        label: "NIL",
        value: 78
    },
    {
        label: "NICL",
        value: 79
    },
    {
        label: "NLG",
        value: 80
    },
    {
        label: "PRIN",
        value: 81
    },
    {
        label: "PIC",
        value: 82
    },
    {
        label: "PICL",
        value: 83
    },
    {
        label: "RBCL",
        value: 84
    },
    {
        label: "SIC",
        value: 85
    },
    {
        label: "SGI",
        value: 86
    },
    {
        label: "SICL",
        value: 87
    },
    {
        label: "SIL",
        value: 88
    },
    {
        label: "UIC",
        value: 89
    },
    {
        label: "AKJCL",
        value: 90
    },
    {
        label: "API",
        value: 91
    },
    {
        label: "AKPL",
        value: 92
    },
    {
        label: "AHPC",
        value: 93
    },
    {
        label: "BARUN",
        value: 94
    },
    {
        label: "BNHC",
        value: 95
    },
    {
        label: "BPCL",
        value: 96
    },
    {
        label: "CHL",
        value: 97
    },
    {
        label: "CHCL",
        value: 98
    },
    {
        label: "DHPL",
        value: 99
    },
    {
        label: "GHL",
        value: 100
    },
    {
        label: "GLH",
        value: 101
    },
    {
        label: "HDHPC",
        value: 102
    },
    {
        label: "HURJA",
        value: 103
    },
    {
        label: "HPPL",
        value: 104
    },
    {
        label: "JOSHI",
        value: 105
    },
    {
        label: "KPCL",
        value: 106
    },
    {
        label: "KKHC",
        value: 107
    },
    {
        label: "LEC",
        value: 108
    },
    {
        label: "MBJC",
        value: 109
    },
    {
        label: "MKJC",
        value: 110
    },
    {
        label: "MEN",
        value: 111
    },
    {
        label: "MHNL",
        value: 112
    },
    {
        label: "NHPC",
        value: 113
    },
    {
        label: "NHDL",
        value: 114
    },
    {
        label: "NGPL",
        value: 115
    },
    {
        label: "NYADI",
        value: 116
    },
    {
        label: "PMHPL",
        value: 117
    },
    {
        label: "PPCL",
        value: 118
    },
    {
        label: "RADHI",
        value: 119
    },
    {
        label: "RHPL",
        value: 120
    },
    {
        label: "RURU",
        value: 121
    },
    {
        label: "SAHAS",
        value: 122
    },
    {
        label: "SPC",
        value: 123
    },
    {
        label: "SHPC",
        value: 124
    },
    {
        label: "SJCL",
        value: 125
    },
    {
        label: "SSHL",
        value: 126
    },
    {
        label: "SHEL",
        value: 127
    },
    {
        label: "SPDL",
        value: 128
    },
    {
        label: "TPC",
        value: 129
    },
    {
        label: "UNHPL",
        value: 130
    },
    {
        label: "UMRH",
        value: 131
    },
    {
        label: "UMHL",
        value: 132
    },
    {
        label: "UPCL",
        value: 133
    },
    {
        label: "UPPER",
        value: 134
    },

    {
        label: "ALICL",
        value: 135
    },
    {
        label: "GLICL",
        value: 136
    },
    {
        label: "JLI",
        value: 137
    },
    {
        label: "LICN",
        value: 138
    },
    {
        label: "NLICL",
        value: 139
    },
    {
        label: "NLIC",
        value: 140
    },
    {
        label: "PLI",
        value: 141
    },
    {
        label: "PLIC",
        value: 142
    },
    {
        label: "RLI",
        value: 143
    },
    {
        label: "SLI",
        value: 144
    },
    {
        label: "SLICL",
        value: 145
    },
    {
        label: "ULI",
        value: 146
    },
    {
        label: "BFC",
        value: 147
    },
    {
        label: "CFCL",
        value: 148
    },
    {
        label: "GFCL",
        value: 149
    },
    {
        label: "GMFIL",
        value: 150
    },
    {
        label: "GUFL",
        value: 151
    },
    {
        label: "ICFC",
        value: 152
    },
    {
        label: "JFL",
        value: 153
    },
    {
        label: "MFIL",
        value: 154
    },
    {
        label: "MPFL",
        value: 155
    },
    {
        label: "NFS",
        value: 156
    },
    {
        label: "PFL",
        value: 157
    },
    {
        label: "PROFL",
        value: 158
    },
    {
        label: "RLFL",
        value: 159
    },
    {
        label: "SFCL",
        value: 160
    },
    {
        label: "SIFC",
        value: 161
    },
    {
        label: "BBC",
        value: 162
    },
    {
        label: "STC",
        value: 163
    },
    {
        label: "BNT",
        value: 164
    },
    {
        label: "HDL",
        value: 165
    },
    {
        label: "SHIVM",
        value: 166
    },
    {
        label: "UNL",
        value: 167
    },
    {
        label: "CHDC",
        value: 168
    },
    {
        label: "CIT",
        value: 169
    },
    {
        label: "ENL",
        value: 170
    },
    {
        label: "HIDCL",
        value: 171
    },
    {
        label: "NIFRA",
        value: 172
    },
    {
        label: "NRN",
        value: 173
    },
    {
        label: "CGH",
        value: 174
    },
    {
        label: "OHL",
        value: 175
    },
    {
        label: "SHL",
        value: 176
    },
    {
        label: "TRH",
        value: 177
    },
    {
        label: "CORBL",
        value: 178
    },
    {
        label: "EDBL",
        value: 179
    },
    {
        label: "GBBL",
        value: 180
    },
    {
        label: "GRDBL",
        value: 181
    },
    {
        label: "JBBL",
        value: 182
    },
    {
        label: "KSBBL",
        value: 183
    },
    {
        label: "KRBL",
        value: 184
    },
    {
        label: "LBBL",
        value: 185
    },
    {
        label: "MLBL",
        value: 186
    },
    {
        label: "MDB",
        value: 187
    },
    {
        label: "MNBBL",
        value: 188
    },
    {
        label: "NABBC",
        value: 189
    },
    {
        label: "SAPDBL",
        value: 190
    },
    {
        label: "SADBL",
        value: 191
    },
    {
        label: "SHINE",
        value: 192
    },
    {
        label: "SINDU",
        value: 193
    },
    //['KEF', 'LUK', 'NEF', 'NIBLPF']
    {
        label: "KEF",
        value: 194
    },
    {
        label: "LUK",
        value: 195
    },
    {
        label: "NEF",
        value: 196
    },
    {
        label: "NIBLPF",
        value: 197
    },
    {
        label: "NTC",
        value: 198
    },
    {
        label: "NRIC",
        value: 199
    }



];

