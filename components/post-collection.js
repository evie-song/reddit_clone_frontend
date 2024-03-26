import PostWidgetContainer from "./main-column-body/post-widget-container";
import { useEffect, useState } from "react";
import PopupWindow from "./popup-window";
import PopupPostPage from "./post-page/popup-post-page";
import { useRouter } from "next/navigation";
import PostWidget from "./main-column-body/post-widget";

const PostCollection = ({ posts }) => {
  const [customPosts, setCustomPosts] = useState([]);
  const [page, setPage] = useState(1);

  const [postPopupIsOpen, setPostPopupIsOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [noMorePost, setNoMorePost] = useState(false);
  const router = useRouter();

  // update the posts data to show saved and vote status after user is logged in.
  useEffect(() => {
    setCustomPosts(posts);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`/api/Post/GetAll/${page + 1}`, {
        method: "GET",
      });
      if (res.ok) {
        const data = await res.json();
        const newPosts = data.data;
        if (newPosts.length !== 0) {
          setCustomPosts((prevCustomPosts) => {
            const filteredNewPosts = newPosts.filter(
              (newPost) =>
                !prevCustomPosts.some(
                  (customPost) => customPost.id === newPost.id
                )
            );
            return [...prevCustomPosts, ...filteredNewPosts];
          });
          setPage((prevPage) => prevPage + 1);
        } else {
          setNoMorePost(true)
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    // console.log(
    //   window.innerHeight + document.documentElement.scrollTop,
    //   document.documentElement.offsetHeight
    // );
    if (
      window.innerHeight + document.documentElement.scrollTop <
        document.documentElement.offsetHeight - 2 * page ||
      isLoading || noMorePost
    ) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  function handlePostClick(id) {
    setSelectedPostId(id);
    setPostPopupIsOpen(true);
    // when popup window is open, make body page unsrollable.
    document.body.classList.add("popup-open");
    window.history.pushState({}, "", `posts/${id}`);
  }

  function closePostPopup() {
    setPostPopupIsOpen(false);
    // when popup window is closed, make body page srollable again.
    document.body.classList.remove("popup-open");
    window.history.pushState({}, "", "/");
  }

  const updateVoteCountInCollection = (id, vote) => {
    const updatedPosts = customPosts.map((post) => {
      if (post.id == id) {
        return { ...post, ["totalVote"]: vote };
      }
      return post;
    });
    setCustomPosts(updatedPosts);
  };

  const updateCommentCountInCollection = (postId) => {
    const updatedPosts = customPosts.map((post) => {
      if (post.id === postId) {
        const newCount = post["commentCount"] + 1;
        return { ...post, ["commentCount"]: newCount };
      }
      return post;
    });

    setCustomPosts(updatedPosts);
  };

  return (
    <div>
      <PopupWindow isOpen={postPopupIsOpen}>
        <PopupPostPage
          post={customPosts.find((post) => post.id === selectedPostId)}
          onClose={closePostPopup}
          updateVoteCountInCollection={updateVoteCountInCollection}
          updateCommentCountInCollection={updateCommentCountInCollection}
        />
      </PopupWindow>
      <div className="margin-y-8">
        {customPosts.map((post) => {
          return (
            // <Link href={`?id=${post.id}`} as={`posts/${post.id}`}  >
            <div
              style={{ margin: "12px 0" }}
              key={post.id}
              onClick={() => handlePostClick(post.id)}
            >
              <PostWidgetContainer>
                <PostWidget
                  updateVoteCountInCollection={updateVoteCountInCollection}
                  post={post}
                />
              </PostWidgetContainer>
            </div>
            

            // </Link>
          );
        })}
        {noMorePost && <div className="text-center text-muted font-16">{'- - - No more posts available - - -'}</div>}
      </div>
      
    </div>
  );
};

export default PostCollection;
