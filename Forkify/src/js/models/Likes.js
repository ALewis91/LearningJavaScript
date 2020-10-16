export default class Likes {
    constructor() {
        this.retrieveData();
        if (!this.likes) this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        }
        this.likes.push(like);

        // Persist data in local storage
        this.persistData();

        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(like => like.id === id);
        this.likes.splice(index, 1);

        // Persist data in local storage
        this.persistData();

    }

    isLiked(id) {
        return this.likes.findIndex(element => element.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    retrieveData() {
        const storage = JSON.parse(localStorage.getItem('likes'));
        if (storage) this.likes = storage;
    }
}