import React from 'react';
import './Comment.css';

const Comments = (props) => {
  let style = {"display":props.display}
  return (
    <div style={style} className='comment-contents'>
      {props.comments.map((ele, i) => {
        return (
          <div className='comment-content' key={i}>
            <h6>{ele.name}</h6>
            <p className='comment-text'>{ele.body}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Comments;