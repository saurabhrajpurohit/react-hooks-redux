import { makeStyles } from '@material-ui/core/styles';

//Header design Classes
export const HeaderDesign = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'relative',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

//Movie list page design classes
export const MoviesListDesign = makeStyles((theme) => ({
    root: {
        textAlign: 'center',
        flexWrap: 'wrap',
        minWidth: 300,
        padding: theme.spacing(2),
    },
    goBackButton: {
        float: 'left',
        marginLeft: theme.spacing(7),
        padding: '10px 15px !important',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            margin: '0 0 5px 0 !important'
        }
    },
    redirectionButton: {
        float: 'left',
        marginLeft: theme.spacing(7),
        padding: '15px !important',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            margin: '0 0 5px 0 !important'
        }
    },
    formControl: {
        paddingRight: '56px !important',
        minWidth: '200px !important',
        float: 'right',
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            margin: '0 !important',
            padding: '0 !important'
        }
    },
    movie: {
        position: 'relative',
        height: 350,
        margin: theme.spacing(2),
        width: 250,
        [theme.breakpoints.down('xs')]: {
            width: '100% !important', // Overrides inline-style
            height: 350,
            margin: "10px 0px"
        },
        '&:hover, &$focusVisible': {
            zIndex: 1,
            '& $movieBackdrop': {
                opacity: 0.15,
            },
            '& $movieTitle': {
                border: '2px solid currentColor',
            },
        },
    },
    movieButton: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    },
    movieSrc: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    },
    movieBackdrop: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    },
    movieTitle: {
        position: 'relative',
        padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
    },
    movieMarked: {
        width: 18,
        left: 'calc(50% - 25px)',
        transition: theme.transitions.create('opacity'),
    },
    actionButtons: {
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    navigationButtons: {
        opacity: 0.9,
        transition: theme.transitions.create('opacity'),
    },
    toggleContainer: {
        float: 'right',
        marginRight: '56px !important',
    },
    noDataFound: {
        fontSize: 20,
        padding: '100px 0px',
        fontWeight: 200
    }
}));
