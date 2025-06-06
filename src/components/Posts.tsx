import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import PostCard from "./PostCard";
import { Button } from "./ui/button";

export type PostsType = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

const Posts = () => {
  const [posts, setPosts] = useState<PostsType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // state used only to simulate error on first fetch req
  const [postUrl, setPostUrl] = useState<string>(
    "https://jsonplaceholder.typicode.com/postss"
  );

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // simulate delay

        const req = await fetch(postUrl);

        if (!req.ok) {
          // throw an error to be caught in the catch block and display via toast
          throw new Error("There was an issue getting posts. Try again");
        }

        const res = await req.json();

        setPosts(res);
      } catch (error) {
        console.log(error);
        setErrorMessage("There was an issue!");
        toast.error(
          (error as Error).message ?? "There was an issue. Try again"
        );
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, [postUrl]);

  // handle resetting post url to remove error
  const handleErrorSimulation = () => {
    setPostUrl("https://jsonplaceholder.typicode.com/posts");
    setErrorMessage("");
  };

  return (
    <>
      <div className="w-full h-full ">
        {loading ? (
          <Loader2 className="animate-spin m-auto h-full" />
        ) : errorMessage ? (
          <div className="flex flex-col items-center justify-center gap-2 h-full">
            <p> {errorMessage}</p>
            <Button
              variant="outline"
              className="hover:cursor-pointer"
              onClick={handleErrorSimulation}
            >
              Try again
            </Button>
          </div>
        ) : (
          <div>
            <h2 className="text-4xl mb-6">Posts</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {posts.length > 0 ? (
                posts.map((post, i) => (
                  <li key={i}>
                    <PostCard post={post} />
                  </li>
                ))
              ) : (
                <p>"There are no Posts"</p>
              )}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
