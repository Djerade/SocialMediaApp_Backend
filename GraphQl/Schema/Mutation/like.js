const user =`
    postID: String,
    username: String
`

export const Like = `
    like(${user}): Post!,
    disLike(${user}): Post!
`