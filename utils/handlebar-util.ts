import Handlebars from 'handlebars';

interface HandlebarsOptions {
    fn: (context: any) => string;
    inverse: (context: any) => string;
}

export const helpers = {
    'if_eq': function (a: any, b: any, opts: HandlebarsOptions): string {
        if (a === b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    },

    renderStars: function(importance: number): string {
        let stars = '';
        for (let i = 0; i < importance; i++) {
            stars += '★';
        }
        for (let i = importance; i < 5; i++) {
            stars += '☆';
        }
        return stars;
    },

    renderOrderDirection: function(button: string): string {
        if (button !== this.orderBy) {
            return '';
        }
        if (this.orderDirection === 'up') {
            return '▲';
        }
        if (this.orderDirection === 'down') {
            return '▼';
        }
        return '';
    },

    setOrderDirection: function(button: string): string {
        if (button !== this.orderBy) {
            return 'up';
        }

        return this.orderDirection === 'up' ? 'down' : 'up';
    },

    setShowCompleted: function(): string {
        return this.showCompleted === 'true' ? 'false' : 'true';
    },

    renderShowCompleted: function(): string {
        return this.showCompleted === 'true' ? 'Hide completed' : 'Show completed';
    }
};