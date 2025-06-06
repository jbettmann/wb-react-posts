import type { PostsType } from "./Posts";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "./ui/card";

// display purpose only
const nameArray = [
  "Emily Thompson",
  "Sophia Anderson",
  "Olivia Martinez",
  "Ava Nguyen",
  "Isabella Johnson",
  "Mia Patel",
  "Charlotte Brown",
  "Amelia Garcia",
  "Harper Lee",
  "Evelyn Davis",
];

const badge = ["TailwindCSS", "Shadcn", "WorkBright"];

type Props = {
  post: PostsType;
};

const PostCard = ({ post }: Props) => {
  return (
    <Card className="w-full max-w-xl h-96 relative overflow-hidden shadow-2xl">
      <img
        src={`https://random-image-pepebigotes.vercel.app/api/random-image?seed=${post.id}`}
        alt="Blog Background"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div className="absolute bottom-0 left-0 z-10 w-full h-2/5 bg-black/40 backdrop-blur-sm py-4 mt-auto text-white space-y-2">
        <CardHeader>
          <CardTitle className="text-lg line-clamp-1">{post.title}</CardTitle>
        </CardHeader>
        <CardContent className="line-clamp-2 text-sm">{post.body}</CardContent>
        <CardFooter className="flex gap-2 mt-2">
          <Avatar>
            <AvatarImage
              src={`https://randomuser.me/api/portraits/women/${post.userId}.jpg`}
              alt="User Avatar"
            />

            <AvatarFallback>WB</AvatarFallback>
          </Avatar>
          <p className="text-xs">{nameArray[post.userId]}</p>
          <div className="flex gap-1 items-center ml-auto">
            {badge.map((b, i) => (
              <Badge
                variant={"outline"}
                className="text-white font-light"
                key={i}
              >
                {b}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default PostCard;
