const APIURL = '/posts';

const throwError = async (resp) => {
    const unknownErr = { errorMessage: 'Unknown error' };
    try {
        const body = await resp.json();
        if (body.message !== undefined) {
            let err = { errorMessage: body.message };
            throw err;
        } else {
            throw unknownErr;
        }
    } catch (e) {
        throw unknownErr;
    }
};

// Function that gets all of the posts from the database using a fetch
const getPosts = async () => {
    const resp = await fetch(APIURL);
    if (!resp.ok) {
        throwError(resp);
    } else {
        return resp.json();
    }
}

// Function that adds a new post to the database using a fetch
const addPost = async (post) => {
    const resp = await fetch(APIURL, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(post)
    });
    if (!resp.ok) {
        throwError(resp);
    }
}

// Function that deletes a post from the database using a fetch
const deletePost = async (postID) => {
    const delURL = APIURL + "/" + postID;
    const resp = await fetch(APIURL, {
        method: "delete",
    });
    if (!resp.ok) {
        throwError(resp);
    }
}

export {
    getPosts,
    addPost,
    deletePost
};
