export type GitHubIssuePayload = {
    action: string;
    issue: {
        number: number;
        title: string;
        html_url: string;
        body: string | null;
        state: string;
        comments: number;
        created_at: string;
        user: {
            login: string;
            avatar_url: string;
        };
        assignees: Array<{
            login: string;
        }> | null;
        labels: Array<{
            name: string;
        }> | null;
        milestone: {
            title: string;
        } | null;
    };
};

export type GitHubIssueCommentPayload = {
    action: "created" | "edited" | "deleted";
    issue: {
        number: number;
        title: string;
        html_url: string;
        state: string;
    };
    comment: {
        id: number;
        body: string;
        created_at: string;
        user: {
            login: string;
            avatar_url: string;
        };
    };
};
