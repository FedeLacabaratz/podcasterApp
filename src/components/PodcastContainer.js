import { useEffect, useState } from 'react';
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
        width: '100%',
        height: '3rem',
        textAlign: 'left',
        boxShadow: '0 0 3px',
        backgroundColor: 'inherit',
    },
});

export const PodcastContainer = ({ podcast, item }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    let feed = getPodcastsWithExpiry('podcastFeed')
    const [podcastFeed, setPodcastFeed] = useState([])

    const handleOnLoadFeed = () => {
        setPodcastFeed(getPodcastsWithExpiry('podcastFeed'))
    }

    useEffect(() => {
        if (feed[0]?.author?.__text === item?.artistName && !!podcastFeed.length && feed.length === podcastFeed.length) return;
        handleOnLoadFeed()
    }, [feed])

    const rows = !!podcastFeed.length ? podcastFeed.map(d => {
        const possibleIds = (d) => {
            if (!!d?.guid) {
                if (!!d?.guid?.__cdata) {
                    return d?.guid?.__cdata
                } else if (!!d?.guid?.__text)
                    return d?.guid?.__text
            } else if (!!d?.clipId) {
                return !!d?.clipId?.__text
            } else {
                return 'noVisibleId'
            }
        }
        return {
            key: uuidv4(),
            id: `${possibleIds(d)}`,
            name: (typeof (d?.title) === 'array') ? `${d?.title?.[0]}` : `${d?.title}`,
            date: `${moment(d?.pubDate).format('DD/MM/YYYY')}`,
            duration: `${millisecondsToMinutesSeconds((d?.duration?.__text * 1000))}`
        }
    }) : []
    console.log(podcastFeed)
    const handleOnClickEpisode = (e, episodeId) => {
        e.preventDefault()
        navigate(`/podcast/${podcast?.id}/episode/${episodeId}`)
        console.log()
    }
    console.log(rows)
    return (
        <div className="podcastContainer">
            {!!rows && !!rows.length ?
                <>
                    <Typography
                        className={classes.title}
                        gutterBottom
                        variant="inherit"
                        component="h2">
                        {`Episodes: ${podcastFeed?.length}`}
                    </Typography>
                    <TableContainer className="tableContainer" component={Paper}>
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
                                    <StyledTableRow key={row.key}>
                                        <StyledTableCell className="linkToEpisode" component="th" scope="row" onClick={(e) => handleOnClickEpisode(e, row?.id)}>
                                            {row.name?.split(",")[0]}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.date}</StyledTableCell>
                                        <StyledTableCell align="right">{row.duration}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </> :
                ''
            }
        </div>
    );
}