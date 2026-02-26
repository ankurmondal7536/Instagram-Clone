import React from 'react'
import '../styles/feed.scss'
import { RiPokerHeartsLine, RiMessage2Line, RiShareForwardLine, RiBookmarkLine } from "@remixicon/react";

const Post = ({ user,post }) => {

   
    return (
        <div className="posts-container feed-wrapper">
          
                <div key={post._id} className="post-card">

                    {/* Header Section */}
                    <div className="post-header">
                        <div className="user-info">
                            {/* BACKEND: post.userImg */}
                            <img src={user.profilePic} alt="user" className="avatar" />
                            <span className="username">
                                {/* BACKEND: post.username */}
                                {user.username}
                                {/* {post.isVerified && <span className="verified-icon">✔️</span>} */}
                            </span>
                        </div>
                        <span className="more-dots">...</span>
                    </div>

                    {/* Main Image Section */}
                    <div className="post-image-container">
                        {/* BACKEND: post.postImg */}
                        <img src={post.imageUrl} alt="post" />
                    </div>

                    {/* Actions Section */}
                    <div className="post-actions">
                        <div className="left-icons">
                            <button><RiPokerHeartsLine /></button>
                            <button><RiMessage2Line /></button>
                            <button><RiShareForwardLine /></button>
                        </div>
                        <div className="right-icons">
                            <button><RiBookmarkLine /></button>
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="post-details">
                        {/* BACKEND: post.likes */}
                        <p className="likes-count">{100} likes</p>

                        <p className="caption">
                            <span className="bold-username">{user.username}</span>
                            {/* BACKEND: post.caption */}
                            {post.caption}
                        </p>

                        {/* BACKEND: post.commentsCount */}
                        <p className="view-comments">View all {100} comments</p>
                    </div>
                </div>
            
        </div>
    )
}
export default Post