import moment from 'moment'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { getPodcastsWithExpiry } from '../hooks/useLocalStorage';
import { millisecondsToMinutesSeconds } from '../helpers/milisecondsConverter';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    title: {
        fontSize: '2rem',
        textAlign: 'left',
    },
});

export const PodcastContainer = ({ podcast, item }) => {
    const classes = useStyles();
    const podcastFeed = getPodcastsWithExpiry('podcastFeed')
    console.log(podcast)
    console.log(podcastFeed)
    console.log(item)

    const rows = [{
        name: `${item?.trackName}`,
        date: `${moment(item?.releaseDate).format('DD/MM/YYYY')}`,
        duration: `${millisecondsToMinutesSeconds(item?.trackTimeMillis)}`
    }];
    return (
        <div className="podcastContainer">
            <Typography
                className={classes.title}
                gutterBottom
                variant="inherit"
                component="h2">
                {`Episodes: ${item?.trackCount}`}
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="right">Date</StyledTableCell>
                            <StyledTableCell align="right">Duration</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{row.date}</StyledTableCell>
                                <StyledTableCell align="right">{row.duration}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}