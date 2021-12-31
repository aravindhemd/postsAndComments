import React, { useEffect } from 'react';
import './Post.css';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Comments from '../Comment/Comment';
import Search from '../Comment/Search/Search';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { useSelector,useDispatch, connect } from 'react-redux';

const queryClient = new QueryClient();


// import {getPosts} from '../../actions/post';

const getPostCommentData = async () => {
  let postss = await fetch('https://jsonplaceholder.typicode.com/posts');
  postss = await postss.json();

  let comments = await fetch('https://jsonplaceholder.typicode.com/comments')
  comments = await comments.json();
  postss.forEach(post => {
    post.comment = [];
    comments.forEach(comment => {
      if (post.id === comment.postId) {
        post.comment.push({
          name: comment.name,
          email: comment.email,
          body: comment.body
        })
      }
    })

  });
  return postss
}

 const Posts = ()=> {
  return (
    <QueryClientProvider client={queryClient}>
      <Tests />
    </QueryClientProvider>
  )
}

const Tests = () => {
  const [post_list, getPostLists] = React.useState([]);
  // const post_list = useSelector(store=>{
  //   console.log(store,'statestatestate')
  //   return store
  // } );
  const dispatch = useDispatch();

  const { isLoading, error, data:postss } = useQuery('repoData', () =>
  fetch('https://jsonplaceholder.typicode.com/posts').then(res =>
    // console.log(res,'resresresresres')
    {
      // comments
      return res.json()
    }
  )
  )

  const { isLoading: isLoaded, error:err, data:comments }  = useQuery('repo', () =>
  fetch('https://jsonplaceholder.typicode.com/comments').then(res =>
    res.json()
  )
  )
  console.log(comments,'commentscomments')

  
  if (isLoading ||isLoaded) return 'Loading...'
 
  if (error || err) return 'An error has occurred: ' + error.message
  if(postss && comments){
    postss.forEach(post => {
      post.comment = [];
      comments.forEach(comment => {
        if (post.id === comment.postId) {
          post.comment.push({
            name: comment.name,
            email: comment.email,
            body: comment.body
          })
        }
      })
  
    });
  }





  // getPostCommentData().then(response => {
  //   console.log(response, 'datadatadata')
  //   // dispatch({type: "GETPOSTS", payload: response});
  //   // getPostLists(response);
 
  // })
  
// useEffect(()=>{
//   console.log('New value', counter) 
//   return () => {
//      console.log('Prev value', counter) 
//   }
// },[counter])

  const handleClick = (ele) => {
    console.log(ele);
  }

  const callback = (ele) => {
    console.log(ele);
  }



  return (
    <>
      {/* <Search callback={callback} /> */}
      <List>
        {postss.map((ele, i) => {
          return (
            <React.Fragment key={i}>
              <ListItem key={i}>
                <ListItemText key={Math.random()} primary={ele.title} secondary={ele.body} >

                </ListItemText>
              </ListItem>
              <p className='comment-title' onClick={() => handleClick(ele)}>{ele.comment.length} comments</p>
              <Comments display="block" comments={ele.comment}></Comments>
              <Divider key={Math.random()} />
            </React.Fragment>)
        })}
      </List>
    </>
  )
}

export default Posts;