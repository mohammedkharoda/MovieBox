import { authMiddleware } from "@clerk/nextjs";
const protectedRoutes = [
    'movie/[id]',
    'tv/[id]',
    'favourites/[id]',
    'actors/[id]',
];
export default authMiddleware({
    publicRoutes: ["/"],
});


export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};