import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    margin: "auto",
    marginBottom: "5%",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    paddingBottom: '5%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Multimedia({ item, handleCheck }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [numPages, setNumPages] = React.useState(null);
  const [pageNumber, setPageNumber] = React.useState(1);

  const handleExpandClick = () => {
  };

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  function changePage(offset) {
    setPageNumber(prevPageNumber => {
      var page = prevPageNumber + offset;

      if(page > numPages){
        return numPages
      }else if (page <= 0){
        return 1
      }
      return page
    });
  }
  function previousPage() {
    changePage(-1);
  }
  function nextPage() {
    changePage(1);
  }
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Tooltip title={item.created_by}>
            <Avatar aria-label="recipe" className={classes.avatar} style={{ background: '#5cb85c' }}>
              {item.created_by}
            </Avatar>
          </Tooltip>

        }

        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={item.title}
        subheader={item.composition_date}
      />
      <div style={{
        width: "100%",
        alignItems: "center"
        
      }}>
        <Document file={{ url: item.image}} onLoadSuccess={onDocumentLoadSuccess}
        >
          <BrowserView>
            <Page pageNumber={pageNumber} width="500" height="500" scale={1} />
          </BrowserView>
          <MobileView>
            <Page pageNumber={pageNumber} width="500" height="500" scale={0.61} />
          </MobileView>
        </Document>
        <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <IconButton color="primary" onClick={previousPage}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </IconButton>
        <IconButton color="primary" onClick={nextPage}>
          <ArrowRightIcon></ArrowRightIcon>
        </IconButton>
      </div>
      </div>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.description}
        </Typography>
       
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Composition date: </b> {item.composition_date}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          <b>Composer</b> {item.artist}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        <b>Signature</b> {item.signature}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        <b>Tempo</b> {item.tempo}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <Link
          to={`edit/${item.id}`}>
          <IconButton
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Link>
        {/* <IconButton aria-label="share">
          <FavoriteIcon />
        </IconButton> */}
        <Checkbox
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => handleCheck(item)}
          aria-expanded={expanded}
          aria-label="show more"
          color="primary"
        ></Checkbox>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
            minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over medium-high
            heat. Add chicken, shrimp and chorizo, and cook, stirring occasionally until lightly
            browned, 6 to 8 minutes. Transfer shrimp to a large plate and set aside, leaving chicken
            and chorizo in the pan. Add pimentón, bay leaves, garlic, tomatoes, onion, salt and
            pepper, and cook, stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and peppers, and cook
            without stirring, until most of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
            medium-low, add reserved shrimp and mussels, tucking them down into the rice, and cook
            again without stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}