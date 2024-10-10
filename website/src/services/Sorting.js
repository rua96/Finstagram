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
}

export default Sorting;