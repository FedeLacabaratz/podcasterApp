import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: '20rem',
    width: '14rem',
    marginBottom: '2rem',
    cursor: 'pointer',
    boxShadow: '0 0 10px',
  },
  cardContent: {
    height: '30%',
  },
  cardMedia: {
    height: '70%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > img': {
      borderRadius: '10px',
      width: '100%',
    }
  },
  '& .MuiCardMedia-img': {
    objectFit: 'contain',
  },
  title: {
    fontSize: '0.725rem',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '0.8rem',
    textAlign: 'center',
  }
});

export const MainCard = ({ item, handleOnClickCard }) => {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
      onClick={(e) => {
        handleOnClickCard(e)
      }}
    >
      <CardMedia
        id={`${item?.id}`}
        className={classes.cardMedia}
        component="img"
        alt={`${item?.name}`}
        image={`${item?.image[2]}`}
        title={`${item?.name}`}
      />
      <CardContent
        className={classes.cardContent}
      >
        <Typography
          className={classes.title}
          gutterBottom
          variant="inherit"
          component="h5">
          {`${item?.name.toUpperCase()}`}
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="body2"
          color="textSecondary"
          component="p">
          {`Author: ${item?.author}`}
        </Typography>
      </CardContent>
    </Card>
  )
}
