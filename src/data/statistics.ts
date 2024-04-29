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

    startPlaying (): void {
        this.isQuizPlaying = true;
    }
}

export const statistics = new Statistics();
