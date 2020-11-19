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
import { FacebookShareButton, FacebookIcon } from "react-share";

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
    setExpanded(!expanded);
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
        subheader={item.date_added}
      />
      <CardContent style={{padding: 0}}>
      <div style={{
        width: "100%",
        alignItems: "center",
        textAlign: "center"
      }}>
        <div style={{display: 'inline-block'}}>
        <Document file={{ url: item.image}} onLoadSuccess={onDocumentLoadSuccess}
        >
          <BrowserView>
            <Page pageNumber={pageNumber} width="500" height="500" scale={0.8} />
          </BrowserView>
          <MobileView>
            <Page pageNumber={pageNumber} width="500" height="500" scale={0.61} />
          </MobileView>
        </Document>
        <div>
        <p style={{margin: 0}}>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <IconButton style={{paddingTop: 0, paddingBottom: 0}} color="primary" onClick={previousPage}>
          <ArrowLeftIcon></ArrowLeftIcon>
        </IconButton>
        <IconButton style={{paddingTop: 0, paddingBottom: 0}} color="primary" onClick={nextPage}>
          <ArrowRightIcon></ArrowRightIcon>
        </IconButton>
        </div>
      </div>
      </div>
      
        
      </CardContent>
      <CardActions disableSpacing>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <div>
        

        <Checkbox
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={() => handleCheck(item)}
          aria-expanded={expanded}
          aria-label="show more"
          color="primary"
        ></Checkbox>
        <Link
          to={`edit/${item.id}`}>
          <IconButton
            aria-label="edit"
          >
            <EditIcon />
          </IconButton>
        </Link>
        <IconButton>
        <FacebookShareButton url={item.image} quote={"Look at this!"} className="share">
          <FacebookIcon size={26} round={true}/>
        </FacebookShareButton>
        </IconButton>
        </div>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          color="primary"
        ><ExpandMoreIcon />
        </IconButton>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
      </Collapse>
    </Card>
  );
}