import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout/layout';
import NewPostWidget from '../components/main-column-body/new-post-widget';
import PremiumWidget from '../components/right-column-body/premium-widget';
import HomeWidget from '../components/right-column-body/home-widget';
import PostWidgetContainer from '../components/main-column-body/post-widget-container';
import PopupWindow from '../components/popup-window';
import { id, tr } from 'date-fns/locale';
import { useReducer, useState } from 'react';
import PopupPostPage from '../components/post-page/popup-post-page';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]';
import Signin from './auth/signin';


export async function getServerSideProps() {
  const res = await fetch("http://localhost:5142/api/post/getall");
  const data = await res.json();
  return {
      props: {
          data: data.data,
      },
  }
}

export default function Home({ data }) {

  const [posts, setPosts] = useState(data)
  const [postPopupIsOpen, setPostPopupIsOpen] = useState(false)
  const [selectedPostId, setSelectedPostId] = useState(0)

  const router = useRouter()

  function handlePostClick(id) {
    setSelectedPostId(id)
    setPostPopupIsOpen(true);
    // when popup window is open, make body page unsrollable.
    document.body.classList.add('popup-open');
  }

  function closePostPopup() {
    setPostPopupIsOpen(false);
    // when popup window is closed, make body page srollable again.
    document.body.classList.remove('popup-open');
    router.push('/');
  }

  async function handleUpvoteClick(id) {
    try { 
        const res = await fetch(`/api/Post/upvote/${id}`, {
            method: 'PUT'})
        const data = await res.json();
    } catch (error) {
        console.error('error updating the vote count', error)
        throw error
    }
    
    setPosts((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          const oldVote = item.upVote
          const newVote = oldVote + 1
          return {...item, upVote: newVote };
        }
        return item;
      });
    });

  }

  async function handleDownvoteClick(id) {
    try { 
        const res = await fetch(`/api/Post/downvote/${id}`, {
            method: 'PUT'})
        const data = await res.json();
    } catch (error) {
        console.error('error updating the vote count', error)
        throw error
    }

    setPosts((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          const oldVote = item.downVote
          const newVote = oldVote + 1
          return {...item, downVote: newVote };
        }
        return item;
      });
    });
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className='canvas'>
        <div className='display-body'>
          <div className='center-column'>
            <NewPostWidget/>
            <PopupWindow isOpen={postPopupIsOpen}>
              <PopupPostPage 
                post={posts.find(post => post.id === selectedPostId)} 
                onClose={closePostPopup}
                onUpVoteClick={() => handleUpvoteClick(selectedPostId)}
                onDownVoteClick={() => handleDownvoteClick(selectedPostId)}
              />
            </PopupWindow>
            <div className='margin-y-8'>
              {posts.map((post) => {
                return(
                  <Link href={`?id=${post.id}`} as={`posts/${post.id}`}  >
                    <div 
                      key={post.id} 
                      onClick={() => handlePostClick(post.id)}
                    >
                      <PostWidgetContainer 
                        post={post} 
                        onUpVoteClick={() => handleUpvoteClick(post.id)}
                        onDownVoteClick={() => handleDownvoteClick(post.id)}
                      />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
          <div className='right-column'>
              <PremiumWidget />
            <div>
              <HomeWidget />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
