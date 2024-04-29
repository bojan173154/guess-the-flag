class Statistics {
    private score: number;
    private isQuizPlaying: boolean;

    constructor () {
        this.score = 0;
        this.isQuizPlaying = false;
    }

    getScore (): number {
        return this.score;
    }

    getIsQuizPlaying (): boolean {
        return this.isQuizPlaying;
    }
}

export const statistics = new Statistics();
