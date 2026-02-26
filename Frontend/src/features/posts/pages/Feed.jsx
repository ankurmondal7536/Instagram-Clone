import { useEffect } from 'react';
import React from 'react';
import '../styles/feed.scss';
import { RiPokerHeartsLine, RiMessage2Line, RiShareForwardLine, RiBookmarkLine } from "@remixicon/react";
import { usePost } from '../hooks/usePost';
import Post from '../components/post';


const Feed = () => {

    const { feed, loading, handleGetFeed } = usePost()
    useEffect(() => {
        handleGetFeed()
    }, [])
    if (loading || !feed) {
        return (
            <main>
                <h1>Feed isLoading...</h1>
            </main>
        )
    }
    console.log(feed)




    return (
        <div>
            {feed.map(post => {
                return <Post user={post.user} post={post}/>
            })}
            {/* <Post /> */}
        </div>
    );
};

export default Feed;