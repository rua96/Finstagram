class Sorting {

    static sortPosts(order,posts)
    {

            switch(order)
        {
                case "newest" :
                    posts.sort((a,b)=> new Date(b.createdAt) - new Date (a.createdAt));
                break;
                case "oldest" :
                    posts.sort((a,b)=> new Date(a.createdAt)- new Date(b.createdAt));
                    break;
                default:
                    break;
                
        }

        return posts;
    }

    static sortComments(order,comments)
    {

            switch(order)
        {
                case "newest" :
                    comments.sort((a,b)=> new Date(b.createdAt) - new Date (a.createdAt));
                break;
                case "oldest" :
                    comments.sort((a,b)=> new Date(a.createdAt)- new Date(b.createdAt));
                    break;
                default:
                    break;
                
        }

        return comments;
    }
}

export default Sorting;